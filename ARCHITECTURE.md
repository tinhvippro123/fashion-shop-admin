# 🏛️ Next.js Enterprise Architecture Guidelines

Tài liệu này quy định các tiêu chuẩn và nguyên tắc thiết kế kiến trúc cho dự án Next.js. Dự án áp dụng sự kết hợp giữa **Vertical Slice Architecture** (Kiến trúc theo chiều dọc) và **Clean Architecture**, tập trung vào tính module hóa (modular), khả năng mở rộng (scalability) và dễ dàng bảo trì.

> [!IMPORTANT]
> Tất cả các thành viên trong dự án **BẮT BUỘC** phải đọc hiểu và tuân thủ các quy tắc này trước khi commit code. Mọi Pull Request vi phạm cấu trúc thư mục hoặc ranh giới module (boundary) sẽ không được merge.

---

## Tổng quan cấu trúc thư mục (Folder Structure)

Dưới đây là sơ đồ tổng quan của dự án. Mọi thư mục và file mới đều phải tuân thủ nghiêm ngặt vị trí theo cấu trúc này:

```text
src/
├── app/                     # 1. ROUTING & ORCHESTRATION LAYER (Chỉ làm nhiệm vụ điều phối trang)
│   ├── (auth)/              # Nhóm route xác thực
│   ├── (storefront)/        # Nhóm route khách hàng
│   ├── api/                 # Next.js Route Handlers (Webhooks/External API)
│   └── layout.tsx           # Root Layout
│
├── features/                # 2. FEATURE MODULES (Domain-Driven / Vertical Slicing)
│   └── [feature-name]/      # Ví dụ: catalog, cart, payment...
│       ├── components/      # (Presentation) UI Component
│       ├── actions/         # (Controller) Server Actions
│       ├── hooks/           # (State) TanStack Query hooks, Custom hooks
│       ├── services/        # (Use Case) Logic nghiệp vụ gọi API
│       ├── schemas/         # (Validation) Zod schema
│       ├── utils/           # (Utils) Tiện ích riêng của feature
│       ├── types.ts         # Typescript interfaces nội bộ
│       └── index.ts         # [PUBLIC API] Điểm export duy nhất
│
├── shared/                  # 3. GLOBAL SHARED (Dùng chung toàn app)
│   ├── ui/                  # Shadcn UI & Dumb Components
│   ├── layouts/             # Navbar, Footer toàn cục
│   ├── configs/             # Cấu hình app (http.client, env)
│   └── utils/               # Tiện ích chung
│
├── stores/                  # 4. GLOBAL APP STATE (Zustand)
│   └── ui.store.ts          # State UI toàn cục (Đóng mở menu, loading...)
│
└── assets/                  # 5. STATIC ASSETS
```

---

## Quy tắc 1: Vai trò của Lớp Điều Phối (`app/`)

Thư mục `app/` chỉ chịu trách nhiệm về Routing (Định tuyến) và Orchestration (Điều phối). **Tuyệt đối không viết Business Logic tại đây.**

- **Nhiệm vụ:**
  - Định nghĩa Layout, Page, Loading, Error Boundary.
  - Lấy dữ liệu (Data Fetching) trên Server (thông qua Service hoặc Server Action).
  - Khởi tạo Metadata (SEO).
  - Truyền dữ liệu xuống các Client Components hoặc các Container Components thuộc `features/`.
- **Cấm:**
  - Không viết các logic tính toán phức tạp, map/reduce data trực tiếp trong `page.tsx` hoặc `layout.tsx`.
  - Không gọi trực tiếp Fetch API từ bên thứ 3 mà không thông qua HTTP Client chung hoặc Service của Feature.

---

## Quy tắc 2: Tôn trọng Biên Giới Feature (`features/`)

Đây là trái tim của dự án. Mỗi Feature là một module độc lập mang tính nghiệp vụ (Ví dụ: `payment`, `cart`, `catalog`).

### 2.1. Cánh cửa duy nhất: `index.ts` (Public API)
- Mọi tài nguyên (Component, Type, Hook) muốn chia sẻ cho phần khác của App hoặc Feature khác sử dụng **BẮT BUỘC** phải được export qua file `index.ts` ở thư mục gốc của feature đó.
- Các file khác bên ngoài thư mục `features/[feature-name]` **chỉ được phép** import từ file `index.ts` này. Tuyệt đối cấm Deep Import.

> [!CAUTION]
> **Sai (Deep Import):** `import { PaymentMethod } from '@/features/payment/components/payment-method'`  
> **Đúng:** `import { PaymentMethod } from '@/features/payment'`

### 2.2. Giao tiếp chéo giữa các Features (Cross-Feature Communication)
- **Không Import UI chéo nhau:** Feature A không nên render trực tiếp Component giao diện nội bộ của Feature B nếu điều đó tạo ra sự phụ thuộc cứng (tight coupling).
- **Tránh Vòng Lặp Phụ Thuộc (Circular Dependency):** Nếu Feature A phụ thuộc Feature B, và B gọi lại A -> Thiết kế sai. 
- **Giải pháp:** Nếu có sự giao thoa nghiệp vụ quá lớn, hãy tách phần giao thoa đó thành một Feature thứ 3, hoặc sử dụng các cơ chế như *Render Props*, *Children injection* ở cấp độ `app/` (Page) để kết nối chúng lại, hoặc sử dụng Event Bus.

---

## Quy tắc 3: Tách biệt Controller và Service (Clean Architecture)

Trong mỗi Feature, logic xử lý dữ liệu phải tuân thủ luồng: **UI -> Action (Controller) -> Service (Use Case)**.

### 3.1. Server Actions (`actions/`)
- Đóng vai trò là Controller nhận Request từ Client Component.
- **Nhiệm vụ:** Nhận dữ liệu -> Gọi Zod Validate -> Chuyển payload chuẩn cho Service -> Nhận kết quả từ Service -> Revalidate Path (Next.js Cache) hoặc Redirect -> Trả về Response cho Client.
- **KHÔNG** chứa logic nghiệp vụ cốt lõi (tính toán, thuật toán phức tạp).

### 3.2. Services (`services/`)
- Đóng vai trò là Use Case / Business Logic.
- Đây là nơi xử lý logic nghiệp vụ tinh túy nhất. Logic ở đây độc lập hoàn toàn với Next.js (không gọi cache, revalidate hay headers của Next.js).
- **Nhiệm vụ:** Tương tác với Database, External API, thực hiện tính toán.
- **BẮT BUỘC** sử dụng `shared/configs/http.client.ts` để gọi API. Không dùng `fetch` hay `axios` trực tiếp để đảm bảo đồng bộ interceptors và xử lý Token.

---

## Quy tắc 4: Khi nào nên đưa vào `shared/`?

Thư mục `shared/` chứa những tài nguyên dùng chung cho **TOÀN BỘ ỨNG DỤNG**.

- **Quy tắc "Rule of Two":** Đừng vội tạo Component hay Utils trong `shared/` ngay từ đầu. Hãy cứ viết nó bên trong thư mục `features/`. Khi và chỉ khi bạn phát hiện ra logic/component này được tái sử dụng nguyên vẹn ở một **Feature thứ 2**, lúc đó mới tiến hành refactor và kéo nó ra thư mục `shared/ui/` hoặc `shared/utils/`.
- Không nhét các logic mang tính chất "Nghiệp vụ" (Domain logic) vào `shared/`. Khối `shared` chỉ chứa các yếu tố cơ sở (UI kit (Shadcn), Form Helpers, Regex chung...).

---

## Quy tắc 5: Chiến lược State Management

- **UI State (Global):** Các trạng thái chỉ ảnh hưởng đến hiển thị mà không dính tới dữ liệu Database (Đóng/mở sidebar, Theme Dark/Light) -> Đặt tại `stores/ui.store.ts` (Dùng Zustand).
- **Domain State:** Trạng thái mang tính chất dữ liệu nghiệp vụ (Giỏ hàng, Quá trình checkout) -> Đặt tại thư mục `stores/` của chính Feature đó (VD: `features/cart/stores/cart.store.ts`). Không gom chung Domain State vào Global Store.
- **Server State:** Luôn ưu tiên dùng **TanStack Query (React Query)** kết hợp trong `features/[name]/hooks/` để quản lý việc fetch, cache, polling và mutate dữ liệu từ Server.

---

## Quy tắc 6: Schemas và Types

Để tránh nhầm lẫn giữa Type của TypeScript và Schema của Zod:

- **`schemas/` (Zod Validation):** Đại diện cho "Nguồn chân lý dữ liệu" (Single Source of Truth). Dùng để validate dữ liệu từ bên ngoài đi vào hệ thống (API Responses, Payload POST/PUT, Form Data). Hãy tận dụng `.transform()` của Zod để chuyển đổi dữ liệu (DTO) nếu cấu trúc đơn giản.
- **`types.ts` (Internal Types):** Dùng cho các Type/Interface thuần nội bộ (VD: Props của Component, type cho các biến nội bộ) không cần validate runtime.
- **Luôn export Type từ Zod Schema:** Sử dụng `export type TPaymentPayload = z.infer<typeof PaymentSchema>` để tránh phải bảo trì định dạng Type ở hai nơi.

---

## Quy tắc 7: Co-location (Gom cụm và Viết Test)

- Tất cả các file liên quan chặt chẽ đến một đơn vị code phải nằm ngay cạnh nó.
- **Unit Test:** File test bắt buộc phải nằm cùng cấp thư mục với file source.
  - Giao diện: `payment-method.tsx` -> `payment-method.test.tsx` (Dùng React Testing Library)
  - Logic: `payment.service.ts` -> `payment.service.spec.ts` (Dùng Jest / Vitest)

> [!TIP]
> Việc đặt file test ngay cạnh source code giúp Developer dễ dàng nhận biết module nào đã được cover test và giúp việc refactor an toàn hơn rất nhiều.

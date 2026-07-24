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

---

## Quy tắc 8: Phân Lớp Kiến Trúc Dữ Liệu (Data Architecture Layers)

Để code dễ bảo trì, dễ mở rộng và tuân thủ chặt chẽ Clean Architecture & Single Responsibility Principle (SRP), mỗi Feature (ví dụ: `features/catalog`) phải được chia thành 5 lớp rạch ròi. Lớp này không được làm nhiệm vụ của lớp khác:

1. **`types/` (Tầng Domain - Lõi)**
   - Định nghĩa hình hài của dữ liệu (ví dụ: `interface Product`).
   - Mọi thành phần khác trong Feature đều phải tuân theo "bản hợp đồng" này.

2. **`mocks/` (Tầng Dữ Liệu Tĩnh - Data)**
   - Nơi chứa toàn bộ dữ liệu giả (`initialData`, `MOCK_OPTIONS`).
   - Giúp tách biệt dữ liệu cứng ra khỏi UI và Logic. 

3. **`services/` (Tầng Gọi API - Use Case / Data Access)**
   - Nơi chuyên đảm nhận việc giao tiếp với Database hoặc External API (Backend).
   - Chỉ trả về dữ liệu (Promise), không liên quan đến React hay State. 
   - *Lợi ích:* Khi API thật (Backend) hoàn thiện, bạn **chỉ cần sửa mã trong file Service** bằng Axios/Fetch. Toàn bộ Hook và UI bên ngoài không cần sửa 1 dòng nào!

4. **`hooks/` (Tầng Logic - Application)**
   - Nơi chứa não bộ của Frontend (React State, `useEffect`, React Query).
   - Hook sẽ gọi `services/` để lấy dữ liệu, sau đó lưu vào State và trả về cho Component.
   - Không chứa giao diện HTML/JSX, không chứa mảng dữ liệu tĩnh (Mock).

5. **`components/` (Tầng Giao Diện - Presentation)**
   - Đóng vai trò là "Dumb Components" (Component ngốc nghếch).
   - Nhiệm vụ duy nhất: Nhận dữ liệu (từ Hook truyền xuống) và vẽ ra UI (HTML/Tailwind).
   - Không tự gọi API, không tự định nghĩa dữ liệu giả bên trong.

---

## Quy tắc 9: Tiêu chuẩn Quản lý Form và Dữ liệu (Production-Ready)

Để đảm bảo hệ thống Admin đạt chuẩn Production, hiệu năng cao và bảo mật, tất cả các Form phức tạp (Product, Campaign, FlashSale, Blog,...) bắt buộc tuân thủ kiến trúc sau:

### ⚖️ So sánh Kiến trúc Form: Cũ vs Mới

#### ❌ Vấn đề của Kiến trúc Cũ (Sử dụng React thuần)
- **Lạm dụng `useState`:** Mỗi trường như `name`, `price`, `description`... phải khai báo một biến state riêng biệt. Form càng lớn, code càng dài và rối.
- **Trải nghiệm giật lag:** Khi gõ một phím, `useState` thay đổi, kéo theo **toàn bộ giao diện của form phải re-render**. Đặc biệt nếu Form chứa `RichTextEditor`, tình trạng giật lag rất rõ rệt.
- **Xử lý Submit thủ công:** Gọi trực tiếp `fetch('/api/...')` trong Component buộc Developer phải tự viết thêm state `isLoading`, tự viết code bắt lỗi kiểu `if (!title) setErr("Lỗi")`. Rất mệt mỏi và dễ dính bug.
- **Lộ Logic:** Khách truy cập (hoặc hacker) mở F12 (Network) là thấy rõ Form đang gọi qua API nào, dữ liệu gửi đi có cấu trúc ra sao.

#### ✅ Lợi ích của Kiến trúc Mới (RHF + Zod + Server Actions)
- **Siêu Mượt (Uncontrolled Components):** `React Hook Form` không cần dùng `useState` cho từng input. Thẻ input nào thay đổi thì chỉ bản thân thẻ đó cập nhật, form không bị re-render, triệt tiêu hoàn toàn giật lag.
- **Bắt Lỗi Tự Động (Single Source of Truth):** Chỉ định nghĩa luật 1 lần duy nhất ở file `*.schema.ts` qua **Zod**. Lỗi sẽ tự động hiển thị màu đỏ ngay dưới input lập tức nếu sai (ví dụ: title phải dài hơn 5 ký tự), không cần bất kỳ lệnh `if/else` nào trong UI.
- **Bảo mật Tối đa & Dễ dàng hiển thị Loading:** Toàn bộ dữ liệu của form được ném về một **Server Action** (chạy ở Node.js backend). Client gọi hàm thông qua `useTransition`, Next.js sẽ tự động quản lý trạng thái `isPending` (loading) để làm mờ nút Save mà không cần code state bằng tay. Logic gọi Database được ẩn hoàn toàn khỏi trình duyệt.

### 9.1. Form State & Validation (React Hook Form + Zod)
- **Tại sao phải làm? (Vấn đề kiến trúc cũ):** Việc dùng `useState` thuần túy cho Form sinh ra rất nhiều boilerplate code. React sẽ re-render lại toàn bộ component mỗi khi user gõ một ký tự vào input, làm giật lag đối với Form lớn có nhiều component phức tạp như RichTextEditor. Hơn nữa, việc tự viết code check lỗi (validation) bằng `if/else` rất dễ rò rỉ lỗi và không đồng nhất.
- **Giải pháp (Kiến trúc mới):** 
  - Sử dụng **React Hook Form (RHF)** để quản lý state (Uncontrolled Components).
  - Sử dụng **Zod** để khai báo Schema validation (`@hookform/resolvers/zod`).
  - Sử dụng Component `<Form>` của Shadcn UI để kết dính RHF vào giao diện một cách gọn gàng.
- **Lợi ích:** Zod đóng vai trò là Single Source of Truth cho cấu trúc dữ liệu. RHF giúp component không bị re-render liên tục khi gõ phím, tăng hiệu năng đáng kể. Code sạch sẽ, dễ bảo trì, dễ thêm bớt trường dữ liệu. Lỗi (Errors) hiển thị ngay lập tức (Real-time feedback).

### 9.2. Bảo mật & Xử lý Submit (Server Actions)
- **Tại sao phải làm? (Vấn đề kiến trúc cũ):** Trực tiếp gọi `fetch("/api/...")` ở Client Form đòi hỏi phải tự xử lý loading state thủ công, dễ bị lộ endpoint và logic kiểm tra nghiệp vụ ở trình duyệt.
- **Giải pháp (Kiến trúc mới):**
  - Khai báo các hàm xử lý dữ liệu với chỉ thị `"use server"` trong thư mục `actions/`.
  - Component ở Client gọi trực tiếp hàm này thông qua `useTransition`.
- **Lợi ích:** Mọi quá trình tính toán, gọi Database diễn ra 100% trên Server, an toàn tuyệt đối. Tự động hỗ trợ Type-Safe (Client biết chính xác hàm Action trả về kiểu dữ liệu gì). Kết hợp với `useTransition` giúp tạo ra hiệu ứng Loading mượt mà.

### 9.3. Tối ưu Tải trang (Lazy Loading với Dynamic Import)
- **Giải pháp:** Bắt buộc bọc các Component nặng (Rich Text Editor, Biểu đồ) bằng `next/dynamic` với tùy chọn `ssr: false`.
- **Lợi ích:** Giảm tải Bundle Size ban đầu. Khắc phục hoàn toàn các lỗi "Window is not defined" do các thư viện thao tác trực tiếp DOM chạy ở chế độ SSR.

### 💡 Trình tự Implement một Form:
1. **Bước 1: Khai báo Schema (`*.schema.ts`):** 
   ```ts
   export const DataSchema = z.object({ title: z.string().min(5), status: z.enum(["draft", "published"]) });
   export type TDataPayload = z.infer<typeof DataSchema>;
   ```
2. **Bước 2: Viết Server Action (`*.action.ts`):** Nơi tiếp nhận và xử lý (an toàn trên server).
   ```ts
   "use server";
   export async function createDataAction(data: TDataPayload) {
     const validated = DataSchema.safeParse(data);
     if (!validated.success) return { success: false, error: "Lỗi" };
     return { success: true, data: validated.data };
   }
   ```
3. **Bước 3: Viết UI Component (`*Form.tsx`):**
   ```tsx
   const form = useForm<TDataPayload>({ resolver: zodResolver(DataSchema) });
   const [isPending, startTransition] = useTransition();
   
   function onSubmit(values: TDataPayload) {
     startTransition(async () => {
       await createDataAction(values);
     });
   }
   // Return `<Form {...form}>...`
   ```

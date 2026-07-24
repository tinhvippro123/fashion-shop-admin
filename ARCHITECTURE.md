# ðŸ›ï¸ Next.js Enterprise Architecture Guidelines

TÃ i liá»‡u nÃ y quy Ä‘á»‹nh cÃ¡c tiÃªu chuáº©n vÃ  nguyÃªn táº¯c thiáº¿t káº¿ kiáº¿n trÃºc cho dá»± Ã¡n Next.js. Dá»± Ã¡n Ã¡p dá»¥ng sá»± káº¿t há»£p giá»¯a **Vertical Slice Architecture** (Kiáº¿n trÃºc theo chiá»u dá»c) vÃ  **Clean Architecture**, táº­p trung vÃ o tÃ­nh module hÃ³a (modular), kháº£ nÄƒng má»Ÿ rá»™ng (scalability) vÃ  dá»… dÃ ng báº£o trÃ¬.

> [!IMPORTANT]
> Táº¥t cáº£ cÃ¡c thÃ nh viÃªn trong dá»± Ã¡n **Báº®T BUá»˜C** pháº£i Ä‘á»c hiá»ƒu vÃ  tuÃ¢n thá»§ cÃ¡c quy táº¯c nÃ y trÆ°á»›c khi commit code. Má»i Pull Request vi pháº¡m cáº¥u trÃºc thÆ° má»¥c hoáº·c ranh giá»›i module (boundary) sáº½ khÃ´ng Ä‘Æ°á»£c merge.

---

## Tá»•ng quan cáº¥u trÃºc thÆ° má»¥c (Folder Structure)

DÆ°á»›i Ä‘Ã¢y lÃ  sÆ¡ Ä‘á»“ tá»•ng quan cá»§a dá»± Ã¡n. Má»i thÆ° má»¥c vÃ  file má»›i Ä‘á»u pháº£i tuÃ¢n thá»§ nghiÃªm ngáº·t vá»‹ trÃ­ theo cáº¥u trÃºc nÃ y:

```text
src/
â”œâ”€â”€ app/                     # 1. ROUTING & ORCHESTRATION LAYER (Chá»‰ lÃ m nhiá»‡m vá»¥ Ä‘iá»u phá»‘i trang)
â”‚   â”œâ”€â”€ (auth)/              # NhÃ³m route xÃ¡c thá»±c
â”‚   â”œâ”€â”€ (storefront)/        # NhÃ³m route khÃ¡ch hÃ ng
â”‚   â”œâ”€â”€ api/                 # Next.js Route Handlers (Webhooks/External API)
â”‚   â””â”€â”€ layout.tsx           # Root Layout
â”‚
â”œâ”€â”€ features/                # 2. FEATURE MODULES (Domain-Driven / Vertical Slicing)
â”‚   â””â”€â”€ [feature-name]/      # VÃ­ dá»¥: catalog, cart, payment...
â”‚       â”œâ”€â”€ components/      # (Presentation) UI Component
â”‚       â”œâ”€â”€ actions/         # (Controller) Server Actions
â”‚       â”œâ”€â”€ hooks/           # (State) TanStack Query hooks, Custom hooks
â”‚       â”œâ”€â”€ services/        # (Use Case) Logic nghiá»‡p vá»¥ gá»i API
â”‚       â”œâ”€â”€ schemas/         # (Validation) Zod schema
â”‚       â”œâ”€â”€ utils/           # (Utils) Tiá»‡n Ã­ch riÃªng cá»§a feature
â”‚       â”œâ”€â”€ types.ts         # Typescript interfaces ná»™i bá»™
â”‚       â””â”€â”€ index.ts         # [PUBLIC API] Äiá»ƒm export duy nháº¥t
â”‚
â”œâ”€â”€ shared/                  # 3. GLOBAL SHARED (DÃ¹ng chung toÃ n app)
â”‚   â”œâ”€â”€ ui/                  # Shadcn UI & Dumb Components
â”‚   â”œâ”€â”€ layouts/             # Navbar, Footer toÃ n cá»¥c
â”‚   â”œâ”€â”€ configs/             # Cáº¥u hÃ¬nh app (http.client, env)
â”‚   â””â”€â”€ utils/               # Tiá»‡n Ã­ch chung
â”‚
â”œâ”€â”€ stores/                  # 4. GLOBAL APP STATE (Zustand)
â”‚   â””â”€â”€ ui.store.ts          # State UI toÃ n cá»¥c (ÄÃ³ng má»Ÿ menu, loading...)
â”‚
â””â”€â”€ assets/                  # 5. STATIC ASSETS
```

---

## Quy táº¯c 1: Vai trÃ² cá»§a Lá»›p Äiá»u Phá»‘i (`app/`)

ThÆ° má»¥c `app/` chá»‰ chá»‹u trÃ¡ch nhiá»‡m vá» Routing (Äá»‹nh tuyáº¿n) vÃ  Orchestration (Äiá»u phá»‘i). **Tuyá»‡t Ä‘á»‘i khÃ´ng viáº¿t Business Logic táº¡i Ä‘Ã¢y.**

- **Nhiá»‡m vá»¥:**
  - Äá»‹nh nghÄ©a Layout, Page, Loading, Error Boundary.
  - Láº¥y dá»¯ liá»‡u (Data Fetching) trÃªn Server (thÃ´ng qua Service hoáº·c Server Action).
  - Khá»Ÿi táº¡o Metadata (SEO).
  - Truyá»n dá»¯ liá»‡u xuá»‘ng cÃ¡c Client Components hoáº·c cÃ¡c Container Components thuá»™c `features/`.
- **Cáº¥m:**
  - KhÃ´ng viáº¿t cÃ¡c logic tÃ­nh toÃ¡n phá»©c táº¡p, map/reduce data trá»±c tiáº¿p trong `page.tsx` hoáº·c `layout.tsx`.
  - KhÃ´ng gá»i trá»±c tiáº¿p Fetch API tá»« bÃªn thá»© 3 mÃ  khÃ´ng thÃ´ng qua HTTP Client chung hoáº·c Service cá»§a Feature.

---

## Quy táº¯c 2: TÃ´n trá»ng BiÃªn Giá»›i Feature (`features/`)

ÄÃ¢y lÃ  trÃ¡i tim cá»§a dá»± Ã¡n. Má»—i Feature lÃ  má»™t module Ä‘á»™c láº­p mang tÃ­nh nghiá»‡p vá»¥ (VÃ­ dá»¥: `payment`, `cart`, `catalog`).

### 2.1. CÃ¡nh cá»­a duy nháº¥t: `index.ts` (Public API)
- Má»i tÃ i nguyÃªn (Component, Type, Hook) muá»‘n chia sáº» cho pháº§n khÃ¡c cá»§a App hoáº·c Feature khÃ¡c sá»­ dá»¥ng **Báº®T BUá»˜C** pháº£i Ä‘Æ°á»£c export qua file `index.ts` á»Ÿ thÆ° má»¥c gá»‘c cá»§a feature Ä‘Ã³.
- CÃ¡c file khÃ¡c bÃªn ngoÃ i thÆ° má»¥c `features/[feature-name]` **chá»‰ Ä‘Æ°á»£c phÃ©p** import tá»« file `index.ts` nÃ y. Tuyá»‡t Ä‘á»‘i cáº¥m Deep Import.

> [!CAUTION]
> **Sai (Deep Import):** `import { PaymentMethod } from '@/features/payment/components/payment-method'`  
> **ÄÃºng:** `import { PaymentMethod } from '@/features/payment'`

### 2.2. Giao tiáº¿p chÃ©o giá»¯a cÃ¡c Features (Cross-Feature Communication)
- **KhÃ´ng Import UI chÃ©o nhau:** Feature A khÃ´ng nÃªn render trá»±c tiáº¿p Component giao diá»‡n ná»™i bá»™ cá»§a Feature B náº¿u Ä‘iá»u Ä‘Ã³ táº¡o ra sá»± phá»¥ thuá»™c cá»©ng (tight coupling).
- **TrÃ¡nh VÃ²ng Láº·p Phá»¥ Thuá»™c (Circular Dependency):** Náº¿u Feature A phá»¥ thuá»™c Feature B, vÃ  B gá»i láº¡i A -> Thiáº¿t káº¿ sai. 
- **Giáº£i phÃ¡p:** Náº¿u cÃ³ sá»± giao thoa nghiá»‡p vá»¥ quÃ¡ lá»›n, hÃ£y tÃ¡ch pháº§n giao thoa Ä‘Ã³ thÃ nh má»™t Feature thá»© 3, hoáº·c sá»­ dá»¥ng cÃ¡c cÆ¡ cháº¿ nhÆ° *Render Props*, *Children injection* á»Ÿ cáº¥p Ä‘á»™ `app/` (Page) Ä‘á»ƒ káº¿t ná»‘i chÃºng láº¡i, hoáº·c sá»­ dá»¥ng Event Bus.

---

## Quy táº¯c 3: TÃ¡ch biá»‡t Controller vÃ  Service (Clean Architecture)

Trong má»—i Feature, logic xá»­ lÃ½ dá»¯ liá»‡u pháº£i tuÃ¢n thá»§ luá»“ng: **UI -> Action (Controller) -> Service (Use Case)**.

### 3.1. Server Actions (`actions/`)
- ÄÃ³ng vai trÃ² lÃ  Controller nháº­n Request tá»« Client Component.
- **Nhiá»‡m vá»¥:** Nháº­n dá»¯ liá»‡u -> Gá»i Zod Validate -> Chuyá»ƒn payload chuáº©n cho Service -> Nháº­n káº¿t quáº£ tá»« Service -> Revalidate Path (Next.js Cache) hoáº·c Redirect -> Tráº£ vá» Response cho Client.
- **KHÃ”NG** chá»©a logic nghiá»‡p vá»¥ cá»‘t lÃµi (tÃ­nh toÃ¡n, thuáº­t toÃ¡n phá»©c táº¡p).

### 3.2. Services (`services/`)
- ÄÃ³ng vai trÃ² lÃ  Use Case / Business Logic.
- ÄÃ¢y lÃ  nÆ¡i xá»­ lÃ½ logic nghiá»‡p vá»¥ tinh tÃºy nháº¥t. Logic á»Ÿ Ä‘Ã¢y Ä‘á»™c láº­p hoÃ n toÃ n vá»›i Next.js (khÃ´ng gá»i cache, revalidate hay headers cá»§a Next.js).
- **Nhiá»‡m vá»¥:** TÆ°Æ¡ng tÃ¡c vá»›i Database, External API, thá»±c hiá»‡n tÃ­nh toÃ¡n.
- **Báº®T BUá»˜C** sá»­ dá»¥ng `shared/configs/http.client.ts` Ä‘á»ƒ gá»i API. KhÃ´ng dÃ¹ng `fetch` hay `axios` trá»±c tiáº¿p Ä‘á»ƒ Ä‘áº£m báº£o Ä‘á»“ng bá»™ interceptors vÃ  xá»­ lÃ½ Token.

---

## Quy táº¯c 4: Khi nÃ o nÃªn Ä‘Æ°a vÃ o `shared/`?

ThÆ° má»¥c `shared/` chá»©a nhá»¯ng tÃ i nguyÃªn dÃ¹ng chung cho **TOÃ€N Bá»˜ á»¨NG Dá»¤NG**.

- **Quy táº¯c "Rule of Two":** Äá»«ng vá»™i táº¡o Component hay Utils trong `shared/` ngay tá»« Ä‘áº§u. HÃ£y cá»© viáº¿t nÃ³ bÃªn trong thÆ° má»¥c `features/`. Khi vÃ  chá»‰ khi báº¡n phÃ¡t hiá»‡n ra logic/component nÃ y Ä‘Æ°á»£c tÃ¡i sá»­ dá»¥ng nguyÃªn váº¹n á»Ÿ má»™t **Feature thá»© 2**, lÃºc Ä‘Ã³ má»›i tiáº¿n hÃ nh refactor vÃ  kÃ©o nÃ³ ra thÆ° má»¥c `shared/ui/` hoáº·c `shared/utils/`.
- KhÃ´ng nhÃ©t cÃ¡c logic mang tÃ­nh cháº¥t "Nghiá»‡p vá»¥" (Domain logic) vÃ o `shared/`. Khá»‘i `shared` chá»‰ chá»©a cÃ¡c yáº¿u tá»‘ cÆ¡ sá»Ÿ (UI kit (Shadcn), Form Helpers, Regex chung...).

---

## Quy táº¯c 5: Chiáº¿n lÆ°á»£c State Management

- **UI State (Global):** CÃ¡c tráº¡ng thÃ¡i chá»‰ áº£nh hÆ°á»Ÿng Ä‘áº¿n hiá»ƒn thá»‹ mÃ  khÃ´ng dÃ­nh tá»›i dá»¯ liá»‡u Database (ÄÃ³ng/má»Ÿ sidebar, Theme Dark/Light) -> Äáº·t táº¡i `stores/ui.store.ts` (DÃ¹ng Zustand).
- **Domain State:** Tráº¡ng thÃ¡i mang tÃ­nh cháº¥t dá»¯ liá»‡u nghiá»‡p vá»¥ (Giá» hÃ ng, QuÃ¡ trÃ¬nh checkout) -> Äáº·t táº¡i thÆ° má»¥c `stores/` cá»§a chÃ­nh Feature Ä‘Ã³ (VD: `features/cart/stores/cart.store.ts`). KhÃ´ng gom chung Domain State vÃ o Global Store.
- **Server State:** LuÃ´n Æ°u tiÃªn dÃ¹ng **TanStack Query (React Query)** káº¿t há»£p trong `features/[name]/hooks/` Ä‘á»ƒ quáº£n lÃ½ viá»‡c fetch, cache, polling vÃ  mutate dá»¯ liá»‡u tá»« Server.

---

## Quy táº¯c 6: Schemas vÃ  Types

Äá»ƒ trÃ¡nh nháº§m láº«n giá»¯a Type cá»§a TypeScript vÃ  Schema cá»§a Zod:

- **`schemas/` (Zod Validation):** Äáº¡i diá»‡n cho "Nguá»“n chÃ¢n lÃ½ dá»¯ liá»‡u" (Single Source of Truth). DÃ¹ng Ä‘á»ƒ validate dá»¯ liá»‡u tá»« bÃªn ngoÃ i Ä‘i vÃ o há»‡ thá»‘ng (API Responses, Payload POST/PUT, Form Data). HÃ£y táº­n dá»¥ng `.transform()` cá»§a Zod Ä‘á»ƒ chuyá»ƒn Ä‘á»•i dá»¯ liá»‡u (DTO) náº¿u cáº¥u trÃºc Ä‘Æ¡n giáº£n.
- **`types.ts` (Internal Types):** DÃ¹ng cho cÃ¡c Type/Interface thuáº§n ná»™i bá»™ (VD: Props cá»§a Component, type cho cÃ¡c biáº¿n ná»™i bá»™) khÃ´ng cáº§n validate runtime.
- **LuÃ´n export Type tá»« Zod Schema:** Sá»­ dá»¥ng `export type TPaymentPayload = z.infer<typeof PaymentSchema>` Ä‘á»ƒ trÃ¡nh pháº£i báº£o trÃ¬ Ä‘á»‹nh dáº¡ng Type á»Ÿ hai nÆ¡i.

---

## Quy táº¯c 7: Co-location (Gom cá»¥m vÃ  Viáº¿t Test)

- Táº¥t cáº£ cÃ¡c file liÃªn quan cháº·t cháº½ Ä‘áº¿n má»™t Ä‘Æ¡n vá»‹ code pháº£i náº±m ngay cáº¡nh nÃ³.
- **Unit Test:** File test báº¯t buá»™c pháº£i náº±m cÃ¹ng cáº¥p thÆ° má»¥c vá»›i file source.
  - Giao diá»‡n: `payment-method.tsx` -> `payment-method.test.tsx` (DÃ¹ng React Testing Library)
  - Logic: `payment.service.ts` -> `payment.service.spec.ts` (DÃ¹ng Jest / Vitest)

> [!TIP]
> Viá»‡c Ä‘áº·t file test ngay cáº¡nh source code giÃºp Developer dá»… dÃ ng nháº­n biáº¿t module nÃ o Ä‘Ã£ Ä‘Æ°á»£c cover test vÃ  giÃºp viá»‡c refactor an toÃ n hÆ¡n ráº¥t nhiá»u.

---

## Quy táº¯c 8: PhÃ¢n Lá»›p Kiáº¿n TrÃºc Dá»¯ Liá»‡u (Data Architecture Layers)

Äá»ƒ code dá»… báº£o trÃ¬, dá»… má»Ÿ rá»™ng vÃ  tuÃ¢n thá»§ cháº·t cháº½ Clean Architecture & Single Responsibility Principle (SRP), má»—i Feature (vÃ­ dá»¥: `features/catalog`) pháº£i Ä‘Æ°á»£c chia thÃ nh 5 lá»›p ráº¡ch rÃ²i. Lá»›p nÃ y khÃ´ng Ä‘Æ°á»£c lÃ m nhiá»‡m vá»¥ cá»§a lá»›p khÃ¡c:

1. **`types/` (Táº§ng Domain - LÃµi)**
   - Äá»‹nh nghÄ©a hÃ¬nh hÃ i cá»§a dá»¯ liá»‡u (vÃ­ dá»¥: `interface Product`).
   - Má»i thÃ nh pháº§n khÃ¡c trong Feature Ä‘á»u pháº£i tuÃ¢n theo "báº£n há»£p Ä‘á»“ng" nÃ y.

2. **`mocks/` (Táº§ng Dá»¯ Liá»‡u TÄ©nh - Data)**
   - NÆ¡i chá»©a toÃ n bá»™ dá»¯ liá»‡u giáº£ (`initialData`, `MOCK_OPTIONS`).
   - GiÃºp tÃ¡ch biá»‡t dá»¯ liá»‡u cá»©ng ra khá»i UI vÃ  Logic. 

3. **`services/` (Táº§ng Gá»i API - Use Case / Data Access)**
   - NÆ¡i chuyÃªn Ä‘áº£m nháº­n viá»‡c giao tiáº¿p vá»›i Database hoáº·c External API (Backend).
   - Chá»‰ tráº£ vá» dá»¯ liá»‡u (Promise), khÃ´ng liÃªn quan Ä‘áº¿n React hay State. 
   - *Lá»£i Ã­ch:* Khi API tháº­t (Backend) hoÃ n thiá»‡n, báº¡n **chá»‰ cáº§n sá»­a mÃ£ trong file Service** báº±ng Axios/Fetch. ToÃ n bá»™ Hook vÃ  UI bÃªn ngoÃ i khÃ´ng cáº§n sá»­a 1 dÃ²ng nÃ o!

4. **`hooks/` (Táº§ng Logic - Application)**
   - NÆ¡i chá»©a nÃ£o bá»™ cá»§a Frontend (React State, `useEffect`, React Query).
   - Hook sáº½ gá»i `services/` Ä‘á»ƒ láº¥y dá»¯ liá»‡u, sau Ä‘Ã³ lÆ°u vÃ o State vÃ  tráº£ vá» cho Component.
   - KhÃ´ng chá»©a giao diá»‡n HTML/JSX, khÃ´ng chá»©a máº£ng dá»¯ liá»‡u tÄ©nh (Mock).

5. **`components/` (Táº§ng Giao Diá»‡n - Presentation)**
   - ÄÃ³ng vai trÃ² lÃ  "Dumb Components" (Component ngá»‘c ngháº¿ch).
   - Nhiá»‡m vá»¥ duy nháº¥t: Nháº­n dá»¯ liá»‡u (tá»« Hook truyá»n xuá»‘ng) vÃ  váº½ ra UI (HTML/Tailwind).
   - KhÃ´ng tá»± gá»i API, khÃ´ng tá»± Ä‘á»‹nh nghÄ©a dá»¯ liá»‡u giáº£ bÃªn trong.

---

## Quy táº¯c 9: TiÃªu chuáº©n Quáº£n lÃ½ Form vÃ  Dá»¯ liá»‡u (Production-Ready)

Äá»ƒ Ä‘áº£m báº£o há»‡ thá»‘ng Admin Ä‘áº¡t chuáº©n Production, hiá»‡u nÄƒng cao vÃ  báº£o máº­t, táº¥t cáº£ cÃ¡c Form phá»©c táº¡p (Product, Campaign, FlashSale, Blog,...) báº¯t buá»™c tuÃ¢n thá»§ kiáº¿n trÃºc sau:

### âš–ï¸ So sÃ¡nh Kiáº¿n trÃºc Form: CÅ© vs Má»›i

#### âŒ Váº¥n Ä‘á» cá»§a Kiáº¿n trÃºc CÅ© (Sá»­ dá»¥ng React thuáº§n)
- **Láº¡m dá»¥ng `useState`:** Má»—i trÆ°á»ng nhÆ° `name`, `price`, `description`... pháº£i khai bÃ¡o má»™t biáº¿n state riÃªng biá»‡t. Form cÃ ng lá»›n, code cÃ ng dÃ i vÃ  rá»‘i.
- **Tráº£i nghiá»‡m giáº­t lag:** Khi gÃµ má»™t phÃ­m, `useState` thay Ä‘á»•i, kÃ©o theo **toÃ n bá»™ giao diá»‡n cá»§a form pháº£i re-render**. Äáº·c biá»‡t náº¿u Form chá»©a `RichTextEditor`, tÃ¬nh tráº¡ng giáº­t lag ráº¥t rÃµ rá»‡t.
- **Xá»­ lÃ½ Submit thá»§ cÃ´ng:** Gá»i trá»±c tiáº¿p `fetch('/api/...')` trong Component buá»™c Developer pháº£i tá»± viáº¿t thÃªm state `isLoading`, tá»± viáº¿t code báº¯t lá»—i kiá»ƒu `if (!title) setErr("Lá»—i")`. Ráº¥t má»‡t má»i vÃ  dá»… dÃ­nh bug.
- **Lá»™ Logic:** KhÃ¡ch truy cáº­p (hoáº·c hacker) má»Ÿ F12 (Network) lÃ  tháº¥y rÃµ Form Ä‘ang gá»i qua API nÃ o, dá»¯ liá»‡u gá»­i Ä‘i cÃ³ cáº¥u trÃºc ra sao.

#### âœ… Lá»£i Ã­ch cá»§a Kiáº¿n trÃºc Má»›i (RHF + Zod + Server Actions)
- **SiÃªu MÆ°á»£t (Uncontrolled Components):** `React Hook Form` khÃ´ng cáº§n dÃ¹ng `useState` cho tá»«ng input. Tháº» input nÃ o thay Ä‘á»•i thÃ¬ chá»‰ báº£n thÃ¢n tháº» Ä‘Ã³ cáº­p nháº­t, form khÃ´ng bá»‹ re-render, triá»‡t tiÃªu hoÃ n toÃ n giáº­t lag.
- **Báº¯t Lá»—i Tá»± Äá»™ng (Single Source of Truth):** Chá»‰ Ä‘á»‹nh nghÄ©a luáº­t 1 láº§n duy nháº¥t á»Ÿ file `*.schema.ts` qua **Zod**. Lá»—i sáº½ tá»± Ä‘á»™ng hiá»ƒn thá»‹ mÃ u Ä‘á» ngay dÆ°á»›i input láº­p tá»©c náº¿u sai (vÃ­ dá»¥: title pháº£i dÃ i hÆ¡n 5 kÃ½ tá»±), khÃ´ng cáº§n báº¥t ká»³ lá»‡nh `if/else` nÃ o trong UI.
- **Báº£o máº­t Tá»‘i Ä‘a & Dá»… dÃ ng hiá»ƒn thá»‹ Loading:** ToÃ n bá»™ dá»¯ liá»‡u cá»§a form Ä‘Æ°á»£c nÃ©m vá» má»™t **Server Action** (cháº¡y á»Ÿ Node.js backend). Client gá»i hÃ m thÃ´ng qua `useTransition`, Next.js sáº½ tá»± Ä‘á»™ng quáº£n lÃ½ tráº¡ng thÃ¡i `isPending` (loading) Ä‘á»ƒ lÃ m má» nÃºt Save mÃ  khÃ´ng cáº§n code state báº±ng tay. Logic gá»i Database Ä‘Æ°á»£c áº©n hoÃ n toÃ n khá»i trÃ¬nh duyá»‡t.

#### ðŸ“ So sÃ¡nh PhÃ¢n bá»• Cáº¥u trÃºc ThÆ° má»¥c (Old vs New)

**Kiáº¿n trÃºc CÅ© (Táº¥t cáº£ nhÃ©t vÃ o má»™t chá»—, khÃ³ tÃ¡i sá»­ dá»¥ng):**
```text
src/
â””â”€â”€ app/
    â””â”€â”€ products/
        â”œâ”€â”€ create/
        â”‚   â”œâ”€â”€ page.tsx       (Chá»©a luÃ´n UI Form, khai bÃ¡o hÃ ng chá»¥c useState, vÃ  fetch API)
        â”‚   â””â”€â”€ validate.ts    (CÃ¡c hÃ m check lá»—i if/else tá»± cháº¿)
```

**Kiáº¿n trÃºc Má»›i (PhÃ¢n tÃ¡ch rÃµ rÃ ng tá»«ng chá»©c nÄƒng - Vertical Slicing):**
```text
src/
â”œâ”€â”€ app/
â”‚   â””â”€â”€ (dashboard)/products/create/
â”‚       â””â”€â”€ page.tsx           (Chá»‰ gá»i Component <ProductForm mode="create" /> - Ráº¥t ngáº¯n gá»n)
â”‚
â””â”€â”€ features/catalog/          (NhÃ³m nghiá»‡p vá»¥ Catalog)
    â”œâ”€â”€ components/
    â”‚   â””â”€â”€ ProductForm.tsx    (Chá»‰ chá»©a UI + React Hook Form, KHÃ”NG gá»i fetch API)
    â”œâ”€â”€ actions/
    â”‚   â””â”€â”€ product.action.ts  (Chá»‰ chá»©a hÃ m "use server" xá»­ lÃ½ dá»¯ liá»‡u vÃ  lÆ°u DB)
    â””â”€â”€ schemas/
        â””â”€â”€ product.schema.ts  (Chá»‰ chá»©a Zod Schema Ä‘á»‹nh nghÄ©a luáº­t kiá»ƒm tra lá»—i)
```

### 9.1. Form State & Validation (React Hook Form + Zod)
- **Táº¡i sao pháº£i lÃ m? (Váº¥n Ä‘á» kiáº¿n trÃºc cÅ©):** Viá»‡c dÃ¹ng `useState` thuáº§n tÃºy cho Form sinh ra ráº¥t nhiá»u boilerplate code. React sáº½ re-render láº¡i toÃ n bá»™ component má»—i khi user gÃµ má»™t kÃ½ tá»± vÃ o input, lÃ m giáº­t lag Ä‘á»‘i vá»›i Form lá»›n cÃ³ nhiá»u component phá»©c táº¡p nhÆ° RichTextEditor. HÆ¡n ná»¯a, viá»‡c tá»± viáº¿t code check lá»—i (validation) báº±ng `if/else` ráº¥t dá»… rÃ² rá»‰ lá»—i vÃ  khÃ´ng Ä‘á»“ng nháº¥t.
- **Giáº£i phÃ¡p (Kiáº¿n trÃºc má»›i):** 
  - Sá»­ dá»¥ng **React Hook Form (RHF)** Ä‘á»ƒ quáº£n lÃ½ state (Uncontrolled Components).
  - Sá»­ dá»¥ng **Zod** Ä‘á»ƒ khai bÃ¡o Schema validation (`@hookform/resolvers/zod`).
  - Sá»­ dá»¥ng Component `<Form>` cá»§a Shadcn UI Ä‘á»ƒ káº¿t dÃ­nh RHF vÃ o giao diá»‡n má»™t cÃ¡ch gá»n gÃ ng.
- **Lá»£i Ã­ch:** Zod Ä‘Ã³ng vai trÃ² lÃ  Single Source of Truth cho cáº¥u trÃºc dá»¯ liá»‡u. RHF giÃºp component khÃ´ng bá»‹ re-render liÃªn tá»¥c khi gÃµ phÃ­m, tÄƒng hiá»‡u nÄƒng Ä‘Ã¡ng ká»ƒ. Code sáº¡ch sáº½, dá»… báº£o trÃ¬, dá»… thÃªm bá»›t trÆ°á»ng dá»¯ liá»‡u. Lá»—i (Errors) hiá»ƒn thá»‹ ngay láº­p tá»©c (Real-time feedback).

### 9.2. Báº£o máº­t & Xá»­ lÃ½ Submit (Server Actions)
- **Táº¡i sao pháº£i lÃ m? (Váº¥n Ä‘á» kiáº¿n trÃºc cÅ©):** Trá»±c tiáº¿p gá»i `fetch("/api/...")` á»Ÿ Client Form Ä‘Ã²i há»i pháº£i tá»± xá»­ lÃ½ loading state thá»§ cÃ´ng, dá»… bá»‹ lá»™ endpoint vÃ  logic kiá»ƒm tra nghiá»‡p vá»¥ á»Ÿ trÃ¬nh duyá»‡t.
- **Giáº£i phÃ¡p (Kiáº¿n trÃºc má»›i):**
  - Khai bÃ¡o cÃ¡c hÃ m xá»­ lÃ½ dá»¯ liá»‡u vá»›i chá»‰ thá»‹ `"use server"` trong thÆ° má»¥c `actions/`.
  - Component á»Ÿ Client gá»i trá»±c tiáº¿p hÃ m nÃ y thÃ´ng qua `useTransition`.
- **Lá»£i Ã­ch:** Má»i quÃ¡ trÃ¬nh tÃ­nh toÃ¡n, gá»i Database diá»…n ra 100% trÃªn Server, an toÃ n tuyá»‡t Ä‘á»‘i. Tá»± Ä‘á»™ng há»— trá»£ Type-Safe (Client biáº¿t chÃ­nh xÃ¡c hÃ m Action tráº£ vá» kiá»ƒu dá»¯ liá»‡u gÃ¬). Káº¿t há»£p vá»›i `useTransition` giÃºp táº¡o ra hiá»‡u á»©ng Loading mÆ°á»£t mÃ .

### 9.3. Tá»‘i Æ°u Táº£i trang (Lazy Loading vá»›i Dynamic Import)
- **Giáº£i phÃ¡p:** Báº¯t buá»™c bá»c cÃ¡c Component náº·ng (Rich Text Editor, Biá»ƒu Ä‘á»“) báº±ng `next/dynamic` vá»›i tÃ¹y chá»n `ssr: false`.
- **Lá»£i Ã­ch:** Giáº£m táº£i Bundle Size ban Ä‘áº§u. Kháº¯c phá»¥c hoÃ n toÃ n cÃ¡c lá»—i "Window is not defined" do cÃ¡c thÆ° viá»‡n thao tÃ¡c trá»±c tiáº¿p DOM cháº¡y á»Ÿ cháº¿ Ä‘á»™ SSR.

### ðŸ’¡ TrÃ¬nh tá»± Implement má»™t Form:
1. **BÆ°á»›c 1: Khai bÃ¡o Schema (`*.schema.ts`):** 
   ```ts
   export const DataSchema = z.object({ title: z.string().min(5), status: z.enum(["draft", "published"]) });
   export type TDataPayload = z.infer<typeof DataSchema>;
   ```
2. **BÆ°á»›c 2: Viáº¿t Server Action (`*.action.ts`):** NÆ¡i tiáº¿p nháº­n vÃ  xá»­ lÃ½ (an toÃ n trÃªn server).
   ```ts
   "use server";
   export async function createDataAction(data: TDataPayload) {
     const validated = DataSchema.safeParse(data);
     if (!validated.success) return { success: false, error: "Lá»—i" };
     return { success: true, data: validated.data };
   }
   ```
3. **BÆ°á»›c 3: Viáº¿t UI Component (`*Form.tsx`):**
   ```tsx
   const form = useForm<TDataPayload>({ resolver: zodResolver(DataSchema) });
   const [isPending, startTransition] = useTransition();
   
   function onSubmit(values: TDataPayload) {
     startTransition(async () => {
       try {
         const res = await createDataAction(values);
         if (res.success) {
           toast.success("ThÃ nh cÃ´ng!");
           form.reset();
         } else {
           toast.error(res.error || "CÃ³ lá»—i xáº£y ra");
           // Ãnh xáº¡ lá»—i Validation tá»« Server Action vá» UI
           if (res.details) {
             Object.keys(res.details).forEach((key) => {
               form.setError(key as any, { type: "server", message: res.details[key][0] });
             });
           }
         }
       } catch (error) {
         toast.error("Lá»—i káº¿t ná»‘i Ä‘áº¿n mÃ¡y chá»§!");
       }
     });
   }
   // Return `<Form {...form}>...`
   ```

### 9.4. Error Handling (Báº®T BUá»˜C)
- **Trong Server Action**: Pháº£i luÃ´n cÃ³ khá»‘i `try...catch` bá»c quanh lá»i gá»i Service. Tráº£ vá» `return { success: false, error: "Lá»—i há»‡ thá»‘ng" }` náº¿u Service nÃ©m Exception (trÃ¡nh sáº­p Next.js App Router).
- **Trong Form Component**: Pháº£i luÃ´n cÃ³ khá»‘i `try...catch` bá»c quanh lá»i gá»i Server Action. Xá»­ lÃ½ field validation error báº±ng cÃ¡ch dÃ¹ng `form.setError` vá»›i `res.details`.


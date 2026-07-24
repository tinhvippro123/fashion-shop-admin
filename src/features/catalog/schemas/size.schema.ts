import { z } from "zod";

export const SizeSchema = z.object({
  name: z.string().min(1, "Kích thước không được để trống"),
});

export type TSizePayload = z.infer<typeof SizeSchema>;

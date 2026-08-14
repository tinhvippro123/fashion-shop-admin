import { z } from "zod";

export const RejectReturnSchema = z.object({
  reason: z.string().min(10, { message: "Lý do từ chối phải dài ít nhất 10 ký tự." }),
});

export type TRejectReturnPayload = z.infer<typeof RejectReturnSchema>;

export const FraudReportSchema = z.object({
  reason: z.string().min(10, { message: "Chi tiết tình trạng gian lận phải dài ít nhất 10 ký tự." }),
  evidenceUrl: z.string().url({ message: "Vui lòng đính kèm hình ảnh/video bằng chứng hợp lệ." }).optional(),
});

export type TFraudReportPayload = z.infer<typeof FraudReportSchema>;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { VoucherForm } from "./VoucherForm";
import { useVouchers } from "../hooks/useVouchers";
import { useEffect, useState } from "react";
import { TVoucherPayload } from "../schemas/voucher.schema";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit" | "duplicate";
  voucherId: string | null;
}

export function VoucherModal({ isOpen, onClose, mode, voucherId }: VoucherModalProps) {
  const { vouchers } = useVouchers();
  const [defaultValues, setDefaultValues] = useState<Partial<TVoucherPayload> | undefined>();
  const [status, setStatus] = useState<"Sắp diễn ra" | "Đang diễn ra" | "Đã kết thúc" | undefined>();

  useEffect(() => {
    if (isOpen) {
      if ((mode === "edit" || mode === "view" || mode === "duplicate") && voucherId) {
        const voucher = vouchers.find(v => v.id === voucherId);
        if (voucher) {
          const discountAmount = parseInt(voucher.discountAmount.replace(/\D/g, ''));
          const minOrder = parseInt(voucher.minOrderValue.replace(/\D/g, ''));
          const maxLimit = parseInt(voucher.quantity.split(" / ")[1] || "100");
          
          let defaultStart = "2026-01-01T00:00";
          let defaultEnd = "2026-12-31T23:59";
          
          if (voucher.duration) {
             const parts = voucher.duration.split(' - ');
             if (parts.length === 2) {
                const startDateStr = parts[0].split('/');
                const endDateStr = parts[1].split('/');
                if (startDateStr.length === 3 && endDateStr.length === 3) {
                   defaultStart = `${startDateStr[2]}-${startDateStr[1]}-${startDateStr[0]}T00:00`;
                   defaultEnd = `${endDateStr[2]}-${endDateStr[1]}-${endDateStr[0]}T23:59`;
                }
             }
          }
          
          const vals: Partial<TVoucherPayload> = {
            code: mode === "duplicate" ? `${voucher.code}_COPY` : voucher.code,
            discountType: voucher.discountAmount.includes("%") ? "percent" : "vnd",
            discount: discountAmount,
            minOrder: minOrder,
            quantity: maxLimit,
            isActive: voucher.status !== "Đã kết thúc",
            isPublic: true,
            startDate: defaultStart,
            endDate: defaultEnd,
          };
          // eslint-disable-next-line
          setDefaultValues(vals);
          setStatus(voucher.status as "Đang diễn ra" | "Sắp diễn ra" | "Đã kết thúc" | undefined);
        }
      } else {
        setDefaultValues(undefined);
        setStatus(undefined);
      }
    }
  }, [isOpen, mode, voucherId, vouchers]);

  const getTitle = () => {
    switch (mode) {
      case "create": return "Tạo Mã giảm giá mới";
      case "edit": return "Chỉnh sửa Mã giảm giá";
      case "view": return "Chi tiết Mã giảm giá";
      case "duplicate": return "Sao chép Mã giảm giá";
      default: return "";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "create": return "Điền thông tin bên dưới để tạo mã giảm giá mới.";
      case "edit": return status === "Đang diễn ra" ? "Mã đang chạy, chỉ có thể sửa một số trường." : "Chỉnh sửa cấu hình mã giảm giá.";
      case "view": return "Xem cấu hình chi tiết của mã giảm giá (Chỉ đọc).";
      case "duplicate": return "Sao chép từ mã cũ. Hãy đổi mã Code để tránh trùng lặp.";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-106.25 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        {/* We use a key to force re-render when defaultValues changes so RHF updates correctly */}
        {isOpen && (
          <div className="mt-4">
            {mode === "view" && (
              <div className="grid grid-cols-4 items-center gap-4 mb-4">
                <Label className="text-right">Khung thời gian</Label>
                <Input value={vouchers.find(v => v.id === voucherId)?.duration || ""} readOnly className="col-span-3 bg-muted" />
              </div>
            )}
            <VoucherForm 
              key={mode + voucherId} 
              onSuccess={onClose} 
              defaultValues={defaultValues} 
              readOnly={mode === "view"}
              status={mode === "edit" ? status : undefined}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

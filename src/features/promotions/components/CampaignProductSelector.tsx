import { useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { TCampaignProduct } from "../schemas/campaign.schema";

interface CampaignProductSelectorProps {
  products: TCampaignProduct[];
  onChange: (products: TCampaignProduct[]) => void;
  disabled?: boolean;
}

// Mock products from catalog for selection
const MOCK_CATALOG = [
  { id: "p1", name: "Áo thun Basic nam nữ", price: 150000, categoryId: "c1" },
  { id: "p2", name: "Quần Jeans ống rộng", price: 350000, categoryId: "c2" },
  { id: "p3", name: "Áo khoác Hoodie Unisex", price: 250000, categoryId: "c1" },
  { id: "p4", name: "Giày Sneaker thể thao", price: 450000, categoryId: "c3" },
];

export function CampaignProductSelector({ products, onChange, disabled }: CampaignProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkDiscountType, setBulkDiscountType] = useState<"FIXED_AMOUNT" | "PERCENTAGE">("PERCENTAGE");
  const [bulkDiscountValue, setBulkDiscountValue] = useState<number>(0);

  const filteredCatalog = MOCK_CATALOG.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (id: string | number) => products.some(p => p.productId === id);
  
  const getSelectedProduct = (id: string | number) => products.find(p => p.productId === id);

  const toggleProduct = (catalogItem: typeof MOCK_CATALOG[0]) => {
    if (disabled) return;
    
    if (isSelected(catalogItem.id)) {
      onChange(products.filter(p => p.productId !== catalogItem.id));
    } else {
      onChange([...products, {
        productId: catalogItem.id,
        productName: catalogItem.name,
        originalPrice: catalogItem.price,
        discountType: bulkDiscountType,
        discountValue: bulkDiscountValue,
        salePrice: bulkDiscountType === "PERCENTAGE" 
          ? catalogItem.price * (1 - bulkDiscountValue / 100)
          : Math.max(0, catalogItem.price - bulkDiscountValue)
      }]);
    }
  };

  const updateProductDiscount = (id: string | number, field: "discountType" | "discountValue", value: any) => {
    if (disabled) return;
    
    onChange(products.map(p => {
      if (p.productId === id) {
        const updated = { ...p, [field]: value };
        // Recalculate sale price
        updated.salePrice = updated.discountType === "PERCENTAGE"
          ? updated.originalPrice * (1 - updated.discountValue / 100)
          : Math.max(0, updated.originalPrice - updated.discountValue);
        return updated;
      }
      return p;
    }));
  };

  const applyBulkDiscount = () => {
    if (disabled) return;
    
    onChange(products.map(p => ({
      ...p,
      discountType: bulkDiscountType,
      discountValue: bulkDiscountValue,
      salePrice: bulkDiscountType === "PERCENTAGE"
        ? p.originalPrice * (1 - bulkDiscountValue / 100)
        : Math.max(0, p.originalPrice - bulkDiscountValue)
    })));
  };

  return (
    <div className="space-y-4">
      {/* Thanh công cụ: Tìm kiếm và Áp dụng hàng loạt */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex-1">
          <Input 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={disabled}
            className="bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select 
            value={bulkDiscountType} 
            onValueChange={(val: any) => setBulkDiscountType(val)}
            disabled={disabled}
          >
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Theo %</SelectItem>
              <SelectItem value="FIXED_AMOUNT">Giảm tiền</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="number"
            value={bulkDiscountValue || ""}
            onChange={(e) => setBulkDiscountValue(Number(e.target.value))}
            className="w-[100px] bg-background"
            placeholder="Mức giảm"
            disabled={disabled}
          />
          <Button type="button" variant="secondary" onClick={applyBulkDiscount} disabled={disabled || products.length === 0}>
            Áp dụng tất cả
          </Button>
        </div>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="w-[150px]">Giá gốc</TableHead>
              <TableHead className="w-[150px]">Loại giảm</TableHead>
              <TableHead className="w-[150px]">Mức giảm</TableHead>
              <TableHead className="w-[150px]">Giá sau giảm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCatalog.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy sản phẩm nào
                </TableCell>
              </TableRow>
            ) : (
              filteredCatalog.map((catalogItem) => {
                const selected = isSelected(catalogItem.id);
                const productData = getSelectedProduct(catalogItem.id);

                return (
                  <TableRow key={catalogItem.id} className={selected ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selected}
                        onCheckedChange={() => toggleProduct(catalogItem)}
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{catalogItem.name}</TableCell>
                    <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(catalogItem.price)}</TableCell>
                    
                    {/* Các cột thiết lập giảm giá chỉ hiện nếu đã chọn */}
                    {selected && productData ? (
                      <>
                        <TableCell>
                          <Select 
                            value={productData.discountType} 
                            onValueChange={(val: any) => updateProductDiscount(catalogItem.id, "discountType", val)}
                            disabled={disabled}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PERCENTAGE">%</SelectItem>
                              <SelectItem value="FIXED_AMOUNT">VND</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number"
                            value={productData.discountValue || ""}
                            onChange={(e) => updateProductDiscount(catalogItem.id, "discountValue", Number(e.target.value))}
                            disabled={disabled}
                          />
                        </TableCell>
                        <TableCell className="font-bold text-red-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData.salePrice)}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-muted-foreground italic">-</TableCell>
                        <TableCell className="text-muted-foreground italic">-</TableCell>
                        <TableCell className="text-muted-foreground italic">-</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground text-right">
        Đã chọn {products.length} sản phẩm
      </div>
    </div>
  );
}

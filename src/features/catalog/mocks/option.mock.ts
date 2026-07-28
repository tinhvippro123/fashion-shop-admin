import { IOptionSuggestions } from "../types/product.admin";

export const mockOptionSuggestions: IOptionSuggestions = {
  names: ["Màu sắc", "Kích thước", "Chất liệu", "Dung lượng", "RAM"],
  values: {
    "Màu sắc": ["Đen", "Trắng", "Đỏ", "Xanh dương", "Hồng cánh sen", "Vàng", "Xám rêu"],
    "Kích thước": ["S", "M", "L", "XL", "XXL", "Freesize", "39", "40", "41"],
    "Chất liệu": ["Cotton 100%", "Kaki", "Jean", "Lụa tơ tằm"],
    "Dung lượng": ["64GB", "128GB", "256GB"],
    "RAM": ["4GB", "8GB", "16GB"],
  }
};

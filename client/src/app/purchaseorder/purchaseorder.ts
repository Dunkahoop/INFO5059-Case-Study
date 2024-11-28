import { PurchaseorderItem } from "./purchaseorder-item";

export interface Purchaseorder {
    id: number;
    vendorid: number;
    items: PurchaseorderItem[];
    total: number;
    subtotal: number;
    tax: number;
    podate?: string;
}

import { PurchaseorderItem } from "./purchaseorder-item";

export interface Purchaseorder {
    id: number;
    vendorid: number;
    items: PurchaseorderItem[];
    amount: number;
}

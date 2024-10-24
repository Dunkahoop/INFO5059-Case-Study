export interface PurchaseorderItem {
    //purchaseorderid is not necessary as it it automatically filled out, but kept in case soemthing happens
    //see java file PurchaseOrderDAO to see what I mean

    //maybe remove id as well?
    id: number;
    //purchaseorderid: number;
    productid: string;
    productname: string;
    qty: number;
    price: number;
}

export const BASE_URL: string = 'http://localhost:8080/api';
export const VENDOR_DEFAULT = {
    id: 0,
    name: '',
    address1: '',
    city: '',
    province: '',
    postalcode: '',
    phone: '',
    type: '',
    email: '',
  }
  export const PRODUCT_DEFAULT = {
    id: '',
    vendorid: 0,
    name: '',
    costprice: 0,
    msrp: 0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode: [],
    qrcodetxt: ''
};

export const PDF_URL = 'http://localhost:8080/pdf';
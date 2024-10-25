import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PDF_URL, PRODUCT_DEFAULT, VENDOR_DEFAULT } from '@app/constants';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { Purchaseorder } from '@app/purchaseorder/purchaseorder';
import { PurchaseorderItem } from '@app/purchaseorder/purchaseorder-item';
import { PurchaseorderService } from '@app/purchaseorder/purchaseorder.service';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { Subscription } from 'rxjs';
//TODO: do some cleanup regarding purchaseorderitems; they may be implemented incoreecetly by having qty and productname
@Component({
  selector: 'app-generator',
  standalone: true,
  templateUrl: './generator.component.html',
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
})
export class GeneratorComponent implements OnInit, OnDestroy {
  formSubscription?: Subscription;
  numbers: number[] = [];
  msg: string = '';
  vendors: Vendor[] = [];
  selectedVendor: Vendor = VENDOR_DEFAULT;
  selectedProduct: Product = PRODUCT_DEFAULT;
  vendorProducts: Product[] = [];
  purchaseOrderItems: PurchaseorderItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  vendorForm: FormControl;
  productForm: FormControl;
  quantityForm: FormControl;
  generatorFormGroup: FormGroup;
  generatedOrderId: number = 0;
  quantity: number = 0;
  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private purchaseOrderService: PurchaseorderService
  ) {
    this.vendorForm = new FormControl('');
    this.productForm = new FormControl('');
    this.quantityForm = new FormControl('');
    this.generatorFormGroup = this.builder.group({
      vendor: this.vendorForm,
      product: this.productForm,
      quantity: this.quantityForm,
    });
  }

  ngOnInit(): void {
    console.log(`initializing`);
    this.msg = 'Loading vendors from server...';
    this.setupOnVendorPickedEvent();
    this.setupOnProductPickedEvent();
    this.setupOnQuantityPickedEvent();
    this.getAllVendors();
  }

  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  }
  setupOnVendorPickedEvent() {
    console.log(`vendor event sent`);
    this.formSubscription = this.generatorFormGroup
      .get('vendor')
      ?.valueChanges.subscribe((vendor) => {
        if (!vendor) return;
        this.selectedVendor = vendor;
        this.numbers = [];
        this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
        this.loadVendorProducts();
        this.purchaseOrderItems = [];
        this.msg = 'Choose product for vendor';
        this.generatedOrderId = 0;
      });
  }
  setupOnProductPickedEvent() {
    console.log(`product event sent`);
    const productSubscription = this.generatorFormGroup
      .get('product')
      ?.valueChanges.subscribe((product) => {
        if (!product) return;
        this.selectedProduct = product;
        this.numbers = [];
        for (let i = 0; i <= this.selectedProduct.eoq; i++)
          this.numbers.push(i);
        this.generatorFormGroup.get('quantity')?.reset();
        this.msg = 'Choose quantity of product';
      });
    this.formSubscription?.add(productSubscription);
  }
  setupOnQuantityPickedEvent() {
    console.log(`quantity event sent`);
    const quantitySubscription = this.generatorFormGroup
      .get('quantity')
      ?.valueChanges.subscribe((quantity) => {
        if (!quantity && quantity !== 0) return;
        this.quantity = quantity;
        //this.subtotal += this.selectedProduct.costprice * quantity;
        //add item to table
        this.updateTable();
      });
    this.formSubscription?.add(quantitySubscription);
  }
  updateTable(): void {
    const item: PurchaseorderItem = {
      id: 0,
      productid: this.selectedProduct.id,
      qty: this.quantity,
      productname: this.selectedProduct.name,
      price: this.selectedProduct.costprice,
    };
    const existingItemIndex = this.purchaseOrderItems.findIndex(
      (order) => order.productid === this.selectedProduct.id
    );
    if (existingItemIndex !== -1) {
      // Update the existing item
      if (this.quantity === 0) {
        console.log(
          `item ${this.purchaseOrderItems[existingItemIndex].productname} deleted`
        );
        this.subtotal -=
          this.purchaseOrderItems[existingItemIndex].price *
          this.purchaseOrderItems[existingItemIndex].qty;
          this.msg = `${item.productname}(s) deleted`;
        this.purchaseOrderItems.splice(existingItemIndex, 1);
      } else {
        this.msg = `${item.qty} ${item.productname}(s) added`;
        //remove amount added by product prior to change
        this.subtotal -=
          this.purchaseOrderItems[existingItemIndex].price *
          this.purchaseOrderItems[existingItemIndex].qty;
        //change quantity to proper amount
        this.purchaseOrderItems[existingItemIndex].qty = this.quantity;
        //add in corrected subtotal
        this.subtotal +=
          this.purchaseOrderItems[existingItemIndex].price * this.quantity;
      }
    } else {
      if (!this.quantity || this.quantity === 0) return;
      this.subtotal += item.price * item.qty;
      // Add the new item
      this.msg = `${item.qty} ${item.productname}(s) added`;
      this.purchaseOrderItems.push(item);
    }
    this.tax = this.subtotal * 0.05 + this.subtotal * 0.08;
    this.total = this.subtotal + this.tax;
  }
  getAllVendors(verbose: boolean = true): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => (this.vendors = vendors),
      error: (e: Error) => (this.msg = `Failed to load vendors - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Vendors loaded!`) : null),
    });
  }
  loadVendorProducts(): void {
    this.vendorProducts = [];
    this.productService.getSome(this.selectedVendor.id).subscribe({
      next: (products: Product[]) => (this.vendorProducts = products),
      error: (err: Error) =>
        (this.msg = `products fetch failed! - ${err.message}`),
    });
  }
  getProduct(productid: string): Product | undefined {
    return this.vendorProducts.find((e) => e.id === productid);
  }
  //delete?
  getProductInOrder(productid: string): PurchaseorderItem | undefined {
    return this.purchaseOrderItems.find((e) => e.productid === productid);
  }
  selectedProducts(): Product[] {
    let products: Product[] = [];
    this.purchaseOrderItems.forEach((poi) => {
      let product = this.getProduct(poi.productid);
      if (product) {
        products.push(product);
      }
    });
    console.log(products);
    return products;
  }
  isProductAlreadySelected(product: Product): boolean {
    return (
      this.purchaseOrderItems.find(
        (order) => order.productid === product.id
      ) !== undefined
    );
  }
  unselectedVendorProducts(): Product[] {
    return this.vendorProducts.filter((e) => !this.isProductAlreadySelected(e));
  }
  createPurchaseOrder(): void {
    const order: Purchaseorder = {
      id: 0,
      items: this.purchaseOrderItems,
      vendorid: this.selectedVendor.id,
      total: this.total,
      subtotal: this.subtotal,
      tax: this.tax
    };
    this.purchaseOrderService.create(order).subscribe({
      next: (order: Purchaseorder) => {
        order.id > 0
          ? (this.msg = `Order ${order.id} added!`)
          : (this.msg = 'Order not added! - server error');

          this.generatedOrderId = order.id;
          console.log(`order added`);
      },
      error: (err: Error) => (this.msg = `Order not added! - ${err.message}`),
      complete: () => this.resetGenerator(),
    });
  }
  viewPdf(): void {
    window.open(`${PDF_URL}${this.generatedOrderId}`);
  }
  resetGenerator(): void {
    this.productForm.reset();
    this.vendorForm.reset();
    this.quantityForm.reset();
    this.selectedVendor = Object.assign({}, VENDOR_DEFAULT);
    this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
    this.vendorProducts = [];
    this.purchaseOrderItems = [];
    this.numbers = [];
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.quantity = 0;
  }
}

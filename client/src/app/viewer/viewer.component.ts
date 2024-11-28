import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ORDER_DEFAULT, PDF_URL, VENDOR_DEFAULT } from '@app/constants';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { Purchaseorder } from '@app/purchaseorder/purchaseorder';
import { PurchaseorderService } from '@app/purchaseorder/purchaseorder.service';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { report } from 'process';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './viewer.component.html',
  styles: ``,
})
export class ViewerComponent {
  formSubscription?: Subscription;

  viewerFormGroup: FormGroup;
  vendorForm: FormControl;
  viewerForm: FormControl;

  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  msg: string = '';
  vendors: Vendor[] = [];
  vendorProducts: Product[] = [];
  vendorOrders: Purchaseorder[] = [];
  selectedVendor: Vendor = VENDOR_DEFAULT;
  selectedOrder: Purchaseorder = ORDER_DEFAULT;
  constructor(
    private builder: FormBuilder,
    private orderService: PurchaseorderService,
    private vendorService: VendorService,
    private productService: ProductService
  ) {
    this.vendorForm = new FormControl('');
    this.viewerForm = new FormControl('');
    this.viewerFormGroup = this.builder.group({
      vendor: this.vendorForm,
      viewer: this.viewerForm,
    });
  }
  ngOnInit(): void {
    this.msg = 'loading vendors...';
    this.getAllVendors();
  }
  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  }

  getAllVendors(verbose: boolean = true): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => (this.vendors = vendors),
      error: (e: Error) =>
        (this.msg = `Failed to load vendors - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Vendors loaded!`) : null),
    });
  }
  loadVendorOrders(id: number): void {
    this.msg = 'loading orders...';
    this.orderService.getSome(id).subscribe((orders) => (this.vendorOrders = orders));
  }
  onVendorPicked(event: MatSelectChange) {
    if(!event.value) return;
    this.selectedVendor = event.value;

    this.productService.getSome(this.selectedVendor.id).subscribe({
      next: (products: Product[]) => this.vendorProducts = products,
      error: (e: Error) => this.msg = `Failed to load products from vendor - ${this.selectedVendor.name}`,
    })

    this.orderService.getSome(this.selectedVendor.id).subscribe({
      next: (orders: Purchaseorder[]) => this.vendorOrders = orders,
      error: (e: Error) => this.msg = `Failed to load orders from vendor - ${this.selectedVendor.name}`,
      complete: () => this.msg = `Orders for ${this.selectedVendor.name} loaded!`
    })
  }
  onOrderPicked(event: MatSelectChange) {
    this.selectedOrder = event.value

    this.selectedOrder.items.forEach((item) => this.subtotal += item.price);

    this.tax = this.subtotal * 0.05 + this.subtotal * 0.08;
    this.total = this.subtotal + this.tax;
  }
  orderProducts() : Product[] {
    return this.vendorProducts.filter((product) => this.selectedOrder.items.some((item) => item.productid === product.id));
  }
  viewPdf(): void {
    window.open(`${PDF_URL}${this.selectedOrder.id}`);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { PRODUCT_DEFAULT } from '@app/constants';
import { ProductService } from '@app/product/product.service';
import { VendorService } from '@app/vendor/vendor.service';
import { VendorModule } from '@app/vendor/vendor.module';
import { Sort } from '@angular/material/sort';
import { ProductDetailComponent } from '@app/product/product-detail/product-detail.component';

@Component({
  selector: 'app-product-home',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, VendorModule, ProductDetailComponent],
  templateUrl: './product-home.component.html',
  styles: ``,
})
export class ProductHomeComponent implements OnInit {
  msg: string = '';
  showDetails: boolean = false;
  products: Product[] = [];
  vendors: Vendor[] = [];
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  productInDetail: Product = PRODUCT_DEFAULT;
  constructor(
    public productService: ProductService,
    public vendorService: VendorService
  ) {}
  ngOnInit(): void {
    this.getAllVendors();
    this.getAllProducts();
  }
  getAllVendors(verbose: boolean = true): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => (this.vendors = vendors),
      error: (e: Error) => (this.msg = `Failed to load vendors - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Vendors loaded!`) : null),
    });
  }
  getAllProducts(verbose: boolean = true): void {//TODO: figure out why the fuck products doesn't get sent to detail component
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {this.dataSource.data = products; this.products = products; console.log(this.dataSource.data)},
      error: (e: Error) =>
        (this.msg = `Failed to load products - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Products loaded!`) : null),
    });
  }
  select(selectedProduct: Product): void {
    this.productInDetail = selectedProduct;
    this.msg = `Product ${selectedProduct.id} selected`;
    this.showDetails = true;
  }
  save(product: Product): void {
    this.productExists(product) ? this.update(product) : this.create(product);
  }
  cancel(): void {
    this.msg = 'Operation cancelled';
    this.showDetails = false;
  }
  create(product: Product): void {
    this.msg = 'Creating product...';
    this.productService.create(product).subscribe({
      next: (p: Product) => {
        this.msg =
          p.id !== ''
            ? `Product ${p.id} created!`
            : `Product ${p.id} not created!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Create failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  update(product: Product): void {
    this.msg = 'Updating product...';
    this.productService.update(product).subscribe({
      next: (p: Product) => {
        this.msg = `Product ${p.id} updated!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Update failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  delete(product: Product): void {
    this.productService.delete(product.id).subscribe({
      next: (rowsUpdated: number) => {
        this.msg =
          rowsUpdated === 1
            ? `Product ${product.id} deleted!`
            : `Product ${product.id} not deleted!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Delete failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  startNewProduct(): void {
    this.productInDetail = Object.assign({}, PRODUCT_DEFAULT);
    this.msg = 'New product';
    this.showDetails = true;
  }
  sortProducts(sort: Sort): void {
    const literals = {
      id: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? (a.id < b.id
                ? -1
                : 1)
              : (b.id < a.id
              ? -1
              : 1)
        )),
      name: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? (a.name < b.name
                ? -1
                : 1)
              : (b.name < a.name
              ? -1
              : 1)
        )),
      vendorid: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? (a.vendorid < b.vendorid
                ? -1
                : 1)
              : (b.vendorid < a.vendorid
              ? -1
              : 1)
        )),
    };
    literals[sort.active as keyof typeof literals]();
  }
  productExists(product: Product): boolean {
    let products: Product[] = this.dataSource.data;
    if (products?.length > 0) {
      if(products.find(p => p.id === product.id) !== undefined) return true;
    }
    return false;
  }
}

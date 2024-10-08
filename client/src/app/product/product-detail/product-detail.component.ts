import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { PRODUCT_DEFAULT } from '@app/constants';
import { QuantityValidator } from '@app/validators/quantity.validator';
import {  RxReactiveFormsModule, RxwebValidators } from "@rxweb/reactive-form-validators"
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatComponentsModule, RxReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product = PRODUCT_DEFAULT;
  @Input() vendors: Vendor[] | null = null;
  @Input() products: Product[] = [];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  id: FormControl;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  //qrcode: FormControl;
  //qrcodetxt: FormControl;
  productForm: FormGroup;
  //selectedProduct: any;
  constructor(private builder: FormBuilder) {
    this.id = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        this.uniqueCodeValidator.bind(this),
      ])
    );
    this.vendorid = new FormControl(//TODO: why doesn't the error validation come after touching vendors?
      '',
      Validators.compose([Validators.required, Validators.min(1)])
    );
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl(
      '',
      Validators.compose([Validators.required, RxwebValidators.numeric()])
    );
    this.msrp = new FormControl('', Validators.compose([Validators.required, RxwebValidators.numeric()]));
    this.rop = new FormControl('', Validators.compose([Validators.required, QuantityValidator]));
    this.eoq = new FormControl('', Validators.compose([Validators.required, QuantityValidator]));
    this.qoh = new FormControl('', Validators.compose([Validators.required, QuantityValidator]));
    this.qoo = new FormControl('', Validators.compose([Validators.required, QuantityValidator]));
    // this.qrcode = new FormControl(
    //   '',
    //   Validators.compose([Validators.required])
    // );
    // this.qrcodetxt = new FormControl(
    //   '',
    //   Validators.compose([Validators.required])
    // );
    this.productForm = this.builder.group({
      id: this.products,
      vendorid: this.vendors,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      // qrcode: this.qrcode,
      // qrcodetxt: this.qrcodetxt,
    });
  }
  ngOnInit(): void {
    this.productForm.patchValue({
      id: this.product.id,
      vendorid: this.product.vendorid,
      name: this.product.name,
      costprice: this.product.costprice,
      msrp: this.product.msrp,
      rop: this.product.rop,
      eoq: this.product.eoq,
      qoh: this.product.qoh,
      qoo: this.product.qoo,
      // qrcode: this.product.qrcode,
      // qrcodetxt: this.product.qrcodetxt,
    });
  }
  updateProductInDetail(): void {
    this.product.id = this.productForm.value.id;
    this.product.vendorid = this.productForm.value.vendorid;
    this.product.name = this.productForm.value.name;
    this.product.costprice = this.productForm.value.costprice;
    this.product.msrp = this.productForm.value.msrp;
    this.product.rop = this.productForm.value.rop;
    this.product.eoq = this.productForm.value.eoq;
    this.product.qoh = this.productForm.value.qoh;
    this.product.qoo = this.productForm.value.qoo;
    // this.product.qrcode = [];
    // this.product.qrcodetxt = "";
    this.saved.emit(this.product);
  }
  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    /**
     * uniqueCodeValidator - needed access to products property so not
     * with the rest of the validators
     */
    console.log("checking id...");
    console.log(this.products);
    if (this.products && this.products?.length > 0) {
      if (
        this.products.find(
          (p) => p.id === control.value && !this.product.id
        ) !== undefined
      ) {
        console.log(`id found`)
        return { idExists: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator
}

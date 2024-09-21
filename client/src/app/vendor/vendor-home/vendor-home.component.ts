import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  //selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  //styles: ``,
})
export class VendorHomeComponent implements OnInit {
  msg: string;
  vendors$?: Observable<Vendor[]>;
  vendor: Vendor;
  hideEditForm: boolean;
  initialLoad: boolean;
  constructor(public vendorService: VendorService) {
    this.vendor = {
      id: 0,
      name: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      email: '',
    };
    this.msg = '';
    this.hideEditForm = true;
    this.initialLoad = true;
  } //constructor

  ngOnInit(): void {
    this.msg = 'loading vendors from server...';
    this.vendors$ = this.vendorService.get().pipe(
      tap(() => {
        if (this.initialLoad) {
          this.msg = 'vendors loaded!';
          this.initialLoad = false;
        }
      })
    );
  } //ngOnInit
  select(vendor: Vendor): void {
    this.vendor = vendor;
    this.msg = `${vendor.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  }
  cancel(): void {
    this.msg = 'Operation cancelled';
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  update(vendor: Vendor): void {
    this.vendorService.update(vendor).subscribe({
      next: (vend: Vendor) => (this.msg = `Vendor ${vend.name} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } //update
} //EmployeeHomeComponent

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
    this.msg = 'Loading...';
    this.getAll();
  } //ngOnInit
  getAll(): void {
    this.vendors$ = this.vendorService.getAll();
    this.vendors$.subscribe({
      error: (e: Error) => (this.msg = `Couldn't get vendors - ${e.message}`),
      complete: () => (this.msg = `Vendors loaded!`),
    });
  } //getAll
  select(vendor: Vendor): void {
    this.vendor = vendor;
    this.msg = `${vendor.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  } //select
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
  save(vendor: Vendor): void {
    vendor.id ? this.update(vendor) : this.add(vendor);
  } //save
  add(vendor: Vendor): void {
    vendor.id = 0;
    this.vendorService.create(vendor).subscribe({
      //create observer object
      next: (vend: Vendor) => {
        this.msg = `Vendor ${vend.id} added!`;
      },
      error: (err: Error) => (this.msg = `Vendor not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } //add
  delete(vendor: Vendor): void {
    this.vendorService.delete(vendor.id).subscribe({
      // Create observer object
      next: (numOfVendorsDeleted: number) => {
        numOfVendorsDeleted === 1
          ? (this.msg = `Vendor ${vendor.name} deleted!`)
          : (this.msg = `Vendor not deleted`);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // delete
  newVendor(): void {
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
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'New Vendor';
  } //newVendor
} //VendorHomeComponent

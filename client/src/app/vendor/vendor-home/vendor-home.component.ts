import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styles: ``,
})
export class VendorHomeComponent implements OnInit {
  vendors: Array<Vendor>;
  msg: string;

  constructor(public vendorService: VendorService) {
    this.vendors = [];
    this.msg = '';
  }//constructor

  ngOnInit(): void {
      this.msg = 'loading vendors from server...';
      this.vendorService.get().subscribe({
        //observer object, complete method intrinsically unsubscribes
        //i think this is a promise?
        next: (payload: any) => {
          this.vendors = payload._embedded.vendors;
          this.msg = 'vendors loaded!!';
        },
        error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
        complete: () => {},
      });//subscribe
  }//ngOnInit
}//EmployeeHomeComponent

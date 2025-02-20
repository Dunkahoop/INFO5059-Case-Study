import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendor-list',
  template: `
    <mat-list-item *ngFor="let vendor of vendors" layout="row" class="pad-xs mat-title" (click)="selected.emit(vendor)">
      {{vendor.id}} - {{vendor.name}}
    </mat-list-item>
  `,
  //styles: ``
})
export class VendorListComponent {
  @Input() vendors?: Vendor[];
  @Output() selected = new EventEmitter();
}

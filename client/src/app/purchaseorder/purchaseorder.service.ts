import { HttpClient } from '@angular/common/http';
import { Purchaseorder } from './purchaseorder';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseorderService extends GenericHttpService<Purchaseorder> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `purchaseorders`);
  }
}

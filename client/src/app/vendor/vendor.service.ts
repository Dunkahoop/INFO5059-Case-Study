import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from '@app/generic-http.service';
import { BASE_URL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService extends GenericHttpService<Vendor> {
  constructor(http: HttpClient) {
    super(http, `vendors`);
  } // constructor
} // VendorService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  resourceURL: string;
  constructor(public http: HttpClient) {
  this.resourceURL = `${BASE_URL}/api/vendors`;
  } // constructor
  get(): Observable<Vendor[]> {
  return this.http
  .get<Vendor[]>(this.resourceURL)
  .pipe(retry(1), catchError(this.handleError));
  } // get
  // Error handling
  handleError(error: any) {
  let errorMessage = '';
  error.error instanceof ErrorEvent
  ? // Get client-side error
  (errorMessage = error.error.message)
  : // Get server-side error
  (errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`);
  console.log(errorMessage);
  return throwError(() => errorMessage);
  }//handleError
  update(vendor: Vendor): Observable<Vendor> {
    return this.http
    .put<Vendor>(`${this.resourceURL}`, vendor)
    .pipe(retry(1), catchError(this.handleError));
  }//update
 } // VendorService
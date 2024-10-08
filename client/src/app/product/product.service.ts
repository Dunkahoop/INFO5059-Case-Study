import { Injectable } from '@angular/core';

import { Product } from './product';
import { GenericHttpService } from '@app/generic-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericHttpService<Product> {
  constructor(http: HttpClient) {
    super(http, `products`);
  }
}

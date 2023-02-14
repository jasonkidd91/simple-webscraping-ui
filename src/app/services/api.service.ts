import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

import { ApiConstant } from './../constants/api-constant';
import { Catalog } from '../models/catalog';
import { CatalogItem } from '../models/catalog-item';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) { }

  readonly catalog = {
    uri: `${ApiConstant.CATALOG.SERVER_URL}${ApiConstant.CATALOG.URI.ALL}/`,
    getAll: (page: string | number) => this.http.get<Catalog>(this.catalog.uri + String(page))
  }

  readonly products = {
    uri: `${ApiConstant.PRODUCTS.SERVER_URL}${ApiConstant.PRODUCTS.URI.ALL}/`,
    getAll: (name: string, page: string | number) => this.http.get<Catalog>(this.products.uri + name + '/' + String(page))
  }

  readonly search = {
    uri: `${ApiConstant.SEARCH.SERVER_URL}${ApiConstant.SEARCH.URI.ALL}/`,
    getAll: (keyword: string, page: string | number) => this.http.get<Catalog>(this.search.uri + keyword + '/' + String(page))
  }

  readonly cart = {
    uri: 'cart',
    getAll: () => this.afs.collection<CatalogItem>(this.cart.uri).snapshotChanges().pipe(
      map(data => {
        return data.map(m => {
          let cartItem = m.payload.doc.data();
          cartItem.id = m.payload.doc.id;
          return cartItem;
        })
      })
    ),
    addItem: (item: CatalogItem) => this.afs.collection('cart').add(item),
    removeItem: (item: CatalogItem) => this.afs.doc('cart/' + item.id).delete()
  }
}

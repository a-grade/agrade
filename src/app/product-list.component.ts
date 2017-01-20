import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Product } from './product';

@Component({
  selector: 'product-list',
  templateUrl: './views/product-list.html'
  })

  export class ProductsListComponent {
    products: FirebaseListObservable<Product[]>;
    selectedProduct = null;
    constructor(af: AngularFire) {
      this.products = af.database.list('/products');
    };
    onSelect(product): void {
      this.selectedProduct = product;
    };
  }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './views/product-detail.html'
})
export class ProductDetailComponent {
  @Input()
  product;
}

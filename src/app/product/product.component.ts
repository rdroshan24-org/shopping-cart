// product.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;

  constructor(private router: Router, private productService: ProductService) {}

  viewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart() {
    this.productService.addToCart(this.product);
  }
}

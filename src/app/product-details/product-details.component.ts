import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  quantity: number = 0;
  cart: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isLogin()) {
      this.router.navigate(['/login']);
    }

    const productId = this.route.snapshot.paramMap.get('id') || 0;
    this.product = this.productService.getProductById(+productId);
    this.getCart();
  }

  getCart() {
    this.productService.getCart().subscribe((cart) => {
      console.log('product details subscriber called...', cart);
      this.cart = cart;
      if (this.cart.length > 0) {
        let isExitingItem = this.cart.find(
          (item: any) => this.product.id == item.id
        );
        if (isExitingItem) {
          this.quantity = isExitingItem.quantity;
        }
      } else {
        this.quantity = 0;
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const productToAdd = { ...this.product, quantity: this.quantity };
    this.productService.addToCart(productToAdd, '', true);
  }
}

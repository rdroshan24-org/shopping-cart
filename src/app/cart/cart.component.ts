// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  totalPrice = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isLogin()) {
      this.router.navigate(['/login']);
    }

    this.productService.getCart().subscribe((cart) => {
      console.log('cart subscriber called...', cart);
      this.cart = cart;
      if (cart.length === 0) {
        const cartVar = localStorage.getItem('cart');
        this.cart = cartVar ? JSON.parse(cartVar) : [];
      }
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cart.reduce(
      (sum: any, item: any) => sum + +item.price * +item.quantity,
      0
    );
  }

  removeFromCart(product: any) {
    this.productService.removeFromCart(product);
  }

  backToProductList() {
    this.router.navigate(['/products']);
  }

  increaseQuantity(product: any) {
    this.productService.addToCart(product);
  }

  decreaseQuantity(product: any) {
    this.productService.addToCart(product, 'remove');
  }
}

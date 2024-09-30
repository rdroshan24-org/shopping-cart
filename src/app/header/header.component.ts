import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartItemCount = 0;
  isLogin: boolean = false;
  constructor(private router: Router, private productService: ProductService, private authService: AuthService) {}

  ngOnInit() {
    this.productService.getCart().subscribe((cart) => {
      console.log('app subscriber called...', cart)
      this.cartItemCount = cart.length;
      if(cart.length === 0){
        const cart = localStorage.getItem("cart");
        this.cartItemCount = (cart ? JSON.parse(cart) : []).length;
      }
    });
    this.isLogin = this.authService.isLogin();
    console.log(this.isLogin)
  }

  logout(){
    this.authService.logout();
  }
  
}

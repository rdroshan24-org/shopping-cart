import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private products = [
    { id: 1, name: "Winter Jacket", price: 100, description: "Winter Jacket for Men and Lady", image: "1.webp", quantity: 0 },
    { id: 2, name: "Men's T-Shirt", price: 200, description: "Men's T-Shirt Cotton Base", image: "2.webp", quantity: 0  },
    { id: 3, name: "Blazer Suit", price: 200, description: "Blazer Suit Dress jacket for Men", image: "3.webp", quantity: 0  },
    { id: 4, name: "Gaming Headset", price: 200, description: "Gaming Headset with Mic", image: "4.webp", quantity: 0  },
    { id: 5, name: "Apple Watch", price: 200, description: "Apple Watch Series 1", image: "5.webp", quantity: 0  },
    { id: 6, name: "Men's Denim", price: 200, description: "Men's Denim Jeans Shorts", image: "6.webp", quantity: 0  },
    { id: 7, name: "Men's T-Shirt", price: 200, description: "Men's T-Shirt Cotton Base Layer Slim fit", image: "7.webp", quantity: 0  },
  ];

  private cart: any = [];
  private cartSubject = new BehaviorSubject([]);

  constructor(){
    const cart = localStorage.getItem("cart")
    this.cart = cart ? JSON.parse(cart) : [];
  }

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  addToCart(product: any, addOrRemove:string='add', isAddedFromProductPage?: boolean) {
    const existingProductIndex: number = this.cart.findIndex((item: any) => item.id === product.id);
    let quantity
    if (existingProductIndex>-1) {
      quantity = this.cart[existingProductIndex].quantity;
      if(addOrRemove == 'remove') {
        if(quantity > 1){
          quantity--;
        }
        this.cart[existingProductIndex].quantity = quantity;
      } else { 
        quantity++;
        this.cart[existingProductIndex].quantity = isAddedFromProductPage ? product.quantity : quantity;
      } 
    } else {
      if(!isAddedFromProductPage){
        product.quantity++;
      }
      this.cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
    alert('Cart updated successfully!!!')
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter((item: any) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }
  
}

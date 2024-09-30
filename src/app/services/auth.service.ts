import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  getAuth() {
    return this.authSubject.asObservable();
  }

  isLogin() {
    const user = localStorage.getItem('user');
    const isLogin = user ? true : false;
    this.authSubject.next(isLogin);
    return user ? true : false;
  }

  logout() {
    localStorage.removeItem('user');
    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }
}

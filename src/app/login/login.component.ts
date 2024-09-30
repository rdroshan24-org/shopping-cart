import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {
    if(this.authService.isLogin()){
      this.router.navigate(['/products']);
    }
  }

  login() {
    if ((this.username && this.username === 'userabc') && (this.password && this.password === 'userabc123')) {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/products']);
    }
  }
}

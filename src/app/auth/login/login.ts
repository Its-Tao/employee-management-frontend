import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credentials: LoginRequest = {
    username: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({

      next: (token) => {
        this.isLoading = false;
        console.log('Login successful:', token);
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);

        this.errorMessage =
          error.status === 401
            ? 'Invalid username or password.'
            : 'Login failed. Check your backend connection.';
      }

    });
  }
}
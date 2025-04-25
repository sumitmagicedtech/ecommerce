import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  message: string = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:3000/home', this.loginForm.value).subscribe({
        next: (res) => {
          this.message = res.message;
          this.success = true;
          // Store token (optional)
          localStorage.setItem('token', res.token);
          // Redirect to home page after successful login
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.message = err.error?.error || 'Login failed';
          this.success = false;
        }
      });
    }
  }
}
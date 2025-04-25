import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<boolean> {
    // Mock login logic (replace with real API call)
    if (email && password) {
      this.isLoggedInSubject.next(true);
      return of(true);
    }
    return of(false);
  }

  signup(name: string, email: string, password: string): Observable<boolean> {
    // Mock signup logic (replace with real API call)
    if (name && email && password) {
      // Assume signup is successful, now log the user in automatically
      this.isLoggedInSubject.next(true); // Set the login status to true
      return of(true);
    }
    return of(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}

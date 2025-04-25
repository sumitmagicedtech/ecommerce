import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Brand } from '../types/brand';
                           

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = `${environment.apiUrl}`; // Use the API URL from the environment

  constructor(private http: HttpClient) {}

  // Get all brands
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl);
  }

  // Get a brand by ID
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${id}`);
  }

  // Add a new brand
  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.baseUrl, brand);
  }

  // Update an existing brand
  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}/${id}`, brand);
  }

  // Delete a brand
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
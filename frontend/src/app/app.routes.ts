import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandsFormComponent } from './components/manage/brands-form/brands-form.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/manage/product/product.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'admin/categories', component: CategoriesComponent }, // Categories management route
  { path: 'admin/categories/add', component: CategoryFormComponent }, // Category form route
  { path: 'admin/categories/:id', component: CategoryFormComponent }, // Category form route

  { path: 'admin/brands', component: BrandsComponent }, // Brands management route
  { path: 'admin/brands/add', component: BrandsFormComponent }, // Add brand route
  { path: 'admin/brands/:id', component: BrandsFormComponent }, // Edit brand route

  { path: 'admin/products', component: ProductComponent }, // Brands management route
  { path: 'admin/products/add', component: ProductFormComponent }, // Add brand route
  { path: 'admin/products/:id', component: ProductFormComponent }, // Edit brand route


  { path: 'register', component: RegisterComponent }, // Edit brand route
  { path: 'login', component: LoginComponent }, // Edit brand route


  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for 404
];
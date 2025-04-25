import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../types/product';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})


export class ProductFormComponent implements OnInit {
  // Product model
  product: Product = {
    _id: '',
    name: '',
    shortDescription: '',
    description: '',
    Price: 0,
    discount: 0,
    images: [],
    categoryId: '',
    isFeatured: false,
    isNew: false,
  };

  isEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.productService.getProductById(id).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.productService.updateProduct(Number(this.product._id), this.product).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/admin/products']);
      });
    }
  }
}

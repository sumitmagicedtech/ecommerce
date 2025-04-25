import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types/brand'; // Import Brand interface

@Component({
  selector: 'app-brands-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.css',
})
export class BrandsFormComponent implements OnInit {
  name: string = '';
  isEdit = false;

  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.isEdit = true;
      this.brandService.getBrandById(id).subscribe(
        (result: Brand) => {
          console.log(result);
          this.name = result.name; // Set the name property to the fetched brand name
        },
        (error) => {
          console.error('Error fetching brand:', error);
          alert('Failed to load brand details. Please try again.');
        }
      );
    } else {
      this.isEdit = false;
    }
  }

  add(): void {
    if (this.name.trim()) {
      const newBrand: Partial<Brand> = { name: this.name }; // Create a new brand object with a default _id
      // const newBrand: Brand = { _id: '0', name: this.name }; // Create a new category object with a default id

    
      this.brandService.addBrand(newBrand as Brand).subscribe(
        (response) => {
          console.log('Brand added successfully:', response);
          alert('Brand added successfully!');
          this.name = ''; // Reset the input field
          this.router.navigate(['/admin/brands']);
        },
        (error) => {
          console.error('Error adding brand:', error);
          alert('Failed to add brand. Please try again.');
        }
      );
    } else {
      alert('Brand name cannot be empty.');
    }
  }

  updated(): void {
    if (this.name) {
      const updatedBrand: Brand = { _id: this.route.snapshot.params['id'], name: this.name }; // Include _id for update
      this.brandService.updateBrand(this.route.snapshot.params['id'], updatedBrand).subscribe(
        (response) => {
          console.log('Brand updated successfully:', response);
          alert('Brand updated successfully!');
          this.name = ''; // Reset the input field
          this.router.navigate(['/admin/brands']);
        },
        (error) => {
          console.error('Error updating brand:', error);
          alert('Failed to update brand. Please try again.');
        }
      );
    } else {
      alert('Brand name cannot be empty.');
    }
  }
}
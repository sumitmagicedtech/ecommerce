import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule, 
    MatButtonModule,
    MatFormFieldModule,
      MatTableModule,
       MatSortModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  name: string = '';
  isEdit= false;

  constructor(
    private categoryService: CategoryService,
    private router: Router ,
    private route: ActivatedRoute
  ) {
  }

  // ngOnInit(): void {
  //   const id = this.route.snapshot.params['id'];
  //   console.log(id);
  //   this.isEdit = true  
  //   this.categoryService.getCategoryById(id).subscribe(
  //     (result : any) => {
  //       console.log(result);
  //       this.name = result.name; // Set the name property to the fetched category name
  //     } ) 
  // }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(id).subscribe((result: any) => {
        console.log(result);
        this.name = result.name;
      });
    } else {
      this.isEdit = false;
    }
  }
  
  


  add(): void {
    if (this.name.trim()) {
      const newCategory = { id: 0, name: this.name }; // Create a new category object with a default id
      this.categoryService.addCategory(newCategory).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          alert('Category added successfully!');
          this.name = ''; // Reset the input field
          this.router.navigate(['/admin/categories']);
        },
        (error) => {
          console.error('Error adding category:', error);
          alert('Failed to add category. Please try again.');
        }
      );
    } else {
      alert('Category name cannot be empty.');
    }
  }

  

updated(): void {
    if (this.name) {
      const updatedCategory = { id: 0, name: this.name }; // Create a new category object with a default id
      this.categoryService.updateCategory(this.route.snapshot.params['id'], updatedCategory).subscribe(
        (response) => {
          console.log('Category updated successfully:', response);
          alert('Category updated successfully!');
          this.name = ''; // Reset the input field
          this.router.navigate(['/admin/categories']);
        },
        (error) => {
          console.error('Error updating category:', error);
          alert('Failed to update category. Please try again.');
        }
      );
    } else {
      alert('Category name cannot be empty.');
    }
}


}

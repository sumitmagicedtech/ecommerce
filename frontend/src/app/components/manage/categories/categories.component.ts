import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService, Category } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [
    MatFormFieldModule,
     MatInputModule,
      MatTableModule,
       MatSortModule, 
       MatPaginatorModule,
        MatButtonModule,
        RouterLink

      ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService) {
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.dataSource.data = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      if (confirm('Are you sure you want to delete this category?')) {
        await this.categoryService.deleteCategory(id).toPromise();
        console.log(`Category with ID ${id} deleted successfully.`);
        alert('Category deleted successfully!');
        this.loadCategories(); // Reload the categories after deletion
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  }

 


}
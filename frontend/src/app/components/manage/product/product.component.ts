import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service'; // Import ProductService
import { Product } from '../../../types/product'; // Import Product interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'price', 'category', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
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

  private loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.dataSource.data = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      if (confirm('Are you sure you want to delete this product?')) {
        await this.productService.deleteProduct(id).toPromise();
        console.log(`Product with ID ${id} deleted successfully.`);
        alert('Product deleted successfully!');
        this.loadProducts(); // Reload the products after deletion
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  }
}
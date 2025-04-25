import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../services/brand.service'; // Import BrandService
import { Brand } from '../../../types/brand'; // Import Brand interface

@Component({
  selector: 'app-brands',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private brandService: BrandService) {
    this.dataSource = new MatTableDataSource<Brand>([]);
  }

  ngOnInit(): void {
    this.loadBrands();
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

  private loadBrands(): void {
    this.brandService.getBrands().subscribe(
      (brands) => {
        this.dataSource.data = brands;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  async deleteBrand(id: number): Promise<void> {
    try {
      if (confirm('Are you sure you want to delete this brand?')) {
        await this.brandService.deleteBrand(id).toPromise();
        console.log(`Brand with ID ${id} deleted successfully.`);
        alert('Brand deleted successfully!');
        this.loadBrands(); // Reload the brands after deletion
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Failed to delete brand. Please try again.');
    }
  }
}
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-header',
  imports: [

    CommonModule, RouterModule, MatIconModule, FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showDropdown = false;
  constructor( private categoryService : CategoryService) { }
  categories: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result;
    });
  }


    searchQuery = '';
  onSearch() {
    console.log('Search for:', this.searchQuery);
  }


}
  
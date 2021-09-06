
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/Category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();

  categories$;
  categories =[];
  filteredCategories = [];
  selectedValue;
  showList;
  categoriesField = 'categories';
  searchTerm;


  constructor(public categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
    this.categoryService.getCategories()
      .subscribe(data =>{
      this.categories = data[this.categoriesField];
    });
   }

  ngOnInit() {}

  search(event) {

    this.searchTerm = event.srcElement.value;
    if (!this.searchTerm.trim().length ) {
      this.filteredCategories = [];
      this.showList = false;
      return;
    }
    this.filteredCategories = this.categories.filter(item => item.toUpperCase().includes(this.searchTerm.toUpperCase()));
    this.showList = true;
    this.categorySelected.emit(this.searchTerm);
  }

  selectItem(value){
    this.selectedValue = value;
    this.categorySelected.emit(this.selectedValue);
    this.showList = false;
  }


}

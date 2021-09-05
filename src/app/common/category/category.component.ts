
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


  constructor(public categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
    this.categoryService.getCategories()
      .subscribe(data =>{
      this.categories = data[this.categoriesField];
    });
   }

  ngOnInit() {}

  search(event) {
    const searchTerm = event.srcElement.value;
    if (!searchTerm.trim().length ) {
      this.filteredCategories = [];
      this.showList = false;
      return;
    }
    this.filteredCategories = this.categories.filter(item => item.toUpperCase().includes(searchTerm.toUpperCase()));
    this.showList = true;

    if(this.filteredCategories.length === 0 ){
        this.categorySelected.emit(this.selectedValue);

    }
  }

  selectItem(value){
    this.selectedValue = value;
    this.categorySelected.emit(this.selectedValue);
    this.showList = false;
  }


}

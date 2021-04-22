import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { CatalogProductService } from '../../service/catalog-product.service';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.css']
})
export class ProductListViewComponent implements OnInit {
  productcats = [];

  sortOptions = [];
  sortOrder: number;
  sortField: string;

  products = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cp: CatalogProductService, private primengConfig : PrimeNGConfig) {
    this.productcats = this.cp.getProductCatalogs();

    this.products = this.productcats['products'];

    console.log('productcats -', this.products);
  }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      { label : 'Product Sort Descending By Name', value : 'name'},
      { label : 'Product Sort Ascending By Name', value : '!name'}
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    let value = event.value;

    console.log('event onSortChange', event.value, value.substring(1, value.length), value);

    switch(value){
      case 'price' : {
        this.sortOrder = 1;
        this.sortField = value;
        break;
      }
      case '!price' : {
        this.sortOrder = -1;
        this.sortField  = value;
        break;
      }
      case 'name' : {
        this.sortOrder = 1;
        this.sortField = 'name';
        console.log('this.sortField', this.sortField);
        break;
      }
      case '!name' : {
        this.sortOrder = -1;
        this.sortField  = 'name';
        break;
      }
    }

    // if (value.indexOf('!') === 0) {
    //   this.sortOrder = -1;
    //   this.sortField = value.substring(1, value.length);
    // }
    // else {
    //   this.sortOrder = 1;
    //   this.sortField = value;
    // }
  }

}

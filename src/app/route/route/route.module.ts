import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from '../../pages/home/home.component';
import {ProductComponent} from '../../pages/product/product.component';
import {ProductListViewComponent} from '../../components/product-list-view/product-list-view.component';

const routes : Routes =[
  {
    path : '',
    component: HomeComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'catalog-products',
    component: ProductListViewComponent
  },
  {
    path: '', redirectTo : '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteModule { }

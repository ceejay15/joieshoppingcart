import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {RouteModule} from './route/route/route.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CarouselModule} from 'primeng/carousel';

import {OrderService} from './service/order.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutFormComponent } from './components/checkout/checkout-form/checkout-form.component';
import { CheckoutViewComponent } from './components/checkout/checkout-view/checkout-view.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    CheckoutFormComponent,
    CheckoutViewComponent,
    CatalogComponent,
    ProductItemComponent,
    CartComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [OrderService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

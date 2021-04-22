import { NullTemplateVisitor } from '@angular/compiler';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import *  as  data from '../json/jsonItems.json';

@Injectable({
  providedIn: 'root'
})
export class CatalogProductService {
  private _featured: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public featured: Observable<any> = this._featured.asObservable();

  private _catalogs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public catalogs: Observable<any> = this._catalogs.asObservable();

  prodcats = [];

  constructor() {
    console.log("data ==>", data['featured']);
    console.log("catalogs", data['catalogs']);

    this.setFeaturedProducts(data['featured']);
    this.setCatalogs(data['catalogs']);
  }

  setFeaturedProducts(featured) {
    this._featured.next(featured);
  }


  setCatalogs(catalogs) {
    this._catalogs.next(catalogs);
  }

  setProductCatalogs(prodcats) {
    this.prodcats = prodcats;
  }

  getProductCatalogs() {
    return this.prodcats;
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }

}

import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {OrderService} from './service/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  title = 'Joie Handmade Craft and Accessories';
  catalogName = '';
  description = '';
  year = new Date();

  constructor(private order: OrderService){

  }

  ngOnChanges(changes : SimpleChanges){

  }



}

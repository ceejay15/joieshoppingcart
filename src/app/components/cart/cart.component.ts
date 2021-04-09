import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  quantity = 0;

  constructor(private order : OrderService) {
    this.order.quantity.subscribe(q=>{
      console.log("qqq",q);
      this.quantity = q;
    });

   }

}

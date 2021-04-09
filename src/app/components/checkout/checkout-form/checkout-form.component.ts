import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../../service/order.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnChanges {

  @Input() checkoutItem : any;
  shippingFee = 20;
  showOrder = true;
  @Input() quantity = 0;
  orders :any;
  overallQuantity;
  totalPrice = 0;
  proceed : boolean = true;

  constructor(private order : OrderService, private router : Router) { }


  ngOnChanges(changes: SimpleChanges) {

    this.orders =  this.order.getOrders();

    // this.overallQuantity = this.order.quantity; //this.order.getQuantity();
    this.order.quantity.subscribe(q=>{
      this.overallQuantity = q;
    });

    this.totalPrice = this.order.getTotalPrice();

    this.proceed = this.order.enableChkOut();

  }

  saveOrder(){
    this.showOrder = false;
  }

  removeItem(quantity, price, i){

     this.order.removeFromOrder(i, quantity, price);

    // this.overallQuantity = this.order.getQuantity();

     this.totalPrice = this.order.getTotalPrice();

     this.orders = this.order.getOrders();

    //  if(this.orders?.length == 0){
    //    this.proceed = false;
    //  }

    this.proceed = this.order.enableChkOut();

    this.order.setQuantity(this.overallQuantity - quantity);

  }

  continueShopping(){
    this.router.navigateByUrl('');
  }

  decrease(index, quantity,price){

    this.order.decreaseItemQuantity(index,price);

    this.orders = this.order.getOrders();

    this.totalPrice = this.order.getTotalPrice();

    this.proceed = this.order.enableChkOut();

    //this.order.setQuantity(quantity-1);
    this.order.setQuantity(this.overallQuantity - 1);

  }

  increaseItem(index, quantity, price){

     this.order.increaseItemQuantity(index, price);

     this.orders = this.order.getOrders();

    this.totalPrice = this.order.getTotalPrice();

    this.order.setQuantity(quantity+1);

  }


}

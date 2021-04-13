import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';


import {OrderService} from '../../../service/order.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100%',
        opacity: 1,
        backgroundColor: 'rgb(160, 82, 45, 0.10)',
        display : 'block'
      })),
      state('closed', style({
        height: '0',
        opacity: 0.0,
        backgroundColor: 'rgb(160, 82, 45, 0.10)'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition ('* => open', [
        animate ('1s',
          style ({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
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

  isOpen = false;

  cities = [
    'Caloocan',
    'Malabon',
    'Navotas',
    'Valenzuela',
    'Quezon City',
    'Marikina',
    'Pasig',
    'Taguig',
    'Makati',
    'Manila',
    'Mandaluyong',
    'San Juan',
    'Pasay',
    'Parañaque',
    'Las Piñas',
    'Muntinlupa'
  ];

  constructor(private order : OrderService, private router : Router) {
    this.order.isOpen.subscribe(o=>{
      this.isOpen = o;
      console.log("is Open Toggle?", this.isOpen);
    })

    this.order.quantity.subscribe(q=>{
      this.overallQuantity = q;

      this.orders =  this.order.getOrders();

      this.proceed = this.order.enableChkOut();
    });


    this.order.totalItemPrice.subscribe(total=>{

      this.totalPrice = total;

      console.log("total", this.totalPrice);
    })





  }//end of constrctor


  ngOnChanges(changes: SimpleChanges) {
  }

  saveOrder(){
    this.showOrder = false;
  }

  removeItem(quantity, price, i){

     this.order.removeFromOrder(i, quantity, price, this.totalPrice);

    // this.overallQuantity = this.order.getQuantity();

     //this.totalPrice = this.order.getTotalPrice();
     this.orders = this.order.getOrders();
    /*****KAREN*****/

    //  if(this.orders?.length == 0){
    //    this.proceed = false;
    //  }

    this.proceed = this.order.enableChkOut();

    if(this.overallQuantity > 0){
      this.order.setQuantity(this.overallQuantity - quantity);
    }


  }

  continueShopping(){
    this.order.setIsOpen(false);
    this.router.navigateByUrl('');
  }

  decrease(index, quantity,price){

    this.order.decreaseItemQuantity(index,price, this.totalPrice);

    this.orders = this.order.getOrders();
    //this.totalPrice = this.order.getTotalPrice();
    /***KAREN***/

    this.proceed = this.order.enableChkOut();

    //this.order.setQuantity(quantity-1);
    if(this.overallQuantity > 0){
      this.order.setQuantity(this.overallQuantity - 1);
    }


  }

  increaseItem(index, quantity, price){

     this.order.increaseItemQuantity(index, price, this.totalPrice);

    this.orders = this.order.getOrders();
    //this.totalPrice = this.order.getTotalPrice();
    /*****KAREN****/

    this.order.setQuantity(quantity+1);

  }

  onAnimationEvent( event: AnimationEvent ) {

    // // openClose is trigger name in this example
    // console.warn(`Animation Trigger: ${event.triggerName}`);

    // // phaseName is start or done
    // console.warn(`Phase: ${event.phaseName}`);

    // // in our example, totalTime is 1000 or 1 second
    // console.warn(`Total time: ${event.totalTime}`);

    // // in our example, fromState is either open or closed
    // console.warn(`From: ${event.fromState}`);

    // // in our example, toState either open or closed
    // console.warn(`To: ${event.toState}`);

    // // the HTML element itself, the button in this case
    // console.warn(`Element: ${event.element}`);
  }

  closeCheckout(){
    this.order.setIsOpen(false);
  }


}

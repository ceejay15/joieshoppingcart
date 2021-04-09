import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService} from '../../service/order.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  isOne = true;
  quantity = 0;
  showCheckout = false;
  item : any;
  overAllQuantity;

  @Output ('update')  change :EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private order : OrderService) {
    this.order.quantity.subscribe(q=>{
      this.overAllQuantity = q;
    })
  }

  ngOnInit():void {
    this.product = this.order.getFromStorage();
    //this.product = history.state;
  }

  decrease(){
    this.quantity = this.quantity -1;

    if(this.quantity == 0){
      this.isOne = true;
    }
  }

  increase(){
    this.quantity = this.quantity + 1;

    if(this.quantity >=1){
      this.isOne = false;
    }
  }

  checkout(quantity){
    this.showCheckout = true;
    //this.quantity = quantity;

    // this.item = {
    //   quantity : this.quantity,
    //   id: this.product.id,
    //   name: this.product.name,
    //   description: this.product.description,
    //   price : this.product.price
    // }

   this.item  = {
     quantity : quantity,
     id: this.product.id,
     name: this.product.name,
     description: this.product.description,
     price : this.product.price
   }

   console.log("QQQ", this.overAllQuantity + quantity);

    this.order.setOrders(this.item);

   // this.order.setQuantity(quantity);

   this.order.setQuantity(this.overAllQuantity + quantity)

    this.order.setTotalItemPrice(this.product.price, quantity);

    this.showCheckout = true;

    this.order.enableChkOut();

    // this.change.emit(this.quantity);
   }

}

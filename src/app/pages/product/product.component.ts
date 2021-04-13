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
  isOpen = false;

  totalItemPrice = 0;

  inStock = true;
  stock = 0;

  @Output ('update')  change :EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private order : OrderService) {
    this.order.quantity.subscribe(q=>{
      this.overAllQuantity = q;
    })

    this.order.isOpen.subscribe(o=>{
      this.isOpen = o;

      console.log("open ba si Program?");
    })

    this.order.totalItemPrice.subscribe(total=>{
      this.totalItemPrice = total;
      console.log("this.totalItemPrice ", this.totalItemPrice);
    })

    this.order.inStock.subscribe(inStock=>{
      this.inStock = inStock;

      console.log('in stock',this.inStock);
    })

    // this.order.stock.subscribe(stock=>{
    //   this.stock = stock;
    //   console.log("no of stocks ", this.stock);
    // })

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

    console.log("orders", this.order.getFromStorage());

    //console.log("Order ni Karen ",this.product.stock);
  }

  checkout(quantity){
    this.showCheckout = true;

    this.item  = {
     quantity : quantity,
     id: this.product.id,
     name: this.product.name,
     description: this.product.description,
     price : this.product.price,
     stockId : this.product.stockId,
     stock: this.product.stock
   }

   console.log("QQQ", this.overAllQuantity + quantity);

    this.order.setOrders(this.item);

   // this.order.setQuantity(quantity);

   this.order.setQuantity(this.overAllQuantity + quantity)

   this.totalItemPrice += this.product.price * quantity;

    this.order.setTotalItemPrice(this.totalItemPrice);

    this.showCheckout = true;

    this.order.enableChkOut();

    this.order.setIsOpen(true);

    this.order.setInStock(this.inStock);
   }

}

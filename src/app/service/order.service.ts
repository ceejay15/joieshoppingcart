import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  orders = [];
  //quantity = 0;
  totalItemPrice = 0;

  private _quantity: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public quantity: Observable<number> = this._quantity.asObservable();


  enableChk : boolean = true;

  constructor() {

   }


  setToStorage(prod){
    localStorage.clear();

    localStorage.setItem('id', prod.id);
    localStorage.setItem('name', prod.name);
    localStorage.setItem('description', prod.description);
    localStorage.setItem('price', prod.price);
  }

  getFromStorage(){
    let id = localStorage.getItem('id');
    let name = localStorage.getItem('name');
    let  description = localStorage.getItem('description');
    let price = localStorage.getItem('price');

    return { id: id, name: name, description : description, price : price}
  }

  setOrders(order){
      let tmp = this.orders;

      console.log("ord", this.orders);

      if(tmp == null){
        this.orders.push(order);
        //localStorage.setItem('orders', JSON.stringify(this.orders));

      }else{

        let index   = this.orders.findIndex((obj => obj.id == order.id));

        if((index == -1)){
           this.orders.push(order);

        }else{
            this.orders[index].quantity +=order.quantity;
            console.log("modified order",this.orders);
        }

      }

  }

  getOrders(){
      // return  JSON.parse(localStorage.getItem('orders'));
      return this.orders;
  }

  setQuantity(quantity){
   //this.quantity += quantity;
   this._quantity.next(quantity);
  }



  getQuantity(){
    return this.quantity;
  }



  setTotalItemPrice(price, quantity){
    this.totalItemPrice += price * quantity;
  }

  getTotalPrice(){
    return this.totalItemPrice;
  }

  removeFromOrder(index,quantity, price){
      this.orders.splice(index,1);

      // //this.quantity = this.quantity - quantity;
       let t = this.totalItemPrice - (price  * quantity);

       this.totalItemPrice = t;
      console.log("remove totalPrice", this.totalItemPrice);

  }

  decreaseItemQuantity(index, price){

    if(this.orders[index]['quantity'] > 1){

      this.orders[index]['quantity'] -= 1;

      //console.log('good as',this.orders[index]['quantity']);

      //console.log(this.orders[index]['quantity'] * parseInt(price), this.totalItemPrice);

      let priceQuantity = this.orders[index]['quantity'] *parseInt(price);

      //console.log("priceQuantity", priceQuantity, this.totalItemPrice - priceQuantity);

      let tp = this.totalItemPrice - priceQuantity;

      this.totalItemPrice = tp;

      //console.log("tppp ",this.totalItemPrice);


    }else{
      console.log("isflays");

      let t = this.totalItemPrice - (parseInt(price) * this.orders[index]['quantity']);

      this.orders.splice(index,1);

      this.totalItemPrice = t;

    }
  }

  increaseItemQuantity(index, price){

    this.orders[index]['quantity'] += 1;

    if(this.orders.length > 1){
      this.totalItemPrice = this.totalItemPrice + parseInt(price);

      console.log("final", this.totalItemPrice);
    }else{
       let t = (parseInt(price) * this.orders[index]['quantity']);

      console.log(" to", t);

      this.totalItemPrice = (t - this.totalItemPrice) * this.orders[index]['quantity'];

      console.log("final",this.totalItemPrice);
    }
  }

  enableChkOut(){
    if(this.orders?.length >0){
      this.enableChk = true;
    }else{
      this.enableChk = false;
    }
    //console.log(this.enableChk);

    return this.enableChk;
  }

}

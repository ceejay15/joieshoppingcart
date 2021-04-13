import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders = [];
  //quantity = 0;
  //totalItemPrice = 0;

  private _quantity: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public quantity: Observable<number> = this._quantity.asObservable();

  private _isOpen : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public isOpen :Observable<boolean> = this._isOpen.asObservable();

  private _totalItemPrice : BehaviorSubject<any> = new BehaviorSubject<number>(0);
  public  totalItemPrice : Observable<any> = this._totalItemPrice.asObservable();

  private _inStock : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public inStock : Observable<boolean> = this._inStock.asObservable();

  private _stock : BehaviorSubject <number> = new BehaviorSubject<number>(null);
  public stock : Observable<number> = this._stock.asObservable();

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

  setIsOpen(isOpen){
    this._isOpen.next(isOpen);
  }


  getQuantity(){
    return this.quantity;
  }

  setInStock(inStock){
    this._inStock.next(inStock);
  }

  setStock(stock){
    this._stock.next(stock);
  }



  setTotalItemPrice(total){
    //this._totalItemPrice.value += price * quantity;
    //console.log("__________", this.totalItemPrice);

    //this._totalItemPrice.next(totalPrice);

    console.log("____", total);

    this._totalItemPrice.next(total);

  }

  getTotalPrice(){
    return this.totalItemPrice;
  }

  removeFromOrder(index,quantity, price, totalPrice){
      this.orders.splice(index,1);

      let t =  totalPrice - (price * quantity);

      console.log("total Price", t);

      this.setTotalItemPrice(t);

  }

  decreaseItemQuantity(index, price, totalPrice){

    if(this.orders[index]['quantity'] > 1){

      this.orders[index]['quantity'] -= 1;

     let priceQuantity = totalPrice - parseInt(price);

      console.log("priceQuantity", priceQuantity, totalPrice);

     this.setTotalItemPrice(priceQuantity);

    }else{
      console.log("isflays");

      this.setTotalItemPrice(totalPrice - parseInt(price));

      console.log(totalPrice - parseInt(price));

      this.orders.splice(index,1);

    }
  }

  increaseItemQuantity(index, price, totalPrice){

    this.orders[index]['quantity'] += 1;

    if(this.orders.length > 1){
      // this.totalItemPrice = this.totalItemPrice + parseInt(price);
      // console.log("final", this.totalItemPrice);
      totalPrice = totalPrice + parseInt(price);

      this.setTotalItemPrice(totalPrice);
    }else{
        let t = (parseInt(price) * this.orders[index]['quantity']);
      // console.log(" to", t);
      // this.totalItemPrice = (t - this.totalItemPrice) * this.orders[index]['quantity'];
      // console.log("final",this.totalItemPrice);

      this.setTotalItemPrice((t - totalPrice) * (this.orders[index]['quantity']));
    }
  }

  enableChkOut(){
    if(this.orders?.length >0){
      this.enableChk = true;
    }else{
      this.enableChk = false;
    }

    return this.enableChk;
  }

}

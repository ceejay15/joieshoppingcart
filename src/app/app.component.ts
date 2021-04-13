import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {Router} from '@angular/router';
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
  isOpen = false;

  constructor(private order: OrderService, private router: Router){
      this.order.isOpen.subscribe(o=>{
        this.isOpen = o;
       // console.log("is open?", o);
      })
  }

  ngOnChanges(changes : SimpleChanges){

  }

  home(){
     this.order.setIsOpen(false);
     this.router.navigateByUrl('');
  }

  cart(){
    this.order.setIsOpen(true);
    console.log("hello get checkout");
  }



}

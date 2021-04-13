import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  constructor(private router : Router, private order: OrderService) { }

  @Input() productName = '';
  @Input() id = 0;
  @Input() price = 0;
  @Input() prodDesc = '';
  @Input() stockId = 0;
  @Input() stock = 0;

  isOpen = false;

  ngOnInit(): void {
      this.order.isOpen.subscribe(o =>{
        this.isOpen = o;
      })
  }

  routeTo(obj){
    let product = {
      id: obj.id,
      name: obj.name,
      description: obj.desc,
      price: obj.price,
      stockId: obj.stockId,
      stock : obj.stock
    }

    this.order.setToStorage(product);
    this.order.setIsOpen(this.isOpen);

    if(obj.stock == 0){
      this.order.setInStock(false);
    }
    this.router.navigateByUrl('product', { state: product });
  }



}

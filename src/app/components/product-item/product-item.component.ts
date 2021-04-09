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

  ngOnInit(): void {

  }

  routeTo(obj){
    let product = {
      id: obj.id,
      name: obj.name,
      description: obj.desc,
      price: obj.price
    }

    this.order.setToStorage(product);
    this.router.navigateByUrl('product', { state: product });
  }



}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  catalogName = '';
  description = '';

  productName = '';
  price  = 0;
  prodDesc = '';

  quantity = this.order.quantity;


  products = [
    {
      id : '606bb5d65867a624f034ceab',
      productName: 'Colorful Beads',
      price: '1070',
      prodDesc : 'For formal, fancy and wearable to occasion.'
    },
    {
      id : '606bb5975867a624f034cea9',
      productName: 'Charcoal Charm',
      price: '650',
      prodDesc : 'For semi-formal, solemn and casual'
    },
    {
      id : '606bb5bf5867a624f034ceaa',
      productName: 'Blue Bead Glass',
      price: '920',
      prodDesc : 'For formal, casual and beach idea'
    }
  ];

  catalog = [
    {
      catalogName : 'Necklace',
      description : 'Our necklaces are made of glass and wooden beads, designed for simple and elegance suit for any occasion'
    },
    {
      catalogName : 'Bracelet',
      description : 'Our bracelet are sized for any ages, designed for ageless style from vintage to modern trends'
    },
    {
      catalogName : 'Earrings',
      description : 'from danglers to simple wearable earrings, we designed them for any occasion and adorning woman to emphasize natural and regal beauty.'
    }
  ];

  constructor(private order: OrderService) {
    console.log("HOME", this.quantity);
   }

   countChange(event){
     console.log("EVT",event)
   }




}

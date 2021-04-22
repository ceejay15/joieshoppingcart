import { Component, OnInit, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
// import { trigger, state, style, animate, transition,query, stagger } from '@angular/animations';
// import { slideInAnimation } from '../../animations/animations';
import {OrderService} from '../../service/order.service';
import {CatalogProductService} from '../../service/catalog-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [
  //   trigger('myInsertRemoveTrigger', [
  //     transition('* => *', [ // each time the binding value changes
  //       query(':leave', [
  //         stagger(100, [
  //           animate('0.5s', style({ opacity: 0 }))
  //         ])
  //       ]),
  //       query(':enter', [
  //         style({ opacity: 0 }),
  //         stagger(100, [
  //           animate('0.5s', style({ opacity: 1 }))
  //         ])
  //       ])
  //     ])
  // //   ])
  // ]
})
export class HomeComponent{

  isOpen = false;

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
      prodDesc : 'For formal, fancy and wearable to occasion.',
      stockId : '1121212121212AA',
      stock: 100
    },
    {
      id : '606bb5975867a624f034cea9',
      productName: 'Charcoal Charm',
      price: '650',
      prodDesc : 'For semi-formal, solemn and casual',
      stockId : '112121212121BB',
      stock: 100
    },
    {
      id : '606bb5bf5867a624f034ceaa',
      productName: 'Blue Bead Glass',
      price: '920',
      prodDesc : 'For formal, casual and beach idea',
      stockId : '1121212121212CC',
      stock: 100
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

  carouselArr = {};
  constructor(private order: OrderService, private cp : CatalogProductService) {
    console.log("HOME", this.quantity);

    console.log("-------------", this.cp.featured);

    this.cp.featured.subscribe(featured=>{
      this.carouselArr['products'] = featured;
    })

    this.cp.catalogs.subscribe(catalogs=>{
      this.carouselArr['catalogs'] = catalogs;
      console.log("catalogs???", catalogs);
    })
   }


   countChange(event){
     console.log("EVT",event)
   }

   toggle() {
    this.isOpen = !this.isOpen;
   }

}

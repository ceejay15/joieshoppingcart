import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  // carouselArr = [
  //   {
  //     name: 'Moon Bracelet',
  //     price: 1000.00,
  //     stocks: 100.00,
  //     sku: '10101AAA',
  //     image:  'sparkle-685509_1920.jpg',
  //     inventoryStatus : 'In-stock'
  //   },
  //   {
  //     name: 'Sunflower Bracelet',
  //     price: 300.00,
  //     stocks: 100.00,
  //     sku: '10101BBB',
  //     image:  'glass-665380_1920.jpg',
  //     inventoryStatus: 'In-stock'
  //   },
  //   {
  //     name: 'Star Bracelet',
  //     price: 500.00,
  //     stocks: 100.00,
  //     sku: '10101CCC',
  //     image:  'facet-1490208_1920.jpg',
  //     inventoryStatus: 'Lower in stock'
  //   },
  //   {
  //     name: 'Flowers Bracelet',
  //     price: 1080.00,
  //     stocks: 100.00,
  //     sku: '10101DDD',
  //     image:  'chain-4139525_1920.jpg',
  //     inventoryStatus :'Enough Stock'
  //   },
  //   {
  //     name: 'Moon-Sun Bracelet',
  //     price: 4000.00,
  //     stocks: 100.00,
  //     sku: '10101AAA',
  //     image:  'beads-3274566_1920.jpg',
  //     inventoryStatus: 'Lower in stock'
  //   },
  //   {
  //     name: 'Jewel Bracelet',
  //     price: 5000.00,
  //     stocks: 100.00,
  //     sku: '10101YYY',
  //     image:  'beads-702250_1920.jpg',
  //     inventoryStatus: 'In-stock'
  //   }

  // ];

  @Input() carouselArr  = [];
  @Input() sliderTitle = "";
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

  constructor() {
   }

  ngOnInit(): void {
  }

}

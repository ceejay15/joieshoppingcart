import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogProductService } from 'src/app/service/catalog-product.service';
import { OrderService } from 'src/app/service/order.service';
// import { CatalogProductService } from '../../service/catalog-product.service';
// import { OrderService } from '../../service/order.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() carouselArr = [];
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

  isOpen = false;

  constructor(private router: Router, private cp: CatalogProductService, private order: OrderService) {
  }

  ngOnInit(): void {
  }

  showProductCatalog(id, obj, type) {

    if (type === 'Our Catalogs') {
      this.cp.setProductCatalogs(obj);
      this.router.navigateByUrl('catalog-products');
    } else {
      const product = {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        stockId: obj.sku,
        stock: obj.stocks
      };

      this.order.setToStorage(product);
      this.order.setIsOpen(this.isOpen);

      if (obj.stocks === 0) {
        this.order.setInStock(false);
      }
      this.router.navigateByUrl('product');
    }

  }

}




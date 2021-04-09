import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor() { }

  @Input() catalogName = '';
   @Input() description = '';

  ngOnInit(): void {
  }

}

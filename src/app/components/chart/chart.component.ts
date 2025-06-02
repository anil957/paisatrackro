import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { item } from 'src/app/model/items';

declare function chart(items,totalUniqueItems,totalUniqueItemsPrice): void;
declare function chart3():void;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit {

  items: item[] = [];
  filteredItems: item[] = [];
  categories: string[] = [];
  totalUniqueItems: any = ['groceery','travel','healthcare','entertainment','others'];
  totalUniqueItemsPrice: any = [0,0,0,0,0]
  totalinvest;
  private _storage: Storage | null = null;

  constructor(private readonly storage: Storage,
  ) {

  }
  ngOnInit(): void {
    this.initStorage();
    this.loadItems();
    

  }


  chartgen() {
   // chart(this.items);
   chart(this.items,this.totalUniqueItems,this.totalUniqueItemsPrice);
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async loadItems() {
    const stored = await this._storage?.get('investments');
    if (stored) {
      this.items = stored;
      this.filteredItems = [...this.items];
      this.totalinvest = this.items.reduce((acc, cur) => acc + +cur.price, 0);
      console.log(this.items);
      console.log(this.totalinvest)
      this.extractCategories();
      this.showDataChart(this.items)
      
    }
  }

  extractCategories() {
    this.categories = Array.from(new Set(this.items.map(i => i.category)));
  }

  showDataChart(items) {

    for (const element of items) {
      if ((element.category).toLowerCase() === 'groceery') {
        //this.totalUniqueItems[0] = element.category;
        this.totalUniqueItemsPrice[0] +=element.price
      }

      else if ((element.category).toLowerCase() === 'travel') {
       // this.totalUniqueItems[1] = element.category;
        this.totalUniqueItemsPrice[1] +=element.price
      }
      else if ((element.category).toLowerCase() === 'healthcare') {
       // this.totalUniqueItems[2] = element.category;
        this.totalUniqueItemsPrice[2] +=element.price
      }
      else if ((element.category).toLowerCase() === 'entertainment') {
       // this.totalUniqueItems[3] = element.category;
        this.totalUniqueItemsPrice[3] +=element.price
      }
      else   {
        //this.totalUniqueItems[4] = element.category;
        this.totalUniqueItemsPrice[4] +=element.price
      }

    }
    console.log(this.totalUniqueItems)
    console.log(this.totalUniqueItemsPrice)
    
  }

  testChart(){
    chart3()
  }
}

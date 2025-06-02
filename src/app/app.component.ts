import { Component, OnInit } from '@angular/core';
import { ItemsService } from './service/items.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { item } from './model/items';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filter = false;
  title = 'paisatracko';
  items: item[] = [];
  filteredItems: item[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];
  submitted = false;
  totalinvest: number = 0;

  form: FormGroup = new FormGroup({
    item: new FormControl(''),
    date: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl('')
  });

  private _storage: Storage | null = null;

  // For editing
  editIndex: number | null = null;

  // Date range filter
  fromDate: string = '';
  toDate: string = '';

  constructor(
  //  private itemService: ItemsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly storage: Storage,
    private readonly storageService:StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });

    await this.initStorage();
    await this.loadItems();
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async addItem() {
    this.submitted = true;
    if (this.form.invalid) return;

    const newItem = this.form.value;

    if (this.editIndex !== null) {
      // Update existing item
      const oldPrice = +this.items[this.editIndex].price;
      this.items[this.editIndex] = newItem;
      // Adjust total invested by removing old price and adding new price
      this.totalinvest = this.totalinvest - oldPrice + +newItem.price;
      this.editIndex = null;
    } else {
      // Add new item
      
      this.items.push(newItem);
     // this.storageService.setItem("items",this.items);

      this.totalinvest += +newItem.price;
    }

    await this._storage?.set('investments', this.items);
    this.filteredItems = [...this.items];
    this.form.reset();
    this.submitted = false;
    this.extractCategories();

    this.router.navigateByUrl('/');
  }

  editItem(index: number) {
    this.form.patchValue(this.items[index]);
    this.editIndex = index;
    this.filter = false; // close filter sidebar if open
    // Optionally open the modal programmatically here if you want
  }

  async deleteItem(index: number) {
    const deletedPrice = +this.items[index].price;
    this.items.splice(index, 1);
    this.totalinvest -= deletedPrice;

    await this._storage?.set('investments', this.items);
    this.filteredItems = [...this.items];
    this.extractCategories();
  }

  async loadItems() {
    const stored = await this._storage?.get('investments');
    if (stored) {
      this.items = stored;
      this.filteredItems = [...this.items];
      this.totalinvest = this.items.reduce((acc, cur) => acc + +cur.price, 0);
      this.extractCategories();
    }
  }

  extractCategories() {
    this.categories = Array.from(new Set(this.items.map(i => i.category)));
  }

  toggleFilter() {
    this.filter = !this.filter;
  }

  onCategoryChange(event: any, category: string) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilter();
  }

  applyFilter() {
    let temp = [...this.items];

    if (this.selectedCategories.length > 0) {
      temp = temp.filter(i => this.selectedCategories.includes(i.category));
    }

    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      temp = temp.filter(i => {
        const itemDate = new Date(i.date);
        return itemDate >= from && itemDate <= to;
      });
    }

    this.filteredItems = temp;
  }

  async onReset() {
    this.form.reset();
    this.submitted = false;
    this.items = [];
    this.filteredItems = [];
    this.totalinvest = 0;
    this.selectedCategories = [];
    this.fromDate = '';
    this.toDate = '';
    await this._storage?.remove('investments');
  }
  chart(){
    
  }
}

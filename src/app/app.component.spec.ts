import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Storage } from '@ionic/storage-angular';

class StorageMock {
  private readonly store = new Map<string, any>();
  async create() { return this; }
  async get(key: string) { return this.store.get(key); }
  async set(key: string, value: any) { this.store.set(key, value); return value; }
  async remove(key: string) { this.store.delete(key); }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const sampleItems = [
    { item: 'Investment A', date: '2025-05-01', price: '100', category: 'Stocks' },
    { item: 'Investment B', date: '2025-05-05', price: '200', category: 'Mutual Funds' },
    { item: 'Investment C', date: '2025-05-10', price: '150', category: 'Stocks' }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [
        { provide: Storage, useClass: StorageMock }
      ]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Initialize storage and load sample data before each test
    component.ngOnInit();
    tick(); // for async storage init

    // Mock stored items
    component['_storage']?.set('investments', sampleItems);
    component.loadItems();
    tick();
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'paisatracko'`, () => {
    expect(component.title).toEqual('paisatracko');
  });

  it('should load sample items and calculate totalinvest', () => {
    expect(component.items.length).toBe(3);
    expect(component.totalinvest).toBe(450);
    expect(component.filteredItems.length).toBe(3);
    expect(component.categories).toEqual(['Stocks', 'Mutual Funds']);
  });

  it('should add a new item', fakeAsync(() => {
    component.form.setValue({
      item: 'Investment D',
      date: '2025-05-15',
      price: '250',
      category: 'Bonds'
    });
    component.addItem();
    tick();

    expect(component.items.length).toBe(4);
    expect(component.totalinvest).toBe(700); // 450 + 250
    expect(component.filteredItems.length).toBe(4);
    expect(component.categories).toContain('Bonds');
    expect(component.submitted).toBeFalse();
  }));

  it('should filter by category', () => {
    component.selectedCategories = ['Stocks'];
    component.applyFilter();

    expect(component.filteredItems.length).toBe(2);
    expect(component.filteredItems.every(i => i.category === 'Stocks')).toBeTrue();
  });

  it('should reset the form and clear all items', fakeAsync(() => {
    component.onReset();
    tick();

    expect(component.items.length).toBe(0);
    expect(component.filteredItems.length).toBe(0);
    expect(component.totalinvest).toBe(0);
    expect(component.selectedCategories.length).toBe(0);
    expect(component.form.value.item).toBeNull();
  }));

});

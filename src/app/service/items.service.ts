import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // items = [
  //   { item: 'Bus Ticket', date: new Date('2025-05-15'), price: 30, category: 'travel' },
  //   { item: 'Lunch', date: new Date('2025-05-15'), price: 120, category: 'food' },
  //   { item: 'Electricity Bill', date: new Date('2025-05-10'), price: 750, category: 'utilities' },
  //   { item: 'Movie', date: new Date('2025-05-12'), price: 200, category: 'entertainment' },
  //   { item: 'Petrol', date: new Date('2025-05-13'), price: 500, category: 'travel' },
  //   { item: 'Groceries', date: new Date('2025-05-11'), price: 850, category: 'food' }
  // ];

  
  items:any=[];
  constructor() { }

  totalItems(items){
    this.items.push(items);
  }

  getItem(): any {
  return this.items;
  }

}

/*
cd android
./gradlew assembleDebug
After the build completes, the APK will be found here:

swift
Copy
Edit
android/app/build/outputs/apk/debug/app-debug.apk
6. Install APK on your Android device
Connect your phone via USB and run:

bash
Copy
Edit
adb install app/build/outputs/apk/debug/app-debug.apk
*/
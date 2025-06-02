import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Save data to internal storage
  async setItem(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  // Retrieve data from internal storage
  async getItem<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  // Remove a single item
  async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  // Clear all storage
  async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}

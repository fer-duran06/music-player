import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IStoragePort } from '../../../core/ports/outbound/storage.port';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAdapter implements IStoragePort {
  private storageSubjects = new Map<string, BehaviorSubject<any>>();

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      
      // Notificar cambios a los observadores
      if (this.storageSubjects.has(key)) {
        this.storageSubjects.get(key)?.next(value);
      }
    } catch (error) {
      console.error(`Error guardando en localStorage: ${key}`, error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error leyendo de localStorage: ${key}`, error);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    
    if (this.storageSubjects.has(key)) {
      this.storageSubjects.get(key)?.next(null);
    }
  }

  clear(): void {
    localStorage.clear();
    
    // Notificar a todos los observadores
    this.storageSubjects.forEach(subject => subject.next(null));
  }

  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  watch<T>(key: string): Observable<T | null> {
    if (!this.storageSubjects.has(key)) {
      const initialValue = this.get<T>(key);
      this.storageSubjects.set(key, new BehaviorSubject<T | null>(initialValue));
    }
    
    return this.storageSubjects.get(key)!.asObservable();
  }
}
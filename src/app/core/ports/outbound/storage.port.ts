import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IStoragePort {
  // Operaciones básicas
  set<T>(key: string, value: T): void;
  get<T>(key: string): T | null;
  remove(key: string): void;
  clear(): void;
  
  // Verificación
  hasKey(key: string): boolean;
  
  // Observables para cambios
  watch<T>(key: string): Observable<T | null>;
}

// Token de inyección - DEBE SER UNA CONSTANTE DIFERENTE
export const STORAGE_TOKEN = new InjectionToken<IStoragePort>(
  'IStoragePort'
);
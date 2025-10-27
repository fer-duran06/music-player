import { Injectable, Inject } from '@angular/core';
import { IStoragePort, STORAGE_TOKEN } from '../../ports/outbound/storage.port';

@Injectable({
  providedIn: 'root'
})
export class PauseTrackUseCase {
  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort
  ) {}

  execute(): void {
    const currentTime = this.storage.get<number>('current-time') || 0;
    
    this.storage.set('is-playing', false);
    this.storage.set('current-time', currentTime);

    console.log('Reproducción pausada');
  }
}
import { Injectable, Inject } from '@angular/core';
import { Track } from '../../domain/entities/track.entity';
import { IStoragePort, STORAGE_TOKEN } from '../../ports/outbound/storage.port';
import { PlayTrackUseCase } from './play-track.use-case';

@Injectable({
  providedIn: 'root'
})
export class PreviousTrackUseCase {
  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort,
    private playTrackUseCase: PlayTrackUseCase
  ) {}

  execute(): void {
    const queue = this.storage.get<Track[]>('queue') || [];
    const currentTrack = this.storage.get<Track>('current-track');
    const currentTime = this.storage.get<number>('current-time') || 0;

    if (!currentTrack || queue.length === 0) {
      console.log('No hay canciones en la cola');
      return;
    }

    // Si la canción lleva más de 3 segundos, reiniciarla
    if (currentTime > 3) {
      this.storage.set('current-time', 0);
      this.playTrackUseCase.execute(currentTrack);
      return;
    }

    // Encontrar el índice actual
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    
    if (currentIndex > 0) {
      const previousTrack = queue[currentIndex - 1];
      this.playTrackUseCase.execute(previousTrack);
    } else {
      // Si está en la primera canción, reiniciarla
      this.storage.set('current-time', 0);
      this.playTrackUseCase.execute(currentTrack);
    }
  }
}
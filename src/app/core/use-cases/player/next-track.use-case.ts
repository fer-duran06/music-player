import { Injectable, Inject } from '@angular/core';
import { Track } from '../../domain/entities/track.entity';
import { IStoragePort, STORAGE_TOKEN } from '../../ports/outbound/storage.port';
import { PlayTrackUseCase } from './play-track.use-case';

@Injectable({
  providedIn: 'root'
})
export class NextTrackUseCase {
  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort,
    private playTrackUseCase: PlayTrackUseCase
  ) {}

  execute(): void {
    const queue = this.storage.get<Track[]>('queue') || [];
    const currentTrack = this.storage.get<Track>('current-track');
    const isShuffle = this.storage.get<boolean>('is-shuffle') || false;
    const repeatMode = this.storage.get<'off' | 'all' | 'one'>('repeat-mode') || 'off';

    if (!currentTrack || queue.length === 0) {
      console.log('No hay canciones en la cola');
      return;
    }

    // Si está en modo repetir una canción
    if (repeatMode === 'one') {
      this.playTrackUseCase.execute(currentTrack);
      return;
    }

    // Encontrar el índice actual
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    
    let nextTrack: Track | null = null;

    if (isShuffle) {
      // Modo aleatorio
      const randomIndex = Math.floor(Math.random() * queue.length);
      nextTrack = queue[randomIndex];
    } else {
      // Modo secuencial
      if (currentIndex < queue.length - 1) {
        nextTrack = queue[currentIndex + 1];
      } else if (repeatMode === 'all') {
        // Si está en repetir todo, volver al inicio
        nextTrack = queue[0];
      }
    }

    if (nextTrack) {
      this.playTrackUseCase.execute(nextTrack);
    } else {
      console.log('No hay siguiente canción');
      this.storage.set('is-playing', false);
    }
  }
}
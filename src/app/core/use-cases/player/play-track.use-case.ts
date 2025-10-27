import { Injectable, Inject } from '@angular/core';
import { Track } from '../../domain/entities/track.entity';
import { IMusicRepositoryPort, MUSIC_REPOSITORY_TOKEN } from '../../ports/outbound/music-repository.port';
import { IStoragePort, STORAGE_TOKEN } from '../../ports/outbound/storage.port';

@Injectable({
  providedIn: 'root'
})
export class PlayTrackUseCase {
  constructor(
    @Inject(MUSIC_REPOSITORY_TOKEN) private musicRepository: IMusicRepositoryPort,
    @Inject(STORAGE_TOKEN) private storage: IStoragePort
  ) {}

  execute(track: Track): void {
    // Guardar la canción actual en el storage
    this.storage.set('current-track', track);
    this.storage.set('is-playing', true);
    this.storage.set('current-time', 0);

    // Agregar al historial de reproducción
    this.addToHistory(track);

    console.log(`Reproduciendo: ${track.title} - ${track.artistName}`);
  }

  private addToHistory(track: Track): void {
    const history = this.storage.get<Track[]>('playback-history') || [];
    
    // Evitar duplicados recientes
    const filteredHistory = history.filter(t => t.id !== track.id);
    
    // Agregar al inicio y limitar a 50 canciones
    const updatedHistory = [track, ...filteredHistory].slice(0, 50);
    
    this.storage.set('playback-history', updatedHistory);
  }
}
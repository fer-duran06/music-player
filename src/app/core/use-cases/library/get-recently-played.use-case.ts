import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../../domain/entities/album.entity';
import { Track } from '../../domain/entities/track.entity';
import { IStoragePort, STORAGE_TOKEN } from '../../ports/outbound/storage.port';
import { IMusicRepositoryPort, MUSIC_REPOSITORY_TOKEN } from '../../ports/outbound/music-repository.port';

@Injectable({
  providedIn: 'root'
})
export class GetRecentlyPlayedUseCase {
  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort,
    @Inject(MUSIC_REPOSITORY_TOKEN) private musicRepository: IMusicRepositoryPort
  ) {}

  execute(): Observable<Album[]> {
    // Obtener historial de reproducción
    const history = this.storage.get<Track[]>('playback-history') || [];
    
    if (history.length === 0) {
      return of([]);
    }

    // Extraer IDs únicos de álbumes del historial
    const uniqueAlbumIds = [...new Set(history.map(track => track.albumId))];
    
    // Obtener los álbumes completos
    return this.musicRepository.getAlbums().pipe(
      map(albums => {
        const recentAlbums = albums.filter(album => 
          uniqueAlbumIds.includes(album.id)
        );
        
        // Ordenar por el orden del historial
        return recentAlbums.sort((a, b) => {
          const indexA = uniqueAlbumIds.indexOf(a.id);
          const indexB = uniqueAlbumIds.indexOf(b.id);
          return indexA - indexB;
        }).slice(0, 6); // Limitar a 6 álbumes recientes
      })
    );
  }
}
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../core/domain/entities/artist.entity';
import { Album } from '../../core/domain/entities/album.entity';
import { Track } from '../../core/domain/entities/track.entity';
import { GetArtistsUseCase } from '../../core/use-cases/library/get-artists.use-case';
import { GetAlbumsUseCase } from '../../core/use-cases/library/get-albums.use-case';
import { GetAlbumTracksUseCase } from '../../core/use-cases/library/get-album-tracks.use-case';
import { GetRecentlyPlayedUseCase } from '../../core/use-cases/library/get-recently-played.use-case';
import { IStoragePort, STORAGE_TOKEN } from '../../core/ports/outbound/storage.port';

@Injectable({
  providedIn: 'root'
})
export class MusicLibraryService {
  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort,
    private getArtistsUseCase: GetArtistsUseCase,
    private getAlbumsUseCase: GetAlbumsUseCase,
    private getAlbumTracksUseCase: GetAlbumTracksUseCase,
    private getRecentlyPlayedUseCase: GetRecentlyPlayedUseCase
  ) {}

  // Obtener todos los artistas
  getAllArtists(): Observable<Artist[]> {
    return this.getArtistsUseCase.execute();
  }

  // Obtener todos los álbumes
  getAllAlbums(): Observable<Album[]> {
    return this.getAlbumsUseCase.execute();
  }

  // Obtener álbumes por artista
  getAlbumsByArtist(artistId: string): Observable<Album[]> {
    return this.getAlbumsUseCase.executeByArtist(artistId);
  }

  // Obtener canciones de un álbum
  getAlbumTracks(albumId: string): Observable<Track[]> {
    return this.getAlbumTracksUseCase.execute(albumId);
  }

  // Obtener álbumes reproducidos recientemente
  getRecentlyPlayed(): Observable<Album[]> {
    return this.getRecentlyPlayedUseCase.execute();
  }

  // Agregar álbum a reproducidos recientemente
  addToRecentlyPlayed(albumId: string): void {
    const recentlyPlayed = this.storage.get<string[]>('recently-played-albums') || [];
    
    // Eliminar si ya existe
    const filtered = recentlyPlayed.filter(id => id !== albumId);
    
    // Agregar al inicio y limitar a 10
    const updated = [albumId, ...filtered].slice(0, 10);
    
    this.storage.set('recently-played-albums', updated);
  }

  // Buscar en la biblioteca (simple búsqueda local)
  searchInLibrary(query: string): Observable<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    return new Observable(observer => {
      const lowerQuery = query.toLowerCase();

      this.getAllArtists().subscribe(artists => {
        const filteredArtists = artists.filter(artist =>
          artist.name.toLowerCase().includes(lowerQuery)
        );

        this.getAllAlbums().subscribe(albums => {
          const filteredAlbums = albums.filter(album =>
            album.title.toLowerCase().includes(lowerQuery) ||
            album.artistName.toLowerCase().includes(lowerQuery)
          );

          // Para tracks, necesitaríamos obtener todos los tracks
          // Por ahora retornamos array vacío
          observer.next({
            artists: filteredArtists,
            albums: filteredAlbums,
            tracks: []
          });
          observer.complete();
        });
      });
    });
  }
}
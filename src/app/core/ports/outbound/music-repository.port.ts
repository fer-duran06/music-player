import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../domain/entities/artist.entity';
import { Album } from '../../domain/entities/album.entity';
import { Track } from '../../domain/entities/track.entity';

export interface IMusicRepositoryPort {
  // Artistas
  getArtists(): Observable<Artist[]>;
  getArtist(id: string): Observable<Artist | null>;
  
  // Álbumes
  getAlbums(): Observable<Album[]>;
  getAlbum(id: string): Observable<Album | null>;
  getAlbumsByArtistId(artistId: string): Observable<Album[]>;
  
  // Canciones
  getTracks(): Observable<Track[]>;
  getTrack(id: string): Observable<Track | null>;
  getTracksByAlbumId(albumId: string): Observable<Track[]>;
  getTracksByArtistId(artistId: string): Observable<Track[]>;
}

// Token de inyección - DEBE SER UNA CONSTANTE DIFERENTE
export const MUSIC_REPOSITORY_TOKEN = new InjectionToken<IMusicRepositoryPort>(
  'IMusicRepositoryPort'
);
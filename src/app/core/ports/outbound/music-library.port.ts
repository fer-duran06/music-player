import { Observable } from 'rxjs';
import { Artist } from '../../domain/entities/artist.entity';
import { Album } from '../../domain/entities/album.entity';
import { Track } from '../../domain/entities/track.entity';

export interface IMusicLibraryPort {
  // Artistas
  getAllArtists(): Observable<Artist[]>;
  getArtistById(id: string): Observable<Artist | null>;
  
  // Álbumes
  getAllAlbums(): Observable<Album[]>;
  getAlbumById(id: string): Observable<Album | null>;
  getAlbumsByArtist(artistId: string): Observable<Album[]>;
  
  // Canciones
  getAllTracks(): Observable<Track[]>;
  getTrackById(id: string): Observable<Track | null>;
  getTracksByAlbum(albumId: string): Observable<Track[]>;
  getTracksByArtist(artistId: string): Observable<Track[]>;
  
  // Recientes
  getRecentlyPlayed(): Observable<Album[]>;
  addToRecentlyPlayed(albumId: string): void;
}
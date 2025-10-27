import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMusicRepositoryPort } from '../../../core/ports/outbound/music-repository.port';
import { Artist } from '../../../core/domain/entities/artist.entity';
import { Album } from '../../../core/domain/entities/album.entity';
import { Track } from '../../../core/domain/entities/track.entity';
import { MOCK_ARTISTS, MOCK_ALBUMS, MOCK_TRACKS } from '../../data/mock-music-data';

@Injectable({
  providedIn: 'root'
})
export class MusicRepositoryAdapter implements IMusicRepositoryPort {
  private artists: Artist[] = MOCK_ARTISTS;
  private albums: Album[] = MOCK_ALBUMS;
  private tracks: Track[] = MOCK_TRACKS;

  // Artistas
  getArtists(): Observable<Artist[]> {
    return of(this.artists);
  }

  getArtist(id: string): Observable<Artist | null> {
    const artist = this.artists.find(a => a.id === id);
    return of(artist || null);
  }

  // Álbumes
  getAlbums(): Observable<Album[]> {
    return of(this.albums);
  }

  getAlbum(id: string): Observable<Album | null> {
    const album = this.albums.find(a => a.id === id);
    return of(album || null);
  }

  getAlbumsByArtistId(artistId: string): Observable<Album[]> {
    const albums = this.albums.filter(a => a.artistId === artistId);
    return of(albums);
  }

  // Canciones
  getTracks(): Observable<Track[]> {
    return of(this.tracks);
  }

  getTrack(id: string): Observable<Track | null> {
    const track = this.tracks.find(t => t.id === id);
    return of(track || null);
  }

  getTracksByAlbumId(albumId: string): Observable<Track[]> {
    const tracks = this.tracks.filter(t => t.albumId === albumId);
    return of(tracks);
  }

  getTracksByArtistId(artistId: string): Observable<Track[]> {
    const tracks = this.tracks.filter(t => t.artistId === artistId);
    return of(tracks);
  }
}
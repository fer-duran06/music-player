import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../../domain/entities/album.entity';
import { IMusicRepositoryPort, MUSIC_REPOSITORY_TOKEN } from '../../ports/outbound/music-repository.port';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumsUseCase {
  constructor(
    @Inject(MUSIC_REPOSITORY_TOKEN) private musicRepository: IMusicRepositoryPort
  ) {}

  execute(): Observable<Album[]> {
    return this.musicRepository.getAlbums();
  }

  executeByArtist(artistId: string): Observable<Album[]> {
    return this.musicRepository.getAlbumsByArtistId(artistId);
  }
}
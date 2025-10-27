import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../domain/entities/track.entity';
import { IMusicRepositoryPort, MUSIC_REPOSITORY_TOKEN } from '../../ports/outbound/music-repository.port';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumTracksUseCase {
  constructor(
    @Inject(MUSIC_REPOSITORY_TOKEN) private musicRepository: IMusicRepositoryPort
  ) {}

  execute(albumId: string): Observable<Track[]> {
    return this.musicRepository.getTracksByAlbumId(albumId);
  }
}
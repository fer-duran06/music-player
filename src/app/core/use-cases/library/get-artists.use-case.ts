import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../domain/entities/artist.entity';
import { IMusicRepositoryPort, MUSIC_REPOSITORY_TOKEN } from '../../ports/outbound/music-repository.port';

@Injectable({
  providedIn: 'root'
})
export class GetArtistsUseCase {
  constructor(
    @Inject(MUSIC_REPOSITORY_TOKEN) private musicRepository: IMusicRepositoryPort
  ) {}

  execute(): Observable<Artist[]> {
    return this.musicRepository.getArtists();
  }
}
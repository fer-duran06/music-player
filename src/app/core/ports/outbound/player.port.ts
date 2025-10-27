import { Observable } from 'rxjs';
import { Track } from '../../domain/entities/track.entity';
import { PlayerState } from '../../domain/entities/player-state.entity';

export interface IPlayerPort {
  // Controles básicos
  play(track: Track): void;
  pause(): void;
  resume(): void;
  stop(): void;
  
  // Navegación
  next(): void;
  previous(): void;
  seekTo(time: number): void;
  
  // Controles de audio
  setVolume(volume: number): void;
  toggleShuffle(): void;
  toggleRepeat(): void;
  
  // Observables del estado
  getPlayerState(): Observable<PlayerState>;
  getCurrentTrack(): Observable<Track | null>;
  getIsPlaying(): Observable<boolean>;
}
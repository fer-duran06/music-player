import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../../core/domain/entities/track.entity';
import { PlayerState } from '../../core/domain/entities/player-state.entity';
import { PlayTrackUseCase } from '../../core/use-cases/player/play-track.use-case';
import { PauseTrackUseCase } from '../../core/use-cases/player/pause-track.use-case';
import { NextTrackUseCase } from '../../core/use-cases/player/next-track.use-case';
import { PreviousTrackUseCase } from '../../core/use-cases/player/previous-track.use-case';
import { IStoragePort, STORAGE_TOKEN } from '../../core/ports/outbound/storage.port';

// ... resto del código igual

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerStateSubject = new BehaviorSubject<PlayerState>(
    PlayerState.createInitial()
  );
  
  public playerState$: Observable<PlayerState> = this.playerStateSubject.asObservable();

  constructor(
    @Inject(STORAGE_TOKEN) private storage: IStoragePort,
    private playTrackUseCase: PlayTrackUseCase,
    private pauseTrackUseCase: PauseTrackUseCase,
    private nextTrackUseCase: NextTrackUseCase,
    private previousTrackUseCase: PreviousTrackUseCase
  ) {
    this.loadStateFromStorage();
  }

  // Cargar estado desde localStorage al iniciar
  private loadStateFromStorage(): void {
    const currentTrack = this.storage.get<Track>('current-track');
    const isPlaying = this.storage.get<boolean>('is-playing') || false;
    const volume = this.storage.get<number>('volume') || 70;
    const currentTime = this.storage.get<number>('current-time') || 0;
    const isShuffle = this.storage.get<boolean>('is-shuffle') || false;
    const repeatMode = this.storage.get<'off' | 'all' | 'one'>('repeat-mode') || 'off';
    const queue = this.storage.get<Track[]>('queue') || [];

    const state = PlayerState.create({
      currentTrack,
      isPlaying,
      volume,
      currentTime,
      isShuffle,
      repeatMode,
      queue
    });

    this.playerStateSubject.next(state);
  }

  // Reproducir canción
  play(track: Track): void {
    this.playTrackUseCase.execute(track);
    this.updateState({ currentTrack: track, isPlaying: true, currentTime: 0 });
  }

  // Pausar
  pause(): void {
    this.pauseTrackUseCase.execute();
    this.updateState({ isPlaying: false });
  }

  // Reanudar
  resume(): void {
    const currentTrack = this.getCurrentTrack();
    if (currentTrack) {
      this.storage.set('is-playing', true);
      this.updateState({ isPlaying: true });
    }
  }

  // Alternar play/pause
  togglePlayPause(): void {
    const state = this.playerStateSubject.value;
    if (state.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  // Siguiente canción
  next(): void {
    this.nextTrackUseCase.execute();
    this.loadStateFromStorage();
  }

  // Canción anterior
  previous(): void {
    this.previousTrackUseCase.execute();
    this.loadStateFromStorage();
  }

  // Cambiar posición de reproducción
  seekTo(time: number): void {
    this.storage.set('current-time', time);
    this.updateState({ currentTime: time });
  }

  // Cambiar volumen
  setVolume(volume: number): void {
    this.storage.set('volume', volume);
    this.updateState({ volume });
  }

  // Alternar shuffle
  toggleShuffle(): void {
    const currentShuffle = this.storage.get<boolean>('is-shuffle') || false;
    const newShuffle = !currentShuffle;
    this.storage.set('is-shuffle', newShuffle);
    this.updateState({ isShuffle: newShuffle });
  }

  // Cambiar modo de repetición
  toggleRepeat(): void {
    const currentMode = this.storage.get<'off' | 'all' | 'one'>('repeat-mode') || 'off';
    let newMode: 'off' | 'all' | 'one';

    if (currentMode === 'off') {
      newMode = 'all';
    } else if (currentMode === 'all') {
      newMode = 'one';
    } else {
      newMode = 'off';
    }

    this.storage.set('repeat-mode', newMode);
    this.updateState({ repeatMode: newMode });
  }

  // Establecer cola de reproducción
  setQueue(tracks: Track[]): void {
    this.storage.set('queue', tracks);
    this.updateState({ queue: tracks });
  }

  // Reproducir álbum completo
  playAlbum(tracks: Track[], startIndex: number = 0): void {
    this.setQueue(tracks);
    if (tracks.length > 0) {
      this.play(tracks[startIndex]);
    }
  }

  // Obtener estado actual
  getCurrentState(): PlayerState {
    return this.playerStateSubject.value;
  }

  // Obtener canción actual
  getCurrentTrack(): Track | null {
    return this.playerStateSubject.value.currentTrack;
  }

  // Actualizar estado
  private updateState(updates: Partial<PlayerState>): void {
    const currentState = this.playerStateSubject.value;
    const newState = currentState.updateState(updates);
    this.playerStateSubject.next(newState);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UIState {
  isFullScreen: boolean;
  showQueue: boolean;
  showLyrics: boolean;
  volume: number;
  isMuted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  private uiStateSubject = new BehaviorSubject<UIState>({
    isFullScreen: false,
    showQueue: false,
    showLyrics: false,
    volume: 70,
    isMuted: false
  });

  public uiState$: Observable<UIState> = this.uiStateSubject.asObservable();

  constructor() {}

  // Alternar pantalla completa
  toggleFullScreen(): void {
    const current = this.uiStateSubject.value;
    this.uiStateSubject.next({
      ...current,
      isFullScreen: !current.isFullScreen
    });
  }

  // Mostrar/ocultar cola de reproducción
  toggleQueue(): void {
    const current = this.uiStateSubject.value;
    this.uiStateSubject.next({
      ...current,
      showQueue: !current.showQueue
    });
  }

  // Mostrar/ocultar letras
  toggleLyrics(): void {
    const current = this.uiStateSubject.value;
    this.uiStateSubject.next({
      ...current,
      showLyrics: !current.showLyrics
    });
  }

  // Silenciar/Activar sonido
  toggleMute(): void {
    const current = this.uiStateSubject.value;
    this.uiStateSubject.next({
      ...current,
      isMuted: !current.isMuted
    });
  }

  // Cambiar volumen
  setVolume(volume: number): void {
    const current = this.uiStateSubject.value;
    this.uiStateSubject.next({
      ...current,
      volume: Math.max(0, Math.min(100, volume))
    });
  }

  // Obtener estado actual
  getCurrentState(): UIState {
    return this.uiStateSubject.value;
  }
}
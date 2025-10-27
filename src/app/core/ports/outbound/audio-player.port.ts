import { Observable } from 'rxjs';

export interface IAudioPlayerPort {
  // Control de reproducción
  load(url: string): void;
  play(): void;
  pause(): void;
  stop(): void;
  
  // Posición y duración
  seekTo(time: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  
  // Volumen
  setVolume(volume: number): void; // 0-100
  getVolume(): number;
  
  // Estado
  isPlaying(): boolean;
  isLoading(): boolean;
  
  // Observables
  onTimeUpdate(): Observable<number>;
  onEnded(): Observable<void>;
  onError(): Observable<string>;
  onLoaded(): Observable<void>;
}  
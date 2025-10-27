import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../application/services/player.service';
import { PlayerState } from '../../../core/domain/entities/player-state.entity';
import { Track } from '../../../core/domain/entities/track.entity';

@Component({
  selector: 'app-player-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-footer.html',
  styleUrl: './player-footer.css'
})
export class PlayerFooterComponent implements OnInit, OnDestroy {
  playerState: PlayerState = PlayerState.createInitial();
  currentTrack: Track | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  volume: number = 70;
  isShuffle: boolean = false;
  repeatMode: 'off' | 'all' | 'one' = 'off';

  private subscription: Subscription = new Subscription();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    // Suscribirse al estado del reproductor
    this.subscription.add(
      this.playerService.playerState$.subscribe(state => {
        this.playerState = state;
        this.currentTrack = state.currentTrack;
        this.isPlaying = state.isPlaying;
        this.currentTime = state.currentTime;
        this.volume = state.volume;
        this.isShuffle = state.isShuffle;
        this.repeatMode = state.repeatMode;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Controles básicos
  togglePlayPause(): void {
    this.playerService.togglePlayPause();
  }

  playNext(): void {
    this.playerService.next();
  }

  playPrevious(): void {
    this.playerService.previous();
  }

  // Control de tiempo
  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = parseInt(input.value);
    this.playerService.seekTo(time);
  }

  // Control de volumen
  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const volume = parseInt(input.value);
    this.playerService.setVolume(volume);
  }

  toggleMute(): void {
    if (this.volume > 0) {
      this.playerService.setVolume(0);
    } else {
      this.playerService.setVolume(70);
    }
  }

  // Shuffle y Repeat
  toggleShuffle(): void {
    this.playerService.toggleShuffle();
  }

  toggleRepeat(): void {
    this.playerService.toggleRepeat();
  }

  // Formatear tiempo
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Obtener progreso en porcentaje
  getProgress(): number {
    if (!this.currentTrack) return 0;
    return (this.currentTime / this.currentTrack.duration) * 100;
  }
}
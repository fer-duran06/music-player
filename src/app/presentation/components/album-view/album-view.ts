import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicLibraryService } from '../../../application/services/music-library.service';
import { PlayerService } from '../../../application/services/player.service';
import { Album } from '../../../core/domain/entities/album.entity';
import { Track } from '../../../core/domain/entities/track.entity';

@Component({
  selector: 'app-album-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-view.html',
  styleUrl: './album-view.css'
})
export class AlbumViewComponent implements OnInit {
  albumId: string = '';
  album: Album | null = null;
  tracks: Track[] = [];
  isLoading: boolean = true;
  currentTrackId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicLibraryService: MusicLibraryService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.loadAlbumDetails();
    });

    // Suscribirse al estado del reproductor para saber qué canción está sonando
    this.playerService.playerState$.subscribe(state => {
      this.currentTrackId = state.currentTrack?.id || null;
    });
  }

  loadAlbumDetails(): void {
    this.isLoading = true;

    // Cargar información del álbum
    this.musicLibraryService.getAllAlbums().subscribe({
      next: (albums) => {
        this.album = albums.find(a => a.id === this.albumId) || null;
      },
      error: (error) => {
        console.error('Error cargando álbum:', error);
      }
    });

    // Cargar canciones del álbum
    this.musicLibraryService.getAlbumTracks(this.albumId).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando canciones:', error);
        this.isLoading = false;
      }
    });
  }

  playAlbum(): void {
    if (this.tracks.length > 0) {
      this.playerService.playAlbum(this.tracks, 0);
      this.musicLibraryService.addToRecentlyPlayed(this.albumId);
    }
  }

  playTrack(track: Track, index: number): void {
    this.playerService.playAlbum(this.tracks, index);
    this.musicLibraryService.addToRecentlyPlayed(this.albumId);
  }

  isPlaying(trackId: string): boolean {
    return this.currentTrackId === trackId;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getTotalDuration(): string {
    const totalSeconds = this.tracks.reduce((sum, track) => sum + track.duration, 0);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes} min`;
  }
}
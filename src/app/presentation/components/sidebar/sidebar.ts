import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicLibraryService } from '../../../application/services/music-library.service';
import { Artist } from '../../../core/domain/entities/artist.entity';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtistId: string | null = null;
  isLoading: boolean = true;

  constructor(
    private musicLibraryService: MusicLibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.isLoading = true;
    this.musicLibraryService.getAllArtists().subscribe({
      next: (artists) => {
        this.artists = artists;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando artistas:', error);
        this.isLoading = false;
      }
    });
  }

  selectArtist(artistId: string): void {
    this.selectedArtistId = artistId;
    // Por ahora solo marcamos el artista seleccionado
    // Más adelante podemos filtrar los álbumes por artista
    console.log('Artista seleccionado:', artistId);
  }

  isSelected(artistId: string): boolean {
    return this.selectedArtistId === artistId;
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicLibraryService } from '../../../application/services/music-library.service';
import { Album } from '../../../core/domain/entities/album.entity';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css'
})
export class MainViewComponent implements OnInit {
  recentAlbums: Album[] = [];
  allAlbums: Album[] = [];
  isLoadingRecent: boolean = true;
  isLoadingAll: boolean = true;

  constructor(
    private musicLibraryService: MusicLibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecentlyPlayed();
    this.loadAllAlbums();
  }

  loadRecentlyPlayed(): void {
    this.isLoadingRecent = true;
    this.musicLibraryService.getRecentlyPlayed().subscribe({
      next: (albums) => {
        this.recentAlbums = albums;
        this.isLoadingRecent = false;
      },
      error: (error) => {
        console.error('Error cargando álbumes recientes:', error);
        this.isLoadingRecent = false;
      }
    });
  }

  loadAllAlbums(): void {
    this.isLoadingAll = true;
    this.musicLibraryService.getAllAlbums().subscribe({
      next: (albums) => {
        this.allAlbums = albums;
        this.isLoadingAll = false;
      },
      error: (error) => {
        console.error('Error cargando todos los álbumes:', error);
        this.isLoadingAll = false;
      }
    });
  }

  openAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }
}
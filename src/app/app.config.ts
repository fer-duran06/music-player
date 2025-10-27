import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importar tokens (NO interfaces directamente)
import { MUSIC_REPOSITORY_TOKEN } from './core/ports/outbound/music-repository.port';
import { STORAGE_TOKEN } from './core/ports/outbound/storage.port';

// Importar adaptadores
import { MusicRepositoryAdapter } from './infrastructure/adapters/repositories/music-repository.adapter';
import { LocalStorageAdapter } from './infrastructure/adapters/repositories/local-storage.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    // Configurar inyección de dependencias para los puertos
    {
      provide: MUSIC_REPOSITORY_TOKEN,
      useClass: MusicRepositoryAdapter
    },
    {
      provide: STORAGE_TOKEN,
      useClass: LocalStorageAdapter
    }
  ]
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SpotifyAuthService {
  // endpoint de Spotify para pedir tokens
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  // variables para almacenar el token y su expiración
  private currentToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    if (this.currentToken && Date.now() < this.tokenExpiry) {
      console.log(' Usando token en caché');
      return of(this.currentToken);
    }

    console.log(' Solicitando nuevo token a Spotify...');
    console.log('Client ID:', environment.spotify.clientId);

    const credentials = btoa(`${environment.spotify.clientId}:${environment.spotify.clientSecret}`);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post<any>(this.tokenUrl, body.toString(), { headers }).pipe(
      tap(response => console.log('Token recibido:', response)),
      //almacena el token y su tiempo de expiración
      map(response => {
        this.currentToken = response.access_token;
        this.tokenExpiry = Date.now() + (response.expires_in * 1000);
        console.log('Token guardado, expira en:', response.expires_in, 'segundos');
        return this.currentToken!;
      }),

      //manejo de errores
      catchError(error => {
        console.error(' Error al obtener token:', error);
        console.error('Status:', error.status);
        console.error('Error completo:', error.error);
        
        if (error.status === 400) {
          console.error(' Credenciales inválidas. Verifica tu Client ID y Client Secret');
        }
        
        return throwError(() => error);
      })
    );
  }

  clearToken(): void {
    this.currentToken = null;
    this.tokenExpiry = 0;
  }
}
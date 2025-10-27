export class Track {
  constructor(
    public id: string,
    public title: string,
    public albumId: string,
    public albumTitle: string,
    public artistId: string,
    public artistName: string,
    public duration: number, // en segundos
    public trackNumber: number,
    public audioUrl?: string
  ) {}

  static create(data: {
    id: string;
    title: string;
    albumId: string;
    albumTitle: string;
    artistId: string;
    artistName: string;
    duration: number;
    trackNumber: number;
    audioUrl?: string;
  }): Track {
    return new Track(
      data.id,
      data.title,
      data.albumId,
      data.albumTitle,
      data.artistId,
      data.artistName,
      data.duration,
      data.trackNumber,
      data.audioUrl
    );
  }

  // Método útil para formatear la duración
  getFormattedDuration(): string {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
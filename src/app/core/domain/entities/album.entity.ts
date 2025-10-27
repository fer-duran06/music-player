export class Album {
  constructor(
    public id: string,
    public title: string,
    public artistId: string,
    public artistName: string,
    public coverUrl: string,
    public releaseYear: number,
    public genre?: string
  ) {}

  static create(data: {
    id: string;
    title: string;
    artistId: string;
    artistName: string;
    coverUrl: string;
    releaseYear: number;
    genre?: string;
  }): Album {
    return new Album(
      data.id,
      data.title,
      data.artistId,
      data.artistName,
      data.coverUrl,
      data.releaseYear,
      data.genre
    );
  }
}
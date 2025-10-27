export class Artist {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public bio?: string
  ) {}

  static create(data: {
    id: string;
    name: string;
    imageUrl: string;
    bio?: string;
  }): Artist {
    return new Artist(data.id, data.name, data.imageUrl, data.bio);
  }
}
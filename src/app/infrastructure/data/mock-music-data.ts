import { Artist } from '../../core/domain/entities/artist.entity';
import { Album } from '../../core/domain/entities/album.entity';
import { Track } from '../../core/domain/entities/track.entity';

// Artistas
export const MOCK_ARTISTS: Artist[] = [
  Artist.create({
    id: 'artist-1',
    name: 'Three Days Grace',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5f3f2d6d1c6e5f3f3a3a3a3a',
    bio: 'Banda canadiense de rock alternativo'
  }),
  Artist.create({
    id: 'artist-2',
    name: 'Linkin Park',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1234567890abcdef12345678',
    bio: 'Banda estadounidense de rock alternativo y nu metal'
  }),
  Artist.create({
    id: 'artist-3',
    name: 'Breaking Benjamin',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebabcdef1234567890abcdef12',
    bio: 'Banda de rock alternativo de Pennsylvania'
  }),
  Artist.create({
    id: 'artist-4',
    name: 'Shinedown',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9876543210fedcba98765432',
    bio: 'Banda de hard rock de Florida'
  })
];

// Álbumes
export const MOCK_ALBUMS: Album[] = [
  Album.create({
    id: 'album-1',
    title: 'Explosions',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273explosions123456',
    releaseYear: 2022,
    genre: 'Rock Alternativo'
  }),
  Album.create({
    id: 'album-2',
    title: 'Human',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273human123456789',
    releaseYear: 2015,
    genre: 'Hard Rock'
  }),
  Album.create({
    id: 'album-3',
    title: 'One-X',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273onex123456789',
    releaseYear: 2006,
    genre: 'Alternative Rock'
  }),
  Album.create({
    id: 'album-4',
    title: 'Meteora',
    artistId: 'artist-2',
    artistName: 'Linkin Park',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273meteora12345',
    releaseYear: 2003,
    genre: 'Nu Metal'
  }),
  Album.create({
    id: 'album-5',
    title: 'Phobia',
    artistId: 'artist-3',
    artistName: 'Breaking Benjamin',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273phobia12345',
    releaseYear: 2006,
    genre: 'Alternative Rock'
  }),
  Album.create({
    id: 'album-6',
    title: 'Threat to Survival',
    artistId: 'artist-4',
    artistName: 'Shinedown',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273threat12345',
    releaseYear: 2015,
    genre: 'Hard Rock'
  })
];

// Canciones
export const MOCK_TRACKS: Track[] = [
  // Album: Explosions (Three Days Grace)
  Track.create({
    id: 'track-1',
    title: 'So Called Life',
    albumId: 'album-1',
    albumTitle: 'Explosions',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 197,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-2',
    title: 'Lifetime',
    albumId: 'album-1',
    albumTitle: 'Explosions',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 183,
    trackNumber: 2
  }),
  Track.create({
    id: 'track-3',
    title: 'Explosions',
    albumId: 'album-1',
    albumTitle: 'Explosions',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 176,
    trackNumber: 3
  }),
  
  // Album: Human (Three Days Grace)
  Track.create({
    id: 'track-4',
    title: 'Human Race',
    albumId: 'album-2',
    albumTitle: 'Human',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 208,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-5',
    title: 'Painkiller',
    albumId: 'album-2',
    albumTitle: 'Human',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 195,
    trackNumber: 2
  }),
  Track.create({
    id: 'track-6',
    title: 'Fallen Angel',
    albumId: 'album-2',
    albumTitle: 'Human',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 203,
    trackNumber: 3
  }),
  
  // Album: One-X (Three Days Grace)
  Track.create({
    id: 'track-7',
    title: 'Animal I Have Become',
    albumId: 'album-3',
    albumTitle: 'One-X',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 227,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-8',
    title: 'Pain',
    albumId: 'album-3',
    albumTitle: 'One-X',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 203,
    trackNumber: 2
  }),
  Track.create({
    id: 'track-9',
    title: 'Never Too Late',
    albumId: 'album-3',
    albumTitle: 'One-X',
    artistId: 'artist-1',
    artistName: 'Three Days Grace',
    duration: 209,
    trackNumber: 3
  }),
  
  // Album: Meteora (Linkin Park)
  Track.create({
    id: 'track-10',
    title: 'Numb',
    albumId: 'album-4',
    albumTitle: 'Meteora',
    artistId: 'artist-2',
    artistName: 'Linkin Park',
    duration: 185,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-11',
    title: 'Faint',
    albumId: 'album-4',
    albumTitle: 'Meteora',
    artistId: 'artist-2',
    artistName: 'Linkin Park',
    duration: 162,
    trackNumber: 2
  }),
  Track.create({
    id: 'track-12',
    title: 'Breaking the Habit',
    albumId: 'album-4',
    albumTitle: 'Meteora',
    artistId: 'artist-2',
    artistName: 'Linkin Park',
    duration: 196,
    trackNumber: 3
  }),
  
  // Album: Phobia (Breaking Benjamin)
  Track.create({
    id: 'track-13',
    title: 'The Diary of Jane',
    albumId: 'album-5',
    albumTitle: 'Phobia',
    artistId: 'artist-3',
    artistName: 'Breaking Benjamin',
    duration: 199,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-14',
    title: 'Breath',
    albumId: 'album-5',
    albumTitle: 'Phobia',
    artistId: 'artist-3',
    artistName: 'Breaking Benjamin',
    duration: 219,
    trackNumber: 2
  }),
  
  // Album: Threat to Survival (Shinedown)
  Track.create({
    id: 'track-15',
    title: 'Cut the Cord',
    albumId: 'album-6',
    albumTitle: 'Threat to Survival',
    artistId: 'artist-4',
    artistName: 'Shinedown',
    duration: 218,
    trackNumber: 1
  }),
  Track.create({
    id: 'track-16',
    title: 'State of My Head',
    albumId: 'album-6',
    albumTitle: 'Threat to Survival',
    artistId: 'artist-4',
    artistName: 'Shinedown',
    duration: 205,
    trackNumber: 2
  })
];
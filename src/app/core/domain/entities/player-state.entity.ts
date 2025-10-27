import { Track } from './track.entity';

export class PlayerState {
  constructor(
    public currentTrack: Track | null,
    public isPlaying: boolean,
    public volume: number, // 0-100
    public currentTime: number, // segundos
    public isShuffle: boolean,
    public repeatMode: 'off' | 'all' | 'one',
    public queue: Track[]
  ) {}

  static createInitial(): PlayerState {
    return new PlayerState(null, false, 70, 0, false, 'off', []);
  }

  static create(data: {
    currentTrack: Track | null;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    isShuffle: boolean;
    repeatMode: 'off' | 'all' | 'one';
    queue: Track[];
  }): PlayerState {
    return new PlayerState(
      data.currentTrack,
      data.isPlaying,
      data.volume,
      data.currentTime,
      data.isShuffle,
      data.repeatMode,
      data.queue
    );
  }

  // Método para actualizar el estado
  updateState(updates: Partial<PlayerState>): PlayerState {
    return new PlayerState(
      updates.currentTrack ?? this.currentTrack,
      updates.isPlaying ?? this.isPlaying,
      updates.volume ?? this.volume,
      updates.currentTime ?? this.currentTime,
      updates.isShuffle ?? this.isShuffle,
      updates.repeatMode ?? this.repeatMode,
      updates.queue ?? this.queue
    );
  }
}
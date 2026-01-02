import { create } from 'zustand';
import { MusicTrack } from '@/data/types';

interface MusicState {
    currentTrack: MusicTrack | null;
    isPlaying: boolean;
    volume: number;
    setTrack: (track: MusicTrack) => void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    stop: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
    currentTrack: null,
    isPlaying: false,
    volume: 0.5,
    setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setVolume: (volume) => set({ volume }),
    stop: () => set({ isPlaying: false, currentTrack: null }),
}));

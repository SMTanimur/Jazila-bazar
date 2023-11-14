"use client"
import { create } from "zustand";

interface HeaderSearchState {
 
  showHeaderSearch: boolean;
  onShowHeaderSearch: () => void;
  closeShowHeaderSearch: () => void;

  showMobileHeaderSearch: boolean;
  onShowMobileHeaderSearch: () => void;
  closeShowMobileHeaderSearch: () => void;
  setMobileHeaderSearch: (value: boolean) => void;

  
}
export const useHeaderSearch = create<HeaderSearchState>((set) => ({
 
  showHeaderSearch: false,
  onShowHeaderSearch: () => set(() => ({ showHeaderSearch: true })),
  closeShowHeaderSearch: () => set(() => ({ showHeaderSearch: false })),

  showMobileHeaderSearch: false,
  onShowMobileHeaderSearch: () => set(() => ({ showMobileHeaderSearch: true })),
  closeShowMobileHeaderSearch: () => set(() => ({ showMobileHeaderSearch: false })),
  setMobileHeaderSearch: (value: boolean) => set(() => ({ showMobileHeaderSearch: value })),
}));

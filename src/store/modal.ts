"use client";

import { create } from "zustand";

interface GlobalModalState {
  userMenu: boolean;
  onUserMenu: () => void;
  closeUserMenu: () => void;

  cartState: boolean;
  onCartState: () => void;
  closeCartState: () => void;

  menubar: boolean;
  onMenubar: () => void;
  closeMenubar: () => void;

  showHeaderSearch: boolean;
  onShowHeaderSearch: () => void;
  closeShowHeaderSearch: () => void;
  
}
export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  userMenu: false,
  onUserMenu: () => set(() => ({ userMenu: true })),
  closeUserMenu: () => set(() => ({ userMenu: false })),

  cartState: false,
  onCartState: () => set(() => ({ cartState: true })),
  closeCartState: () => set(() => ({ cartState: false })),

  menubar: false,
  onMenubar: () => set(() => ({ menubar: true })),
  closeMenubar: () => set(() => ({ menubar: false })),

  showHeaderSearch: false,
  onShowHeaderSearch: () => set(() => ({ showHeaderSearch: true })),
  closeShowHeaderSearch: () => set(() => ({ showHeaderSearch: false })),
}));

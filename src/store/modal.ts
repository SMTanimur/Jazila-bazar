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
}));

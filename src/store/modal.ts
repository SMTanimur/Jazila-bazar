"use client";

import { IProduct } from "@/types";
import { create } from "zustand";

type IQuickViewState = {
  quickView: boolean;
  quickViewState: IProduct | null;
};
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

  sideFilter: boolean;
  onSideFilter: () => void;
  closeSideFilter: () => void;

  showHeaderSearch: boolean;
  onShowHeaderSearch: () => void;
  closeShowHeaderSearch: () => void;

  quickView: boolean;
  quickViewState: IProduct | null;
  setQuickViewState: (quickView: boolean, quickViewState: any) => void;

  showPostQuestion: boolean;
  postQuestionState: IProduct | null;
  setPostQuestionState: (
    showPostQuestion: boolean,
    postQuestionState: any
  ) => void;

  showReviewModal: boolean;
  reviewModalState: IProduct | null;
  setReviewModalState: (
    showReviewModal: boolean,
    reviewModalState: any
  ) => void;
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

  quickView: false,
  quickViewState: null,
  setQuickViewState: (quickView, quickViewState) =>
    set(() => ({ quickView, quickViewState })),

  showPostQuestion: false,
  postQuestionState: null,
  setPostQuestionState: (showPostQuestion, postQuestionState) =>
    set(() => ({ showPostQuestion, postQuestionState })),

  showReviewModal: false,
  reviewModalState: null,
  setReviewModalState: (showReviewModal, reviewModalState) =>
    set(() => ({ showReviewModal, reviewModalState })),

  sideFilter: false,
  onSideFilter: () => set(() => ({ sideFilter: true })),
  closeSideFilter: () => set(() => ({ sideFilter: false })),
}));

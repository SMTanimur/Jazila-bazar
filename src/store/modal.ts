"use client";

import { IAddress, IProduct } from "@/types";
import { create } from "zustand";

type IAddressEditState = {
  customerId: string;
  address: IAddress;
};

type IAddressDeleteState = {
  customerId: string;
  addressId: string;
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

  showAddress: boolean;
  addressData: string | null;
  setAddressData: (showAddresss: boolean, addressData: any) => void;

  showEditAddress: boolean;
  editAddressData: IAddressEditState | null;
  setEditAddressData: (showEditAddresss: boolean, editAddressData: any) => void;

  showDeleteAddress: boolean;
  deleteAddressData: IAddressDeleteState | null;
  setDeleteAddressData: (
    showDeleteAddresss: boolean,
    deleteAddressData: any
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

  showAddress: false,
  addressData: null,
  setAddressData: (showAddress, addressData) =>
    set(() => ({ showAddress, addressData })),

  showEditAddress: false,
  editAddressData: null,
  setEditAddressData: (showEditAddress, editAddressData) =>
    set(() => ({ showEditAddress, editAddressData })),

  showDeleteAddress: false,
  deleteAddressData: null,
  setDeleteAddressData: (showDeleteAddress, deleteAddressData) =>
    set(() => ({ showDeleteAddress, deleteAddressData })),
}));

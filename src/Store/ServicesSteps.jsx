// stepsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStepsStore = create(
  persist(
    (set) => ({
      currentStep: 1,
      address: null,
      currentLocation: null,
      receivercurrentLocation: null,
      DropoffLocation: null,
      selectedmapAddress: null,
      senderdata: {},
      setCurrentLocation: (currentLocation) => set({ currentLocation }),
      setReceiverCurrentLocation: (receivercurrentLocation) => set({ receivercurrentLocation }),
      setDropoffLocation: (DropoffLocation) => set({ DropoffLocation }),
      setSelectedmapAddress: (selectedmapAddress) =>
        set({ selectedmapAddress }),
      setCurrentAddress: (data) => set({ address: data }),
      setCurrentStep: (step) => set({ currentStep: step }),
      clearStore: () => set({ currentStep: 1 }),
      resetBookingFlow: () => set({ currentStep: 1 }),
      updateSenderData: ({ key, value, data }) => {
        if (key) {
          set((state) => ({
            senderdata: {
              ...state.senderdata,
              [key]: value,
            },
          }));
        }
        if (data) {
          set((state) => ({
            senderdata: {
              ...state.senderdata,
              [key]: value,
            },
          }));
        }
      },
    }),
    {
      name: "steps-storage", // Required for persist to work
    }
  )
);
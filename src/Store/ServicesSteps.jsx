// stepsStore.js
import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStepsStore = create(
  persist(
    (set,get) => ({
      currentStep: 1,
      address: null,
      currentLocation: null,
      DropoffLocation: null,
      senderdata:{},
      setCurrentLocation: (currentLocation) => set({ currentLocation }),
      setDropoffLocation: (DropoffLocation) => set({ DropoffLocation }),
      setCurrentAddress: (data) => set({ address: data }),
      setCurrentStep: (step) => set({ currentStep: step }),
      clearStore: () => set({ currentStep: 1 }),
      resetBookingFlow: () => set({ currentStep: 1 }),
       updateSenderData:({ key, value, data }) => {
        
        if (key) {
          set((state)=>({
            senderdata:{
              ...state.senderdata,
              [key]: value
            }
          }))
          
        }
        if (data) {
          set((state)=>({
            senderdata:{
              ...state.senderdata,
              [key]:value
            }
          }))
        }
      }
    }),
    {
      name: "steps-storage", // Required for persist to work
    }
  )
);
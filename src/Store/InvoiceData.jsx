// stepsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const invoiceStore = create(
  persist(
    (set) => ({
      invoice:"",
      setInvoice: (invoice) => set({ invoice }),
    }),
    {
      name: "invoice-storage",
    }
  )
);
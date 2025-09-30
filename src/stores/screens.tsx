import { Payload } from '@/types/ocr';
import { create } from 'zustand';

type ScanScreenStore = {
  image: string | null;
  result: string;
  payload: Payload;
  isProcessing: boolean;
  setImage: (image: string | null) => void;
  setResult: (result: string) => void;
  setPayload: (payload: Payload) => void;
  setIsProcessing: (val: boolean) => void;
};

const initialPayload: Payload = {
  amount_cents: '',
  category: '',
  date: '',
  description: '',
  merchant: '',
};

export const useScanScreenStore = create<ScanScreenStore>(set => ({
  image: null,
  result: '',
  payload: initialPayload,
  isProcessing: false,

  setImage: image => set({ image }),
  setResult: result => set({ result }),
  setPayload: payload => set({ payload }),
  setIsProcessing: val => set({ isProcessing: val }),
}));

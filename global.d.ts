// global.d.ts
export {};

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
    makePayment: () => void;
  }
}

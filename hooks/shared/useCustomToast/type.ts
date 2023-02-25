export type ToastType = 'success' | 'error';

export interface CustomToastProps {
  message: string;
  type: ToastType;
}

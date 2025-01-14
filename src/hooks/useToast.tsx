import { toast } from "react-toastify";

export function useToast() {
  const showError = (message: string) => {
    toast.error(`🚨 ${message}`, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  const showSuccess = (message: string) => {
    toast.success(`🎉 ${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  return { showError, showSuccess };
}

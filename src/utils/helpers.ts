import type { Error } from "@app/types";
import { toast } from "react-hot-toast";

const MAX_TIME = 4500;

type ToastOptions<TResponse> = {
  promise: Promise<TResponse>;
  loading: string;
  success: string | ((args: TResponse) => string);
  error?: string | ((error: Error) => string);
};

const showToast: <TResponse>({
  promise,
  loading,
  success,
  error,
}: ToastOptions<TResponse>) => void = ({
  promise,
  loading,
  success,
  error = (error) => {
    if (error.message) {
      const message = error.message;

      return typeof message === "string" ? message : message[0];
    }

    return "There was a problem, try again!";
  },
}) => {
  toast.remove();
  toast
    .promise(
      promise,
      {
        loading,
        success,
        error,
      },
      {
        duration: Infinity,
      },
    )
    .finally(() => {
      setTimeout(() => {
        toast.remove();
      }, MAX_TIME);
    });
};

const showErrorToast = (message: string): void => {
  toast.remove();
  toast.error(message, {
    duration: MAX_TIME,
  });
};

export { showToast, showErrorToast };

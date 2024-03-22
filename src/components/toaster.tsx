import { Toaster as HotToaster } from "react-hot-toast";
import { type VoidComponent } from "@app/types";

const Toaster: VoidComponent = () => (
  <HotToaster
    position="bottom-center"
    reverseOrder
    toastOptions={{
      style: {
        fontSize: "1rem",
        maxWidth: "42rem",
      },
      duration: 5000,
    }}
  />
);

export { Toaster };

import { destroy, primary } from "@/src/css";
import { ErrorToast, SuccessToast, ToastProps } from "react-native-toast-message";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: primary, borderLeftWidth: 20, width: "80%", marginTop: 10, height: 75 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}

    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: destroy, borderLeftWidth: 20, width: "80%", marginTop: 10, height: 75 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

};

export default toastConfig
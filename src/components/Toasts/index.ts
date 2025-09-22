import { Slide, toast } from "react-toastify";


export const ErrorToast = (message: string) => {
    return toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}

export const SuccessToast = (message: string) => {
    return toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}

export const InfoToast = (message: string) => {
    return toast.info(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}
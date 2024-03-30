import { MutableRefObject } from 'react';
import { toast, Bounce, type ToastOptions, ToastPosition } from 'react-toastify';

const options: ToastOptions = {
    position: 'bottom-right' as ToastPosition,
    autoClose: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    closeButton: true,
    hideProgressBar: true,
    transition: Bounce,
}

export const updateAbleNotification = (initMsg: string, updateMsg:string, toastId:MutableRefObject<any>, duration: number | false = 1500) => {
    
    const notify = () => toastId.current = toast(initMsg, { ...options, autoClose: false });
    const update = () => toast.update(toastId.current, { ...options, render:updateMsg,type: "info", autoClose: duration, });

    return { notify, update }
}

export const promiseNotification = async (promise: ()=> Promise<void>, pendingMessage: string, successMessage: string, errorMessage: string) => {
    await toast.promise(
        promise,
        {
          pending: pendingMessage,
          success: successMessage,
          error: errorMessage
        }
    )
}

export const successNotification = (message: string, duration: number = 1500) => {
    options.autoClose = duration;
    toast.success(message, options);
}

export const errorNotification = (message: string, duration: number = 1500) => {
    options.autoClose = duration;
    toast.error(message, options);
}

export const infoNotification = (message: string, duration: number = 1500) => {
    options.autoClose = duration;
    toast.info(message, options);
}

export const warningNotification = (message: string, duration: number = 1500) => {
    options.autoClose = duration;
    toast.warning(message, options);
}
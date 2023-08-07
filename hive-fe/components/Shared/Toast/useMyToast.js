import {useContext} from 'react';
import {ToastCtx} from './ToastProvider';

const useMyToast = () => {
  return useContext (ToastCtx);
};

export default useMyToast;

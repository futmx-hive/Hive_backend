import { createContext, useState } from "react";
import ToastContainer from "./ToastContainer";
import { nanoid } from "nanoid";
const ToastCtx = createContext(null);
export { ToastCtx };

const dummyToasts = [
	{
		text: "this is success",
		position: "center",
		type: "",
		isTop: true,
	},
	{
		text: "this is success base text",
		position: "center",
		type: "",
		isTop: false,
	},
	{
		text: "this is error toast",
		position: "center",
		type: "error",
		isTop: false,
	},
	{
		text: "this is error toast at the top",
		position: "center",
		type: "error",
		isTop: true,
	},
];
const ToastProvider = ({ children, placement }) => {
	const [toasts, setToasts] = useState([]);
	const addToast = (toast) => {
		setToasts((prev) => [...prev, { ...toast, id: nanoid(4) }]);
	};

	const removeToast = (id) => {
		setToasts((prev) => [...prev].filter((_, ind) => _.id !== id));
	};

	return (
		<ToastCtx.Provider
			value={{
				addToast,
				removeToast,
			}}
		>
			<ToastContainer toasts={toasts} placement={placement} />

			<ToastContainer toasts={toasts} placement={placement} top={false} />
			{children}
		</ToastCtx.Provider>
	);
};

export default ToastProvider;

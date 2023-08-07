import useResize from '@hooks/UseResize';
import UseToggle from '@hooks/UseToogle';
import { createContext } from 'react';

const GlobalCtx = createContext();
export default function GlobalContext({ children }) {
	const width = useResize();
	return (
		<GlobalCtx.Provider
			value={{
				width,
			}}>
			{children}
		</GlobalCtx.Provider>
	);
}

export { GlobalCtx };

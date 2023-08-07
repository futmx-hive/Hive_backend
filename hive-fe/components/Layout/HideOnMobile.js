import { GlobalCtx } from 'context/GlobalContext';
import { useContext } from 'react';

function HideOnMobile({ children }) {
	const { width } = useContext(GlobalCtx);
	return width < 500 ? null : children;
}

export default HideOnMobile;

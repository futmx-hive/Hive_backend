import React, { useContext } from 'react';
import { DropDown, DropBtn } from '../Dropdown';
import TabCtx from './TabCtx';
const TabDropDown = ({ line = true, label, id, children, value }) => {
	const tabHandler = useContext(TabCtx);
	const itemsCount = React.Children.toArray(children).length;
	const Indicator = ({ action }) => {
		return (
			<button
				onClick={() => {
					tabHandler.onChange(value);
					action();
				}}
				className={`${line ? 'btn_tab' : 'btn_gray btn_small tablet-1 weit-2 col-gra-bt-d'} ${
					value >= id && value <= value + itemsCount ? 'active' : ''
				}`}>
				{label}
			</button>
		);
	};
	return <DropDown indicator={<Indicator />}>{children}</DropDown>;
};

export default TabDropDown;

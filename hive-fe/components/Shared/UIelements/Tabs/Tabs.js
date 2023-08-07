import React from 'react';
import TabCtx from './TabCtx';

export const TAB_DESIGNS = {
	LINE: 'LINE',
	BUTTON: 'BUTTON',
};

const Tabs = ({
	children,
	value,
	onChange,
	classes = 'sp-btw flexi',
	right,
	design = TAB_DESIGNS.BUTTON,
	max,
	tabContainerClasses = '',
}) => {
	let numberOfChildren = React.Children.toArray(children).length;

	return (
		<div className={` ${classes}`}>
			<div
				className={`${
					TAB_DESIGNS.BUTTON === design ? 'tabs_buttons_pack_grid' : 'tabs_buttons_pack bord-bott-2'
				} ${tabContainerClasses}`}
				style={{
					display: TAB_DESIGNS.BUTTON === design ? 'grid' : 'flex',
					gridTemplateColumns:
						TAB_DESIGNS.BUTTON === design ? `repeat(${numberOfChildren},1fr)` : 'unset',
				}}>
				<TabCtx.Provider
					value={{
						value,
						onChange,
					}}>
					{React.Children.map(children, (child, index) =>
						React.cloneElement(child, {
							...child.props,
							id: index,
							value,
							design,
							isPrev: index + 1 === value,
						}),
					)}
				</TabCtx.Provider>
			</div>
			{design !== TAB_DESIGNS.BUTTON && <div>{right}</div>}
		</div>
	);
};

export default Tabs;

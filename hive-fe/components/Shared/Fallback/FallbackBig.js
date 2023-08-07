import Icon from "@shared/SmallComponents/Icon";
import React, { Fragment } from "react";
import Link from "next/link";
import FallBackScreen from "./Fallback";

const FallbackBig = ({
	imgID,
	title,
	body,
	footer,
	children,
	to,
	isOpen = false,
	classes,
	topContent,
	loading = false,
	isError = false,
	LoadingComp = <></>,
}) => {
	const resFooter = () => {
		if (!!onClick) {
			return (
				<button onClick={onClick} className='btn_blue btn_wide heading_small p-x-2'>
					{footer}
				</button>
			);
		} else
			return (
				<Link to={to} className='btn_blue btn_wide heading_small p-x-2'>
					{footer}
				</Link>
			);
	};

	if (loading || isError) {
		if (loading || isError) {
			return <FallBackScreen header={LoadingComp} isOpen={false} />;
		}
	}

	return (
		<FallBackScreen
			header={
				<Fragment>
					<div className='grid_txt'>
						<div className='u-center'>
							<Icon id={imgID} classes='lag_svg' />
						</div>
						<h5 className='heading_med  col-bl u-center'>{title}</h5>
					</div>
				</Fragment>
			}
			body={<p className='heading_small_1'>{body}</p>}
			footer={!!to ? resFooter() : footer}
			big
			isOpen={isOpen}
			hClass={classes}
			topContent={topContent}
		>
			{typeof children === "function" ? children() : children}
		</FallBackScreen>
	);
};

export default FallbackBig;

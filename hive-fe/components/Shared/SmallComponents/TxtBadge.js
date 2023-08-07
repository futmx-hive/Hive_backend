import React from 'react';

const TxtBadge = ({ status }) => {
	const getBadgeColor = (status) => {
		const temp = ['cancelled', 'pending', 'delivered', 'accepted', ''];
		let sta = status ? status.toLowerCase() : temp[Math.floor(Math.random() * temp.length)];

		switch (sta) {
			case 'cancelled':
				return { bg: 'badge_txt_red', txt: 'cancelled' };
			case 'accepted':
				return { bg: 'badge_txt_b', txt: 'accepted' };
			case 'pending':
				return { bg: 'badge_txt_yell', txt: 'pending' };
			case 'delivered':
				return { bg: 'badge_txt_gr', txt: 'delivered' };
			case 'shipped':
				return { bg: 'badge_txt_gr', txt: 'delivered' };
			default:
				return { bg: 'badge_txt col-gra-l', txt: 'rejected' };
		}
	};
	let tempbadge = getBadgeColor(status);
	return <span className={`${tempbadge.bg} heading_small_1 weit-2`}>{tempbadge.txt}</span>;
};

export default TxtBadge;

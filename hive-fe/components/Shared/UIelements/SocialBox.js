import React from 'react';
import sprite from '../../../Assets/imagery/svg/socials/sprite.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import UseAnalyticsData, { choices } from '../../../hooks/UseAnalyticsData';

const SocialBox = ({ small = false, classes, path = '' }) => {
	const chunk = UseAnalyticsData(choices.MED);

	const { userInfo } = useSelector((s) => s.user);
	const mainURL = `https://mysoko.app/${userInfo.shopURL}${path ? '/' + path : ''}`;
	const analyse = () => window.analytics.track('HomeNew', chunk());
	return (
		<div className={`social_box flexi gap-15 ${small ? 'small' : 'big'} ${classes}`}>
			<Link className='social_box_link' onClick={analyse}>
				<TwitterShareButton size={32} url={mainURL}>
					<svg>
						<use xlinkHref={sprite + '#twitter'} />
					</svg>
				</TwitterShareButton>
			</Link>
			<FacebookShareButton url={mainURL}>
				<Link className='social_box_link' onClick={analyse}>
					<svg>
						<use xlinkHref={sprite + '#wapp'} />
					</svg>
				</Link>
			</FacebookShareButton>
			<WhatsappShareButton url={mainURL}>
				<Link className='social_box_link' onClick={analyse}>
					<svg>
						<use xlinkHref={sprite + '#fb'} />
					</svg>
				</Link>
			</WhatsappShareButton>
		</div>
	);
};

export default SocialBox;

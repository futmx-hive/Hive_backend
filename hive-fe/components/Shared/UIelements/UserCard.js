import HideOnMobile from "@layout/HideOnMobile";
import _ from "@sharedUi/UserCard.module.scss";
export default function UserCard() {
	return (
		<div className='flexi gap-25'>
			<span className={`pos-r ${_.icon}`}>
				<svg className='small_svg'>
					<use xlinkHref='/svg/sprite/sprite.svg#noti'></use>
				</svg>
				<span className='dot bg-pri-light'></span>
			</span>
			<HideOnMobile>
				<article className='user_card flexi gap-15'>
					<div className='tiny-ci center-grid upp heading_small bg-gr br col-w'>EA</div>

					<h5 className='heading_small cap'> Dr Enesi Aminu</h5>

					<button>
						<svg className='small_svg'>
							<use xlinkHref='/svg/sprite/sprite.svg#down'></use>
						</svg>
					</button>
				</article>
			</HideOnMobile>
		</div>
	);
}

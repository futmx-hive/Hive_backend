import Select from '@form-components/Select2';
import OnAndOffBtn from '@shared/SmallComponents/OnAndOffBtn';
import _ from '../style.module.scss';

const Settings = [
	{
		type: 'login alerts',
		options: [
			{
				title: 'push Notifications',
				status: true,
			},
			{
				title: 'send to email',
				status: false,
			},
			{
				title: 'text to phone',
				status: false,
			},
		],
	},
	{
		type: 'Transaction Alerts',
		options: [
			{
				title: 'push notifications',
				status: true,
			},
			{
				title: 'send to email',
				status: true,
			},
			{
				title: 'text to phone',
				status: false,
			},
		],
	},
];

function Preferences() {
	return (
		<section className={`${_.pref_box}`}>
			<form action='' className='form_pkg'>
				<Select label={'local currency'} placeholder={'select local currency'} />
				<h4 className='heading_avg weit-2 cap'> notifications</h4>
				{Settings.map((setting) => (
					<SinglePreference key={setting.type} {...setting} />
				))}
			</form>
		</section>
	);
}

export default Preferences;

function SinglePreference({ type, options }) {
	return (
		<aside>
			<h5 className='heading_small weit-2 cap'>{type}</h5>
			<article className={`${_.pref_item}`}>
				{options.map((option, index) => {
					return (
						<div key={index} className='flexi sp-btw p-x-1'>
							<p className='heading_small cap'>{option.title}</p>
							<OnAndOffBtn on={option.status} />
						</div>
					);
				})}
			</article>
		</aside>
	);
}

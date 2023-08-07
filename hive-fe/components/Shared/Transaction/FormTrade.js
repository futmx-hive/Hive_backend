import Card from '@sharedUi/Card';
import { Tabs, TabBtn, TabPanel, TAB_DESIGNS } from '@sharedUi/Tabs';
import UseTabs from '@hooks/UseTabs';
import CtaButton from '@sharedUi/CtaButton';
import Field from '@form-components/Field';
import Select2 from '@form-components/Select2';
function FormTrade({ close, classes = '' }) {
	const [active, setActive] = UseTabs(0);
	return (
		<Card stop xtraClassNames={`${classes}`}>
			<Tabs classes='' onChange={setActive} value={active} design={TAB_DESIGNS.BUTTON} max={2}>
				<TabBtn  label={'Buy'} />
				<TabBtn label={'sell'} />
				<TabBtn label={'swap'} />
			</Tabs>
			<div className='p-2'>
				<TabPanel index={0} value={active}>
					<ConfigForm cancel={close} />
				</TabPanel>
				<TabPanel index={1} value={active}>
					<ConfigForm cancel={close} />
				</TabPanel>
				<TabPanel index={2} value={active}>
					<ConfigForm cancel={close} />
				</TabPanel>
			</div>
		</Card>
	);
}

export default FormTrade;

function ConfigForm({ cancel }) {
	const Label = () => {
		return (
			<aside className='flexi gap-15'>
				<div className='flexi heading_small'>
					<span className='mr-m  weit-2 upp'>rice</span>
					<span className='mr-m col-gra-l  weit-2 upp'>rce</span>
				</div>
				<span className='bg-gr btn_small smaller tablet'>₦50,000</span>
			</aside>
		);
	};
	return (
		<form action='' className='form_pkg'>
			<Select2
				label='commodity wallet'
				placeholder=''
				value={{
					label: <Label />,
					value: 'sallamalekum',
				}}
			/>
			<Select2
				label='transfer to'
				placeholder=''
				value={{
					label: <Label />,
					value: 'sallamalekum',
				}}
			/>
			<Field
				label={'Amount to swap'}
				type={'number'}
				fieldStyles={{
					fontSize: '24px',
				}}
				placeholder={'₦ 0.00'}
				supportingContent={
					<>
						<div
							className='center-flex bg-w'
							style={{
								paddingRight: '15px',
							}}>
							<span className='bg-or col-bl center-flex tablet btn_small  '>fee: 499</span>
						</div>
					</>
				}
			/>
			<div className='grid_txt_1'>
				<CtaButton text={'buy maize'} />
				<button onClick={cancel ? cancel : () => null} className='btn_txt col-bl' type='button'>
					cancel
				</button>
			</div>
		</form>
	);
}

export { ConfigForm };

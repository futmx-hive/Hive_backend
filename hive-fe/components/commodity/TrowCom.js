import HideOnMobile from '@layout/HideOnMobile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function TrowCom() {
	const { pathname } = useRouter();
	return (
		<tr className='pos-r'>
			<HideOnMobile>
				<td>
					<div className='tiny-ci center-flex bg-or col-pri'>#1</div>
				</td>
			</HideOnMobile>
			<td>
				<div className='grid_txt upp'>
					<p>maize</p>
					<span className='col-gra-d'>smz</span>
				</div>
			</td>
			<td>
				<span>₦ 6,641.20</span>
			</td>
			<HideOnMobile>
				<td>
					<span className='cap'>per ton</span>
				</td>
				<td>
					<span color='col-gr'>+6.04%</span>
				</td>
				<td>
					<img src='/photos/tiny_chart_g.png' alt='simple_img' />
				</td>
				<td>
					<Link href={`${pathname}/7777797`}>
						<a className='btn_med btn_pri tablet'>Buy</a>
					</Link>
				</td>
			</HideOnMobile>
		</tr>
	);
}

export default TrowCom;

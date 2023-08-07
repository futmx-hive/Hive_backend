import Icon from "@shared/SmallComponents/Icon";
import React from "react";
import _ from "./forms.module.scss";

function FormOAuth() {
	return (
		<section>
			<div className={`con_1_1 `}>
				<button className={`${_.oauth_btn} heading_small weit-2 flexi tablet btn_med center-flex`}>
					<Icon id={"#google"} />
					<span className='col-bl'>Google</span>
				</button>

				<button className={`${_.oauth_btn} heading_small weit-2 flexi  tablet btn_med center-flex`}>
					<Icon id={"#facebook"} />
					<span className='col-bl'>FaceBook</span>
				</button>
			</div>
		</section>
	);
}

export default FormOAuth;

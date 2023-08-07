import { faker } from "@faker-js/faker";
import UseItemDrag, { itemTypes } from "@hooks/UseItemDrag";
import React from "react";

function StudentCard({ name, matricNo, classes = "" }) {
	const { drag, isDragging } = UseItemDrag({ type: itemTypes.STUDENT });

	name = name || faker.name.fullName();

	return (
		<div
			ref={drag}
			className={`flexi gap-15  br  cur-p  ${classes}`}
			style={{
				opacity: isDragging ? 0 : 1,
			}}
		>
			<div className='tiny-ci br upp heading_small bord-g-1  col-w center-flex hidden'>
				<img src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}&backgroundType=solid`} alt='' />
			</div>
			<div className='grid_txt'>
				<h6 className='heading_small'>{name}</h6>
				<h6 className='heading_small'>{matricNo || "2016/1/78906CI"}</h6>
			</div>
		</div>
	);
}

export default StudentCard;

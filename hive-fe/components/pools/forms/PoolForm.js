import Field from "@form-components/Field";
import Select2 from "@form-components/Select2";
import CSVUpoloader from "@form-components/CSVUploader";
import OnAndOffBtn from "@shared/SmallComponents/OnAndOffBtn";
import Card from "@sharedUi/Card";
import AssignmentBoard from "@components/Project/components/AssignmentBoard";
import CtaButton from "@sharedUi/CtaButton";
import { years } from "@utils/index";
import { useRouter } from "next/router";
import { useState } from "react";

function PoolForm() {
	const [students, setStudents] = useState([]);
	const router = useRouter();
	return (
		<div className='container'>
			<Card>
				<div className='form_pkg p-5'>
					<div className='form_grid_2'>
						<Select2 id={"x"} label={"select year"} options={years} />
						<Field label={"creator"} type='string' />
					</div>
					<Select2
						label={"supervisors"}
						id={"y"}
						placeholder='select supervisors'
						options={[
							{
								label: "masters",
								value: "blah",
							},
						]}
					/>

					<Select2
						// isLoading
						label={"students type"}
						placeholder={"e.g undergraduate masters or PHD"}
						options={[
							{
								label: "masters",
								value: "blah",
							},
						]}
					/>
					<Field
						typeOfField={"textarea"}
						label={"description"}
						placeholder={"briefly describe thie data in the pool"}
					/>
					<div className='mt-2'>
						<CSVUpoloader
							type='csv'
							onChange={(data) => {
								console.log(data);
								setStudents(data);
							}}
						/>
					</div>
					<Select2
						label={"select allocation technique"}
						placeholder={"how do you want students to be assigned?"}
						options={[
							{ label: "random", value: "random" },
							{ label: "Assignee rank", value: "rank" },
							{ label: "Student performance", value: "performance" },
						]}
					/>
					{students.length && <AssignmentBoard students={students} />}
					<div className='flexi gap-25 mt-4'>
						<OnAndOffBtn name={"lock"} />
						<label htmlFor='lock' className='heading_md col-gra-l'>
							{" "}
							lock this pool to prevent updates by another admin{" "}
						</label>
					</div>
					<div className='u-center p-3 center-flex'>
						<CtaButton classes='btn_wide_1' onClick={() => router.push("/pools")}>
							{router.query.id ? "update pool" : "	create pool"}
						</CtaButton>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default PoolForm;

import SmallLoader from "@shared/SmallComponents/SmallLoader";
import Image from "next/image";
import _ from "../forms.module.scss";

export default function ProjectUploadSkin({
	isOver,
	canDrop,
	loading,
	count,
	uploadTypeData = getDetailsForUploadType(),
	tempLoader,
}) {
	return (
		<section className='p-y-5'>
			<div className={`grid_txt_2  u-center`}>
				<aside className={`${_.project_up_box} round center-grid br-1 p-2 m-auto hidden`}>
					<div className='grid_txt_1 center-grid'>
						{/* <img src='/svg/uplooad_proj.svg' height={130} /> */}
						<img
							src={uploadTypeData.image}
							height={uploadTypeData.value ? 280 : 170}
							className={`br-1 mt-2 ${uploadTypeData.value && "ml-5"}`}
							alt='_txtt'
						/>
					</div>
				</aside>

				{canDrop && !loading ? (
					<p className='heading_small col-bl cap'>drop files here</p>
				) : (
					<p className='heading_med_2 weit-1 col-gra-bt-d container-c718'>{uploadTypeData.title} </p>
				)}

				{loading ||
					(tempLoader && (
						<div className='heading_tiny col-gra-d weit-2 cap flexi center-flex gap-15'>
							<span> processing files...</span>

							<SmallLoader transform='translateY(-100%)' scale={0.4} />
						</div>
					))}

				{!loading && (
					<p className='col-gra-l grid_txt'>
						<span>
							{" "}
							{uploadTypeData.description} &nbsp;
							{uploadTypeData.value !== null && (
								<>
									<span className='upp col-pri weit-2 ml-m'> docx </span> &nbsp; files
								</>
							)}
						</span>
					</p>
				)}
			</div>
		</section>
	);
}

export function getDetailsForUploadType(uploadType = null) {
	switch (uploadType) {
		case 1:
			return {
				image: "/photos/flat.png",
				title: "Drag and drop or Select Project(s) to upload",
				description: "import projects by selecting one or more docx files",
				value: 1,
			};

		case 2:
			return {
				image: "/photos/nested-folder.png",
				title: "Click to import projects by selecting a folder with one or more nested folders with .docx files",
				description: " select a folder with Project(s) to upload",
				value: 2,
			};

		default:
			return {
				image: "/svg/uplooad_proj.svg",
				title: "Select an upload type to begin",
				description: "choose how you have the projects organized on your computer",
				value: null,
			};
	}
}

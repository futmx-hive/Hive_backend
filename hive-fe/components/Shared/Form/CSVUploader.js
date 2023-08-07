import React, { Fragment } from "react";
import SmallLoader from "../SmallComponents/SmallLoader";
import { FileUploader } from "./FileUploader";

const CSVUploader = (props) => {
	return <FileUploader {...props} body={<Skin count={props.count} />}></FileUploader>;
};

export default CSVUploader;

function Skin({ isOver, canDrop, loading, count }) {
	return (
		<Fragment>
			<div className='u-center'>
				<img src='/photos/csv.png' height={120} />
			</div>
			{canDrop && !loading ? (
				<p className='heading_small col-bl cap'>drop files here</p>
			) : (
				<p className='heading_small_1 col-bl cap'>
					{count > 1 ? "drag and drop CSVs here" : "drag and drop a CSV file here"}{" "}
				</p>
			)}

			{loading && (
				<div className='heading_tiny col-gra-d weit-2 cap flexi'>
					<span> processing files...</span>

					<SmallLoader scale={0.4} />
				</div>
			)}

			{!loading && (
				<p className='col-gra-l grid_txt'>
					<span>
						{" "}
						import csv files
						<span className='upp col-pri weit-2 ml-m'> 7mb maximum per file </span>{" "}
					</span>
				</p>
			)}
		</Fragment>
	);
}

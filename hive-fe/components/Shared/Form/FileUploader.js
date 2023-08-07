import React, { Fragment, useState, useEffect } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import UseToggle from "@hooks/UseToogle";
import SmallLoader from "../SmallComponents/SmallLoader";
import { convertCSVFileToJSON, parseImagesB64 } from "@utils/index";

export const FileUploader = ({
	small,
	multiple = true,
	type = "image",
	count,
	onChange,
	onDelete,
	images,
	body,
	disabled,
	children,
	imageUrls,
	maxSize = 7 * 1024 * 1024,
	extraInputProps = {},
	preventDragAndDrop = false,
	isLoading,
}) => {
	const { isOpen: loading, open: setLoading, close: stopLoading } = UseToggle(true);
	const [files, setFiles] = useState([]);
	const [error, setError] = useState("");
	// const [pFiles, setPFiles] = useState (null);
	const handleDrop = (files) => {
		setFiles(files);
		setError("");
		setLoading();
	};

	const handleSingleFile = (file) => {
		if (typeof file === "object") return file.dataURI;
		return file;
	};
	const [{ canDrop, isOver }, ref] = useDrop(() => ({
		accept: NativeTypes.FILE,
		drop(item) {
			if (!disabled) handleDrop(item.files);
		},
		collect: (monitor) => ({
			canDrop: !preventDragAndDrop && !!monitor.canDrop(),
			isOver: !preventDragAndDrop && !!monitor.isOver(),
		}),
	}));

	const getfiles = async () => {
		if (!files.length) return stopLoading();

		if (preventDragAndDrop) {
			stopLoading();
			return onChange(files);
		}

		const res = await process(files, type, count, maxSize);
		stopLoading();
		console.log({ res });
		if (!res.success) return setError(res.message);

		onChange(res.data);
	};

	useEffect(() => {
		getfiles();
	}, [files, type]);
	const computedClass = (params) => {
		if (canDrop || isOver)
			return {
				style: {
					borderColor: "hsl(120, 1%, 16%)",
					background: "hsla(120, 1%, 16%.06)",
				},
				class: "bg-g-1",
			};
		return {
			style: {},
			class: "",
		};
	};
	const styles = computedClass();
	return (
		<Fragment>
			<label
				className={`br bord-g-1 center-flex fllback small p-3  ${styles.class}`}
				style={{
					cursor: "pointer",
					pointerEvents: loading ? "none" : "auto",
					...styles.style,
				}}
				htmlFor='filles'
				ref={preventDragAndDrop ? null : ref}
			>
				<input
					onChange={(e) => {
						handleDrop(e.target.files);
					}}
					type='file'
					multiple={multiple}
					name='filles'
					id='filles'
					accept=''
					disabled={disabled}
					{...{ ...extraInputProps }}
				/>
				<div className='grid_txt_2 u-center' htmlFor='files'>
					{body &&
						React.cloneElement(body, {
							isOver,
							canDrop,
							loading,
						})}
				</div>
			</label>
			{/* <small className='small weit-2 col-r'>{error + "pppp"}</small> */}

			{children}
		</Fragment>
	);
};

async function process(files, type, count, size) {
	const map = {
		image: /png|jpe?g|jfif/i,
		xls: /xlsx|xls|xlsm/i,
	};

	switch (type) {
		case "image": {
			try {
				if (typeof files[0] === "string") return;

				let images = await parseImagesB64(files, map["image"], count, size);
				const fileArr = images.map((e) => ({
					shouldCompress: true,
					dataURI: e,
				}));

				return {
					success: true,
					data: fileArr,
				};
			} catch (error) {
				// console.log ({error});
				return {
					success: false,
					files: null,
					message: error.message,
				};
			}
		}
		case "csv": {
			try {
				if (typeof files[0] === "string") return;

				let data = await convertCSVFileToJSON(files[0]);

				return {
					success: true,
					data: data,
				};
			} catch (error) {
				// console.log ({error});
				return {
					success: false,
					files: null,
					message: error.message,
				};
			}
		}

		default:
			return {
				success: false,
				message: " oopsie invalid file expected a " + type + "file",
			};
	}
}

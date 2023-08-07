import axios from "axios";
import Papa from "papaparse";
import mammoth from "mammoth";

export const readAs = {
	txt: "txt",
	binary: "binary",
	dataUrl: "dataurl",
};

const readFile = (file, regex = null, as = readAs.txt) =>
	new Promise((res, rej) => {
		const reader = new FileReader();
		// console.log({ name: file.name, r: regex });

		if (regex) {
			if (!regex.test(file.name) && file.name) throw Error("files not supported ");
		}
		reader.addEventListener("load", () => res(reader.result));
		reader.addEventListener("error", () => rej(reader.error));
		if (as === readAs.binary) {
			reader.readAsArrayBuffer(file);
		} else if (as === readAs.dataUrl) {
			reader.readAsDataURL(file);
		} else {
			reader.readAsText(file);
		}
	});

async function parseImagesB64(files, regex, count, size = 0) {
	if (files.length > count)
		throw Error(`Only a maximum of ${count} ${count === 1 ? "file is" : "files are"} allowed`);
	console.log({ ffile: files });
	const processedFiles = [];
	for (let file of files) {
		try {
			if (size && file?.size > size) {
				throw Error(`Each file should have a maximum size of ${size / 1024 / 1024}MB`);
			}
			const b64File = await readFile(file, regex);
			processedFiles.push(b64File);
		} catch (error) {
			throw error;
		}
	}
	return processedFiles;
}
const searchJson = (JsonArray, searchKey) => {
	searchKey = searchKey.trim().replace(/\W/g, (e) => (e === " " ? " " : ""));

	if (!searchKey || !JsonArray.length) return JsonArray;
	const searchRes = [];

	for (let i = 0; i < JsonArray.length; i++) {
		searchKey = new RegExp(searchKey, "ig");
		let el = JsonArray[i];
		if (searchKey.test(JSON.stringify(Object.values(el)))) searchRes.push(el);
		else continue;
	}

	return searchRes;
};

function getRemoteFile(url, clb) {
	let img = new Image();

	img.setAttribute("crossOrigin", "anonymous");
	return new Promise((res, rej) => {
		img.onload = function () {
			let canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;

			let ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);

			let dataURL = canvas.toDataURL();
			res(dataURL);
		};

		img.src = url;
	});
}

const formatDigits = (number) => {
	let str = number.toString().split("").reverse().join("");
	return str
		.replace(/(\d{3})(?!$)/g, (_, b) => b + ",")
		.split("")
		.reverse()
		.join("");
};

const processOffset = (gmtOffset) => {
	if (!gmtOffset) return 0;
	const sign = gmtOffset.charAt(0);
	let [hr, min] = gmtOffset.slice(1).split(":");
	hr = hr * 60 * 60 * 1000;
	min = min * 60 * 1000;

	if (sign === "+") return hr + min;
	return -(hr + min);
};
const parseDateTime = (data, offset) => {
	data = new Date(data).getTime() + processOffset(offset);
	data = new Date(data).toISOString();
	const chunk = data.replace(/[tz]/gi, " ").split(" ");
	return {
		d: chunk[0].replace(/-/g, "/"),
		t: chunk[1].match(/^\d+?:\d{1,2}/)[0],
	};
};

const cleanDataURI = (data) => data.map((img) => img.replace(/^data:image\/(jpeg|png|jpg|webp);base64,/i, ""));

const cap = (text) => (text ? text[0].toUpperCase() + text.slice(1) : "");

const getInitials = (str = "") => {
	str = str.split(" ");
	const res = [];
	for (let i = 0; i < 2; i++) {
		if (!str[i]) continue;
		res.push(str[i].charAt(0).toUpperCase());
	}
	return res;
};

const parseDateToNum = (clb) => (chunk) => {
	let { payload } = chunk;
	payload = new Date(payload).getTime();

	chunk.payload = payload;
	clb(chunk);
};

const parseNumToDate = (timeStamp) => (timeStamp === 0 ? "" : new Date(timeStamp).toLocaleDateString("fr-CA"));

const compressImage = async (dataURI) => {
	const blob = await imageCompression.getFilefromDataUrl(dataURI);

	const compressedFile = await imageCompression(blob, {
		maxWidthOrHeight: 1000,
		useWebWorker: true,
		// fileType: 'JPEG',
	});

	console.log({
		diff: blob.size - compressedFile.size,
	});
	const newdataURI = await imageCompression.getDataUrlFromFile(compressedFile);

	return newdataURI;
};

const papaConfig = {
	delimiter: "", // auto-detect
	newline: "", // auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	download: false,
	skipEmptyLines: true,
	delimitersToGuess: [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP],
};
const convertCSVFileToJSON = async (file, options = {}) => {
	return new Promise((res, rej) => {
		Papa.parse(file, {
			...papaConfig,
			header: true,
			...options,
			complete: (data) => res(data.data),
		});
	});
};
const years = [];

const thisYear = new Date().getFullYear();

for (let i = thisYear; i > thisYear - 8; i--) {
	years.push({
		label: i.toString(),
		value: i.toString(),
	});
}

class DocumentProcessor {
	static introProjectMatches = () => [
		/(ACKNOWLEDGEMENTS?)|(CERTIFICATION)/gi,
		/([\S\s]abstract)|(\/[\S]abstract)/gi,
		/(TABLE.{0,8}(OF)?.{0,8}CONTENTS?)[\s\w\W]+?((CHAPTER\s?FIVE))/gi,
	];
	static remainingDocMatches = () => [
		/Background\s+of|to\s+(the)?\s+study/gi,
		/CHAPTER.{1,8}?FIVE\s+?[^\W]/gi,
		/Conclusion|\sREFE?RENCES\s/gi,
	];
	static projectTypes = {
		SINGLE: "SINGLE",
		MULTIFILE: "MULTIFILE",
	};
	static async convertTo(doc, type = "html") {
		const arrayBuffer = await readFile(doc, /\.docx?/, readAs.binary);
		let fileData = "";
		if (type === "html") {
			fileData = await mammoth.convertToHtml(
				{
					arrayBuffer,
				},
				{
					ignoreEmptyParagraphs: true,
				},
			);
		} else {
			fileData = await mammoth.extractRawText({
				arrayBuffer,
			});
		}

		return fileData.value;
	}

	static detectCompleteDoc(plainDocxString) {
		const matches = [...DocumentProcessor.introProjectMatches(), ...DocumentProcessor.remainingDocMatches()];
		return DocumentProcessor.detect(plainDocxString, matches);
	}
	static detectIntro(plainDocxString) {
		const matches = [...DocumentProcessor.introProjectMatches()];
		return DocumentProcessor.detect(plainDocxString, matches);
	}
	static detectMainArticle(plainDocxString) {
		const matches = [...DocumentProcessor.remainingDocMatches()];
		return DocumentProcessor.detect(plainDocxString, matches);
	}
	static detect(plainDocxString, matches) {
		for (let i = 0; i < matches.length; i++) {
			const pattern = matches[i];

			const res = pattern.exec(plainDocxString);

			if (res) {
				if (pattern[i + 1]) pattern[i + 1].lastIndex = res.index + res[0].length;
			} else return false;
		}
		return true;
	}
}
export const token =
	"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDAzYWExN2JjMDAzYmM2YTkxMzdjMTUiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5vbmNlIjoiOTAwMDBpdWl4a3ciLCJpYXQiOjE2ODEzMzM3NzAsImV4cCI6MTY4Mjc3Mzc3MCwiaXNzIjoiaGl2ZWMifQ.REOIP2WclRiyEOo7cwD5essmm-Dza5B4E_qLrt40i170y-NeI24tKE7lxfUxGCRoZPwOaTr2fV2j3HcfOmiJPorXBkO9V2OkdvHtnm6Kbq6ESIfT8Od1wXwijCt_WIhFyv0Or48YbMy2E5E54lahJpLbvdJ0GUjDCDOZnYpzBXEYj8pPtYUM4kMiBsSHz3dYr5Se85xOkqJ1LiuohagFk1MYqg0ZNtMnPN_ikpvA0fmmpP0EjZ1p3RoDSTkEdzdlYlK59XlMBXCcGGyDygrA3swAEWN3JnaDfPAESRibVWHP1GOKlnFEls1nm6xNbP4SnJMRjbnw_-4C0_oNLovcfQ";
export {
	compressImage,
	parseImagesB64,
	processOffset,
	searchJson,
	getRemoteFile,
	formatDigits,
	readFile,
	parseDateTime,
	cleanDataURI,
	cap,
	getInitials,
	parseDateToNum,
	parseNumToDate,
	convertCSVFileToJSON,
	years,
	DocumentProcessor,
};

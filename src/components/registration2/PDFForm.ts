/* eslint-disable */
// @ts-nocheck
// adapted from https://github.com/ZenLiuCN/PDFForm/blob/master/PDFForm.ts
// this file: apache 2.0 license

import * as pako from "pako";
/*import {NuxtAxiosInstance} from "nuxt";*/

/**
 * not support PDF with radio button
 * not sure about how to use checkbox
 * ===============================================================
 * this module is mostly from https://github.com/phihag/pdfform.js
 * ===============================================================
 * 1. change into typescript,old repo is old school javascript(even not a ES style)
 * 2. make some codes more easy to read
 * 3. remove pdfjs dependency
 * 4. fix for muilt Tx field
 * 5. fix for checkbox field
 * 5. add help function for convert blob into arraybuffer (so you donot need to GOOGLE it)
 * 7. add help function for download blob or show in window (so you donot need to GOOGLE it)
 * 8. tested with browser (chrome ,not in IE or edege)
 * by zen.liu 2019-11-01
 */

const debug = false;
//<editor-fold desc="MiniPDF">
declare type map = { [key: string]: any };

class Name {
	constructor(public name: string) {}
}

class Dict {
	constructor(public map: map) {}
}

class Stream {
	constructor(
		public map: map,
		public content: Uint8Array,
		public dict = new Dict(map)
	) {}

	getBytes() {
		return this.content;
	}
}

class Ref {
	constructor(public num: number, public gen: number) {}
}

const isName = (obj: any) => obj instanceof Name;
const isDict = (obj: any) => obj instanceof Dict;
const isStream = (obj: any) => obj instanceof Stream;
const isRef = (obj: any) => obj instanceof Ref;

const isBool = (obj: any) => typeof obj == "boolean";
const isNull = (obj: any) => obj === null;
const isString = (obj: any) => typeof obj == "string";
const isNum = (obj: any) => typeof obj == "number";
const isArray = (obj: any) => obj instanceof Array;

function newStream(map: map, content: Uint8Array) {
	assert(
		content instanceof Uint8Array,
		"stream content must be an Uint8Array"
	);
	return new Stream(map, content);
}

function assert(x: any, msg?: string) {
	if (x) return;
	// log.error(msg ? msg : 'Assertion failed');
	throw new Error(msg ? msg : "Assertion failed");
}

function str2buf(s: string): Uint8Array {
	let uint = new Uint8Array(s.length);
	let idx = 0;
	for (let i of s) {
		uint[idx] = i.charCodeAt(0);
		idx++;
	}
	return uint;
}

function png_filter(content: Uint8Array, columns: number) {
	let cols = columns + 1;
	let rows = content.length / cols;
	assert(
		rows % 1 === 0,
		"Invalid column value " + cols + " for image width " + content.length
	);
	let res = new Uint8Array(columns * rows);
	for (let y = 0; y < rows; y++) {
		let x;
		let filter = content[y * cols];
		if (filter === 0) {
			for (x = 0; x < columns; x++) {
				res[y * columns + x] = content[y * cols + 1 + x];
			}
		} else if (filter === 2) {
			for (x = 0; x < columns; x++) {
				let prev = y === 0 ? 0 : res[(y - 1) * columns + x];
				res[y * columns + x] =
					(prev + content[y * cols + 1 + x]) & 0xff;
			}
		} else {
			throw new Error("Unsupported PNG filter " + filter);
		}
	}
	return res;
}

function _merge_xrefs(xref_table: Array<map>, prev: Array<map>) {
	const len = Math.max(xref_table.length, prev.length);
	for (let i = 1; i < len; i++) {
		if (!prev[i]) {
			continue;
		}
		if (!xref_table[i]) {
			xref_table[i] = prev[i];
		}
	}
}

function inflate(content: Uint8Array, params_map: map) {
	let columns;
	let predictor = 1;
	if (params_map) {
		predictor = params_map.Predictor;
		columns = params_map.Columns;
		if (params_map.Colors) {
			if (params_map.Colors != 1) {
				throw new Error(
					"Unsupported predictor Colors value: " + params_map.Colors
				);
			}
		}
		if (params_map.BitsPerComponent) {
			if (params_map.BitsPerComponent != 8) {
				throw new Error(
					"Unsupported predictor BitsPerComponent value: " +
						params_map.BitsPerComponent
				);
			}
		}
	}
	let res = pako.inflate(content);
	if (predictor == 1) {
		return res;
	}
	assert(columns > 0, "columns must be set for PNG predictors");
	if (predictor >= 10 && predictor <= 15) {
		res = png_filter(res, columns);
	} else {
		throw new Error("Unsupported predictor " + predictor);
	}
	return res;
}

function parse(buf: Uint8Array) {
	return new PDFDocument(buf);
}

class PDFDocument {
	public xref: Array<map>;
	public meta: map;
	public root: Stream;
	public acroForm: Stream;
	public xref_type: string;
	private version: string;

	constructor(
		public buf: Uint8Array,
		private _cached_object_streams: map = {},
		private reader: PDFReader = new PDFReader(buf),
		public startXRef: number = find_startxref(buf)
	) {
		check_header(buf);
		this.reader.pos = this.startXRef;

		const xref_res = this.reader.parse_xref();

		this.xref = xref_res.xref;
		assert(isArray(this.xref));
		this.meta = xref_res.meta;
		assert(this.meta.Root, "meta.Root missing");
		assert(isRef(this.meta.Root), "meta.root should be Ref");
		this.root = this.fetch(this.meta.Root);
		this.xref_type = this.reader.xref_type;
		const af_node = this.get_acroform_ref();
		if (isRef(af_node)) {
			this.acroForm = this.fetch(af_node);
		} else {
			this.acroForm = af_node;
		}
	}

	get_root_id() {
		return this.meta.Root.num;
	}

	get_xref_entries() {
		return this.xref;
	}

	get_acroform_ref() {
		return this.root.map.AcroForm;
	}

	fetch(ref: Ref, recursive?: boolean) {
		assert(ref instanceof Ref);
		const xref_entry = this.xref[ref.num];
		if (!xref_entry) {
			throw new Error("Cannot find object " + ref.num + " in xref table");
		}
		if (xref_entry.type === 0) {
			throw new Error("Cannot fetch a free object");
		}
		if (xref_entry.type == 2) {
			if (recursive) {
				throw new Error(
					"Cannot fetch object stream inside object stream"
				);
			}
			if (ref.gen !== 0) {
				throw new Error(
					"Object with reference " +
						ref.gen +
						" cannot be found in object stream"
				);
			}
			let object_stream = this._cached_object_streams[xref_entry.offset];
			if (!object_stream) {
				const object_stream_obj = this.fetch(
					new Ref(xref_entry.offset, 0),
					true
				);
				object_stream = parse_object_stream(object_stream_obj);
				this._cached_object_streams[xref_entry.offset] = object_stream;
			}
			if (!(ref.num in object_stream)) {
				throw new Error(
					"Could not find object " +
						ref.num +
						" in object stream with entries " +
						JSON.stringify(Object.keys(object_stream))
				);
			}
			let res = object_stream[ref.num];
			return res;
		}
		if (ref.gen != xref_entry.gen) {
			throw new Error(
				"Invalid generation: Asked for " +
					ref.gen +
					", table has " +
					xref_entry.gen
			);
		}
		this.reader.pos = xref_entry.offset;
		const obj = this.reader.parse_object();
		if (obj.num !== ref.num) {
			throw new Error(
				"Expected to read object with ID " +
					ref.num +
					", but found " +
					obj.num
			);
		}
		if (obj.gen !== ref.gen) {
			throw new Error(
				"Expected to read object with gen " +
					ref.gen +
					", but found " +
					obj.gen
			);
		}
		return obj.obj;
	}
}

class PDFReader {
	public xref_type: string;

	constructor(public buf: Uint8Array, public pos: number = 0) {
		// noinspection SuspiciousTypeOfGuard
		assert(
			buf instanceof Uint8Array,
			"Expected a buffer of type Uint8Array"
		);
		assert(buf.BYTES_PER_ELEMENT === 1, "not a Uint8Array!");
	}

	skip_space() {
		while (this.pos < this.buf.length) {
			const c = this.buf[this.pos];
			if (c == 9 || c == 10 || c == 13 || c == 32) {
				this.pos++;
			} else {
				break;
			}
		}
	}

	skip_start(str: string) {
		if (startswith(this.buf, this.pos, str)) {
			this.pos += str.length;
			return true;
		}
		return false;
	}

	read_uint(len: number) {
		let res = 0;
		while (len > 0) {
			// noinspection TypeScriptValidateTypes
			assert(
				this.buf[this.pos] !== undefined,
				"reading uint at position " +
					this.pos +
					" of " +
					this.buf.length
			);
			res = ((res << 8) | (this.buf[this.pos] & 0xff)) >>> 0;
			this.pos++;
			len--;
		}
		return res;
	}

	parse_string() {
		let res = "";
		let parens = 1;
		while (this.pos < this.buf.length) {
			let c = String.fromCharCode(this.buf[this.pos]);
			this.pos++;
			if (c == ")") {
				parens--;
				if (parens === 0) {
					break;
				}
				res += c;
			} else if (c == "(") {
				parens++;
				res += c;
			} else if (c == "\\") {
				c = String.fromCharCode(this.buf[this.pos]);
				this.pos++;
				switch (c) {
					case "n":
						res += "\n";
						break;
					case "r":
						res += "\r";
						break;
					case "t":
						res += "\t";
						break;
					case "\r":
					case "\n":
						break;
					case "\\":
					case "(":
					case ")":
						res += c;
						break;
					default:
						throw new Error('Unsupported escape "' + c + '"');
				}
			} else {
				res += c;
			}
		}
		return res;
	}

	parse_hex_string() {
		const start_pos = this.pos;
		while (this.pos < this.buf.length) {
			if (this.buf[this.pos] == ">".charCodeAt(0)) {
				break;
			}
			this.pos++;
		}
		let hex_str = buf2str(this.buf, start_pos, this.pos);
		this.pos++;
		if (hex_str.length % 2 == 1) {
			hex_str += "0";
		}
		if (!/^[0-9A-Fa-f]*$/.test(hex_str)) {
			throw new Error("Invalid hex string " + hex_str);
		}
		return hex_str.replace(/([0-9A-Fa-f]{2})/g, (_, args) =>
			String.fromCharCode(parseInt(args[0], 16))
		);
	}

	parse_num() {
		let res = 0;
		const first_pos = this.pos;
		while (this.pos < this.buf.length) {
			const by = this.buf[this.pos];
			if (48 <= by && by <= 57) {
				res = res * 10 + by - 48;
			} else {
				break;
			}
			this.pos++;
		}
		if (first_pos === this.pos) {
			throw new Error("Not an ASCII number byte: " + this.buf[this.pos]);
		}
		return res;
	}

	parse_name() {
		let start_pos = this.pos;
		while (this.pos < this.buf.length) {
			if (PDFReader.DELIM_CHARS.indexOf(this.buf[this.pos]) >= 0) {
				break;
			}
			this.pos++;
		}
		let name = buf2str(this.buf, start_pos, this.pos);
		name = name.replace(/#([0-9a-fA-F]{2})/g, (_, hex) =>
			String.fromCharCode(parseInt(hex, 16))
		);
		return new Name(name);
	}

	static DELIM_CHARS = [
		0,
		9,
		13,
		10,
		32,
		40,
		41,
		60,
		62,
		91,
		93,
		123,
		125,
		47,
		37,
	];

	parse_array() {
		const res: Array<any> = [];
		for (;;) {
			this.skip_space();
			if (this.buf[this.pos] == 93) {
				// ]
				break;
			}
			const el = this.parse();
			res.push(el);
		}
		this.pos++;

		return res;
	}

	parse_dict() {
		const map: map = {};
		while (this.pos < this.buf.length) {
			this.skip_space();
			if (this.skip_start(">>")) {
				break;
			}
			if (!this.skip_start("/")) {
				throw new Error("Key is not a name in dict");
			}
			const k = this.parse_name();
			const v = this.parse();
			map[k.name] = v;
		}
		const sav_pos = this.pos;
		this.skip_space();
		if (
			this.skip_start("stream\r\n") ||
			this.skip_start("stream\n") ||
			this.skip_start("stream")
		) {
			return this.parse_stream_content(map);
		} else {
			this.pos = sav_pos;
			return new Dict(map);
		}
	}

	parse_stream_content(map: map) {
		if (typeof map.Length != "number") {
			throw new Error(
				"Stream Length field missing or invalid: " +
					JSON.stringify(map.Length)
			);
		}
		if (this.pos + map.Length > this.buf.length) {
			throw new Error("Stream Length too large");
		}
		let content = this.buf.subarray(this.pos, this.pos + map.Length);
		this.pos += map.Length;
		this.skip_space();
		if (!this.skip_start("endstream")) {
			throw new Error("Missing endstream");
		}
		if (map.Filter) {
			const filters =
				map.Filter instanceof Array ? map.Filter : [map.Filter];
			const params =
				map.DecodeParms instanceof Array
					? map.DecodeParms
					: [map.DecodeParms];
			for (let i = 0; i < filters.length; i++) {
				let filter_params = params[i];
				switch (filters[i].name) {
					case "FlateDecode":
						content = inflate(
							content,
							filter_params ? filter_params.map : filter_params
						);
						break;
					default:
						throw new Error(
							"Unsupported filter: " +
								JSON.stringify(filters[i].name)
						);
				}
			}
		}
		return new Stream(map, content);
	}

	parse() {
		this.skip_space();
		if (this.skip_start("<<")) {
			return this.parse_dict();
		}
		if (this.skip_start("[")) {
			return this.parse_array();
		}
		if (this.skip_start("(")) {
			return this.parse_string();
		}
		if (this.skip_start("<")) {
			return this.parse_hex_string();
		}
		if (this.skip_start("/")) {
			return this.parse_name();
		}
		if (this.skip_start("true")) {
			return true;
		}
		if (this.skip_start("false")) {
			return false;
		}
		if (this.skip_start("null")) {
			return null;
		}
		const s = buf2str(this.buf, this.pos, this.pos + 32);

		let m = /^([0-9]+)\s+([0-9]+)\s+R/.exec(s);
		if (m) {
			this.pos += m[0].length;
			return new Ref(parseInt(m[1], 10), parseInt(m[2], 10));
		}

		m = /^[+-]?(?:[0-9]*\.[0-9]*|[0-9]+)/.exec(s);
		if (m) {
			this.pos += m[0].length;
			return parseFloat(m[0]);
		}
		throw new Error(
			"Unable to parse " + buf2str(this.buf, this.pos, this.pos + 40)
		);
	}

	parse_xref() {
		let i;
		if (startswith(this.buf, this.pos, "xref")) {
			// Textual xref table;
			this.xref_type = "table";
			return this.parse_xref_table();
		}
		this.xref_type = "stream";

		const obj = this.parse_object().obj;
		let xref: Array<any> = [];

		if ("Prev" in obj.map) {
			const sav_pos = this.pos;
			this.pos = obj.map.Prev;
			xref = this.parse_xref().xref;
			this.pos = sav_pos;
		}

		assert(
			obj instanceof Stream,
			"XRefs should be a stream, got " + JSON.stringify(obj) + " instead"
		);
		assert(
			obj.map.Type.name === "XRef",
			"XRef table should be of Type XRef"
		);
		assert(obj.map.W.length == 3);
		const type_length = obj.map.W[0];
		assert(type_length <= 4);
		const offset_length = obj.map.W[1];
		assert(offset_length >= 1 && offset_length <= 4);
		const gen_length = obj.map.W[2];
		assert(gen_length >= 1 && gen_length <= 4);
		assert(
			obj.content.length % (type_length + offset_length + gen_length) ===
				0,
			"content is " +
				obj.content.length +
				" bytes long, each entry is " +
				JSON.stringify(obj.map.W)
		);

		const total_count =
			obj.content.length / (type_length + offset_length + gen_length);
		let index = obj.map.Index;
		if (index) {
			let aggregate_count = 0;
			for (i = 0; i < index.length; i += 2) {
				assert(typeof index[i] == "number");
				assert(typeof index[i + 1] == "number");
				aggregate_count += index[i + 1];
			}
			assert(
				aggregate_count == total_count,
				"Invalid xref stream index: index says " +
					aggregate_count +
					" objects, but space for " +
					total_count
			);
		} else {
			index = [0, total_count];
		}

		const reader = new PDFReader(obj.content);
		for (let index_i = 0; index_i < index.length; index_i += 2) {
			let first_index = index[index_i];
			let count = index[index_i + 1];

			for (i = 0; i < count; i++) {
				let type = 1;
				if (type_length) {
					type = reader.read_uint(type_length);
				}
				let offset = reader.read_uint(offset_length);
				let gen = reader.read_uint(gen_length);
				let xr_dict: map = {
					type: type,
					offset: offset,
					gen: gen,
				};
				if (type === 0) {
					xr_dict.free = true;
				} else {
					xr_dict.uncompressed = type != 2;
				}
				xref[first_index + i] = xr_dict;
			}
		}
		assert(reader.at_eof());

		return {
			meta: obj.map,
			xref: xref,
		};
	}

	parse_object(): map {
		const s = buf2str(this.buf, this.pos, this.pos + 32);
		const m = /^([0-9]+)\s+([0-9]+)\s+obj/.exec(s);

		if (!m) {
			throw new Error("Missing object ID: " + s);
		}
		const real_num = parseInt(m[1], 10);
		const real_gen = parseInt(m[2], 10);
		this.pos += m[0].length;

		const obj = this.parse();
		this.skip_space();
		if (!this.skip_start("endobj")) {
			throw new Error(
				"endobj missing, current str: " +
					JSON.stringify(buf2str(this.buf, this.pos, this.pos + 32))
			);
		}
		return {
			obj: obj,
			num: real_num,
			gen: real_gen,
		};
	}

	parse_xref_table(): map {
		if (!this.skip_start("xref")) {
			throw new Error("xref table does not start with xref!");
		}
		this.skip_space();
		const start_num = this.parse_num();
		const xref: Array<any> = [];
		for (let j = 0; j < start_num; j++) {
			xref.push(undefined);
		}
		this.skip_space();
		this.parse_num(); // count. Sometimes this is just a lie though, so ignore it
		for (;;) {
			this.skip_space();
			if (this.skip_start("trailer")) {
				break;
			}
			let offset = this.parse_num();
			this.skip_space();
			let gen = this.parse_num();
			this.skip_space();
			let usage = this.buf[this.pos];
			if (usage == 102 || usage == 110) {
				// n and f
				this.pos++;
			} else {
				// no usage character: this means we need to skip
				while (xref.length < offset) {
					xref.push(undefined);
				}
				continue;
			}
			xref.push({
				offset: offset,
				gen: gen,
				is_free: usage === 102,
			});
		}

		const meta: Dict = <Dict>this.parse();
		if (meta! instanceof Dict) {
			throw Error("parse meta error");
		}
		if (meta.map.Prev) {
			this.pos = meta.map.Prev;
			const old = this.parse_xref_table();
			_merge_xrefs(xref, old.xref);
		}

		return {
			xref: xref,
			meta: meta.map,
		};
	}

	at_eof() {
		return this.pos == this.buf.length;
	}
}

function startswith(buf: Uint8Array, pos: number, str: string) {
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) != buf[pos + i]) {
			return false;
		}
	}
	return true;
}

function buf2str(buf: Uint8Array, from: number = 0, to: number = buf.length) {
	const max = Math.min(to, buf.length);
	let res = "";
	for (let i = from; i < max; i++) {
		res += String.fromCharCode(buf[i]);
	}
	return res;
}

function check_header(buf: Uint8Array) {
	if (!startswith(buf, 0, "%PDF-")) {
		throw new Error("Does not look like a PDF file!");
	}
}

function find_startxref(buf: Uint8Array) {
	const s = buf2str(buf, buf.length - 40, buf.length);
	const m = /startxref\s*([0-9]+)/.exec(s);
	if (!m) {
		throw new Error("Cannot find startxref!");
	}
	return parseInt(m[1]);
}

function parse_object_stream(os_obj: Stream) {
	assert(
		os_obj.map.Type.name === "ObjStm",
		"Strange Type for an object stream: " +
			JSON.stringify(os_obj.map.Type.name)
	);
	const s = buf2str(os_obj.content, 0, os_obj.map.First);
	const rex = /\s*([0-9]+)\s+([0-9]+)/g;
	const res: Array<any> = [];
	const r = new PDFReader(os_obj.content);
	for (let i = 0; i < os_obj.map.N; i++) {
		const m = rex.exec(s);
		if (!m) {
			throw new Error(
				"Expected " +
					os_obj.map.N +
					" objects in this object stream, failed to read number " +
					i
			);
		}
		const num = parseInt(m[1], 10);
		const offset = parseInt(m[2], 10);
		r.pos = offset + os_obj.map.First;
		res[num] = r.parse();
	}
	return res;
}

//</editor-fold>

//<editor-fold desc="PdfForm">
class BytesIO {
	public length = 0;
	public entries: Array<any> = [];

	write_str(s: string) {
		this.length += s.length;
		// noinspection SuspiciousTypeOfGuard
		assert(typeof s == "string");
		this.entries.push(s);
	}

	write_buf(buf: Uint8Array) {
		this.length += buf.length;
		// noinspection SuspiciousTypeOfGuard
		assert(
			buf instanceof Uint8Array,
			"Expected a Uint8Array, but got " + buf
		);
		this.entries.push(buf);
	}

	get_uint8array() {
		const res = new Uint8Array(this.length);
		let pos = 0;
		this.entries.forEach((e) => {
			if (typeof e === "string") {
				for (let i = 0, slen = e.length; i < slen; i++, pos++) {
					res[pos] = e.charCodeAt(i);
				}
			} else {
				res.set(e, pos);
				pos += e.length;
			}
		});
		assert(pos === this.length);
		return res;
	}

	position() {
		return this.length;
	}
}

function pad(num: number, length: number) {
	let ret = num + "";
	while (ret.length < length) {
		ret = "0" + ret;
	}
	return ret;
}

function serialize_str(str: string) {
	let ret, i;
	// simple chars, use plaintext
	if (/^[-_/. a-zA-Z0-9]+$/.test(str)) {
		return "(" + str + ")";
	}
	// Only ASCII and some common ANSI chars
	if (/^[\x00-\x7FäöüÄÖÜß]*$/.test(str)) {
		// eslint-disable-line no-control-regex
		ret = "(";
		for (i = 0; i < str.length; i++) {
			const c = str[i];
			if (c === "\\" || c === "(" || c === ")") {
				ret += "\\";
			}
			ret += c;
		}
		ret += ")";
		return ret;
	}
	// Unicode
	ret = "(";
	ret += "\u00fe\u00ff";
	for (i = 0; i < str.length; i++) {
		const cu = str.charCodeAt(i);
		const c1 = String.fromCharCode(cu >> 8);
		if (c1 === "\\" || c1 === "(" || c1 === ")") {
			ret += "\\";
		}
		ret += c1;
		const c2 = String.fromCharCode(cu & 0xff);
		if (c2 === "\\" || c2 === "(" || c2 === ")") {
			ret += "\\";
		}
		ret += c2;
	}
	ret += ")";
	return ret;
}

function serialize(node: any, uncompressed: boolean = false) {
	let i, ret; // Wishing for let in modern browsers :(
	if (isRef(node)) {
		return node.num + " " + node.gen + " R";
	}
	if (isNum(node)) {
		return node;
	}
	if (isBool(node)) {
		return node;
	}
	if (isNull(node)) {
		return "null";
	}
	if (isName(node)) {
		assert(node.name);
		return "/" + node.name;
	}
	if (isString(node)) {
		return serialize_str(node);
	}
	if (isArray(node)) {
		ret = ["["];
		for (i = 0; i < node.length; i++) {
			ret.push(serialize(node[i], uncompressed));
		}
		ret.push("]");
		return ret.join(" ");
	}
	if (isDict(node)) {
		const map = node.map;
		ret = ["<<"];
		for (let key in map) {
			ret.push("/" + key + " " + serialize(map[key], uncompressed));
		}
		ret.push(">>");
		return ret.join("\n");
	}
	if (isStream(node)) {
		ret = "";
		delete node.dict.map.DecodeParms;
		delete node.dict.map.Filter;
		const content = node.getBytes();
		assert(content, "expecting byte content from " + JSON.stringify(node));
		let out;
		if (uncompressed) {
			out = buf2str(content);
			node.dict.map.Length = out.length;
		} else {
			out = buf2str(pako.deflate(content));
			node.dict.map.Length = out.length;
			node.dict.map.Filter = [new Name("FlateDecode")];
		}

		assert(isDict(node.dict));
		ret += serialize(node.dict, uncompressed);
		ret += "\nstream\n";
		ret += out;
		ret += "\nendstream\n";
		return ret;
	}

	throw new Error("Unknown node type " + JSON.stringify(node));
}

class PDFObjects {
	constructor(doc: PDFDocument, public entries = doc.get_xref_entries()) {
		assert(isArray(this.entries), "xref entries should be an Array");
	}

	add(obj, gen): map {
		const e = {
			obj: obj,
			gen: gen,
			num: this.entries.length,
			uncompressed: "added",
		};
		this.entries.push(e);
		return e;
	}

	update(ref: Ref, obj: any): map {
		assert(ref.num !== undefined);
		assert(ref.gen !== undefined);
		const e = {
			obj: obj,
			gen: ref.gen,
			num: ref.num,
			uncompressed: "added",
		};
		this.entries[e.num] = e;
		return e;
	}

	write_object(out: BytesIO, e: map, uncompressed: boolean = false) {
		e.offset = out.position();
		assert(e.num !== undefined);
		const bs = serialize(e.obj, uncompressed);
		out.write_str(e.num + " " + e.gen + " obj\n");
		out.write_str(bs);
		out.write_str("\nendobj\n");
	}

	write_xref_stream(out: BytesIO, prev: number | undefined, root_ref: Ref) {
		const map: map = {
			Type: new Name("XRef"),
			Size: this.entries.length + 1, // + 1 for this object itself
			Root: root_ref,
			W: [1, 4, 1],
			Index: [],
		};
		if (prev !== undefined) {
			map.Prev = prev;
		}

		let total_count = 0;
		let need_new_index = true;
		const bio = new BytesIO();
		const entry = this.add("__xref_stream__", 0);
		entry.offset = out.position();
		this.entries.forEach((e, idx) => {
			const is_new_entry = e.uncompressed === "added";
			if (!is_new_entry) {
				need_new_index = true;
				return;
			}
			total_count++;
			if (need_new_index) {
				need_new_index = false;
				map.Index.push(idx);
				map.Index.push(1);
			} else {
				map.Index[map.Index.length - 1]++;
			}
			assert(e.offset !== undefined, "entry should have an offset");
			bio.write_buf(
				new Uint8Array([
					e.uncompressed ? 1 : 2,
					e.offset >> 24,
					(e.offset >> 16) & 0xff,
					(e.offset >> 8) & 0xff,
					e.offset & 0xff,
					e.gen,
				])
			);
		});
		const ui8ar = bio.get_uint8array();
		map.Length = 6 * (total_count + 1);
		const stream = newStream(map, ui8ar);
		entry.obj = stream;
		this.write_object(out, entry, true);
	}

	write_xref_table(out: BytesIO, prev: number | undefined, root_ref: Ref) {
		const entries = this.entries.filter((e) => !e.is_free);
		const size = 1 + entries.length;
		out.write_str("xref\n");
		out.write_str("0 " + size + "\n");
		out.write_str("0000000000 65535 f\r\n");
		entries.forEach((e) => {
			assert(e.offset !== undefined, "entry should have an offset");
			out.write_str(pad(e.offset, 10) + " " + pad(e.gen, 5) + " n\r\n");
		});

		// write trailer
		out.write_str("trailer\n");
		const trailer = new Dict({
			Size: size,
			Root: root_ref,
		});
		out.write_str(serialize(trailer, true));
	}
}

function visit_acroform_fields(doc: PDFDocument, callback: Function) {
	if (doc.acroForm) {
		const to_visit = doc.acroForm.map.Fields.slice();
		while (to_visit.length > 0) {
			let n = to_visit.shift();
			if (isRef(n)) {
				const ref = n;
				n = doc.fetch(n);
				n._pdfform_ref = ref;
			}
			debug ? console.log("find", n) : "";
			if (
				n.map &&
				n.map.Kids &&
				n.map.Opt &&
				n.map.FT &&
				n.map.FT.name === "Btn"
			) {
				// Radio button
				n._pdfform_spec = {
					type: "radio",
					options: n.map.Opt,
				};
				callback(n);
			} else if (
				n.map &&
				n.map.Kids &&
				n.map.FT &&
				n.map.FT.name === "Tx"
			) {
				//muilt show text
				callback(n);
			} else if (n.map && n.map.Kids) {
				to_visit.push.apply(to_visit, n.map.Kids);
			} else if (
				n.map &&
				n.map.Type &&
				n.map.Type.name == "Annot" &&
				n.map.T
			) {
				callback(n);
			}
		}
	} else {
		// No AcroForm? Look in the pages themselves
		const pages = doc.fetch(doc.root.map.Pages);
		pages.map.Kids.forEach((page_ref) => {
			const page = doc.fetch(page_ref);
			const annots_ref = page.map.Annots;
			const annots = doc.fetch(annots_ref);
			annots.forEach((annot_ref) => {
				const n = doc.fetch(annot_ref);
				n._pdfform_ref = annot_ref;
				n._inpage_annot = true;
				if (
					n.map &&
					n.map.Type &&
					n.map.Type.name == "Annot" &&
					n.map.T
				) {
					callback(n);
				}
			});
		});
	}
}

function pdf_decode_str(str: string) {
	if (!str.startsWith("\u00FE\u00FF")) {
		return str;
	}
	let res = "";
	for (let i = 2; i < str.length; i += 2) {
		res += String.fromCharCode(
			(str.charCodeAt(i) << 8) | str.charCodeAt(i + 1)
		);
	}
	return res;
}

function acroform_match_spec(n: map, fields: map) {
	const t = pdf_decode_str(n.map.T);
	debug ? console.log(t, Object.keys(fields), t in fields) : "";
	if (t in fields) {
		return fields[t][0];
	} else {
		const m = /^(.*)\[([0-9]+)\]$/.exec(t); //is it an old style?  by zen.liu ,
		if (m && m[1] in fields) {
			return fields[m[1]][m[2]];
		}
	}
	return undefined;
}

function modify_xfa(
	doc: PDFDocument,
	objects: PDFObjects,
	out: BytesIO,
	index: string,
	callback: Function
) {
	if (!doc.acroForm) {
		return;
	}
	const xfa = doc.acroForm.map.XFA;
	if (!xfa) {
		return; // acroForm-only
	}
	const section_idx = xfa.indexOf(index);
	assert(section_idx >= 0);
	const section_ref = xfa[section_idx + 1];
	const section_node = doc.fetch(section_ref);
	assert(isStream(section_node), "XFA section node should be a stream");
	const bs = section_node.getBytes();
	assert(bs);
	const prev_str = new TextDecoder("utf-8").decode(bs);
	const str = callback(prev_str);
	// @ts-ignore
	const out_bs = new TextEncoder("utf-8").encode(str);
	const out_node = newStream(section_node.dict.map, out_bs);
	assert(isStream(out_node));
	const e = objects.update(section_ref, out_node);
	objects.write_object(out, e);
}

/**
 * fillForm
 * @param buf Uint8Array of an valid PDF file
 * @param fields {fieldName:[value1,value2]}
 */
export function fillForm(
	buf: ArrayLike<number> | ArrayBufferLike,
	fields: map
) {
	const doc = parse(new Uint8Array(buf));
	assert(doc.startXRef);
	const objects = new PDFObjects(doc);
	const root_id = doc.get_root_id();
	const root_ref = new Ref(root_id, 0);
	const out = new BytesIO();
	out.write_buf(new Uint8Array(buf));
	// Change AcroForms
	visit_acroform_fields(doc, (n) => {
		const value = acroform_match_spec(n, fields);
		if (value === undefined) {
			return;
		}
		debug ? console.log("before fill", JSON.stringify(n)) : "";
		if (n._pdfform_spec) {
			const type = n._pdfform_spec.type;
			if (type === "radio") {
				const idx = n._pdfform_spec.options.indexOf(value);
				if (idx === -1) return;
				const kid_ref = n.map.Kids[idx];
				if (!kid_ref) {
					throw new Error(
						"Cannot find kid #" + idx + " (value=" + value + ")"
					);
				}
				if (!isRef(kid_ref)) {
					throw new Error("radio kid is not a reference");
				}
				const kid = doc.fetch(kid_ref);
				kid.map.AS = kid.map.V = kid.map.DV = new Name("Yes");
				const kid_entry = objects.update(kid_ref, kid);
				objects.write_object(out, kid_entry);
				return;
			} else {
				throw new Error("Unsupported spec type " + type);
			}
		} else {
			const ft_name = n.map.FT.name;
			if (ft_name == "Tx") {
				n.map.V = "" + value;
			} else if (ft_name == "Btn") {
				n.map.AS = n.map.V = n.map.DV = value
					? new Name("0")
					: new Name("Off"); //new type should be Name(0) not Name('Yes')
			} else if (ft_name == "Ch") {
				n.map.V = "" + value;
			} else if (ft_name == "Sig") {
				return; // Signature fields are not supported so far
			} else {
				throw new Error("Unsupported input type " + n.map.FT.name);
			}
		}
		debug ? console.log("filled", n) : "";
		const ref = n._pdfform_ref;
		const e = objects.update(ref, n);
		objects.write_object(out, e);
	});
	const acroform_ref = doc.get_acroform_ref();
	if (acroform_ref) {
		// Acroform present
		doc.acroForm.map.NeedAppearances = true;
		if (isRef(acroform_ref)) {
			// Replace just the AcroForm object
			const e = objects.update(acroform_ref, doc.acroForm);
			objects.write_object(out, e);
		} else {
			// Replace the entire root object
			doc.root.map.AcroForm = doc.acroForm;
			const root = objects.update(root_ref, doc.root);
			objects.write_object(out, root);
		}
	}
	// Change XFA
	modify_xfa(doc, objects, out, "datasets", (str) => {
		// Fix up XML
		str = str.replace(/\n(\/?>)/g, "$1\n");
		const ds_doc = new DOMParser().parseFromString(str, "application/xml");
		for (let f in fields) {
			const els = ds_doc.getElementsByTagName(f);
			for (let i = 0; i < els.length; i++) {
				let val = fields[f][i];
				if (val === undefined) {
					continue;
				}
				const el = els[i];
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}

				if (typeof val == "boolean") {
					val = val ? 1 : 0;
				}
				el.appendChild(ds_doc.createTextNode(val));
			}
		}
		str = new XMLSerializer().serializeToString(ds_doc);
		return str;
	});
	const startxref = out.position();
	if (doc.xref_type === "table") {
		objects.write_xref_table(out, doc.startXRef, root_ref);
	} else {
		objects.write_xref_stream(out, doc.startXRef, root_ref);
	}
	out.write_str("\nstartxref\n");
	out.write_str(startxref + "\n");
	out.write_str("%%EOF");
	return out.get_uint8array();
}

/**
 *
 * @param buf Uint8Array of an valid PDF file
 */
export function list_fields(buf: ArrayLike<number> | ArrayBufferLike) {
	const doc = parse(new Uint8Array(buf));
	const res: map = {};
	visit_acroform_fields(doc, (n) => {
		const raw_name = pdf_decode_str(n.map.T);
		let name = raw_name;
		let index = 0;
		const m = /^(.+?)\[([0-9]+)\]$/.exec(raw_name);
		if (m) {
			name = m[1];
			index = parseInt(m[2], 10);
		}

		let spec;
		if (n._pdfform_spec) {
			spec = n._pdfform_spec;
		} else {
			const ft_name = n.map.FT.name;
			if (ft_name === "Tx") {
				spec = { type: "string" };
			} else if (ft_name === "Btn") {
				spec = { type: "boolean" };
			} else if (ft_name === "Ch") {
				spec = {
					type: "select",
					options: n.map.Opt.slice(),
				};
			} else if (ft_name === "Sig") {
				return; // Signature names are not supported so far
			} else {
				throw new Error("Unsupported input type" + ft_name);
			}
		}

		if (!res[name]) {
			res[name] = [];
		}
		res[name][index] = spec;
	});
	return res;
}

/**
 * convert blob into arraybuffer
 * @param blob
 */
export const blob2Buffer = async (blob: Blob) =>
	await new Response(blob).arrayBuffer();
/**
 * put buf as file to download or open in new window
 * @param buf       arraybuffer | Uint8Array
 * @param fileType  string mime type name;default: "application/pdf"
 * @param newWindow boolean default: true
 * @param downloadName string|undefined
 */
export const openOrDownload = (
	buf: Uint8Array,
	fileType: string = "application/pdf",
	newWindow: boolean = true,
	downloadName?: string
): Promise<void> =>
	new Promise((r, j) => {
		const newBlob = new Blob([buf], { type: fileType });
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(newBlob);
			return;
		}
		const data = window.URL.createObjectURL(newBlob);
		const link = document.createElement("a");
		link.href = data;
		if (newWindow) link.target = "_blank";
		if (downloadName) link.download = downloadName;
		document.body.appendChild(link);
		link.click();
		setTimeout(() => {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(data);
			r();
		}, 100);
	});
//</editor-fold>
/*
export const example = async (ax: NuxtAxiosInstance) => {
  // here use axios (with nuxt),you can use XHR
  // save you PDF form file as *.pdt to avoid been block by download manager such as IDM
  const r = await ax.$get(`${window.location.href.split('/login')[0]}/tmp1.pdt`, {responseType: "arraybuffer"})
  if (!r) throw Error("template not found")
  //create blob from response body
  const blob = new Blob([r], {
    type: 'application/pdf',
  })
  const buf = await blob2Buffer(blob)
  console.log('fields', list_fields(buf))
  const out = fillForm(buf, {
    text: ['名字'],
    TXT: ['名字1'],
    ck1: [true],
    ck2: [true]
  });
  openOrDownload(out)//`test.pdf`)
}*/

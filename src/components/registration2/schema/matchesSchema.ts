import * as Yup from "yup";

export default function matchesSchema(
	data: Record<string, any>,
	schema: Yup.AnySchema
) {
	try {
		schema.validateSync(data);
		return true;
	} catch (e) {
		return false;
	}
}

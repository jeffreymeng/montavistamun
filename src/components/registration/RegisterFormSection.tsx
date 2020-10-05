import cx from "classnames";
import { Form, Formik, FormikProps } from "formik";
import * as Icons from "heroicons-react";
import React, { ReactElement, useContext, useState } from "react";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import useRequireLogin from "../accounts/useRequireLogin";
import ConfirmModal from "../ConfirmModal";
export default function RegisterFormSection<Fields>({
	data,
	onSubmit,
	onHasChangesChange,
	onContinue,
	schema,
	loadingValues,
	title,
	subtitle,
	children,
	confirmContinue,
}: {
	data?: Fields;
	onSubmit: (data: Fields) => Promise<void>;
	onHasChangesChange: (hasChanges: boolean) => void;
	onContinue: () => void;
	schema: Yup.ObjectSchema;
	loadingValues: Fields;
	title?: string;
	subtitle?: string;
	/**
	 * If provided, the function will be extecuted to check if a confirm save modal should be shown.
	 * The modal will be shown if a string is returned, and the help text will be that string.
	 * @param values
	 */
	confirmContinue?: (values: Fields) => false | string;
	children: (
		props: FormikProps<Fields> & { canEdit: boolean }
	) => ReactElement;
}): ReactElement {
	useRequireLogin();
	return (
		<div className="shadow overflow-hidden sm:rounded-md">
			<Formik
				initialValues={data || loadingValues}
				enableReinitialize
				validationSchema={schema}
				onSubmit={async (values) => {
					try {
						await onSubmit(values);
					} catch (error) {
						console.log(error);

						return;
					}
				}}
			>
				{(props) => (
					<RegisterFormSectionInner<Fields>
						form={props}
						initialValues={data}
						loading={!data}
						onContinue={onContinue}
						onHasChangesChange={onHasChangesChange}
						title={title}
						subtitle={subtitle}
						fields={children}
						confirmContinue={confirmContinue}
					/>
				)}
			</Formik>
		</div>
	);
}

/**
 * Given that a and b have the same keys, checks if a and b are equal shallow objects.
 * If an array is a child, then that array will be compared to other arrays based on shallow value, not reference.
 */
function compareObjectValues<T>(a: T, b: T) {
	return Object.keys(a).every((key) =>
		Array.isArray(a[key as keyof T])
			? (a[key as keyof T] as any[]).every(
					(el, i) => el === (b[key as keyof T] as any[])[i]
			  )
			: a[key as keyof T] === b[key as keyof T]
	);
}
function RegisterFormSectionInner<Fields>({
	loading,
	onContinue,
	initialValues,
	onHasChangesChange,
	form,
	title,
	subtitle,
	confirmContinue,
	fields,
}: {
	loading: boolean;
	confirmContinue?: (values: Fields) => false | string;

	form: FormikProps<Fields>;
	initialValues?: Fields;
	onContinue: () => void;
	onHasChangesChange: (hasChanges: boolean) => void;
	title?: string;
	subtitle?: string;
	fields: (props: FormikProps<Fields> & { canEdit: boolean }) => ReactElement;
}) {
	const { isSubmitting, submitForm, values, validateForm } = form;
	const { user, loading: userLoading } = useContext(AuthContext);
	const [hasChanges, setHasChanges] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirmText, setConfirmText] = useState("");
	React.useEffect(() => {
		const newHasChanges =
			!!initialValues && !compareObjectValues(values, initialValues);
		if (newHasChanges !== hasChanges) {
			console.log(newHasChanges, initialValues, values);
			setHasChanges(newHasChanges);
			onHasChangesChange(newHasChanges);
		}
	}, [values, initialValues]);
	const canSubmit = !isSubmitting && !loading;
	const canEdit = !isSubmitting && !loading;

	const initialValuesUnchanged =
		initialValues &&
		Object.keys(initialValues).some((el) => {
			const value = initialValues[el as keyof typeof initialValues];
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return value !== null && value !== undefined && value !== "";
		});
	const onSave = React.useCallback(() => {
		if (!hasChanges) {
			onContinue();
		} else {
			submitForm()
				.then(validateForm)
				.then((errors) => {
					const isValid = Object.keys(errors).length === 0;
					if (isValid) {
						return Promise.resolve();
					} else {
						return Promise.reject("invalid form");
					}
				})
				.then(() => {
					onContinue();
				})
				.catch((e) => console.log(e));
		}
	}, [hasChanges, submitForm, validateForm, onContinue]);
	return (
		<Form>
			<div className="px-4 bg-white py-5 sm:p-6">
				<div>
					{title && (
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							{title}
						</h3>
					)}
					{subtitle && (
						<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
							{subtitle}
						</p>
					)}
				</div>
				<div
					className={cx(
						"grid grid-cols-6 gap-6",
						title || subtitle ? " mt-4" : ""
					)}
				>
					{fields({
						...form,
						canEdit,
					})}
				</div>
			</div>

			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
				{/* If initial values exists and has at least one set value, then the user already has saved data. */}
				{!hasChanges && initialValuesUnchanged && (
					<span className="text-green-600 py-2 px-4 text-sm leading-5 font-medium">
						<Icons.Check className={"inline-flex mr-1"} /> Saved
					</span>
				)}
				{hasChanges && initialValuesUnchanged && (
					<>
						<span className="inline-flex rounded-md shadow-sm">
							<button
								type="reset"
								disabled={!canSubmit}
								className={cx(
									"py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700",
									!canSubmit
										? "bg-gray-300"
										: "bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
								)}
							>
								{isSubmitting
									? "Discarding Changes..."
									: "Discard Changes"}
							</button>
						</span>
					</>
				)}
				<button
					type={"button"}
					onClick={() => {
						const confirmModalText =
							confirmContinue && confirmContinue(values);
						if (confirmModalText) {
							setShowConfirm(true);
							setConfirmText(confirmModalText);
							return;
						}
						onSave();
					}}
					disabled={!canSubmit}
					className={cx(
						"ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white shadow-sm",
						!canSubmit
							? "bg-indigo-300"
							: "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
					)}
				>
					{isSubmitting
						? "Saving and Continuing..."
						: hasChanges
						? "Save and Continue"
						: "Continue"}
				</button>
			</div>

			<ConfirmModal
				onConfirm={onSave}
				confirmButtonText={
					isSubmitting
						? "Saving and Continuing..."
						: hasChanges
						? "Save and Continue"
						: "Continue"
				}
				disabled={!canSubmit}
				show={showConfirm}
				setShow={setShowConfirm}
				title={"Are you sure you want to continue?"}
			>
				{confirmText}
			</ConfirmModal>
		</Form>
	);
}

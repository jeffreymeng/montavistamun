import arrayMove from "array-move";
import React, { useState } from "react";
import {
	SortableContainer as RSHSortableContainer,
	SortableElement as RSHSortableElement,
} from "react-sortable-hoc";
import "./sortableList.scss";

const SortableItem = RSHSortableElement(
	({ index, value }: { value: React.ReactNode; index: number }) => (
		<li className={"flex py-2 px-4 bg-white hover:bg-gray-50"}>{value}</li>
	)
);

const SortableContainer = RSHSortableContainer(
	({ children }: { children: React.ReactNode }) => {
		return (
			<ul className={"border border-gray-300 divide-y divide-gray-200"}>
				{children}
			</ul>
		);
	}
);

export default function PreferenceList() {
	const [items, setItems] = useState([
		"Legal",
		"ECOSOC",
		"SOCMOK",
		"Bla",
		"Item 5",
		"Item 6",
	]);

	return (
		<SortableContainer
			onSortEnd={({ oldIndex, newIndex }) =>
				setItems((old) => arrayMove(old, oldIndex, newIndex))
			}
			helperClass={"SortableHelper cursor-resize-y"}
		>
			{items.map((value, index) => (
				<SortableItem
					key={`item-${value}`}
					index={index}
					value={value}
				/>
			))}
		</SortableContainer>
	);
}

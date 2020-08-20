import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Layout, Main } from "../../../components/layout";

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"BMUN Registration"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					BMUN Registration
				</h1>
				<p className={"mt-4 mb-20"}>{/* TODO */}</p>
				<PreferencesDND />
			</Main>
		</Layout>
	);
}

function PreferencesDND() {
	const [items, setItems] = React.useState([
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
	]);
	return (
		<DragDropContext
			onDragEnd={(result) => {
				console.log(result);
				// return if item was dropped outside
				if (!result.destination) return;
				// return if the item was dropped in the same place
				if (
					result.source.droppableId ===
						result.destination.droppableId &&
					result.source.index === result.destination.index
				)
					return;
				// get the items array
				const newItems = [...items];
				// get the draggedItems
				const draggedItem = newItems[result.source.index];
				// delete the item from source position and insert it to the destination positon
				newItems.splice(result.source.index, 1);
				newItems.splice(result.destination.index, 0, draggedItem);

				// update state
				setItems(newItems);
			}}
		>
			<Droppable droppableId={"main"}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						className={
							snapshot.isDraggingOver
								? "bg-blue-100"
								: "bg-blue-400"
						}
						{...provided.droppableProps}
					>
						{provided.placeholder}
						{items.map((name, index) => (
							<Draggable
								key={name}
								draggableId={name}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										className={
											"bg-red-200 w-48 p-3 border border-gray-200"
										}
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<h4>My draggable {name}</h4>
									</div>
								)}
							</Draggable>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

export default function LoadableCalendar(): React.ReactElement {
	const sharedCalendarProps = {
		plugins: [
			dayGridPlugin,
			listPlugin,
			googleCalendarPlugin,
			timeGridPlugin,
		],
		googleCalendarApiKey: "AIzaSyAWBRPsh5fXjotQ0IT9DZQhygkpzu-SL4w",
		events: {
			googleCalendarId:
				"g9h6cqiso966e96uqj1cv2ohgc@group.calendar.google.com",
			className: "gcal-event",
		},
		noEventsContent: "There are no MVMUN events this month",
		fixedWeekCount: false,
	};
	return (
		<>
			{/* Desktop Version */}
			<div className={"hidden sm:block"}>
				<FullCalendar
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right:
							"dayGridMonth,timeGridWeek,timeGridDay,listMonth",
					}}
					initialView="dayGridMonth"
					eventClick={(info) => {
						// open events in a new tab
						info.jsEvent.preventDefault();
						window.open(info.event.url, "_blank");
					}}
					{...sharedCalendarProps}
				/>
			</div>
			{/* Mobile Version */}
			<div className={"block sm:hidden"}>
				<FullCalendar
					headerToolbar={{
						left: "title",
						right: "prev,next",
					}}
					initialView="listMonth"
					{...sharedCalendarProps}
				/>
			</div>
		</>
	);
}

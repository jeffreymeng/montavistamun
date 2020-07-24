import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function LoadableCalendar(): React.ReactElement {
	return (
		<FullCalendar
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
			}}
			plugins={[
				dayGridPlugin,
				listPlugin,
				googleCalendarPlugin,
				timeGridPlugin,
			]}
			initialView="dayGridMonth"
			googleCalendarApiKey={"AIzaSyAWBRPsh5fXjotQ0IT9DZQhygkpzu-SL4w"}
			events={{
				googleCalendarId:
					"g9h6cqiso966e96uqj1cv2ohgc@group.calendar.google.com",
				className: "gcal-event",
			}}
			eventClick={(info) => {
				// open events in a new tab
				info.jsEvent.preventDefault();
				window.open(info.event.url, "_blank");
			}}
		/>
	);
}

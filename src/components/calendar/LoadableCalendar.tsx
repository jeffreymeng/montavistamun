import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from "@fullcalendar/list";

export default function LoadableCalendar() {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin]}
			initialView="dayGridMonth"
			googleCalendarApiKey={"AIzaSyAWBRPsh5fXjotQ0IT9DZQhygkpzu-SL4w"}
			events={{
				googleCalendarId:
					"g9h6cqiso966e96uqj1cv2ohgc@group.calendar.google.com",
				className: "gcal-event",
			}}
		/>
	);
}

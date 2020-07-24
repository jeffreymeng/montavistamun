import React from "react";
import Layout from "../components/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"Calendar"}>
			<FullCalendar
				plugins={[dayGridPlugin, googleCalendarPlugin]}
				initialView="dayGridMonth"
				googleCalendarApiKey={"AIzaSyAWBRPsh5fXjotQ0IT9DZQhygkpzu-SL4w"}
				events={{
					googleCalendarId:
						"g9h6cqiso966e96uqj1cv2ohgc@group.calendar.google.com",
					className: "gcal-event",
				}}
			/>
		</Layout>
	);
}

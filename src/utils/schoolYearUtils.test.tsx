jest.mock("moment");

const moment = jest.requireMock("moment");
import {
	getClassOf,
	getFirstDayOfSchool,
	getLastDayOfSchool,
} from "./schoolYearUtils";

const actualMoment = jest.requireActual("moment");

describe("getLastDayOfSchool()", () => {
	test("Works when provided with the year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(jest.fn(() => actualMoment()));
		expect(getLastDayOfSchool(2020).format(FORMAT)).toBe(
			"June 4, 2020, 12:00 PM"
		);

		expect(getLastDayOfSchool(2021).format(FORMAT)).toBe(
			"June 3, 2021, 12:00 PM"
		);

		expect(getLastDayOfSchool(2024).format(FORMAT)).toBe(
			"June 6, 2024, 12:00 PM"
		);
	});
	test("Works when year is inferred to be current year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(jest.fn(() => actualMoment().year(2020)));

		// current year: 2020
		expect(getLastDayOfSchool().format(FORMAT)).toBe(
			"June 4, 2020, 12:00 PM"
		);

		// current year: 2021
		moment.mockImplementation(jest.fn(() => actualMoment().year(2021)));
		expect(getLastDayOfSchool().format(FORMAT)).toBe(
			"June 3, 2021, 12:00 PM"
		);

		// current year: 2024
		moment.mockImplementation(jest.fn(() => actualMoment().year(2024)));
		expect(getLastDayOfSchool().format(FORMAT)).toBe(
			"June 6, 2024, 12:00 PM"
		);
	});
});
describe("getFirstDayOfSchool()", () => {
	test("Works when provided with the year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(jest.fn(() => actualMoment()));
		expect(getFirstDayOfSchool(2020).format(FORMAT)).toBe(
			"August 17, 2020, 12:00 AM"
		);
		expect(getFirstDayOfSchool(2021).format(FORMAT)).toBe(
			"August 16, 2021, 12:00 AM"
		);
		expect(getFirstDayOfSchool(2024).format(FORMAT)).toBe(
			"August 19, 2024, 12:00 AM"
		);
	});
	test("Works when year is inferred to be current year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(jest.fn(() => actualMoment().year(2020)));

		// current year: 2020
		expect(getFirstDayOfSchool().format(FORMAT)).toBe(
			"August 17, 2020, 12:00 AM"
		);

		// current year: 2021
		moment.mockImplementation(jest.fn(() => actualMoment().year(2021)));
		expect(getFirstDayOfSchool().format(FORMAT)).toBe(
			"August 16, 2021, 12:00 AM"
		);

		// current year: 2024
		moment.mockImplementation(jest.fn(() => actualMoment().year(2024)));
		expect(getFirstDayOfSchool().format(FORMAT)).toBe(
			"August 19, 2024, 12:00 AM"
		);
	});
});

describe("getClassOf()", () => {
	test("Works when current date is before summer of the same calendar year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(
			jest.fn(() => actualMoment("February 2, 2021, 4:50PM", FORMAT))
		);
		expect(getClassOf(9)).toBe(2024);
		expect(getClassOf(10)).toBe(2023);
		expect(getClassOf(11)).toBe(2022);
		expect(getClassOf(12)).toBe(2021);
	});
	test("Works when current date is during summer of the same calendar year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(
			jest.fn(() => actualMoment("July 2, 2021, 4:50PM", FORMAT))
		);
		expect(getClassOf(9)).toBe(2025);
		expect(getClassOf(10)).toBe(2024);
		expect(getClassOf(11)).toBe(2023);
		expect(getClassOf(12)).toBe(2022);
	});
	test("Works when current date is after summer of the same calendar year", () => {
		const FORMAT = "MMMM D, YYYY, h:mm A";

		moment.mockImplementation(
			jest.fn(() => actualMoment("December 2, 2022, 4:50PM", FORMAT))
		);
		expect(getClassOf(9)).toBe(2026);
		expect(getClassOf(10)).toBe(2025);
		expect(getClassOf(11)).toBe(2024);
		expect(getClassOf(12)).toBe(2023);
	});
});

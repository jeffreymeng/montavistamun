import moment from "moment";

/**
 * get the last day of school during a calendar year
 * @param year - The calendar year for which to return the last day of school. Defaults to the current calendar year.
 */
export const getLastDayOfSchool = (year?: number): moment.Moment => {
	year = year || moment().year();

	// the cutoff for the grade (for this website) is the first thursday of June, at noon.
	const startOfMonth = moment().year(year).month("June");
	let daysUntilThursday = 4 - startOfMonth.day(); // thursday = 4
	if (daysUntilThursday == 0) return startOfMonth.startOf("day").hours(12); // already first thursday
	if (daysUntilThursday < 0) daysUntilThursday += 7;
	return startOfMonth.add(daysUntilThursday, "days").startOf("day").hours(12);
};

/**
 * get the first day of school during the current calendar year
 */
export const getFirstDayOfSchool = (): moment.Moment => {
	// we assume there are 10 full weeks of summer
	// and that school starts on the following monday at 12:00 AM
	return getLastDayOfSchool()
		.startOf("day") // set to 0:00 AM (so minutes, seconds are 0)
		.hours(0) // set hour to 12
		.day("Monday") // set it to the monday of the last week of school (so 4 days before end of school year)
		.add(1, "week") // +1 week to get the first monday of summer
		.add(10, "weeks"); // + 10 weeks of summer
	// and it's now 12AM on the first day of school
};

/**
 * get the graduation year of a user given their grade
 * @param grade - The grade the user is in (or the grade they will be once school starts if it's during the summer)
 * @returns the full year
 */
export const getClassOf = (grade: number): number => {
	if (moment().isBefore(getLastDayOfSchool())) {
		return moment().year() + Math.abs(12 - grade);
	} else {
		return moment().year() + Math.abs(12 - grade) + 1;
	}
};

/**
 * get the grade given their graduation year
 * @param classOf - The year they will graduate high school
 * @returns their grade
 */
export const getGrade = (classOf: number): number => {
	const lastDayOfSchool = getLastDayOfSchool(classOf);

	const yearsUntilGraduation = lastDayOfSchool.diff(moment(), "years"); // this is floored
	return 12 - yearsUntilGraduation;
};

/**
 * returns whether or not it is summer
 */
export const getIsSummer = (): boolean => {
	// don't calculate the first and last days of school unless necessrary
	const month = moment().month();
	if (month == 5 || month == 7)
		// 5 == june, 7 == august
		return moment().isBetween(getLastDayOfSchool(), getFirstDayOfSchool());
	else return month == 6;
};

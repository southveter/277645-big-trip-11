const DAYS_COUNT = 3;

const getCitiesRoute = (cities) => {
  if (cities.length <= DAYS_COUNT) {
    return cities.map((city) => city).join(` &mdash; `);
  }
  return (cities[0] + ` &mdash;` + ` &hellip; ` + `&mdash; ` + cities[cities.length - 1]).toString();
};

const getTripDates = (dates) => {
  return (dates[0].slice(4, 10) + `&nbsp;&mdash;&nbsp;` + dates[dates.length - 1].slice(8, 10)).toString();
};

export const createTripRouteTemplate = (cities, dates) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getCitiesRoute(cities)}</h1>
      <p class="trip-info__dates">${getTripDates(dates)}</p>
    </div>`
  );
};

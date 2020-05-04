export const createTripDayTemplate = (day, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index || ``}</span>
        <time class="day__date" datetime="${day && new Date(day).toLocaleDateString() || ``}">${day && new Date(day).toLocaleString(`en-US`, {month: `long`}) || ``} ${day && new Date(day).getDate() || ``}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

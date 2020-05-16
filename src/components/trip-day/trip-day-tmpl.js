import moment from 'moment';

export const createTripDayTemplate = (date, index) => {
  let dayInfo = ``;

  if (date && index) {
    const fullDate = moment(date).format(`YYYY-MM-DDThh:mm`);
    const month = moment(date).format(`MMM`);
    const day = moment(date).format(`DD`);

    dayInfo = `<span class="day__counter">${index}</span>
    <time class="day__date" datetime="${fullDate}">${month} ${day}</time>`;
  }
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">${dayInfo}</div>
    <ul class="trip-events__list"></ul>
    </li>`
  );
};

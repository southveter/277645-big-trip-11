export const createTripFilterTemplate = (names) => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${names.map((name) => {
      return (`
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${name.isChecked ? `checked` : ``} value="${name.title}}">
          <label class="trip-filters__filter-label" for="filter-${name.title}">${name.title}</label>
        </div>
      `);
    }).join(``)
    }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

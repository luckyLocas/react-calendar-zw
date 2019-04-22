import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YearOrMonthList extends Component {
  static propTypes = {
    listData: PropTypes.object.isRequired,
    yearOrMonthPickFun: PropTypes.func.isRequired,
  }

  render() {
    const { listData, yearOrMonthPickFun } = this.props;
    const {
      year, weekObj, month, toggleViewShow, toggleViewData, language, minDate, maxDate,
    } = listData;
    let cnYear = '年';
    let cnMonth = '月';
    if (language === 'en') {
      cnYear = '';
      cnMonth = '';
    }

    if (toggleViewShow === 'none') return null;
    const listName = `calendar-date-list ${toggleViewShow === 'year' ? 'calendar-year-list' : 'calendar-month-list'}`;
    return (
      <ul className={listName}>
        {
          toggleViewData.map((number, index) => {
            const activeItem = (toggleViewShow === 'year' && number === year) || (toggleViewShow === 'month' && number === month);
            const item = toggleViewShow === 'year' ? `${number}${cnYear}` : `${weekObj[language].month[index]}${cnMonth}`;

            if (minDate) {
              const newDate = new Date(minDate.toString().replace(/-/g, '/'));
              const minYear = newDate.getFullYear();
              const minMonth = newDate.getMonth();
              if ((toggleViewShow === 'year' && number < minYear)
                || (toggleViewShow === 'month' && year === minYear && number < minMonth)
                || (toggleViewShow === 'month' && year < minYear)
              ) {
                return (
                  <li
                    lay-ym={number}
                    key={number}
                    className={activeItem ? 'disabledActive' : 'laydate-disabled'}
                  >
                    {item}
                  </li>
                );
              }
            }
            if (maxDate) {
              const newDate = new Date(maxDate.toString());
              const maxYear = newDate.getFullYear();
              const maxMonth = newDate.getMonth();
              if ((toggleViewShow === 'year' && number > maxYear)
                || (toggleViewShow === 'month' && year === maxYear && number > maxMonth)
                || (toggleViewShow === 'month' && year > maxYear)
              ) {
                return (
                  <li
                    lay-ym={number}
                    key={number}
                    className={activeItem ? 'disabledActive' : 'laydate-disabled'}
                  >
                    {item}
                  </li>
                );
              }
            }

            return (
              <li
                lay-ym={number}
                className={activeItem ? 'activeItem' : null}
                key={number}
                onClick={() => { yearOrMonthPickFun(toggleViewShow, number); }}
              >
                {item}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default YearOrMonthList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalendarHead extends Component {
  static propTypes = {
    headData: PropTypes.object.isRequired,
    yearOrMonthToggle: PropTypes.func.isRequired,
    preYearFun: PropTypes.func.isRequired,
    nextYearFun: PropTypes.func.isRequired,
    preMonthFun: PropTypes.func.isRequired,
    nextMonthFun: PropTypes.func.isRequired,
  }

  render() {
    const {
      headData, yearOrMonthToggle, preYearFun, nextYearFun, preMonthFun, nextMonthFun,
    } = this.props;
    const {
      year, month, toggleViewShow, toggleViewData, language, weekObj,
    } = headData;
    const [startYear] = toggleViewData;
    const endYear = toggleViewData[toggleViewData.length - 1];
    let cnYear = '年';
    if (language === 'en') {
      cnYear = '';
    }
    const leftYearIcon = '<<';
    const leftMonthIcon = '<';
    const rightYearIcon = '>>';
    const rightMonthIcon = '>';

    if (toggleViewShow === 'none') {
      return (
        <div className="calendarHeader">
          <i className="calendar-icon calendar-prev-y" onClick={() => { preYearFun(); }}>{leftYearIcon}</i>
          <i className="calendar-icon calendar-prev-m" onClick={() => { preMonthFun(); }}>{leftMonthIcon}</i>
          <div className="calendar-set-ym">
            <span
              lay-ym={year}
              lay-type="year"
              onClick={() => { yearOrMonthToggle(year); }}
            >
              {year}{cnYear}
            </span>
            <span
              lay-ym="2019-4"
              lay-type="month"
              onClick={() => { yearOrMonthToggle(year, month); }}
            >
              {
              language === 'cn'
                ? `${month + 1}月`
                : `${weekObj[language].month[month]}`
            }

            </span>
          </div>
          <i className="calendar-icon calendar-next-m" onClick={() => { nextMonthFun(); }}>{rightMonthIcon}</i>
          <i className="calendar-icon calendar-next-y" onClick={() => { nextYearFun(); }}>{rightYearIcon}</i>
        </div>
      );
    }
    return (
      <div className="calendarHeader">
        <i className="calendar-icon calendar-prev-y" onClick={() => { preYearFun(); }}>{leftYearIcon}</i>
        <div className="calendar-set-ym">
          <span>
            {
              toggleViewShow === 'year'
                ? `${startYear} - ${endYear}${cnYear}`
                : `${year}${cnYear}`
            }
          </span>
        </div>
        <i className="calendar-icon calendar-next-y" onClick={() => { nextYearFun(); }}>{rightYearIcon}</i>
      </div>
    );
  }
}

export default CalendarHead;

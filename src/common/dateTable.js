// 此模块用于日期中无需显示内容的情况
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DateTable extends Component {
  static propTypes = {
    dateData: PropTypes.object.isRequired,
    datePickFun: PropTypes.func.isRequired,
    setNewDate: PropTypes.func.isRequired,
  }

  /**
   * 渲染日期视图
   * @return <tr><td></td></tr>
   * */
  rendaerDateItem=() => {
    const { dateData, datePickFun } = this.props;
    const {
      rowsArr, columnArr, date, calendarValue,
      minDate, maxDate, year, month,
    } = dateData;

    return rowsArr.map(index => (
      <tr key={index}>{
          columnArr.map((i) => {
            const curIndex = index * 7 + i;
            const item = calendarValue[curIndex];
            let whichMonth = 0;
            let itemClassName = '';
            let active = false;
            let curYear = year;
            let curMonth = month;
            if (item > 15 && curIndex < 15) {
              whichMonth = -1;
              itemClassName = 'prevDate';
              curMonth -= 1;
              if (curMonth < 0) {
                curYear -= 1;
                curMonth = 11;
              }
            }
            if (item < 15 && curIndex > 20) {
              whichMonth = 1;
              itemClassName = 'nextDate';
              curMonth += 1;
              if (curMonth > 11) {
                curYear += 1;
                curMonth = 0;
              }
            }
            if (whichMonth === 0) active = true;
            const curDate = new Date(`${curYear}/${curMonth + 1}/${item}`).getTime();
            if (minDate) {
              const newDate = new Date(minDate.toString().replace(/-/g, '/')).getTime();
              if (curDate < newDate) {
                return (
                  <td
                    key={i}
                    className={(active && item === date) ? 'disabledActive' : 'laydate-disabled'}
                  >
                    <div className="dateItem">{item}</div>
                  </td>
                );
              }
            }
            if (maxDate) {
              const newDate = new Date(maxDate.toString().replace(/-/g, '/')).getTime();
              if (curDate > newDate) {
                return (
                  <td
                    key={i}
                    className={(active && item === date) ? 'disabledActive' : 'laydate-disabled'}
                  >
                    <div className="dateItem">{item}</div>
                  </td>
                );
              }
            }
            return (
              <td
                key={i}
                className={(active && item === date) ? 'activeDate' : itemClassName}
                onClick={() => { datePickFun(itemClassName, item); }}
              >
                <div className="dateItem">{item}</div>
              </td>
            );
          })
        }
      </tr>
    ));
  }

  render() {
    const { dateData, setNewDate } = this.props;
    const { weekArr, calendarValue, date } = dateData;

    const dateArr = calendarValue.slice(0);// 深拷贝当月日期数组
    const maxDate = Math.max.apply(null, dateArr.splice(7));// 得到本月最大日期
    if (date > maxDate) { // 天数过大(在本月中没有该天)
      setNewDate(maxDate);
    }

    return (
      <table className="calendarDateTable">
        <thead>
          <tr>
            {
              weekArr.map(weekDate => <th key={weekDate}>{weekDate}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {this.rendaerDateItem()}
        </tbody>
      </table>
    );
  }
}

export default DateTable;

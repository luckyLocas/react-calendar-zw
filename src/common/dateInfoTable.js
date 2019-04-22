// 此模块用于日期中需要显示内容的情况
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DateInfoTable extends Component {
  static propTypes = {
    dateData: PropTypes.object.isRequired,
    datePickFun: PropTypes.func.isRequired,
  }

  /**
   * 渲染日期视图
   * @return <tr><td></td></tr>
   * */
  rendaerDateItem=() => {
    const { dateData, datePickFun } = this.props;
    const {
      rowsArr, columnArr, calendarValue,
      minDate, maxDate, year, month, highLightData,
    } = dateData;

    return rowsArr.map(index => (
      <tr key={index}>{
          columnArr.map((i) => {
            const curIndex = index * 7 + i;
            const item = calendarValue[curIndex];
            let itemClassName = '';
            let active = false;
            let curYear = year;
            let curMonth = month;
            if (item > 15 && curIndex < 15) {
              itemClassName = 'prevDate';
              curMonth -= 1;
              if (curMonth < 0) {
                curYear -= 1;
                curMonth = 11;
              }
            }
            if (item < 15 && curIndex > 20) {
              itemClassName = 'nextDate';
              curMonth += 1;
              if (curMonth > 11) {
                curYear += 1;
                curMonth = 0;
              }
            }
            if (highLightData && itemClassName === '' && highLightData[item]) active = true;
            const curDate = new Date(`${curYear}/${curMonth + 1}/${item}`).getTime();
            if (minDate) {
              const newDate = new Date(minDate.toString().replace(/-/g, '/')).getTime();
              if (curDate < newDate) {
                return (
                  <td key={i} className="laydate-disabled">
                    <div className="dateItem">
                      {item}
                      <span>-</span>
                    </div>
                  </td>
                );
              }
            }
            if (maxDate) {
              const newDate = new Date(maxDate.toString().replace(/-/g, '/')).getTime();
              if (curDate > newDate) {
                return (
                  <td key={i} className="laydate-disabled">
                    <div className="dateItem">{item}<span>-</span></div>
                  </td>
                );
              }
            }
            if (!active) {
              return (
                <td key={i} className={itemClassName}>
                  <div className="dateItem">{item}<span>-</span></div>
                </td>
              );
            }

            return (
              <td
                key={i}
                className="activeDate"
                onClick={() => { datePickFun(itemClassName, item); }}
              >
                <div className="dateItem">
                  {item}
                  <span>{highLightData[item]}</span>
                </div>
              </td>
            );
          })
        }
      </tr>
    ));
  }

  render() {
    const { dateData } = this.props;
    const { weekArr } = dateData;
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

export default DateInfoTable;

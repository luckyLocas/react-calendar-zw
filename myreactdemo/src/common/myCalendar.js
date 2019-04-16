import React, { Component } from 'react';
import './myCalendar.css';

class Mycalendar extends Component {
  constructor(props) {
    super(props);
    this.state={
      year:2018,
      sixArr:[0, 1, 2, 3,4,5,],
      sevenArr:[0, 1, 2, 3,4,5,6],
      weekObj:{
        cn: {
            weeks: ["日", "一", "二", "三", "四", "五", "六"],
            time: ["时", "分", "秒"],
            timeTips: "选择时间",
            startTime: "开始时间",
            endTime: "结束时间",
            dateTips: "返回日期",
            month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            tools: {
                confirm: "确定",
                clear: "清空",
                now: "现在"
            }
        },
        en: {
            weeks: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            time: ["Hours", "Minutes", "Seconds"],
            timeTips: "Select Time",
            startTime: "Start Time",
            endTime: "End Time",
            dateTips: "Select Date",
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            tools: {
                confirm: "Confirm",
                clear: "Clear",
                now: "Now"
            }
        }
      }
    }
  }

  /**
   * 获取一年中12个月的显示数据(包括上月与下月的日期补齐)
   * @param year
   * @return []
   */
  daysInMonth=(year)=> {
    if(typeof year=='string') year=parseInt(year);
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) days[1] = 29;
  
    const daysOfYear = days.map(function (number, index) {
      let pre = days[index - 1];
      let next = days[index + 1];
      if (index === 0) pre = days[11];
      if (index === 11) next = days[0];
      const thisMonth = [];
  
      let day = new Date(year, index, 1).getDay();
  
      while (day--) thisMonth.unshift(pre--);
      for (let i = 1; i <= number; i++) thisMonth.push(i);
      for (let i = 1; i <= next; i++) thisMonth.push(i);
      thisMonth.length = 42;
  
      return thisMonth;
    })
    return daysOfYear;
  }

  render() {
    const {year,sixArr,sevenArr,weekObj}=this.state;
    const weekArr=weekObj['cn']['weeks'];
    const calendarValue=this.daysInMonth(year)[0];
    return (
      <div className="myCalendar">
        <div className="calendarHeader">
          <i className="calendar-icon calendar-prev-y">年</i>
          <i className="calendar-icon calendar-prev-m">月</i>
          <div className="calendar-set-ym">
            <span lay-ym="2019-4" lay-type="year">2019年</span>
            <span lay-ym="2019-4" lay-type="month">4月</span>
          </div>
          <i className="calendar-icon calendar-next-m">月</i>
          <i className="calendar-icon calendar-next-y">年</i>
        </div>
        <div className="calendarMain">
          <table className="calendarDateTable">
            <thead>
              <tr>
                {
                  weekArr.map(weekDate=>{
                    return <th key={weekDate}>{weekDate}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                sixArr.map((index)=>{
                    return (<tr key={index}>{
                      sevenArr.map(i=>{
                        const curIndex=index*6+i;
                        const item=calendarValue[curIndex];
                        let whichMonth = 0;
                        let itemClassName = '';
                        let active = false;
                        if (item > 15 && curIndex < 15) {
                          whichMonth = -1;
                          itemClassName='prevDate';
                        }
                        if (item < 15 && curIndex > 20) {
                          whichMonth = 1;
                          itemClassName='nextDate';
                        }
                        return <td key={i} className={item==16?'activeDate':itemClassName}>{item}</td>
                      })
                    }</tr>)
                })
              }
            </tbody>
          </table>
          <ul class="calendar-date-list calendar-year-list">
            <li lay-ym="2026">2026年</li>
          </ul>
        </div>
        <div className="calendarFooter">
          <div className="calendar-footer-btns">
            <span lay-type="clear" className="calendar-btns-clear">清空</span>
            <span lay-type="now" className="calendar-btns-now">现在</span>
            <span lay-type="confirm" className="calendar-btns-confirm">确定</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Mycalendar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarHead from './calendarHead';
import DateTable from './dateTable';
import DateInfoTable from './dateInfoTable';
import YearOrMonthList from './yearOrMonthList';
import CalendarFooter from './calendarFooter';
import './myCalendar.less';

class Mycalendar extends Component {
  static propTypes = {
    isShow: PropTypes.bool, // 控制日历显示隐藏
    currentDate: PropTypes.string, // 日历选中的时间
    language: PropTypes.string, // // 语言(支持'cn','en')
    minDate: PropTypes.string, // 控制日历最小可选日期(format:'YYYY/MM/HH')
    maxDate: PropTypes.string, // 控制日历最大可选日期(format:'YYYY/MM/HH')
    isShowDateInfo: PropTypes.bool, // 日期中是否有内容需要显示
    highLightData: PropTypes.object, // 日期中显示的内容(格式:{'10':value})
    footerBtns: PropTypes.array, // 底部按钮组显示控制,空数组表示无按钮( ['clear', 'now', 'confirm'])
    datePickCallBack: PropTypes.func, //  日期选择回调方法
    clearBtnCallBack: PropTypes.func, //  清空按钮点击回调方法
    getDateInfoCallBack: PropTypes.func, // 切换日期时用于获取信息的回调方法
  }

  static defaultProps = {
    isShow: false,
    currentDate: null,
    language: 'cn',
    minDate: null,
    maxDate: null,
    isShowDateInfo: false,
    highLightData: null,
    footerBtns: ['clear', 'now', 'confirm'],
    datePickCallBack: null,
    clearBtnCallBack: null,
    getDateInfoCallBack: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      dateLightData: {}, // 日期中显示的内容(格式:{'10':value})
      rowsArr: [0, 1, 2, 3, 4, 5],
      columnArr: [0, 1, 2, 3, 4, 5, 6],
      confirmDisabled: false, // 确定按钮是否禁用
      toggleViewShow: 'none', // 用于控制选择年月的视图显示(none:隐藏;year:显示年;month:显示月)
      toggleViewData: [], // 选择年月的视图显示数据
      footerBtns: ['clear', 'now', 'confirm'], // 底部按钮组显示控制,空数组表示无按钮
      weekObj: {
        cn: {
          weeks: ['日', '一', '二', '三', '四', '五', '六'],
          time: ['时', '分', '秒'],
          timeTips: '选择时间',
          startTime: '开始时间',
          endTime: '结束时间',
          dateTips: '返回日期',
          month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
          tools: {
            confirm: '确定',
            clear: '清空',
            now: '现在',
          },
        },
        en: {
          weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          time: ['Hours', 'Minutes', 'Seconds'],
          timeTips: 'Select Time',
          startTime: 'Start Time',
          endTime: 'End Time',
          dateTips: 'Select Date',
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          tools: {
            confirm: 'Confirm',
            clear: 'Clear',
            now: 'Now',
          },
        },
      },
    };
  }

  componentDidMount=() => {
    const {
      currentDate, highLightData, footerBtns,
    } = this.props;
    this.refreshState({
      currentDate, highLightData, footerBtns,
    });
  }

  componentWillReceiveProps=((nextProps) => {
    const { highLightData, currentDate, isShow } = nextProps;
    this.refreshState({ highLightData, currentDate, isShow });
  })

  /**
   * props改变后,更新state
   */
  refreshState=(target) => {
    const {
      currentDate, highLightData, footerBtns, isShow,
    } = target;

    // 设置日历勾选时间
    let curDate = new Date();
    if (currentDate) {
      curDate = new Date(currentDate.toString().replace(/-/g, '/'));
    }
    this.setState({
      year: curDate.getFullYear(),
      month: curDate.getMonth(),
      date: curDate.getDate(),
    });

    // 日历中需要显示内容
    if (highLightData) {
      this.setState({
        dateLightData: highLightData,
      });
    }

    // 配置日历底部显示的按钮
    if (typeof footerBtns === 'object') {
      const btnsArr = [];
      for (let i = 0; i < footerBtns.length; i += 1) {
        const item = footerBtns[i];
        if (item === 'confirm' || item === 'clear' || item === 'now') {
          btnsArr.push(item);
        }
      }
      this.setState({
        footerBtns: btnsArr,
      });
    }

    // 日历初始化(隐藏年月选择视图)
    if (typeof isShow === 'boolean' && isShow) {
      this.setState({
        toggleViewShow: 'none',
      });
    }
  }

  /**
   * 获取一年中12个月的显示数据(包括上月与下月的日期补齐)
   * @param year
   * @return []
   */
  daysInMonth=(_year) => {
    let year = _year;
    if (typeof year === 'string') year = parseInt(_year, 10);
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) days[1] = 29;

    const daysOfYear = days.map((number, index) => {
      let pre = days[index - 1];
      let next = days[index + 1];
      if (index === 0) pre = days[days.length - 1];
      if (index === 11) [next] = days;
      const thisMonth = [];

      let day = new Date(year, index, 1).getDay();
      for (;day > 0; day -= 1) {
        thisMonth.unshift(pre);
        pre -= 1;
      }
      for (let i = 1; i <= number; i += 1) thisMonth.push(i);
      for (let i = 1; i <= next; i += 1) thisMonth.push(i);
      thisMonth.length = 42;

      return thisMonth;
    });
    return daysOfYear;
  }

  /**
   * 年月视图切换
   * @param year,month
   * */
  yearOrMonthToggle=(_year, month) => {
    let setArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];// 一年12个月
    if (month === undefined) { // 组装当前年前后7年数据
      let min = parseInt(_year, 10) - 7;
      let max = parseInt(_year, 10) + 8;
      setArr = [];
      if (min < 1) { // 如果已经切换到最小年份
        min = 1;
        max = 16;
        this.setState({
          year: 8,
        });
      }
      for (let i = min; i < max; i += 1) {
        setArr.push(i);
      }
    }
    this.setState({
      toggleViewShow: month !== undefined ? 'month' : 'year',
      toggleViewData: setArr,
    });
  }

  /**
   * 设置新日期
   * */
  setNewDate=(newDate) => {
    this.setState({
      date: newDate,
    }, () => {
      this.judgmentDateRange();
    });
  }

  /**
   * 上一年
   * */
  preYear=() => {
    const {
      year, month, toggleViewShow,
    } = this.state;
    const { getDateInfoCallBack, isShowDateInfo } = this.props;
    let newYear = year - 1;

    if (toggleViewShow === 'year') {
      newYear -= 14;
      this.yearOrMonthToggle(newYear);
    }
    if (toggleViewShow === 'month') {
      this.yearOrMonthToggle(newYear, month);
    }
    if (newYear < 1) return;
    this.setState({
      year: newYear,
      dateLightData: {},
    }, () => {
      this.judgmentDateRange();
    });
    if (toggleViewShow === 'none' && isShowDateInfo) {
      const date = `${newYear}-${this.addZero(month + 1)}-01`;
      if (typeof getDateInfoCallBack === 'function')getDateInfoCallBack(date);
    }
  }

  /**
   * 上一月
   * */
  preMonth=() => {
    const {
      year, month, toggleViewShow,
    } = this.state;
    const { getDateInfoCallBack, isShowDateInfo } = this.props;
    let newYear = year;
    let newMonth = month - 1;

    if (newMonth < 0) { // 已经切换到了上一年
      newYear -= 1;
      newMonth = 11;
    }
    if (toggleViewShow === 'month') {
      this.yearOrMonthToggle(newYear, newMonth);
    }
    if (newYear < 1) return;
    this.setState({
      year: newYear,
      month: newMonth,
      dateLightData: {},
    }, () => {
      this.judgmentDateRange();
    });
    const date = `${newYear}-${this.addZero(newMonth + 1)}-01`;
    if (typeof getDateInfoCallBack === 'function' && isShowDateInfo)getDateInfoCallBack(date);
  }

  /**
   * 下一年
   * */
  nextYear=() => {
    const {
      year, month, toggleViewShow,
    } = this.state;
    const { getDateInfoCallBack, isShowDateInfo } = this.props;
    let newYear = year + 1;

    if (toggleViewShow === 'year') {
      newYear += 14;
      this.yearOrMonthToggle(newYear);
    }
    if (toggleViewShow === 'month') {
      this.yearOrMonthToggle(newYear, month);
    }
    if (newYear < 1) return;
    this.setState({
      year: newYear,
      dateLightData: {},
    }, () => {
      this.judgmentDateRange();
    });
    if (toggleViewShow === 'none' && isShowDateInfo) {
      const date = `${newYear}-${this.addZero(month + 1)}-01`;
      if (typeof getDateInfoCallBack === 'function')getDateInfoCallBack(date);
    }
  }

  /**
   * 下一月
   * */
  nextMonth=() => {
    const {
      year, month, toggleViewShow,
    } = this.state;
    const { getDateInfoCallBack, isShowDateInfo } = this.props;
    let newYear = year;
    let newMonth = month + 1;

    if (newMonth > 11) { // 已经切换到了下一年
      newYear += 1;
      newMonth = 0;
    }
    if (toggleViewShow === 'month') {
      this.yearOrMonthToggle(newYear, newMonth);
    }
    if (newYear < 1) return;
    this.setState({
      year: newYear,
      month: newMonth,
      dateLightData: {},
    }, () => {
      this.judgmentDateRange();
    });
    const date = `${newYear}-${this.addZero(newMonth + 1)}-01`;
    if (typeof getDateInfoCallBack === 'function' && isShowDateInfo)getDateInfoCallBack(date);
  }

  /**
   * 判断切换后的日期是否在日期限制范围内
   * 超出范围时设置'确定'按钮禁用
   * */
  judgmentDateRange=() => {
    const { year, month, date } = this.state;
    const { minDate, maxDate } = this.props;
    let flag = false;
    const curDate = new Date(`${year}/${month + 1}/${date}`).getTime();
    if (minDate) {
      const min = new Date(minDate.toString().replace(/-/g, '/')).getTime();
      if (curDate < min) flag = true;
    }
    if (maxDate) {
      const max = new Date(maxDate.toString().replace(/-/g, '/')).getTime();
      if (curDate > max) flag = true;
    }
    this.setState({
      confirmDisabled: flag,
    });
  }

  /**
   * 定位到当前日期
   */
  getNowDate=() => {
    const { datePickCallBack } = this.props;
    this.setState({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      toggleViewShow: 'none',
    }, () => {
      const { year, month, date } = this.state;
      const checkDate = `${year}-${this.addZero(month + 1)}-${this.addZero(date)}`;
      if (typeof datePickCallBack === 'function') datePickCallBack(checkDate);
    });
  }

  /**
   * 日期点击执行方法
   * @param type(点击的日期属于哪一月),curDate
   * ('':当前月;'prevDate':前一月;'nextDate':后一月)
   * */
  datePick=(type, curDate) => {
    const { year, month } = this.state;
    const { datePickCallBack } = this.props;
    let newYear = year;
    let newMonth = month;
    if (type === 'prevDate') {
      newMonth -= 1;
      if (newMonth < 0) {
        newYear -= 1;
        newMonth = 11;
      }
    } else if (type === 'nextDate') {
      newMonth += 1;
      if (newMonth > 11) {
        newYear += 1;
        newMonth = 0;
      }
    }
    this.setState({
      year: newYear,
      month: newMonth,
      date: curDate,
    }, () => {
      const date = `${newYear}-${this.addZero(newMonth + 1)}-${this.addZero(curDate)}`;
      if (datePickCallBack) datePickCallBack(date);
    });
  }

  /**
   * 日期补0
   * */
  addZero=(value) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  }

  /**
   * 选择年月
   * @param type
   * ('year':年;'month':月;
   * */
  yearOrMonthPick=(type, curValue) => {
    const { year, month } = this.state;
    let newYear = year;
    let newMonth = month;
    const { getDateInfoCallBack } = this.props;
    if (type === 'year') {
      newYear = curValue;
      this.setState({
        year: curValue,
        toggleViewShow: 'none',
      });
    } else {
      newMonth = curValue;
      this.setState({
        month: curValue,
        toggleViewShow: 'none',
      });
    }
    const date = `${newYear}-${this.addZero(newMonth + 1)}-01`;
    if (typeof getDateInfoCallBack === 'function')getDateInfoCallBack(date);
  }

  /**
   * 底部按钮点击执行方法
   * @param type
   * ('confirm':确定;'now':现在;'clear':清除)
   * */
  footerBtnsClick=(type) => {
    if (type === 'confirm') {
      const { date } = this.state;
      this.datePick('', date);
    } else if (type === 'now') {
      this.getNowDate();
    } else {
      const { clearBtnCallBack } = this.props;
      if (typeof clearBtnCallBack === 'function') {
        clearBtnCallBack();
      } else {
        console.log('请先配置清空按钮回调方法!');
      }
    }
  }

  render() {
    const {
      year, weekObj, month, toggleViewShow, toggleViewData,
      rowsArr, columnArr, date, footerBtns, dateLightData, confirmDisabled,
    } = this.state;
    const {
      language: setlanguage, minDate, maxDate, isShowDateInfo, isShow,
    } = this.props;
    if (!isShow) return null;

    const language = setlanguage === 'en' ? 'en' : 'cn';
    // 头部年月切换
    const headData = {
      year, month, toggleViewShow, toggleViewData, language, weekObj,
    };
    // 日历主体部分所需数据
    const weekArr = weekObj[language].weeks;
    const calendarValue = this.daysInMonth(year)[month];
    const tableData = {
      year,
      rowsArr,
      columnArr,
      month,
      date,
      calendarValue,
      weekArr,
      minDate,
      maxDate,
    };
    // 可具体选择年月的视图所需数据
    const listData = {
      year, weekObj, month, toggleViewShow, toggleViewData, language, minDate, maxDate,
    };
    // 底部按钮组
    const footerBtnsData = {
      footerBtns, weekObj, language, confirmDisabled,
    };

    let calendarName = 'myCalendar';
    if (isShowDateInfo) {
      calendarName = 'myCalendar calendarHasInfo';
      tableData.highLightData = dateLightData;
    }
    return (
      <div className={calendarName}>
        {/* 头部(年月显示切换) */}
        <CalendarHead
          headData={headData}
          yearOrMonthToggle={this.yearOrMonthToggle}
          preYearFun={this.preYear}
          nextYearFun={this.nextYear}
          preMonthFun={this.preMonth}
          nextMonthFun={this.nextMonth}
        />
        <div className="calendarMain">
          {/* 主体(星期与日期显示)) */}
          {
            isShowDateInfo
              ? (
                <DateInfoTable
                  dateData={tableData}
                  datePickFun={this.datePick}
                />
              )
              : (
                <DateTable
                  dateData={tableData}
                  datePickFun={this.datePick}
                  setNewDate={this.setNewDate}
                />
              )
          }
          {/* 可具体选择年月的视图 */}
          <YearOrMonthList
            listData={listData}
            yearOrMonthPickFun={this.yearOrMonthPick}
          />
        </div>
        {/* 底部(按钮组) */}
        {
            isShowDateInfo ? null
              : (
                <CalendarFooter
                  btnData={footerBtnsData}
                  btnFun={this.footerBtnsClick}
                />
              )
        }
      </div>
    );
  }
}

export default Mycalendar;

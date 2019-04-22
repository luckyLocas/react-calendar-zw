import React, { Component } from 'react';
import Mycalendar from './common/myCalendar';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false, // 控制日历显示
      inpValue: '2019-08-20', // 日历初始值
      highLightData: { 1: 2, 10: 10 }, // 有内容显示的日历数据
    };
  }

  /**
   *获取日期显示内容数据
   */
  getDateInfoCallBack=(date) => {
    const obj = {};
    const i = parseInt(Math.random() * 30, 10);
    obj[i] = i;
    this.setState({
      highLightData: obj,
      inpValue: date,
    });
  }

  /**
   * 选择日期回调方法
   */
  datePickCallBack=(date) => {
    this.setState({
      inpValue: date,
      isShow: false,
    });
  }

  /**
   * 清除功能回调方法
   */
  clearBtnCallBack=() => {
    this.setState({
      inpValue: '',
      isShow: false,
    });
  }

  render() {
    const { highLightData, isShow, inpValue } = this.state;
    return (
      <div className="calenderWrapper">
        <input
          type="text"
          value={inpValue}
          placeholder="请选择日期"
          onClick={
                () => {
                  this.setState({
                    isShow: true,
                  });
                }
              }
          onChange={() => {}}
        />
        <div className="calenderBox">
          <Mycalendar
            isShow={isShow}
            currentDate={inpValue}
            // minDate="2019/3/15"
            // maxDate="2020/4/15"
            // language="en"
            // isShowDateInfo
            highLightData={highLightData}
            // footerBtns={['now', 'clear', 'confirm']}
            // getDateInfoCallBack={this.getDateInfoCallBack}
            datePickCallBack={this.datePickCallBack}
            clearBtnCallBack={this.clearBtnCallBack}
          />
        </div>
      </div>
    );
  }
}

export default App;

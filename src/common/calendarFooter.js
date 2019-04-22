import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalendarFooter extends Component {
  static propTypes = {
    btnData: PropTypes.object.isRequired,
    btnFun: PropTypes.func.isRequired,
  }

  render() {
    const { btnData, btnFun } = this.props;
    const {
      footerBtns, weekObj, language, confirmDisabled,
    } = btnData;
    if (footerBtns.length === 0) return null;
    const btnTools = weekObj[language].tools;
    return (
      <div className="calendarFooter">
        <div className="calendar-footer-btns">
          {
            footerBtns.map((btnKey) => {
              if (btnKey === 'confirm' && confirmDisabled) {
                return (
                  <span
                    lay-type={btnKey}
                    key={btnKey}
                    className="calendar-btn laydate-disabled"
                  >
                    {btnTools[btnKey]}
                  </span>
                );
              }
              return (
                <span
                  lay-type={btnKey}
                  key={btnKey}
                  className="calendar-btn"
                  onClick={() => { btnFun(btnKey); }}
                >
                  {btnTools[btnKey]}
                </span>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default CalendarFooter;

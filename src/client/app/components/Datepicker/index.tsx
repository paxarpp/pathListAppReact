import React, { Component } from 'react';
import styled from 'styled-components';
import DatepickerTable from './DatepickerTable';
import DatepickerControls from './DatepickerControls';
import DatepickerDateDisplay from './DatepickerDateDisplay';
import DatepickerFooter from './DatepickerFooter';

interface IProps {
  handlerClose: () => void;
  handlerComplite: (setupDate: setupDate) => () => void;
};
type setupDate = {
  year: number;
  month: number;
  day: number;
};
interface IState {
  month: number;
  year: number;
  setupDate: setupDate;
};
class DatePicker extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      setupDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }
    };
  }
  decrimentMonth = () => {
    const { year, month } = this.state;
    this.setState({
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year
    });
  };
  incrementMonth = () => {
    const { year, month } = this.state;
    this.setState({
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year
    });
  };
  render() {
    const { year, month, setupDate } = this.state;
    return (
      <DatepickerModal>
        <ModalContent>
          <DatepickerDateDisplay setupDate={setupDate} />
          <DatepickerCalendarContainer>
            <DatepickerCalendar>
              <DatepickerControls
                {...this.state}
                decrimentMonth={this.decrimentMonth}
                incrementMonth={this.incrementMonth}
                handlerMonth={month => this.setState({ month })}
                handlerYear={year => this.setState({ year })}
              />
              <DatepickerTableWrappeer>
                <DatepickerTable
                  year={year}
                  month={month}
                  handlerClick={day => () => {
                    this.setState({ setupDate: { year, month, day } });
                  }}
                  setupDate={setupDate}
                />
              </DatepickerTableWrappeer>
              <DatepickerFooter
                handlerClose={this.props.handlerClose}
                handlerComplite={this.props.handlerComplite(setupDate)}
              />
            </DatepickerCalendar>
          </DatepickerCalendarContainer>
        </ModalContent>
      </DatepickerModal>
    );
  }
}
const DatepickerModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fafafa;
  padding: 0;
  width: 55%;
  margin: auto;
  border-radius: 2px;
  will-change: top, opacity;
  max-width: 325px;
  min-width: 310px;
  max-height: none;
  z-index: 1003;
  display: block;
  opacity: 1;
  top: 10%;
  transform: scaleX(1) scaleY(1);
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
    0 11px 15px -7px rgba(0, 0, 0, 0.2);
  :focus {
    outline: none;
  }
  @media only screen and (min-width: 601px) {
    max-width: 625px;
    width: 100%;
  }
`;
const ModalContent = styled.div`
  display: flex;
  @media only screen and (min-width: 601px) {
    flex-direction: row;
  }
  flex-direction: column;
  padding: 0;
`;
const DatepickerCalendarContainer = styled.div`
  flex: 2.5 auto;
`;
const DatepickerCalendar = styled.div``;
const DatepickerTableWrappeer = styled.div``;

export default DatePicker;

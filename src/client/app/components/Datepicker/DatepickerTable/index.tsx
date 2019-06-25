import React from 'react';
import styled from 'styled-components';
import { ISetupDate } from '../DatepickerDateDisplay';
import Float from '../FloatDatepicker';

const getMaxDayinMonth = (year, month) => {
  return 33 - new Date(new Date(year, month).getFullYear(), new Date(year, month).getMonth(), 33).getDate();
};

interface IProps {
  handlerClick: () => void;
  setupDate: ISetupDate;
  year: number;
  month: number;
};
const prepareArrayDay = (year, month, setupDate, handlerClick) => {
  const day = new Date(year, month, 1).getDay();
  const dayBegin = day === 0 ? 7 : day;
  const arr = [...Array(getMaxDayinMonth(year, month))].map((el, indx) => (
    <td key={indx}>
      <Float
        handlerClick={handlerClick(indx + 1)}
        active={year === setupDate.year && month === setupDate.month && indx + 1 === setupDate.day ? true : false}
      >
        {indx + 1}
      </Float>
    </td>
  ));
  const arrTemp = [...Array(dayBegin - 1)].map((el, indx) => <td key={`empty${indx}`} />).concat(arr);
  const result = [];
  for (let i = 0; i < arrTemp.length; i += 7) {
    result.push(arrTemp.slice(i, i + 7));
  }
  return result;
};

const DatepickerTable = ({ year, month, handlerClick, setupDate }) => {
  const result = prepareArrayDay(year, month, setupDate, handlerClick);
  return (
    <Table>
      <thead>
        <tr>
          <th>Пн</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Вс</th>
        </tr>
      </thead>
      <tbody>{result.map((el, indx) => <tr key={`tr${indx}`}>{[...el]}</tr>)}</tbody>
    </Table>
  );
};
const Table = styled.table`
  width: 280px;
  font-size: 1rem;
  margin: 0 auto;
  & > thead {
    border-bottom: none;
    color: #999;
  }
  th {
    padding: 10px 5px;
    text-align: center;
  }
  tr {
    border: none;
  }
`;

export default DatepickerTable;

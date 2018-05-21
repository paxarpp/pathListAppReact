import React from 'react';

const ChoisePaginationString = ({ handler }) => {
  return (
    <div className="choisePaginationString">
      <select defaultValue={20} onChange={handler}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
      </select>
    </div>
  );
};
export default ChoisePaginationString;

import React from 'react';

const ChoisePaginationString = ({ handler }) => {
  return (
    <div className="choisePaginationString">
      <select defaultValue={10} onChange={handler}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};
export default ChoisePaginationString;

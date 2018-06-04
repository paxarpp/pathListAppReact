import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';

const PopUpInput = ({ coordX, coordy, value, onChange, handlerConf }) => {
  const left = coordX - 150;
  const top = coordy - 60;
  return (
    <div style={{ top: top, left: left }} className="popUpInput">
      <input type="number" defaultValue={value} min={'0'} onChange={onChange} />
      <Button handler={handlerConf(true)} styleButton="confirm">
        {String.fromCharCode(10003)}
      </Button>
      <Button handler={handlerConf(false)} styleButton="delit">
        {String.fromCharCode(10006)}
      </Button>
    </div>
  );
};
PopUpInput.propTypes = {
  coordX: PropTypes.number.isRequired,
  coordy: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  handlerConf: PropTypes.func.isRequired
};
export default PopUpInput;

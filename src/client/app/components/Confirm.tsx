import React, { PureComponent } from 'react';
import Icon from './Icon';
import styled, { css } from 'styled-components';

interface IProps {
  handler: (p: boolean) => boolean;
}

class Confirm extends PureComponent <IProps>{

  handlerTrue = () => {
    const { handler } = this.props;
    handler(true);
  }
  handlerFalse = () => {
    const { handler } = this.props;
    handler(false);
  }
  public render() {
    return (
      <PopUpConfirm>
        <p>Уверены ?</p>
        <LeftIcon onClick={this.handlerTrue} color="green" name="Done" />
        <RightIcon onClick={this.handlerFalse} color="red" name="Clear" />
      </PopUpConfirm>
    );
  }
} 

const PopUpConfirm = styled.div`
  width: 140px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 1px grey;
  position: absolute;
  top: 45%;
  right: 30%;
  background-color: #fff;
  z-index: 999;
  > p {
    margin: 0 1rem;
  }
`;

const animHover = css`
  translate: opacity 0.3s;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

const LeftIcon = styled(Icon)`
  margin-left: 10px;
  ${animHover};
`;

const RightIcon = styled(Icon)`
  margin-left: 70px;
  ${animHover};
`;

export default Confirm;

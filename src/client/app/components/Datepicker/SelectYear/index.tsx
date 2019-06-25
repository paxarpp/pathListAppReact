import React, { Component } from 'react';
import styled from 'styled-components';

interface IProps {
  year: number;
  handlerYear: (select: any) => void;
};
interface IState {
  isOpen: boolean;
};
class SelectYear extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  openSelectYear = select => () => {
    this.setState({
      isOpen: false
    });
    this.props.handlerYear(select);
  };
  render() {
    const { year } = this.props;
    const { isOpen } = this.state;
    return (
      <Wrapper>
        <Div onClick={() => this.setState({ isOpen: !isOpen })}>{year}</Div>
        {isOpen && (
          <Selected>
            <Ul>
              {[...Array(21)].map((el, indx) => (
                <Li key={indx} onClick={this.openSelectYear(year - 10 + indx)}>
                  {year - 10 + indx}
                </Li>
              ))}
            </Ul>
          </Selected>
        )}
      </Wrapper>
    );
  }
}

const Div = styled.div`
  margin-top: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
const Wrapper = styled.div`
  position: relative;
`;
const Selected = styled.div`
  overflow-y: auto;
  position: absolute;
  top: -50px;
  left: 10px;
  background-color: white;
  z-index: 999;
  font-size: 1.2rem;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
    0 11px 15px -7px rgba(0, 0, 0, 0.2);
`;
const Ul = styled.ul`
  cursor: pointer;
  list-style-type: none;
  padding: 0;
`;
const Li = styled.li`
  padding: 5px 10px;
  border-radius: 2px;
  transition: background-color 0.3s linear;
  &: hover {
    background-color: #69b2ab;
  }
`;
export default SelectYear;

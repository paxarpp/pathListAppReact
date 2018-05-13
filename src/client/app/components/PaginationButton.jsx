import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaginationButton extends Component {
  hendler = page => () => {
    const { handlerPagination } = this.props;
    handlerPagination(page);
  };

  render() {
    const { length, page, stringOnPage } = this.props;
    const pages =
      length % stringOnPage === 0
        ? length / stringOnPage
        : Math.ceil(length / stringOnPage);

    return (
      <div className="paginationBlock">
        {page <= 1 ? null : <button onClick={this.hendler(1)}>1</button>}
        {page < 5 ? null : <span>...</span>}
        {page - 10 <= 1 ? null : (
          <button onClick={this.hendler(page - 10)}>{page - 10}</button>
        )}
        {page - 2 <= 1 ? null : (
          <button onClick={this.hendler(page - 2)}>{page - 2}</button>
        )}
        {page - 1 <= 1 ? null : (
          <button onClick={this.hendler(page - 1)}>{page - 1}</button>
        )}
        {pages <= 1 ? null : (
          <button onClick={this.hendler(page)} className="selectPagination">
            {page}
          </button>
        )}
        {page + 1 >= pages ? null : (
          <button onClick={this.hendler(page + 1)}>{page + 1}</button>
        )}
        {page + 2 >= pages ? null : (
          <button onClick={this.hendler(page + 2)}>{page + 2}</button>
        )}
        {page + 10 >= pages ? null : (
          <button onClick={this.hendler(page + 10)}>{page + 10}</button>
        )}
        {page > pages - 4 ? null : <span>...</span>}
        {page + 1 > pages ? null : (
          <button onClick={this.hendler(pages)}>{pages}</button>
        )}
      </div>
    );
  }
}

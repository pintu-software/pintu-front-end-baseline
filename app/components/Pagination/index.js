/**
 *
 * Pagination
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  max-width: 1125px;
`;

const List = styled.li`
  min-width: 40px;
  height: 40px;
  border-radius: 3px;
  border: solid 1px #dddddd;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#dddddd' : '')};
  color: ${({ active }) => (active ? '#000000' : '#dddddd')};
`;

const TextList = List.extend`
  min-width: 52px;
`;

const Anchor = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  text-align: center;
  text-decoration: none;
  box-shadow: none !important;
  color: ${({ active }) => (active ? '#000000' : '#dddddd')};
  padding: 10px;
`;

const IconAnchor = Anchor.extend`
  padding: 7px;
`;

const TextAnchor = Anchor.extend`
  padding: 9px;
`;

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

/* eslint-disable react/prefer-stateless-function */
class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    const { totalRecords, pageLimit, currentPage } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.currentPage = typeof currentPage === 'number' ? currentPage: 1; 

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage };
  }

  componentDidMount() {
    this.gotoPage(this.currentPage);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    if (this.state.currentPage === 1) {
      return;
    }
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    if (this.state.currentPage === this.totalPages) {
      return;
    }
    this.gotoPage(this.state.currentPage + 1);
  };

  handleMoveToFirst = evt => {
    evt.preventDefault();
    if (this.state.currentPage === 1) {
      return;
    }
    this.gotoPage(1);
  }

  handleMoveToLast = evt => {
    evt.preventDefault();
    if (this.state.currentPage === this.totalPages) {
      return;
    }
    this.gotoPage(this.totalPages);
  }

  fetchPageNumbers = () => {
    const { totalPages } = this;
    const { currentPage } = this.state;
    const chunkSize = 6;

    const allPages = range(1, totalPages);
    const rawChunkedPages = _.chunk(allPages, chunkSize);

    if (rawChunkedPages.length === 1) {
      return rawChunkedPages[0];
    }

    const chunkedPages = _.chain(rawChunkedPages)
      .map(x => {
        const length = x.length;
        if (length === chunkSize) {
          return x;
        }

        const first = x[0];
        const difference = chunkSize - length;
        const newStartIndex = first - difference;
        const last = _.last(x);

        return range(newStartIndex, last);
      })
      .value();

    const targetPageGroup = _.chain(chunkedPages).filter(x => x.includes(currentPage)).first().value();
    const firstPage = _.first(targetPageGroup);
    const lastPage = _.last(targetPageGroup);

    if (currentPage === firstPage && firstPage !== 1 && lastPage !== currentPage) {
      let upperBound = firstPage + 4;
      upperBound = upperBound > totalPages ? totalPages : upperBound;
      const newPageGroup = range(firstPage - 1, upperBound);

      return newPageGroup;
    }

    if (currentPage !== totalPages && currentPage === lastPage) {
      const newPageGroup = [];

      for (let i = 1; i < targetPageGroup.length; i++) {
        newPageGroup.push(targetPageGroup[i]);
      }

      newPageGroup.push(lastPage + 1);


      return newPageGroup;
    }

    return targetPageGroup;
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();
    const targetPages = [];

    for (let i = 0; i < (pages.length); i++) {
      targetPages.push(pages[i]);
    }

    const pills = _.chain(targetPages).filter(x => typeof x !== 'string').map((page, index) => {
      return (
        <List key={index} active={currentPage === page}>
          <Anchor
            href="#"
            active={currentPage === page}
            onClick={e => this.handleClick(page, e)}
          >
            {page}
          </Anchor>
        </List>
      );
    }).value();

    let pagesElements = [];

    pagesElements = pagesElements.concat(pills);

    return (
      <Fragment>
        <nav aria-label="Pagination">
          <UnorderedList>
            <TextList>
              <TextAnchor
                href="#"
                aria-label="First"
                onClick={this.handleMoveToFirst}
              >
                First
              </TextAnchor>
            </TextList>
            <List key={`left1`}>
              <IconAnchor
                href="#"
                aria-label="Previous"
                onClick={this.handleMoveLeft}
              >
                <ChevronLeft />
              </IconAnchor>
            </List>
            {pagesElements}
            <List>
              <IconAnchor
                href="#"
                aria-label="Next"
                onClick={this.handleMoveRight}
              >
                <ChevronRight />
              </IconAnchor>
            </List>
            <TextList>
              <TextAnchor
                href="#"
                aria-label="Last"
                onClick={this.handleMoveToLast}
              >
                Last
              </TextAnchor>
            </TextList>
          </UnorderedList>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;

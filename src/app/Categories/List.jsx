import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Pagination, PageItem, PageLink, Col, Row,
} from 'mdbreact';

import CategoryPreview from './components/CategoryPreview';
import { getAllTopcis, getAllCategories } from '../../store/actions/categories';

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    const { categories } = props;

    this.state = {
      categories: categories,
      maxPageId: Math.floor(categories.length / PAGE_LENGTH) + 1,
      currentPageId: 1,
      currentCategories: [],
    };

    props.getAllCategories();
    props.getAllTopics();

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = this.state;
    console.log('+');
    if (categories.length !== nextProps.categories.length) {
      this.setState({
        maxPageId: Math.floor(nextProps.categories.length / PAGE_LENGTH) + 1,
        categories: nextProps.categories,
        currentCategories: nextProps.categories.slice(0, PAGE_LENGTH),
      });
    }
  }

  getPage(pageId) {
    const { categories } = this.state;
    return categories.slice((pageId - 1) * PAGE_LENGTH, pageId * PAGE_LENGTH);
  }

  handleNextPage(event) {
    const { currentPageId } = this.state;
    this.setState({
      currentPageId: currentPageId + 1,
      currentCategories: this.getPage(currentPageId + 1),
    });
  }

  handlePrevPage(event) {
    const { currentPageId } = this.state;
    this.setState({
      currentPageId: currentPageId - 1,
      currentCategories: this.getPage(currentPageId - 1),
    });
  }

  render() {
    const { currentPageId, maxPageId, currentCategories } = this.state;
    return (
      <div>
        <h2 className="px-3">Категории</h2>
        <Col>
          <hr />
          {
            currentCategories.map(
              (category, i) => (
                <Row key={category.id} className="my-3">
                  <CategoryPreview
                    categoryId={category.id}
                  />
                </Row>
              ),
            )
          }
          <hr />
          <Row className="d-flex justify-content-center">
            <Pagination className="pagination-lg">
              <PageItem disabled={currentPageId === 1}>
                <PageLink onClick={this.handlePrevPage} className="page-link">Назад</PageLink>
              </PageItem>
              <PageItem active>
                <PageLink className="page-link">{currentPageId}</PageLink>
              </PageItem>
              <PageItem disabled={currentPageId === maxPageId}>
                <PageLink onClick={this.handleNextPage} className="page-link">Вперед</PageLink>
              </PageItem>
            </Pagination>
          </Row>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ctr.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTopics: () => dispatch(getAllTopcis()),
    getAllCategories: () => dispatch(getAllCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);

const PAGE_LENGTH = 5;

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topics_id: PropTypes.array.isRequired,
    }).isRequired,
  ).isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllTopics: PropTypes.func.isRequired,
};

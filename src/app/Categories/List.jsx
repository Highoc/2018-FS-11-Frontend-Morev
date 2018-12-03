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
    console.log('[CategoriesList] Constructor');
    super(props);
    const { categories, isInitialized } = props;

    if (!isInitialized) {
      props.getAllCategories();
      props.getAllTopics();
    }

    this.state = {
      maxPageId: CategoriesList.getMaxPageId(categories),
      currentPageId: 1,
      currentCategories: CategoriesList.getPage(categories, 1),
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('[CategoriesList] WillReceiveProps');
    const { categories } = nextProps;
    this.setState({
      maxPageId: CategoriesList.getMaxPageId(categories),
      currentPageId: 1,
      currentCategories: CategoriesList.getPage(categories, 1),
    });
  }

  static getPage(categories, pageId, pageLength = PAGE_LENGTH) {
    return categories.slice((pageId - 1) * pageLength, pageId * pageLength);
  }

  static getMaxPageId(categories, pageLength = PAGE_LENGTH) {
    return Math.ceil(categories.length / pageLength);
  }

  handleNextPage(event) {
    const { currentPageId } = this.state;
    const { categories } = this.props;
    this.setState({
      currentPageId: currentPageId + 1,
      currentCategories: CategoriesList.getPage(categories, currentPageId + 1),
    });
  }

  handlePrevPage(event) {
    const { currentPageId } = this.state;
    const { categories } = this.props;
    this.setState({
      currentPageId: currentPageId - 1,
      currentCategories: CategoriesList.getPage(categories, currentPageId - 1),
    });
  }

  render() {
    const { currentPageId, maxPageId, currentCategories } = this.state;
    console.log('[CategoriesList] Render');
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
    isInitialized: state.ctr.categories.length !== 0,
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
  isInitialized: PropTypes.bool.isRequired,
};

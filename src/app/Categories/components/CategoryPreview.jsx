import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Card, CardBody,
} from 'mdbreact';


import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import getElemById from '../helpers/getElemById';

class CategoryPreview extends Component {
  constructor(props) {
    super(props);

    const { categoryId, categories } = this.props;

    this.state = {
      category: getElemById(categories, categoryId),
    };
  }

  render() {
    const { category } = this.state;

    return (
      <Card className="w-100">
        <CardBody>
          <Link to={`/category/${category.id}/detail`}>
            {category.name}
          </Link>
          <p>{category.description}</p>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ctr.categories,
  };
};

export default connect(mapStateToProps)(CategoryPreview);

CategoryPreview.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topics_id: PropTypes.array.isRequired,
    }).isRequired,
  ).isRequired,
};

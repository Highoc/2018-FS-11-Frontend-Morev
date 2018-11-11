import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CategoryPreview extends Component {
  constructor(props) {
    super(props);

    const { category, topics } = this.props;

    this.state = {
      category, topics,
    };
  }

  render() {
    const { category, topics } = this.state;

    return (
      <div>
        <div className="col-md-12">
          <div className="card mt-1">
            <div className="card-body">
              <Link
                to={{
                  pathname: `/category/${category.id}/detail`,
                  state: {
                    category,
                    topics,
                  },
                }}
              >
                {category.name}
              </Link>
              <p>{category.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CategoryPreview.propTypes = {
  category: PropTypes.shape.isRequired,
  topics: PropTypes.arrayOf.isRequired,
};

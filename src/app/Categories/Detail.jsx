import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import {
  Card, CardBody, Col, Row,
} from 'mdbreact';

import { Link } from 'react-router-dom';

import getElemById from './helpers/getElemById';
import getElemsById from './helpers/getElemsById';

class Detail extends Component {
  constructor(props) {
    super(props);

    const { categories, topics, match } = this.props;
    const { categoryId } = match.params;
    const currentCategory = getElemById(categories, Number(categoryId));

    this.state = {
      category: currentCategory,
      topics: getElemsById(topics, currentCategory.topics_id),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { categories, topics, match } = nextProps;
    const { categoryId } = match.params;
    const { category } = this.state;

    if (categoryId !== category.id) {
      const currentCategory = getElemById(categories, Number(categoryId));
      this.setState({
        category: currentCategory,
        topics: getElemsById(topics, currentCategory.topics_id),
      });
    }
  }

  render() {
    const { category, topics } = this.state;
    const { users, categories } = this.props;
    return (
      <div>
        <h3>{`Категория "${category.name}" (всего ${topics.length} топиков)`}</h3>
        <Card className="my-3">
          <CardBody>
            <p>{category.description}</p>
          </CardBody>
        </Card>
        <Row>
          <Col className="py-2">
            <h3>Топики</h3>
          </Col>
          <Col>
            <a className="btn btn-primary float-right" role="button" href="/">Добавить топик</a>
          </Col>
        </Row>
        <Col>
          {
            topics.length !== 0
              ? topics.map((topic, i) => {
                const author = getElemById(users, topic.author_id);
                return (
                  <Row key={topic.id} className="my-3 mx-2">
                    <Card className="w-100">
                      <CardBody>
                        <Link to="/">{topic.name}</Link>
                        <hr />
                        <div>
                          Автор:
                          <Link to="/">
                            {' '}
                            { author.login }
                          </Link>
                        </div>
                        <div>
                          В категориях:
                          {' '}
                          {
                            topic.categories_id.map((id, j, arr) => (
                              <span key={id}>
                                <Link to={`/category/${id}/detail`}>
                                  { getElemById(categories, id).name }
                                </Link>
                                { j === arr.length - 1 ? '' : ', ' }
                              </span>
                            ))
                          }
                        </div>
                        <hr />
                        <div>Понравилось (...): ...</div>
                        <div>Посмотрело ... человек</div>
                      </CardBody>
                    </Card>
                  </Row>
                );
              })
              : <Row>Нет ни одного топика в категории</Row>
          }
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.ctr.categories,
    topics: state.ctr.topics,
    users: state.ctr.users,
  };
};

export default connect(mapStateToProps)(Detail);

Detail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      topics_id: PropTypes.array.isRequired,
    }).isRequired,
  ).isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      categories_id: PropTypes.array.isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

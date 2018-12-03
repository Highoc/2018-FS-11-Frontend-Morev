import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import Centrifuge from 'centrifuge';
import PropTypes from 'prop-types';
import * as actionTypes from '../../store/actions';

const SECRET = '09a3bbb7-8b2b-445b-b1f4-7913287a3ea5';

class CentrifugeClass extends Component {
  componentDidMount() {
    const { userId, onNewCategory, onNewTopic } = this.props;
    const token = jwt.sign({ sub: null }, SECRET, { expiresIn: 86400 });
    const centrifuge = new Centrifuge('ws://localhost:9000/connection/websocket');

    centrifuge.setToken(token);
    centrifuge.on('connect', () => {
      console.log('[Centrifuge] Connection success');
    });

    centrifuge.subscribe('public:category', (message) => {
      console.log('[Centrifuge] New category is published: ', message.data);
      onNewCategory(message.data);
    });

    centrifuge.subscribe('public:topic', (message) => {
      console.log('[Centrifuge] New topic is published: ', message.data);
      onNewTopic(message.data);
    });

    centrifuge.connect();
  }

  render() {
    return (
      <div />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewCategory: category => dispatch({
      type: actionTypes.NEW_CATEGORY_IS_PUBLISHED,
      payload: { category },
    }),

    onNewTopic: topic => dispatch({
      type: actionTypes.NEW_TOPIC_IS_PUBLISHED,
      payload: { topic },
    }),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CentrifugeClass);

CentrifugeClass.propTypes = {
  userId: PropTypes.number.isRequired,
  onNewCategory: PropTypes.func.isRequired,
  onNewTopic: PropTypes.func.isRequired,
};

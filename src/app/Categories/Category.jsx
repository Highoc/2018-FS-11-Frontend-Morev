import React from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';
import { Route } from 'react-router-dom';

import Detail from './Detail';
import List from './List';

export default function Category(props) {
  const { match } = props;
  return (
    <div>
      <Route path={`${match.path}/list/`} exact component={List} />
      <Route path={`${match.path}/:id/detail`} component={Detail} />
    </div>
  );
}

Category.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

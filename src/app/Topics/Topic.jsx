import React from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';
import { Route } from 'react-router-dom';

import Add from './Add';

export default function Category(props) {
  const { match } = props;
  return (
    <div>
      <Route path={`${match.path}/add`} exact component={Add} />
    </div>
  );
}

Category.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

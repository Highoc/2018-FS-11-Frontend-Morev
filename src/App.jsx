/* react/prefer-stateless-function:0 */

import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import './App.css';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {
  Container,
} from 'mdbreact';

import { connect } from 'react-redux';

import { loginCheckState } from './store/actions/auth';

import AuthorInfo from './app/AuthorInfo/AuthorInfoForm';
import Footer from './app/Footer/Footer';
import Category from './app/Categories/Category';
import NavBar from './app/Navbar/Navbar';
import FeedbackContainer from './app/FeedbackContainer/FeedbackContainer';
import Registration from './app/Authorization/Registration';
import Login from './app/Authorization/Login';

function Intro() {
  return <h2>Привет</h2>;
}

function Home() {
  return <h2>Домашняя страница</h2>;
}

class App extends Component {
  componentDidMount() {
    const { onTryAutoLogin } = this.props;
    onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Intro} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Registration} />
        <Redirect to="/" />
      </Switch>
    );

    const { isAuthorized } = this.props;
    if (isAuthorized) {
      routes = (
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/user" exact component={AuthorInfo} />
          <Route path="/category" component={Category} />
          <Route path="/feedback" exact component={FeedbackContainer} />
          <Redirect to="/home" />
        </Switch>
      );
    }

    return (
      <Router>
        <div className="content">
          <NavBar />
          <Container className="main">
            {routes}
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.token !== null,
  };
};

const initMapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(loginCheckState()),
  };
};

export default connect(mapStateToProps, initMapDispatchToProps)(App);

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  onTryAutoLogin: PropTypes.func.isRequired,
};

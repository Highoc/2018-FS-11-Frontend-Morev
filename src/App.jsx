/* react/prefer-stateless-function:0 */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {
  Container,
} from 'mdbreact';

import AuthorInfo from './app/AuthorInfo/AuthorInfoForm';
import Footer from './app/Footer/Footer';
import Category from './app/Categories/Category';
import NavBar from './app/Navbar/Navbar';

export default function App(props) {
  return (
    <Router>
      <div className="content">
        <NavBar />
        <Container className="main">
          <Route path="/user" exact component={AuthorInfo} />
          <Route path="/category" component={Category} />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

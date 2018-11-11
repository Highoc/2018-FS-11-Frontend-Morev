/* react/prefer-stateless-function:0 */

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import AuthorInfoForm from './app/AuthorInfo/AuthorInfoForm';
import Category from './app/Categories/Category';

export default function App(props) {
  return (
    <Router>
      <main className="container">
        <ul>
          <li>
            <Link to="/user/">AuthorInfo view</Link>
          </li>
          <li>
            <Link to="/category/list/">CategoriesList view</Link>
          </li>
        </ul>
        <br />
        <Route path="/user" exact component={AuthorInfoForm} />
        <Route path="/category" component={Category} />
      </main>
    </Router>
  );
}

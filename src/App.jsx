/* react/prefer-stateless-function:0 */

import React, { Component } from 'react';
import './App.css';

import AuthorInfoForm from './app/AuthorInfo/AuthorInfoForm';

export default function App(props) {
  return (
    <AuthorInfoForm action="/test" />
  );
}

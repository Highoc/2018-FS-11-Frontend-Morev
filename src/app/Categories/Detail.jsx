import React, { Component } from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = props.location.state;
  }

  render() {
    const { category, topics } = this.state;

    return (
      <div>
        <h3>{`Категория "${category.name}" (всего ${topics.length} топиков)`}</h3>
        <div className="row my-2">
          <div className="col-md-12">
            <div className="card mt-1">
              <div className="card-body">
                <p>{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <a className="btn btn-primary float-right" role="button" href="/">Добавить топик</a>

        <h3>Топики</h3>
        <div className="row">
          {
            topics.length !== 0
              ? topics.map((topic, i) => (
                <div key={topic.id} className="col-md-12">
                  <div className="card mt-1">
                    <div className="card-body">
                      <a className="card-link" href="/">{topic.name}</a>
                      <hr />
                      <div>
                        Автор: ...
                      </div>

                      <div>В категориях: ...</div>
                      <hr />
                      <div>Понравилось (...): ...</div>
                      <div>Посмотрело ... человек</div>
                    </div>
                  </div>
                </div>
              ))
              : <div className="col-md-12">Нет ни одного топика в категории</div>
          }
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

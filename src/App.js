import React, { Component } from 'react';

import { AuthorInfoForm } from './app/author-info';

class App extends Component {
	render() {
		return (
			<div>
				<AuthorInfoForm action="/" method="POST" enctype="multipart/form-data"/>
			</div>
		);
	}
}

export default App;
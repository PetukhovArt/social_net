import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import {Provider} from 'react-redux';
import {store} from 'redux/store-redux';
import {HashRouter} from 'react-router-dom';
import App from 'App';

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
  document.getElementById("root")
);

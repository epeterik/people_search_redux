import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './reducer';

const store = createStore(userReducer);
console.log(store);

const Root = () => {
	return (<Provider store={store}>
                <App />
            </Provider>);
}

ReactDOM.render(<Root />, document.getElementById('root'));

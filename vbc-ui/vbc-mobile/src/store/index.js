/* global __DEV__ */
/**
 * App's redux store configuration
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Reactotron from '../../debugging_config.js';

const middleware = [thunk];
let composed = applyMiddleware(...middleware);
const createdEnhancer = Reactotron.createEnhancer();

if (__DEV__) {
  composed = compose(applyMiddleware(...middleware), createdEnhancer);
}

export default createStore(reducers, composed);

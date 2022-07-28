import { applyMiddleware, combineReducers, compose, createStore,} from 'redux';
import SecretsReducer from './reducers/SecretsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';

const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    secrets: SecretsReducer,
    auth: AuthReducer,
});

export const store = createStore(reducers,  composeEnhancers(middleware));

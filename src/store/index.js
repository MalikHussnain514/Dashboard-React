import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer/reducer';
import thunk from 'redux-thunk';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, applyMiddleware(thunk));
const persister = 'Free';

export { store, persister };

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

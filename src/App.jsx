import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import store, { persistor } from './store';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter history={history}>
          <Header />
          <Routes />
          <Footer />
          <GlobalStyles />
          <ToastContainer autoClose={5000} className="toast-container" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

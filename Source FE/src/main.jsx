import './global/index.scss'
import App from './views/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react'; // đảm bảo ứng dụng chỉ chạy khi data từ LocalStorage nạp  
// vào redux thành công (nếu chưa có data thì k chạy).

import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-quill/dist/quill.snow.css';

import './setup/i18n';

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient} >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>,
)

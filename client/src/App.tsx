import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ProductPage from './page/product/page';
import { Provider } from 'react-redux';
import AddInvoicePage from './page/invoices/add';
import InvoicePage from './page/invoices/page';
import { store } from './redux/store';
import InvoiceView from './page/invoices/view';
import MainLayout from './components/layout/DashboardLayout';
import NotFound from './components/NotFound';



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [

      {
        path: '/',
        element: <InvoicePage />,
      },
      {
        path: '/add',
        element: <AddInvoicePage />,
      },
      {
        path: '/view/:id',
        element: <InvoiceView />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },

    ],
  },
]);


function App() {
  return (
    <>

      <Provider store={store}>

        <CssBaseline />
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </>

  );
}

export default App

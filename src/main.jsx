import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, } from "react-router-dom";
import './index.css'
import router from './Routes/Routes.jsx';
import AuthProvider from './Providers/AuthProvider';
import {QueryClient ,QueryClientProvider,} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

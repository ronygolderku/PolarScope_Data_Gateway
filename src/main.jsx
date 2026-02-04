import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/router.jsx'
import { ProductDataProvider } from './context/ProductDataContext.jsx'
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductDataProvider>
      <RouterProvider router={router} />
    </ProductDataProvider>
  </StrictMode>,
)

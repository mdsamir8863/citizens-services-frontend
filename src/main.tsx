import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store' // Store import kiya
import { router } from './router'
import './index.css'
import { ToastProvider } from './common/contexts/ToastContext'
import { ConfirmProvider } from './common/contexts/ConfirmContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfirmProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ConfirmProvider>
    </Provider>
  </StrictMode>,
)

import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MainLayout } from '../layouts/MainLayout'
import { WelcomeRoutes } from './WelcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      WelcomeRoutes
    ]
  }
])

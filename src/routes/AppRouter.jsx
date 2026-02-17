import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthForm } from '../pages/AuthForm'


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
            <PublicRoute>
              <AuthForm />
            </PublicRoute>
          } 
        />

        <Route path='/*' element={
          <PrivateRoute>
            <DashboardRoutes />
          </PrivateRoute>
         }
        />
      </Routes>
    </BrowserRouter>
  )
}

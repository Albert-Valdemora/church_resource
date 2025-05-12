import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { Login } from '../pages/Login'


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/login' element={<LoginScreen />}></Route> */}

        <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        <Route path='/*' element={
          <PrivateRoute>
            <DashboardRoutes />
          </PrivateRoute>
         }
        />

        {/* <Route path='/*' element={<DashboardRoutes/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

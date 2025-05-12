import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { SubirRecurso } from "../pages/SubirRecurso";
import { ViewResource } from "../pages/ViewResource";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="subir" element={<SubirRecurso />}></Route>
        <Route path="resource/:id" element={<ViewResource />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
};

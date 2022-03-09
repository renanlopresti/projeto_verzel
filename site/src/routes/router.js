import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClassPage from "../pages/classPage/classPage";
import ErrorPage from "../pages/errorPage/errorPage";
import HomePage from "../pages/homePage/homePage";

export default function Router() {

 return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='*' element={<ErrorPage />} />
    <Route path='/module/:id_modules' element={<ClassPage />} />
   </Routes>
  </BrowserRouter>
 )
}
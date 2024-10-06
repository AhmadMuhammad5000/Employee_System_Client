import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react'
const Login = lazy(() => import('./Components/login'))
const Dashboard = lazy(() => import('./Components/dashboard'))
const Home = lazy(() => import('./Components/home'))
const Employees = lazy(() => import('./Components/employees'))
const EditEmployee = lazy(() => import('./Components/editEmployee'))
const DeleteEmployee = lazy(() => import('./Components/deleteEmployee'))
const AddEmployee = lazy(() => import('./Components/add_employee'))
const Category = lazy(() => import('./Components/category'))
const EditCategory = lazy(() => import('./Components/editCategory'))
const DeleteCategory = lazy(() => import('./Components/deleteCategory'))
const AddCategory = lazy(() => import('./Components/add_category'))
const Profile = lazy(() => import('./Components/profile'))


const App = () => {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login />}></Route>
               <Route path="/login" element={<Login />}></Route>
               <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="" element={<Home />}></Route>
                  <Route path="/dashboard/category" element={<Category />}></Route>
                  <Route path="/dashboard/employees" element={<Employees />}></Route>
                  <Route path="/dashboard/editEmployee/:id" element={<EditEmployee />}></Route>
                  <Route path="/dashboard/deleteEmployee/:id" element={<DeleteEmployee />}></Route>
                  <Route path="/dashboard/editCategory/:id" element={<EditCategory />}></Route>
                  <Route path="/dashboard/deleteCategory/:id" element={<DeleteCategory />}></Route>
                  <Route path="/dashboard/profile" element={<Profile />}></Route>
                  <Route path="/dashboard/add_employee" element={<AddEmployee />}></Route>
                  <Route path="/dashboard/add_category" element={<AddCategory />}></Route>
               </Route>

            </Routes>
         </BrowserRouter>
      </>

   );
}

export default App

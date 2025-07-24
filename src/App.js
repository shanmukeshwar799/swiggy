import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Liked from './components/Liked';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { createBrowserRouter, RouterProvider , Outlet} from 'react-router';
import UserContext from './utils/UserContext';
import { useState, useEffect } from 'react';
import React,{lazy,Suspense} from 'react';
import appStore from './utils/AppStore';
import {Provider} from 'react-redux';
import Cart from './components/Cart';
import Footer from './components/Footer';

const Grocery = lazy(() => import("./components/Grocery"));
const AppLayout = () => {
   
   const [userName,setUserName] = useState();

   useEffect(() => {
     const data = {
       name : "shanmuk",
     }
     setUserName(data.name);
   },[]);


   return (
      <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName , setUserName}}>
      <div className="app">
         <Header />
         <Outlet />
         <Footer />
      </div>
      </UserContext.Provider>
      </Provider>
   );
};

const appRouter = createBrowserRouter([
   {
      path:"/",
      element:<AppLayout />,
      children: 
      [
         {
            path:"/",
            element: <Body />,
         },
         {
            path:"/about",
            element: <About />,
         },
         {
            path:"/liked",
            element: <Liked />
         },
         {
            path:"/restaurant/:resId",
            element: <RestaurantMenu />,
         },
         {
            path:"/cart",
            element: <Cart />
         },
         {
            path:"/grocery",
            element: (<Suspense fallback=
               {<h1>loading...</h1>}><Grocery />
               </Suspense>),
         },
      ],
      errorElement : <Error />
   },
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
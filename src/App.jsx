import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/myStore";
import PopularMovie from "./Components/Popularmovie/Popularmovie";
import Topratedmovie from "./Components/Topratedmovie/Topratedmovie";
import Upcomingmovie from "./Components/Upcomingmovie/Upcomingmovie";
import Nowplayingmovie from "./Components/Nowplayingmovie/Nowplayingmovie";
import PopularTv from "./Components/PopularTv/PopularTv";
import Airingtodaytv from "./Components/Airingtodaytv/Airingtodaytv";
import Ontv from "./Components/Ontv/Ontv";
import Topratedtv from "./Components/Topratedtv/Topratedtv";
import PopularPeople from "./Components/PopularPeople/PopularPeople";
import ShowDetails from "./Components/ShowDetails/ShowDetails";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import { Offline } from "react-detect-offline";
import NotFound from "./Components/NotFound/NotFound";
import { Helmet } from "react-helmet";

import favicon from "./Images/movie-camera.png";
import Search from "./Components/Search/Search";
import { QueryClient, QueryClientProvider } from "react-query";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "popularMovie",
        element: <PopularMovie />,
      },
      {
        path: "nowPlayingMovie",
        element: <Nowplayingmovie />,
      },
      {
        path: "upComingMovie",
        element: <Upcomingmovie />,
      },
      {
        path: "topRatedMovie",
        element: <Topratedmovie />,
      },
      {
        path: "popularTv",
        element: <PopularTv />,
      },
      {
        path: "airingTodayTv",
        element: <Airingtodaytv />,
      },
      {
        path: "onTV",
        element: <Ontv />,
      },
      {
        path: "topRatedTv",
        element: <Topratedtv />,
      },
      {
        path: "popularPeople",
        element: <PopularPeople />,
      },
      {
        path: "details/:category/:id",
        element: <ShowDetails />,
      },
      {
        path: "person/:id",
        element: <PersonalDetails />,
      },
      {
        path: "search/:searchValue",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const client = new QueryClient();

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
          <Offline>
            <div className="offlineMessage bg-dark text-white p-3 ">
              Ooops.. You Are Offline Now..
            </div>
          </Offline>
        </QueryClientProvider>
      </Provider>
    </>
  );
}


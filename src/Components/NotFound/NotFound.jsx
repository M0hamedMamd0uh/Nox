import React from 'react'
import { Helmet } from 'react-helmet';
import notFound from "../../Images/error.svg";


export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="container py-5 d-flex justify-content-center pt-5">
        <div className="w-50">
          <img src={notFound} alt="not found" className="w-100" />
        </div>
      </div>
    </>
  );
}

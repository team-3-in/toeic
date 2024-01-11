import React, { Suspense, lazy } from "react";
import Loading from "./Loading";

function LazyHome() {
  const HomeComponent = lazy(() => import("./Home"));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <HomeComponent />
      </Suspense>
    </>
  );
}

export default LazyHome;

import React from "react";
import { Regions } from "./components/Regions";
import { Provinces } from "./components/Provinces";
import { Reports } from "./components/Reports";

export const App = () => {
  return (
    <>
      <Regions />
      <Provinces />
      <Reports />
    </>
  );
};

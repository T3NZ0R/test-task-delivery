import React from "react";
import { AppRoutes } from "./app/lib/routes/routes";
import { Layout } from "./app/lib/layouts/Layout";

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;

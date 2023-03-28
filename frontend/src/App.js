import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./pages/Detail";
import Index from "./pages/Index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/info/:detail_id",
      element: <Detail />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

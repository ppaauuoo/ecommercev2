import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux";
import Login from "./pages/Auth/Login";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error/>,
    children: [
      { path: "/", element: <Home /> },
      { },
    ],
  },
  {path: "/login", element: <Login /> }
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;

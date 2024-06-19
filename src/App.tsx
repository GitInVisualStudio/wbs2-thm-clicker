import UserList from "./components/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductList from "./components/ProductList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserList />,
    },
    {
      path: "/productlist",
      element: <ProductList />,
    },
  ]);

  return (
    <>
      <nav className="bg-light mb-3 shadow-sm navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Usermanager (Checkboxes)
          </a>
          <ul className="me-auto navbar-nav">
            <a className="nav-link" href="/">
              Userlist
            </a>
            <a className="nav-link" href="/productlist">
              Productlist
            </a>
          </ul>
        </div>
      </nav>
      <div className="d-flex gap-3 flex-column container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;

import Layout from "../layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./components/Login/Login";
// import Sign_up from "./components/SignUp/Sign_up";
// import Products from "./components/Products/Products";
// import AddProduct from "./components/AddProduct/AddProduct";
// import Product from "./components/Product/Product";
// import EditProduct from "./components/EditProduct/EditProduct";
// import ElementHighlights from "./components/Rechrts/graph";
// import Recharts from "./components/Rechrts/Rechrts"

// import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";



function Router() {
  // if ("__DEV__") {  // Adds messages only in a dev environment
  //   loadDevMessages();
  //   loadErrorMessages();
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            {/* <Route index element={< />} /> */}

            {/* <Route path="/erp/Sign_up" element={<Sign_up />} />
            <Route path="/erp/graph" element={<ElementHighlights />} />
            <Route path="/erp/Products" element={<Products />} />
            <Route path="/erp/Recharts" element={<Recharts />} />

            <Route path="/erp/Product/:id" element={<Product />} />
            <Route path="/erp/AddProduct" element={<AddProduct />} />
            <Route path="/erp/EditProduct/:id" element={<EditProduct />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      router
    </div>
  );
}
export default Router
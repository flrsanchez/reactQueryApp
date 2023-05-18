import React from "react";
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import form from '../src/form.css'

function App() {
    return (
        <>
            <ProductForm />
            <Products />
        </>
    );
}

export default App;

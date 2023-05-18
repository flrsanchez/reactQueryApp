import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function ProductForm() {
    const queryClient = useQueryClient();

    const addProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            console.log("Product added");
            queryClient.invalidateQueries('products')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const product = Object.fromEntries(formData)
        addProductMutation.mutate({
            ...product,
            inStock: true
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label>Name</label>
                <input type="text" name="nombre" id="nombre" placeholder="Name" />

                <label>Desc.</label>
                <input type="text" name="description" id="description" placeholder="Description" />

                <label>Price</label>
                <input type="text" name="price" id="price" placeholder="Price" required />

                <input type="submit" name="addpro" value="Add Product" />
            </form>
        </div >);
}

export default ProductForm;

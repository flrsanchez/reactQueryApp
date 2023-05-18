import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, getProducts, updateProduct } from '../api/productsAPI';

function Products() {
    const queryClient = useQueryClient();

    const { isLoading, data: products, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        select: products => products.sort((a, b) => b.id - a.id)
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }

    })
    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })

    if (isLoading) return <div>...is Loading</div>;

    else if (isError) return <div>Error. {error.message}</div>;

    return products.map(product => (
        <div key={product.id} style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #ccc', padding: '1px', borderRadius: '5px' }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button
                style={{ margin: '10px', padding: '5px 10px', background: '#ccc', border: 'none', borderRadius: '3px' }}
                onClick={() => {
                    console.log('delete id:', product.id)
                    deleteProductMutation.mutate(product.id);
                }
                }>Delete</button>
            <input type='checkbox'
                checked={product.inStock}
                onChange={(e) => {
                    updateProductMutation.mutate({
                        ...product,
                        inStock: e.target.checked
                    })
                }} />
            <label style={{ marginLeft: '5px' }}>In Stock</label>
        </div >
    ));
}

export default Products;

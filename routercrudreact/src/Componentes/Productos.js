import React, {Fragment} from 'react';
import ProductoLista from './ProductoLista'

const Productos = (props) => {

    const {productos, guardarActualizarProductos} = props

    return (
        <Fragment>
            <h1 className = 'text-center'>Productos</h1>
            <ul className='list-group mt-5'>
                {productos.map(producto => (
                    <ProductoLista
                        key = {producto.id}
                        producto = {producto}
                        guardarActualizarProductos = {guardarActualizarProductos}
                    />
                ))}
            </ul>
            
        </Fragment>
            
        
    );
};

export default Productos;
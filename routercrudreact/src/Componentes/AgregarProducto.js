import React, {useState} from 'react';
import Error from './Error'
import axios from 'axios';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

const AgregarProducto = ({history, guardarActualizarProductos}) => {

    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState('')
    const [categoria, guardarCategoria] = useState('')
    const [error, guardarError] = useState(false)

    const handleSubmit =async e => {
        e.preventDefault();

        //validacion del formulario
        if (nombre === '' || precio === '' || categoria === ''){
            guardarError(true)
            return
        }

        // si el formulario se lleno correctamente
        guardarError(false)
        //Se envian los datos del formulario
        try {
            const url = 'http://localhost:4000/restaurant'
            const resultado = await axios.post(url,{ 
                nombrePlatillo : nombre,               
                precioPlatillo : precio,                
                categoria
            })
            // mostar alerta de exito
            if (resultado.status === 201){
                Swal.fire(
                    'Completado',
                    'El producto se creó correctamente',
                    'success'
                ) 
            }   
            
            // si ocurrio un error al enviar los datos
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'El producto no pudo ser creado',
            })
        }
        //Redirigir al usuario a productos
        history.push('/productos')
        guardarActualizarProductos(true)
    }
    

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error)?<Error mensaje='Todos los campos son obligatorios'/> : null}
            <form
                className="mt-5"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e => guardarPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"                        
                        onChange={e => guardarCategoria(e.target.value)}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"                        
                        onChange={e => guardarCategoria(e.target.value)}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"                        
                        onChange={e => guardarCategoria(e.target.value)}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"                        
                        onChange={e => guardarCategoria(e.target.value)}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>    
    );
};

export default withRouter(AgregarProducto);
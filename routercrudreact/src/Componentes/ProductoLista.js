import React,  {Fragment} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

const ProductoLista = (props) => {

    const {producto, guardarActualizarProductos} = props

    const eliminarPlato = id => {
        //ADVERTENCIA antes de eliminar el plato
        Swal.fire({
        title: 'Está Seguro?',
        text: "Esta acción no podrá ser revertida",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar!'
      }).then(async (result) => {
        if (result.value) { 
            //si el usuario acepta se procede a eliminar el platillo           
            try {
                const url = `http://localhost:4000/restaurant/${id}`
                const resultado =await axios.delete(url)
                //Si se elimino correctamente 
                if (resultado.status === 200){
                    Swal.fire(
                        'Eliminado',
                        'Su platillo ha sido Eliminado',
                        'success'
                    )// Se actualiza la lista de platillos
                    guardarActualizarProductos(true)                    
                }
                // si icurre algun error a la hora de hacer la consulta a la api se muestra en consola
            } catch (error) {
                console.log(error);
            }           
        }
      })
    }

    return (
        
        <Fragment >
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <p>
                    {producto.nombrePlatillo}
                    <span className='font-weight-bold'>: ${producto.precioPlatillo}</span>
                </p>
                <div>
                    <Link 
                        className="btn btn-success"
                        to= {`/productos/editar/${producto.id}`} >
                        Editar
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => eliminarPlato(producto.id)}>
                        Eliminar
                    </button>
                </div>
                
            </li>
            
            
        </Fragment>
       
    );
};

export default  ProductoLista;
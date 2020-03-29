import React, {useState, useEffect}  from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import Header from './Componentes/Header'
import AgregarProducto from './Componentes/AgregarProducto'
import EditarProducto from './Componentes/EditarProducto'
import Producto from './Componentes/Producto'
import Productos from './Componentes/Productos'



function App() {
  
  const [productos, guardarProductos] = useState([])
  const [actualizarProductos, guardarActualizarProductos] = useState(true)


  
  
  useEffect(() => {
    //conectar a API de json server
    const conectarApi =async () => {
    const url = 'http://localhost:4000/restaurant'
    const resultado = await axios.get(url)
    guardarProductos(resultado.data)

  }
  if (actualizarProductos) conectarApi()
  
  guardarActualizarProductos(false)
}, [actualizarProductos])


  return (
    <Router>
      <Header/>
      <main className='container mt-5'>
        <Switch>
          <Route 
            exact path='/nuevo-producto'
            render={() => (
              <AgregarProducto 
                guardarActualizarProductos = {guardarActualizarProductos}
              />
            )}
          />
          <Route 
            exact path='/productos'
            render={() => (
              <Productos 
                productos = {productos}
                guardarActualizarProductos = {guardarActualizarProductos}
              />
            )}
          />
          <Route 
            exact path='/productos/:id'
            component={Producto}
          />
          <Route 
            exact path='/productos/editar/:id'
            render={props => {  
              //filtrar el producto a editar por medio de su id
              const idProducto =props.match.params.id
              const productoDeseado = productos.filter(producto => producto.id === idProducto)
              
              return (
              <EditarProducto 
                producto = {productoDeseado[0]}
                guardarActualizarProductos = {guardarActualizarProductos}
              />
            )}}
          />
        </Switch>    
      </main>
      <p className='text-center mt-4 '>Todos los Derechos Reservados</p>  
    </Router>
  );
}

export default App;

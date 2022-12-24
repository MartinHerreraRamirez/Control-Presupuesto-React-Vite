import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBTN from '../img/cerrar.svg'


const Modal = ({
    setModal, 
    gastoEditar, 
    animarModal, 
    setAnimarModal, 
    guardarGastos,
    setGastoEditar    
}) => {

    const [ nombre, setNombre ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ fecha, setFecha ] = useState('')
    const [ mensaje, setMensaje ] = useState('')
    const [ id, setId ] = useState('')

    useEffect( () => {

        if(Object.keys(gastoEditar).length > 0 ){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)            
        }

    }, [] )

    const cerrarModal = () =>{
        
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout( () => {

            setModal(false)
            
        }, 500)
    }

    const handleSubmit = e => {
        
        e.preventDefault()

        if([ nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout( () => {
                setMensaje('')
            }, 3000)
            return
        }

        guardarGastos({nombre, cantidad, categoria, fecha, id})
        
    }

  return (
    <div className='modal'>

        <div className='cerrar-modal'>
            <img 
                src={CerrarBTN} 
                alt="cerrar modal"
                onClick={cerrarModal} 
            />
        </div>

        <form 
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} 
            onSubmit={handleSubmit}            
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje type='error'>{mensaje}</Mensaje>}

            <div className='campo'>

                <label htmlFor="nombre">Nombre</label>

                <input 
                    type='text' 
                    id='nombre'  
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />

            </div>

            <div className='campo'>

                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type='number' 
                    id='cantidad'  
                    placeholder='Añade el valor del gasto. Ej.: $300'
                    value={cantidad}
                    onChange={ e => setCantidad(Number(e.target.value))}
                />

            </div>

            <div className='campo'>

                <label htmlFor="categoria">Categoria</label>

                <select
                    id='categoria'
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value)}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='varios'>Gastos Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>

            </div>

            <input 
                type='submit'
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Nuevo Gasto'} 
            />
            
        </form>
    </div>
  )
}

export default Modal
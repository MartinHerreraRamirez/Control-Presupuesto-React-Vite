import { useState, useEffect } from "react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { toCash } from "../helpers"


const ControlPresupuesto = ({
    gastos, 
    setGastos, 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [ disponible, setDisponible ] = useState(0)
    const [ gastado, setGastado ] = useState(0)
    const [ porcentaje, setPorcentaje ] = useState(0)


    useEffect( () =>{

        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        //porcentaje
        const porcentajeActualizado = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setTimeout ( () => {

            setPorcentaje(porcentajeActualizado)

        }, 1500)


    }, [gastos])

    const handleResetApp = () => {
        const resultado = confirm('Reiniciar Control Gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        <div>
            <CircularProgressbar  
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82fc',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82fc'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button 
                className="reset-app" 
                type="button" 
                onClick={handleResetApp}
            >Resetear APP</button>
            <p>
                <span>Presupuesto: </span> {toCash(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''} `}>
                <span>Disponible: </span> {toCash(disponible)}
            </p>

            <p>
                <span>Gastado: </span> {toCash(gastado)}
            </p>

        </div>

    </div>
  )
}

export default ControlPresupuesto
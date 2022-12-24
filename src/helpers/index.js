export const generarId = () => {

    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const toCash = (cuantity) => {

    return cuantity.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}

export const formatearFecha = (fecha) => {

    const fechaNueva = new Date(fecha)    

    return fechaNueva.toLocaleDateString('es-ES',{
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    })
}
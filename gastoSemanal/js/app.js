// Variables
const presupuestoUsuario = prompt(`cual es tu presupuesto semanal`);
const formulario = document.getElementById('agregar-gasto');

let cantidadPresupuesto;

// Clases
// Clase de presupuesto

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);  
    }
    //Metodo para ir restando al presupuesto actual
    presupuestoRestante(cantidad=0){
        return this.restante -= Number(cantidad);
    }

}

//Clase de Interfaz maneja todo lo relacionado al HTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.getElementById('total');
        const restanteSpan = document.getElementById('restante');

        // Insertar html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar el alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 1500)
    }
    //Inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad){
        const gastosListado=document.querySelector('#gastos ul');
        const li =  document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // insertar el gasto
        li.innerHTML = `
        ${nombre} 
        <span class="badge badge-primary badge-pill"> $${cantidad}</span>
        `
        // Insertar al html
        gastosListado.appendChild(li);
    }
    presupuestoRestante(cantidad){
        const restante = document.getElementById('restante');
        const presupuestoRestante = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML= `${presupuestoRestante}`;
        
        this.comprobarPresupuesto();
    }   

    // cambiar de color el restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        // comprobar 25% gasto
        if(presupuestoTotal/4>presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning')
            restante.classList.add('alert-danger')
        } else if(presupuestoTotal/2>presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-danger')
            restante.classList.add('alert-warning')
        }
        
        //comprobar 50% gasto
    }
}



// EventListeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    } else{
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // Instanciar la fase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
})
formulario.addEventListener('submit', function(e){
    e.preventDefault;
    console.log('enviado')

    //Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    // instanciar la interface
    const ui = new Interfaz();
    if (nombreGasto ===''|| cantidadGasto === ''){
        ui.imprimirMensaje('Hubo un error', 'error');
    } else{
        // Insertar en el HTML
        ui.imprimirMensaje('Gasto agregado correctamente', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

})




// Funciones

import { actualizarAvance } from '../funciones/avance';

const axios = require('axios');
const Swal = require('sweetalert2');
const listado = document.querySelector('.listado-pendientes');

if (listado) {
  listado.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;
      axios.patch(url, { idTarea }).then(function (respuesta) {
        if (respuesta.status === 200) {
          icono.classList.toggle('completo');
          actualizarAvance();
        }
      });
    }
    if (e.target.classList.contains('fa-trash')) {
      const tareaHTML = e.target.parentElement.parentElement,
        idTarea = tareaHTML.dataset.tarea;
      Swal.fire({
        title: 'Desea borrar esta tarea?',
        text: 'Esta acción no se puede revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/tareas/${idTarea}`;
          axios.delete(url, { params: { idTarea } }).then((respuesta) => {
            if (respuesta.status === 200) {
              tareaHTML.parentElement.removeChild(tareaHTML);
              Swal.fire('Tarea eliminada', respuesta.data, 'success');
              actualizarAvance();
            }
          });
        }
      });
    }
  });
}

export default listado;

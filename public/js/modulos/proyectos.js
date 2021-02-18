import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.getElementById('eliminar-proyecto');
if (btnEliminar) {
  btnEliminar.addEventListener('click', (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;
    Swal.fire({
      title: 'Borrar proyecto',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${location.origin}/proyectos/${urlProyecto}`;
        axios
          .delete(url, { params: { urlProyecto } })
          .then(function (respuesta) {
            Swal.fire('Eliminado', 'El proyecto fue eliminado', 'success');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto',
            });
          });
      }
    });
  });
}
export default btnEliminar;

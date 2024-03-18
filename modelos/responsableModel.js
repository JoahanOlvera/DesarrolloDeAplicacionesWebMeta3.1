// Definición de la clase Responsable
class Responsable {
    // Constructor para inicializar las propiedades de un responsable
    constructor(id, numeroEmpleado, nombre, activosCustodiados, imagen) {
        // Asignación de valores a las propiedades del responsable
        this.id = id;
        this.numeroEmpleado = numeroEmpleado;
        this.nombre = nombre;
        this.activosCustodiados = activosCustodiados;
        this.imagen = imagen;
    }
}

// Exportación de la clase Responsable para que pueda ser utilizada en otros archivos
export default Responsable;
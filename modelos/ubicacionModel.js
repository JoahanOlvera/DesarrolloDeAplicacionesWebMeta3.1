// Definición de la clase Ubicacion
class Ubicacion {
    // Constructor para inicializar las propiedades de una ubicación
    constructor(id, descripcion, activosAsociadosId, imagen) {
        // Asignación de valores a las propiedades de la ubicación
        this.id = id;
        this.descripcion = descripcion;
        this.activosAsociadosId = activosAsociadosId;
        this.imagen = imagen;
    }
}

// Exportación de la clase Ubicacion para que pueda ser utilizada en otros archivos
export default Ubicacion;
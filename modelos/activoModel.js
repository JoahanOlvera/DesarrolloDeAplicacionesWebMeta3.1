// Definición de la clase Activo
class Activo {
    // Constructor para inicializar las propiedades de un activo
    constructor(id, numeroSerie, numeroInventario, tipo, descripcion, ubicacionId, responsableId, imagen) {
        // Asignación de valores a las propiedades del activo
        this.id = id;
        this.numeroSerie = numeroSerie;
        this.numeroInventario = numeroInventario;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.ubicacionId = ubicacionId;
        this.responsableId = responsableId;
        this.imagen = imagen;
    }
}

// Exportación de la clase Activo para que pueda ser utilizada en otros archivos
export default Activo;

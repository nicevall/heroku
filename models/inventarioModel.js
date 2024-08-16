class Inventario {
    constructor(id, cantidad, fecha_vencimiento, nombre, proveedor, tipo, unidad) {
      this.id = id;
      this.cantidad = cantidad;
      this.fecha_vencimiento = fecha_vencimiento;
      this.nombre = nombre;
      this.proveedor = proveedor;
      this.tipo = tipo;
      this.unidad = unidad;
    }
  }
  
  export default Inventario;
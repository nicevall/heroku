class Veterinarian {
    constructor(id, nombre, apellido, especialidad, horario, licencia, usuario_id) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.especialidad = especialidad;
      this.horario = horario; // { dia, hora_inicio, hora_fin }
      this.licencia = licencia;
      this.usuario_id = usuario_id;
    }
  }
  
  export default Veterinarian;
  
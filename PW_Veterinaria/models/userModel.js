class User {
    constructor(id, email, estado, fecha_registro, password_hash, rol, ultimo_acceso) {
      this.id = id;
      this.email = email;
      this.estado = estado;
      this.fecha_registro = fecha_registro;
      this.password_hash = password_hash;
      this.rol = rol;
      this.ultimo_acceso = ultimo_acceso;
    }
  }
  
  export default User;
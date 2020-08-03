export class Usuarios{
    idusuario:number;
    codigo:string;
    usuario:string;
    password:string;
    sede:number;
    tipo:number;
    estado:number;
    idpersona: number;
    idep:number;
    ciclo:string;
    
    idrol:number
    rol:string;
    nombres:string;
    apellidos:string;
    n_documento:string;
    color_fondo:string;
    color_menu:string;
    ACTIVOS:string;
    PENDIENTES:string;
    ESTUDIANTES_PEN:string;
    DOCENTES_PEN:string;
    ESTUDIANTES_ACT:string;
    DOCENTES_ACT:string;
    
    ////////////// TABLAS DE ESTUDIANTES Y DOCENTES PENDIENTES Y ACTIVOS
    IDUSUARIO:number;
    CODIGO:string;
    N_DOCUMENTO:string;
    NOMBRES:string;
    TIPO:string;
    SEDE:string;
    FACULTAD:string;
    ESCUELA:string;
    ESTADO:string;
    CORREO:string;
}

export class Usuario{
    idusuario:number;
    codigo:string;
    usuario:string;
    password:string;
    sede:number;
    tipo:number;
    estado:number;
    idep:number;
    idrol:number;
    ciclo:string;

    idpersona: number;
    nombres:string;
    apellidos:string;
    t_documento:number;
    n_documento:string;
    correo:string;
    telefono:string;
    direccion:string;
    foto:string;
}
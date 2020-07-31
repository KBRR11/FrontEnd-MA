export class Solicitud{
    idsolicitud:number
    idusuario:number
    idconvenio:number
    idconvocatoria:number
    tipo: number
    fecha: string
}
export class Solicitud_Requisito{
    idrequisito_solicitud:number
    idrequisito:number
    idsolicitud:number
    ruta:string
    estado:string
    
}
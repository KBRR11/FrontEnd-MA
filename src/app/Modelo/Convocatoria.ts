
export class Convocatoria{
    idconvocatoria:number;
    nom_convocatoria:String;
    info_convocatoria:String;
    n_vancates:number;
    cicloacademico:String;
    estado:String;
}

export interface DetalleConvocatoria{
    idetalle_convocatoria:number;
    idconvocatoria:number;
    idescuela:number;
    estado:String;
    desde:String;
    hasta:number;
    nombre:String;
    escuela:String;
}
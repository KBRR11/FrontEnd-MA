
export class Convocatoria{
    idconvocatoria:number;
    nom_convocatoria:String;
    info_convocatoria:String;
    n_vacnates:number;
    ciclo_academico:String;
    estado:String;
    documento:string;
}

export class DetalleConvocatoria{
    idetalle_convocatoria:number;
    idconvocatoria:number;
    idescuela:number;
    estado:String;
    desde:String;
    hasta:String;
    nombre:String;
    escuela:String;
    
}

export class Convocatoria{
    idconvocatoria:number;
    nom_convocatoria:String;
    ciclo_academico:String;
    estado:String;
    desde:String;
    hasta:String;
    documento:string;
}

export class DetalleConvocatoria{
    idetalle_convocatoria:number;
    idconvocatoria:number;
    idescuela:number;
    idconvenio:number;
    n_vacantes: number;
    
}
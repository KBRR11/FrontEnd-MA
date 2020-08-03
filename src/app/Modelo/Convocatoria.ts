
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
    nom_convocatoria:string
    idescuela:number;
    escuela:string;
    idconvenio:number;
    convenio:string;
    n_vacantes: number;
    
}

export class Universidades{
    iduniversidad:number;
    nom_universidad:string;
    pais:string; 
    idconvenio:number;
}
export class Usuario {

    constructor(
        public id_usuario : number,
        public id_perfil : number,
        public foto : string,
        public usuario : String,
        public contra : String,
        public nombre : String,
        public ape_paterno : String,
        public ape_materno : String,
        public password: String = ""
    ){ }
 
}

import { Empresa } from "./empresa";

 interface Usuario{
   id?: number ;
   nombre?: string;
   apellidoP?: string;
   apellidoM?: string;
   correo?: string;
   password?: string;
   telefono?: string;
   estado?: number;
   verificado?: boolean;
   empresa?: Empresa;
   empresaId?: number;
   avatar?: string;
   createdAt?: string;
   updatedAt?: string;
   nombreCompleto?: string;

}

export {
  Usuario
}

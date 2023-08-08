interface MenuInterface {
     menu: string,
     menuId: number,
     padreId?: number,
     moduloId: number,
     hijos?: [],
     icono: string;
     route: string;
     permisos?: [];
     opciones?: []

}

export default MenuInterface;
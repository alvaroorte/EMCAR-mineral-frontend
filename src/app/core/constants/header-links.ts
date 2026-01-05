import { MenuHeader } from "@core/models/Header";
import { ROLES_CODE_SYSTEM } from "../enums/roles.enum";

export const urlsWithPermissions: MenuHeader[] = [
  { routerLink: 'loads', label: 'Cargas', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-building', show: true},
  { routerLink: 'companies', label: 'Empresas', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-building', show: false},
  { routerLink: 'materials', label: 'Materiales', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-building', show: false},
  { routerLink: 'type-materials', label: 'Tipos de materiales', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-building', show: false},
  { routerLink: 'mines', label: 'Minas', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-building', show: false},
  { routerLink: 'suppliers', label: 'Proveedores', access: [ROLES_CODE_SYSTEM.ADMIN], icon: 'pi pi-users', show: false},
];
  
export const configurationLinks: string[] = [ 
  'companies',
  'materials',
  'type-materials',
  'mines',
  'suppliers',
];
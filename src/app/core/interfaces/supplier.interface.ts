import { DataBase } from "./base-common.interface";

export interface Supplier extends DataBase {
    id: number;
    name: string;
    surname: string;
    documentNumber: string;
    address: string;
    supplierGroup: string;
    expeditionPlace: string;
}
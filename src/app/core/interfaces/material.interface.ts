import { DataBase } from "./base-common.interface";

export interface Material extends DataBase {
    id: number;
    name: string;
    description: string;
}
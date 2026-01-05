import { LOT_ASSIGNMENT } from "@core/enums/lot.enum";
import { DataBase } from "./base-common.interface";

export interface Lot extends DataBase {
    id: number;
    prefix: string;
    description: string;
    initialDocNumber: number;
    assignment: LOT_ASSIGNMENT;
    state: boolean;
}
import { DataBase } from "./base-common.interface";

export interface Load extends DataBase {
    id: number,
    supplierId: number,
    lotId: number,
    materialId: number,
    typeMaterialId: number,
    mineId: number,
    cooperativeId: number,
    date: string,
    externalLot: string,
    correlativeLotCode: string,
    numberSacks: number,
    weight: number,
    observation: string,
    supplierName: string,
    lotDescription: string,
    materialName: string,
    typeMaterialName: string,
    mineName: string,
    cooperativeName: string,
}

export interface CorrelativeLot {
    correlative: string;
}
import { Company } from "@core/interfaces/company.interface";
import { LABELS } from "../constants/labels";
import { TableColumnType } from "../enums/table-column-type.enum";
import { TableColumn } from "../interfaces/table-column-interface";
import { Material } from "@core/interfaces/material.interface";
import { Mine } from "@core/interfaces/mine.interface";
import { Supplier } from "@core/interfaces/supplier.interface";
import { TypeMaterial } from "@core/interfaces/type-material.interface";
import { Lot } from "@core/interfaces/lot.interface";
import { Cooperative } from "@core/interfaces/cooperative.interface";
import { Load } from "@core/interfaces/load.interface";

export class TableColumnDefinitions {

  static getDefaultCompanyColumnsDefinitions(): TableColumn<Company>[] {
    return [
      {
        field: 'code',
        header: LABELS.code,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'socialReason',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'nit',
        header: LABELS.nit,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'address',
        header: LABELS.address,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'purpose',
        header: LABELS.purpose,
        columnType: TableColumnType.TEXT,
        initiallyHidden: true
      },
      {
        field: 'nim',
        header: LABELS.nim,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'cellphone',
        header: LABELS.phone,
        columnType: TableColumnType.NUMERIC
      }
    ]
  }
  
  static getDefaultMaterialColumnsDefinitions(): TableColumn<Material>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT
      }
    ]
  }
  
  static getDefaultCooperativeColumnsDefinitions(): TableColumn<Cooperative>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'cajaNacional',
        header: LABELS.cajaNacional + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'fedecomin',
        header: LABELS.fedecomin + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'fencomin',
        header: LABELS.fencomin + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'comibol',
        header: LABELS.comibol + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'wilstermann',
        header: LABELS.wilstermann + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'cooperativeContribution',
        header: LABELS.cooperativeContribution + ' %',
        columnType: TableColumnType.AMOUNT
      },
      {
        field: 'miningRoyalties',
        header: LABELS.miningRoyalties + ' %',
        columnType: TableColumnType.AMOUNT
      }
    ]
  }
  
  static getDefaultLotColumnsDefinitions(): TableColumn<Lot>[] {
    return [
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'prefix',
        header: LABELS.prefix,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'initialDocNumber',
        header: LABELS.initialNumber,
        columnType: TableColumnType.NUMERIC
      },
      {
        field: 'state',
        header: LABELS.status,
        columnType: TableColumnType.STATUS
      }
    ]
  }
  
  static getDefaultTypeMaterialColumnsDefinitions(): TableColumn<TypeMaterial>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT
      }
    ]
  }
  
  static getDefaultMineColumnsDefinitions(): TableColumn<Mine>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT
      }
    ]
  }
  
  static getDefaultSupplierColumnsDefinitions(): TableColumn<Supplier>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'surname',
        header: LABELS.surname,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'documentNumber',
        header: LABELS.docNumber,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'address',
        header: LABELS.address,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'supplierGroup',
        header: LABELS.supplierGroup,
        columnType: TableColumnType.TEXT
      },
    ]
  }

  static getDefaultLoadColumnsDefinitions(): TableColumn<Load>[] {
    return [
      {
        field: 'date',
        header: LABELS.date,
        columnType: TableColumnType.DATE
      },
      {
        field: 'supplierName',
        header: LABELS.clientName,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'lotDescription',
        header: LABELS.clientName,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'externalLot',
        header: LABELS.clientName,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'materialName',
        header: LABELS.materials,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'weight',
        header: LABELS.weight,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'numberSacks',
        header: LABELS.numberSacks,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'cooperativeName',
        header: LABELS.cooperative,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'observation',
        header: LABELS.observation,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'createdBy',
        header: LABELS.createdBy,
        columnType: TableColumnType.TEXT
      },
      {
        field: 'updatedBy',
        header: LABELS.updatedBy,
        columnType: TableColumnType.TEXT
      },
    ]
  }
  
}

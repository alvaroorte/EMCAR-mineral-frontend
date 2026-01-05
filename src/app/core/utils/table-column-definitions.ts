import { Company } from "@core/interfaces/company.interface";
import { LABELS } from "../constants/labels";
import { ColumnFilterType } from "../enums/column-filter-type.enum";
import { TableColumnType } from "../enums/table-column-type.enum";
import { TableColumn } from "../interfaces/table-column-interface";
import { Material } from "@core/interfaces/material.interface";
import { Mine } from "@core/interfaces/mine.interface";
import { Supplier } from "@core/interfaces/supplier.interface";
import { TypeMaterial } from "@core/interfaces/type-material.interface";
import { Lot } from "@core/interfaces/lot.interface";

export class TableColumnDefinitions {

  static getDefaultCompanyColumnsDefinitions(): TableColumn<Company>[] {
    return [
      {
        field: 'code',
        header: LABELS.code,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'socialReason',
        header: LABELS.name,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'nit',
        header: LABELS.nit,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'address',
        header: LABELS.address,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT,
        initiallyHidden: true
      },
      {
        field: 'purpose',
        header: LABELS.purpose,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT,
        initiallyHidden: true
      },
      {
        field: 'nim',
        header: LABELS.nim,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'cellphone',
        header: LABELS.phone,
        columnType: TableColumnType.NUMERIC,
        filterType: ColumnFilterType.NUMERIC
      }
    ]
  }
  
  static getDefaultMaterialColumnsDefinitions(): TableColumn<Material>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      }
    ]
  }
  
  static getDefaultLotColumnsDefinitions(): TableColumn<Lot>[] {
    return [
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'prefix',
        header: LABELS.prefix,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'initialDocNumber',
        header: LABELS.initialNumber,
        columnType: TableColumnType.NUMERIC,
        filterType: ColumnFilterType.NUMERIC
      },
      {
        field: 'state',
        header: LABELS.status,
        columnType: TableColumnType.STATUS,
        filterType: ColumnFilterType.TEXT
      }
    ]
  }
  
  static getDefaultTypeMaterialColumnsDefinitions(): TableColumn<TypeMaterial>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      }
    ]
  }
  
  static getDefaultMineColumnsDefinitions(): TableColumn<Mine>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'description',
        header: LABELS.description,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      }
    ]
  }
  
  static getDefaultSupplierColumnsDefinitions(): TableColumn<Supplier>[] {
    return [
      {
        field: 'name',
        header: LABELS.name,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'surname',
        header: LABELS.surname,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'documentNumber',
        header: LABELS.docNumber,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'address',
        header: LABELS.address,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
      {
        field: 'supplierGroup',
        header: LABELS.supplierGroup,
        columnType: TableColumnType.TEXT,
        filterType: ColumnFilterType.TEXT
      },
    ]
  }
  
}

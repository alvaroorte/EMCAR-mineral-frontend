import { Company } from "@core/interfaces/company.interface";
import { LABELS } from "../constants/labels";
import { ColumnFilterType } from "../enums/column-filter-type.enum";
import { TableColumnType } from "../enums/table-column-type.enum";
import { TableColumn } from "../interfaces/table-column-interface";
import { Material } from "@core/interfaces/material.interface";

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
  
  static getDefaultMineColumnsDefinitions(): TableColumn<Material>[] {
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
  
}

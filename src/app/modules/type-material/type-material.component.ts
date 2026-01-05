import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { TypeMaterialModule } from './type-material.module';
import { TypeMaterialService } from './services/type-material.service';
import { TypeMaterial } from '@core/interfaces/type-material.interface';

@Component({
    selector: 'app-type-material',
    imports: [TypeMaterialModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './type-material.component.html'
})
export class TypeMaterialComponent implements OnInit {

  public typeMaterialService = inject(TypeMaterialService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultTypeMaterialColumnsDefinitions();
  public selectedTypeMaterial: TypeMaterial;
  public typeMaterials: TypeMaterial[] = [];

  ngOnInit(): void {
    this.getTypeMaterials();
  }

  public getTypeMaterials(): void {
    this.typeMaterialService.findAll().subscribe({
      next: (res) => {
        this.typeMaterials = res;
      }
    })
  }

  public setSelected(typeMaterial: TypeMaterial) {
    this.typeMaterialService.setSelectedRow(typeMaterial);
    this.selectedTypeMaterial = typeMaterial;
  }

  public onTableSelfEmision(table: GenericTableComponent<TypeMaterial>) {
    this.typeMaterialService.eventTableComponent.emit(table);
  }
}

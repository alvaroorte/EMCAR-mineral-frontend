import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { MaterialService } from './services/material.service';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { Material } from '@core/interfaces/material.interface';
import { MaterialModule } from './material.module';

@Component({
    selector: 'app-material',
    imports: [MaterialModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './material.component.html'
})
export class MaterialComponent implements OnInit {

  public materialService = inject(MaterialService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultMaterialColumnsDefinitions();
  public selectedMaterial: Material;
  public materials: Material[] = [];

  ngOnInit(): void {
    this.getMaterials();
  }

  public getMaterials(): void {
    this.materialService.findAll().subscribe({
      next: (res) => {
        this.materials = res;
      }
    })
  }

  public setSelected(material: Material) {
    this.materialService.setSelectedRow(material);
    this.selectedMaterial = material;
  }

  public onTableSelfEmision(table: GenericTableComponent<Material>) {
    this.materialService.eventTableComponent.emit(table);
  }
}

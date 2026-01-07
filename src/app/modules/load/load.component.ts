import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { LoadModule } from './load.module';
import { LoadService } from './services/load.service';
import { Load } from '@core/interfaces/load.interface';

@Component({
    selector: 'app-load',
    imports: [LoadModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './load.component.html'
})
export class LoadComponent implements OnInit {

  public loadService = inject(LoadService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultLoadColumnsDefinitions();
  public selectedLoad: Load;
  public loads: Load[] = [];

  ngOnInit(): void {
    this.getLoads();
  }

  public getLoads(): void {
    this.loadService.findAll().subscribe({
      next: (res) => {
        this.loads = res;
      }
    })
  }

  public setSelected(load: Load) {
    this.loadService.setSelectedRow(load);
    this.selectedLoad = load;
  }

  public onTableSelfEmision(table: GenericTableComponent<Load>) {
    this.loadService.eventTableComponent.emit(table);
  }
}

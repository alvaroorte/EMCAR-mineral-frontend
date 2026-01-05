import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { HolidayModule } from './company.module';
import { CompanyService } from './services/company.service';
import { Company } from '@core/interfaces/company.interface';
import { LABELS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';

@Component({
    selector: 'app-company',
    imports: [HolidayModule, ToolbarComponent, ModaldeleteComponent, GenericTableComponent],
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  public companyService = inject(CompanyService);

  public readonly labels = LABELS;
  public tableColumnDefinitions = TableColumnDefinitions.getDefaultCompanyColumnsDefinitions();
  public selectedCompany: Company;
  public companies: Company[] = [];

  ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.companyService.findAll().subscribe({
      next: (res) => {
        this.companies = res;
      }
    })
  }

  public setSelected(company: Company) {
    this.companyService.setSelectedRow(company);
    this.selectedCompany = company;
  }

  public onTableSelfEmision(table: GenericTableComponent<Company>) {
    this.companyService.eventTableComponent.emit(table);
  }
}

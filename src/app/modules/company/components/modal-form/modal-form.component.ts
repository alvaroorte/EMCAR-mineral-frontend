import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { CompanyService } from '../../services/company.service';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { Company } from '@core/interfaces/company.interface';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    standalone: false
})
export class ModalFormComponent {

  private helpersService = inject(HelpersService);
  private companyService = inject(CompanyService);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public readonly buttons = LABEL_BUTTONS;
  public selectedCompany: Company;
  public openModal: boolean = false;
  public tittleForm: string = "";
  public formHoliday: FormGroup = FormUtils.getDefaultCompanyFormGroup();
  private tableComponent: GenericTableComponent<Company>;
  private isEdit = signal<boolean>(false);


  ngOnInit() {
    this.registerTableComponentListener();
    this.waitForDataSelection();
    this.companyService.eventFormComponent.emit(this);
  };
  
  public hideModal() {
    this.openModal = false;
  };
 
  private openCreate() {
    this.reset();
    this.tittleForm = "Crear empresa";
    this.isEdit.set(false);
    this.openModal = true;
  };

  private openEdit(id: number) {
    this.reset();
    this.tittleForm="Editar empresa";
    this.companyService.findById(id).subscribe({
      next: (res) => {
        this.isEdit.set(true);
        this.openModal=true;
        this.updateFormValues(res);
      }
    })
  };

  private updateFormValues(company: Company) {
    this.formHoliday.patchValue({
      ...company
    });
  }

  public saveHoliday() {
    if (this.formHoliday.valid ) {
      this.isEdit()? this.submit(TypeSubmitEnum.UPDATE): this.submit(TypeSubmitEnum.CREATE);
    }
  };

  private reset(): void {
    this.formHoliday.reset();
  };

  private submit(type: TypeSubmitEnum) {
    const data: Company = {
      ...this.formHoliday.value,
    };
    const service = type == TypeSubmitEnum.CREATE
      ? this.companyService.create(data)
      : this.companyService.update(this.selectedCompany.id, data)
    service.subscribe({
      next: () => {
        const message = type == TypeSubmitEnum.CREATE
          ? MESSAGES.recordCreated
          : MESSAGES.recordUpdated;
        this.helpersService.messageNotification(SEVERITY_ENUM.success, "Correcto", message);
        this.hideModal();
        this.reset();
      }, complete: () => {
        this.tableComponent.reload();
      }
    })
  }

  private registerTableComponentListener() {
    this.companyService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.companyService.getSelectedRow().subscribe((company) => this.selectedCompany = company);
  }
  
}

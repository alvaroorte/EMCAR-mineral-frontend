import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { MESSAGES } from '@core/constants/messages';
import { LABEL_BUTTONS, LABELS } from '@core/constants/labels';
import { TypeSubmitEnum } from '@core/enums/type-submit';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { FormUtils } from '@core/utils/form-groups';
import { SEVERITY_ENUM } from '@core/enums/severity.enum';
import { LiquidationService } from '../../services/liquidation.service';
import { Liquidation } from '@core/interfaces/liquidation.interface';
import { LoadService } from 'src/app/modules/load/services/load.service';
import { SupplierService } from 'src/app/modules/supplier/services/supplier.service';
import { CooperativeService } from 'src/app/modules/cooperative/services/cooperative.service';
import { MineService } from 'src/app/modules/mine/services/mine.service';
import { Load } from '@core/interfaces/load.interface';
import { Supplier } from '@core/interfaces/supplier.interface';
import { Mine } from '@core/interfaces/mine.interface';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { LIQUIDATION_TYPE_ENUM } from '@core/enums/liquidation-type';
import { LIMITS } from '@core/constants/limits';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private liquidationService = inject(LiquidationService);
   private loadService = inject(LoadService);
   private supplierService = inject(SupplierService);
   private mineService = inject(MineService);
   private cooperativeService = inject(CooperativeService);
   private helpersService = inject(HelpersService);

   public readonly labels = LABELS;
   public readonly messages = MESSAGES;
   public readonly buttons = LABEL_BUTTONS;
   public readonly limits = LIMITS;
   public liquidationTypes = LIQUIDATION_TYPE_ENUM;
   public loads: Load[] = [];
   public suppliers: Supplier[] = [];
   public mines: Mine[] = [];
   public cooperatives: Cooperative[] = [];
   public selectedLiquidation: Liquidation;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public metricWetKilograms: number = 0;
   public totalSilver: number = 0;
   public totalZinc: number = 0;
   public totalLead: number = 0;
   public totalMineralsUsd: number = 0;
   public totalMineralsBs: number = 0;
   public miningRoyaltiesDiscount: number = 0;
   public quotationSilverDiscount: number = 0;
   public quotationZincDiscount: number = 0;
   public quotationLeadDiscount: number = 0;
   public cajaNacionalDiscount: number = 0;
   public fedecominDiscount: number = 0;
   public fencominDiscount: number = 0;
   public comibolDiscount: number = 0;
   public cooperativeContributionDiscount: number = 0;
   public totalDiscounts: number = 0;
   public liquidPayableBs: number = 0;
   public liquidPayableUsd: number = 0;
   public formLiquidation: FormGroup =
      FormUtils.getDefaultLiquidationFormGroup();
   private tableComponent: GenericTableComponent<Liquidation>;
   private isEdit = signal<boolean>(false);

   ngOnInit() {
      this.registerTableComponentListener();
      this.loadData();
      this.waitForDataSelection();
      this.liquidationService.eventFormComponent.emit(this);
   }

   public hideModal() {
      this.openModal = false;
   }

   private openCreate() {
      this.reset();
      this.tittleForm = 'Crear liquidación';
      this.isEdit.set(false);
      this.openModal = true;
   }

   private openEdit(id: number) {
      this.reset();
      this.tittleForm = 'Editar liquidación';
      this.liquidationService.findById(id).subscribe({
         next: (res) => {
            this.isEdit.set(true);
            this.openModal = true;
            this.updateFormValues(res);
         },
      });
   }

   private loadData() {
      this.getLoads();
      this.getSuppliers();
      this.getMines();
      this.getCooperatives();
   }

   private getLoads() {
      this.loadService.findAll().subscribe({
         next: (res) => {
            this.loads = res;
         },
      });
   }

   private getSuppliers() {
      this.supplierService.findAll().subscribe({
         next: (res) => {
            this.suppliers = res;
         },
      });
   }

   private getMines() {
      this.mineService.findAll().subscribe({
         next: (res) => {
            this.mines = res;
         },
      });
   }

   private getCooperatives() {
      this.cooperativeService.findAll().subscribe({
         next: (res) => {
            this.cooperatives = res;
         },
      });
   }

   private updateFormValues(Liquidation: Liquidation) {
      this.formLiquidation.patchValue({
         ...Liquidation,
      });
   }

   public saveLiquidation() {
      if (this.formLiquidation.valid) {
         this.isEdit()
            ? this.submit(TypeSubmitEnum.UPDATE)
            : this.submit(TypeSubmitEnum.CREATE);
      }
   }

   private reset(): void {
      this.formLiquidation.reset();
   }

   private submit(type: TypeSubmitEnum) {
      const data: Liquidation = {
         ...this.formLiquidation.value,
      };
      const service =
         type == TypeSubmitEnum.CREATE
            ? this.liquidationService.create(data)
            : this.liquidationService.update(this.selectedLiquidation.id, data);
      service.subscribe({
         next: () => {
            const message =
               type == TypeSubmitEnum.CREATE
                  ? MESSAGES.recordCreated
                  : MESSAGES.recordUpdated;
            this.helpersService.messageNotification(
               SEVERITY_ENUM.success,
               'Correcto',
               message,
            );
            this.hideModal();
            this.reset();
         },
         complete: () => {
            this.tableComponent.reload();
         },
      });
   }

   private registerTableComponentListener() {
      this.liquidationService.eventTableComponent.subscribe(
         (tableComponent) => {
            this.tableComponent = tableComponent;
         },
      );
   }

   private waitForDataSelection() {
      this.liquidationService
         .getSelectedRow()
         .subscribe((Liquidation) => (this.selectedLiquidation = Liquidation));
   }

   public calculateTotals() {
      this.totalSilver =
         (this.formLiquidation.get('priceSilver').value || 0) *
         (this.formLiquidation.get('lawSilver').value || 0);
      this.totalZinc =
         (this.formLiquidation.get('priceZinc').value || 0) *
         (this.formLiquidation.get('lawZinc').value || 0);
      this.totalLead =
         (this.formLiquidation.get('priceLead').value || 0) *
         (this.formLiquidation.get('lawLead').value || 0);
      this.totalMineralsUsd =
         this.totalSilver + this.totalZinc + this.totalLead;
      this.totalMineralsBs =
         this.totalMineralsUsd *
         (this.formLiquidation.get('exchangeRate').value || 0);
   }

   public calculateDiscounts() {
      this.miningRoyaltiesDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('miningRoyalties').value || 0) / 100);
      this.quotationSilverDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('quotationSilver').value || 0) / 100);
      this.quotationZincDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('quotationZinc').value || 0) / 100);
      this.quotationLeadDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('quotationLead').value || 0) / 100);
      this.cajaNacionalDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('cajaNacional').value || 0) / 100);
      this.fedecominDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('fedecomin').value || 0) / 100);
      this.fencominDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('fencomin').value || 0) / 100);
      this.comibolDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('comibol').value || 0) / 100);
      this.cooperativeContributionDiscount =
         this.totalMineralsBs *
         ((this.formLiquidation.get('cooperativeContribution').value || 0) /
            100);
   }
}

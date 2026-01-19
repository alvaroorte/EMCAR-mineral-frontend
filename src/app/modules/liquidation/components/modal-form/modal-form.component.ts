import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
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
import { Mine } from '@core/interfaces/mine.interface';
import { Cooperative } from '@core/interfaces/cooperative.interface';
import { LIQUIDATION_TYPE_ENUM } from '@core/enums/liquidation-type';
import { LIMITS } from '@core/constants/limits';
import { LotService } from 'src/app/modules/lot/services/lot.service';
import { Lot } from '@core/interfaces/lot.interface';
import { SupplierSelect } from '@core/interfaces/supplier.interface';

@Component({
   selector: 'app-modal-form',
   templateUrl: './modal-form.component.html',
   standalone: false,
})
export class ModalFormComponent {
   private liquidationService = inject(LiquidationService);
   private loadService = inject(LoadService);
   private lotService = inject(LotService);
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
   public suppliers: SupplierSelect[] = [];
   public mines: Mine[] = [];
   public cooperatives: Cooperative[] = [];
   public lot: Lot;
   public selectedLiquidation: Liquidation;
   public openModal: boolean = false;
   public tittleForm: string = '';
   public metricWetKilograms: number = 0;
   public totalSilver: number = 0;
   public totalZinc: number = 0;
   public totalLead: number = 0;
   public miningRoyaltiesDiscount: number = 0;
   public quotationSilverDiscount: number = 0;
   public quotationZincDiscount: number = 0;
   public quotationLeadDiscount: number = 0;
   public cajaNacionalDiscount: number = 0;
   public fedecominDiscount: number = 0;
   public fencominDiscount: number = 0;
   public comibolDiscount: number = 0;
   public cooperativeContributionDiscount: number = 0;
   public solidMetricWetTonnes: number = 0;
   public totalMineralsUsd: number = 0;
   public totalMineralsBs: number = 0;
   public totalImportBs: number = 0;
   public totalDiscountsBs: number = 0;
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
      this.formLiquidation.patchValue({
         liquidationDate: new Date(),
      });
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
      this.supplierService.getSelect().subscribe({
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

   public calculateTotalsPriceAndLaws() {
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
      this.totalImportBs = this.totalMineralsBs * this.solidMetricWetTonnes;
      this.calculateDiscounts();
   }

   public calculateDiscounts() {
      this.miningRoyaltiesDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('miningRoyalties').value || 0) / 100);
      this.quotationSilverDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('quotationSilver').value || 0) / 100);
      this.quotationZincDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('quotationZinc').value || 0) / 100);
      this.quotationLeadDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('quotationLead').value || 0) / 100);
      this.cajaNacionalDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('cajaNacional').value || 0) / 100);
      this.fedecominDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('fedecomin').value || 0) / 100);
      this.fencominDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('fencomin').value || 0) / 100);
      this.comibolDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('comibol').value || 0) / 100);
      this.cooperativeContributionDiscount =
         this.totalImportBs *
         ((this.formLiquidation.get('cooperativeContribution').value || 0) /
            100);
      this.totalDiscountsBs =
         this.miningRoyaltiesDiscount +
         this.quotationSilverDiscount +
         this.quotationZincDiscount +
         this.quotationLeadDiscount +
         this.cajaNacionalDiscount +
         this.fedecominDiscount +
         this.fencominDiscount +
         this.comibolDiscount +
         this.cooperativeContributionDiscount;
      this.liquidPayableBs = this.totalImportBs - this.totalDiscountsBs;
      this.liquidPayableUsd =
         this.liquidPayableBs / this.formLiquidation.value.exchangeRate;
   }

   public onChagedLiquidationType() {
      if (
         this.formLiquidation.value.liquidationType ==
         this.liquidationTypes.COOPERATIVE
      ) {
         this.formLiquidation
            .get('cooperativeId')
            .addValidators(Validators.required);
         this.formLiquidation.get('mineId').addValidators(Validators.required);
      } else {
         this.formLiquidation
            .get('cooperativeId')
            .removeValidators(Validators.required);
         this.formLiquidation
            .get('mineId')
            .removeValidators(Validators.required);
      }
      this.formLiquidation.get('cooperativeId').reset();
      this.formLiquidation.get('mineId').reset();
   }

   public onChagedLoad() {
      this.getLotByLoadId();
      const load: Load = this.loads.find(
         (l) => l.id == this.formLiquidation.value.loadId,
      );
      this.metricWetKilograms = load.weight;
      this.formLiquidation.patchValue({
         admissionDate: new Date(load.date + ' '),
         supplierId: load.supplierId,
         cooperativeId: load.cooperativeId,
         mineId: load.mineId,
      });
      this.onChangedWetKilograms();
      this.onChangedCooperative();
   }

   private getLotByLoadId() {
      this.lotService.findById(this.formLiquidation.value.loadId).subscribe({
         next: (resp) => {
            this.lot = resp;
         },
      });
   }

   public onChangedWetKilograms() {
      this.formLiquidation.patchValue({
         metricWetTonnes: this.metricWetKilograms
            ? this.metricWetKilograms / 1000
            : null,
      });
      this.calculateSolidMetricWetTonnes();
   }

   public calculateSolidMetricWetTonnes() {
      const percentHumidity: number =
         this.formLiquidation.get('humidityPercentage')?.value / 100 || null;
      const humidityInTonnes: number =
         this.formLiquidation.get('metricWetTonnes')?.value *
         (percentHumidity ?? 0);
      this.solidMetricWetTonnes =
         this.formLiquidation.get('metricWetTonnes').value - humidityInTonnes;

      this.calculateTotalsPriceAndLaws();
   }

   public onChangedCooperative() {
      const cooperative: Cooperative = this.cooperatives.find(
         (c) => c.id == this.formLiquidation.value.cooperativeId,
      );
      this.formLiquidation.patchValue({
         quotationSilver: 3.6,
         quotationZinc: 3.6,
         quotationLead: 3.6,
         cajaNacional: cooperative.cajaNacional,
         fedecomin: cooperative.fedecomin,
         fencomin: cooperative.fencomin,
         comibol: cooperative.comibol,
         cooperativeContribution: cooperative.cooperativeContribution,
         miningRoyalties: cooperative.miningRoyalties,
      });
   }
}

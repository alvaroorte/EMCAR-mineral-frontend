import { FormControl, FormGroup, Validators } from "@angular/forms";
import { noSpaceValidator } from "../validators/noSpaceValidator";
import { regex } from "@core/constants/regexs";
import { LIMITS } from "@core/constants/limits";
import { LOT_ASSIGNMENT } from "@core/enums/lot.enum";

export class FormUtils {
  
  static getDefaultCompanyFormGroup(): FormGroup {
    return new FormGroup({
      code: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldCode), Validators.minLength(LIMITS.minLengthCode), noSpaceValidator]),
      socialReason: new FormControl<string>('', [Validators.required,Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      nit: new FormControl<number>(null, [Validators.required]),
      purpose: new FormControl<string>(''),
      logo: new FormControl<string>(''),
      nim: new FormControl<string>(''),
      address: new FormControl<string>(''),
      cellphone: new FormControl<string>('')
    });
  }

  static getDefaultMaterialFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      description: new FormControl<string>('', [Validators.required, noSpaceValidator])
    });
  }

  static getDefaultTypeMaterialFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      description: new FormControl<string>('', [Validators.required, noSpaceValidator])
    });
  }

  static getDefaultLLotFormGroup(): FormGroup {
    return new FormGroup({
      prefix: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldCode), Validators.minLength(LIMITS.minLengthCode), noSpaceValidator]),
      description: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      initialDocNumber: new FormControl<string>('', [Validators.required]),
      assignment: new FormControl<LOT_ASSIGNMENT>(LOT_ASSIGNMENT.RECEPTION, [Validators.required]),
      state: new FormControl<string>('', [Validators.required])
    });
  }
  
  static getDefaultMineFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      description: new FormControl<string>('', [Validators.required, noSpaceValidator])
    });
  }

  static getDefaultSupplierFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      surname: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      documentNumber: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldDocument), Validators.minLength(LIMITS.minLengthDocument), noSpaceValidator]),
      address: new FormControl<string>('', [noSpaceValidator]),
      supplierGroup: new FormControl<string>(''),
      expeditionPlace: new FormControl<string>(''),
    });
  }

  static getDefaultCooperativeFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.pattern(regex.fieldName), Validators.minLength(LIMITS.minLength), noSpaceValidator]),
      cajaNacional: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      fedecomin: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      fencomin: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      comibol: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      wilstermann: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      cooperativeContribution: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      miningRoyalties: new FormControl<number>(0, [Validators.required, Validators.min(LIMITS.minPercent), Validators.max(LIMITS.maxPercent)]),
      printCajaNacional: new FormControl<boolean>(true, []),
      printFedecomin: new FormControl<boolean>(true, []),
      printFencomin: new FormControl<boolean>(true, []),
      printComibol: new FormControl<boolean>(true, []),
      printWilstermann: new FormControl<boolean>(true, []),
      printCooperativeContribution: new FormControl<boolean>(true, []),
      printMiningRoyalties: new FormControl<boolean>(true, []),
    });
  }

  static getDefaultLoadFormGroup(): FormGroup {
    return new FormGroup({
      supplierId: new FormControl<number>(null, [Validators.required]),
      date: new FormControl<string>(null, [Validators.required]),
      lotId: new FormControl<number>(null, [Validators.required]),
      correlativeLotCode: new FormControl<string>('', [Validators.required]),
      materialId: new FormControl<number>(null, [Validators.required]),
      typeMaterialId: new FormControl<number>(null, [Validators.required]),
      weight: new FormControl<number>(null, [Validators.required]),
      numberSacks: new FormControl<number>(null, [Validators.required]),
      mineId: new FormControl<number>(null),
      cooperativeId: new FormControl<number>(null),
      observation: new FormControl<string>(''),
    });
  }
  
  static getDefaultAdvanceLoadFormGroup(): FormGroup {
    return new FormGroup({
      loadId: new FormControl<number>(null, [Validators.required]),
      receiptType: new FormControl<string>(null, [Validators.required]),
      receiptCode: new FormControl<number>(null, [Validators.required]),
      date: new FormControl<string>('', [Validators.required]),
      amount: new FormControl<number>(null, [Validators.required]),
      concept: new FormControl<number>(null, [Validators.required]),
      paymentType: new FormControl<number>(null, [Validators.required]),
      paymentChanel: new FormControl<number>(null, [Validators.required]),
      checkNumber: new FormControl<number>(null),
      observation: new FormControl<number>(null),
    });
  }

}

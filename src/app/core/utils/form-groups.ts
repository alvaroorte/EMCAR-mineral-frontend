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

}

import { DropdownOption } from "@core/interfaces/dropdown-option.interface";

export enum ReceiptTypeEnum {
    SISTEMA = 'Sistema',
    MANUAL = 'Manual'
}

export const ReceiptTypeDropdownOptions: DropdownOption[] = Object.entries(ReceiptTypeEnum).map(
    ([key, label]) => ({
        label,
        value: label
    })
);

export enum PaymentTypeEnum {
    CASH = 'Efectivo',
    CHECK = 'Cheque'
}

export const PaymentTypeDropdownOptions: DropdownOption[] = Object.entries(PaymentTypeEnum).map(
    ([key, label]) => ({
        label,
        value: label
    })
);

export enum PaymentChanelEnum {
    CASHIER = 'Caja',
    BANK = 'Banco'
}

export const PaymentChanelDropdownOptions: DropdownOption[] = Object.entries(PaymentChanelEnum).map(
    ([key, label]) => ({
        label,
        value: label
    })
);
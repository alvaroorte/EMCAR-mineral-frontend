import { FoldersParametersEnum } from "@core/enums/folder-parameters.enum";
import { IFieldForFuntion } from "@core/interfaces/modal-description";
import { TypeFieldEnum } from "@core/enums/type-fields";
import { TypeTicketEnum } from "@core/enums/ticket";
import { nameFunction } from "@core/interfaces/buttons-ticket.interface";

export const getFieldsByTypeTicketAndNameFunction = (typeTicket: TypeTicketEnum, nameFunction: nameFunction): IFieldForFuntion[] => {
    switch (nameFunction) {
        case 'finishTicket':
            return [
                {
                    folder: FoldersParametersEnum.CAUSA_INCIDENTE,
                    label: 'Causa del ticket',
                    required: false,
                    formControlName: 'issue',
                    type: TypeFieldEnum.DROPDOWN
                },
                {
                    folder: FoldersParametersEnum.SISTEMA,
                    label: 'Sistema',
                    required: false,
                    formControlName: 'system',
                    type: TypeFieldEnum.DROPDOWN
                },
                {
                    folder: FoldersParametersEnum.IMPACTO,
                    label: 'Impacto',
                    required: false,
                    formControlName: 'impact',
                    type: TypeFieldEnum.DROPDOWN
                },
                {
                    folder: FoldersParametersEnum.ACTIVIDAD,
                    label: 'Actividad',
                    required: false,
                    formControlName: 'activity',
                    type: TypeFieldEnum.DROPDOWN
                },
                {
                    label: 'Solución',
                    required: true,
                    formControlName: 'description',
                    type: typeTicket == TypeTicketEnum.SOLICITUD? TypeFieldEnum.TEXTAREA_EDITOR: TypeFieldEnum.TEXTAREA_SIMPLE
                },
                {
                    type: TypeFieldEnum.FILE
                },
                {
                    type: TypeFieldEnum.DESCRIPTION_TICKET
                }
            ];
        case 'scheduleTicket':
            return [
                {
                    label: 'Motivo',
                    required: true,
                    formControlName: 'description',
                    type: TypeFieldEnum.TEXTAREA_EDITOR
                }
            ];
        case 'rejectByApprover':
            return [
                {
                    label: 'Motivo',
                    required: true,
                    formControlName: 'description',
                    type: TypeFieldEnum.TEXTAREA_EDITOR
                }
            ];
        case 'rejectByModerator':
            return [
                {
                    label: 'Motivo',
                    required: true,
                    formControlName: 'description',
                    type: TypeFieldEnum.TEXTAREA_EDITOR
                }
                
            ];
        case 'rejectSolution':
            return [
                {
                    label: 'Motivo',
                    required: true,
                    formControlName: 'description',
                    type: TypeFieldEnum.TEXTAREA_EDITOR
                }
                
            ];
        case 'acceptSolution': 
            return [
                {
                    folder: FoldersParametersEnum.CALIDAD_DE_SERVICIO,
                    label: 'Calidad de servicio',
                    required: true,
                    formControlName: 'serviceQuality',
                    type: TypeFieldEnum.DROPDOWN
                },
                {
                    label: 'Comentario',
                    required: false,
                    formControlName: 'description',
                    type: TypeFieldEnum.TEXTAREA_EDITOR
                }
            ]
        default:
            return [];
    }
}
import { Component, inject } from '@angular/core';

import { TicketService } from '@ticket-historical/services/tickets.service';
import { LABELS } from '@core/constants/labels';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { PipesModule } from '@core/pipes/pipes.module';
import { FileService } from '@core/services/file-service.service';

@Component({
    selector: 'app-modal-preview-file',
    imports: [PrimeComponentsModule, PipesModule],
    templateUrl: './modal-preview-file.component.html',
    styleUrls: ['./modal-preview-file.component.scss']
})
export class ModalPreviewFileComponent {

  private ticketService = inject(TicketService);
  private fileService = inject(FileService);

  public readonly labels = LABELS;
  public openModal: boolean = false;
  public base64: string;

  ngOnInit() {
    this.ticketService.eventOpenModalPreviewFile.subscribe((data) => {
        this.openModalPreview(data);
    })
  }

  private async openModalPreview(file: File) {
    if (file.type.includes('pdf')) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
    } else {
      const base64 = await this.fileService.convertFileToBase64(file, false);
      this.base64 = base64;
      this.openModal = true;
    }
  }

}

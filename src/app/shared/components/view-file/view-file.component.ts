import { Component, Input, OnInit, inject } from '@angular/core';
import { TicketService } from '@ticket-historical/services/tickets.service';
import { environment } from '@core/environments/environment.development';
import { CommonModule } from '@angular/common';
import { TOOLTIPS } from '@core/constants/tooltips';
import { FileService } from '@core/services/file-service.service';
import { MimeTypeEnum } from '@core/enums/mime-type';
import { TooltipModule } from 'primeng/tooltip';
import { SizeEnum } from '@core/enums/size';

@Component({
    selector: 'app-view-file',
    imports: [
        CommonModule,
        TooltipModule
    ],
    templateUrl: './view-file.component.html'
})
export class ViewFileComponent implements OnInit {

    @Input({required: true}) fileName: string;
    @Input() size: SizeEnum = SizeEnum.MEDIUM;

    private ticketService = inject(TicketService);
    private fileService = inject(FileService);

    public readonly tooltips = TOOLTIPS;
    public readonly serverUrl: string = environment.server_url;
    public readonly SizeEnum = SizeEnum;
    public showButtonPreview: boolean = false;
    public colorTextFile: string = '';
    public iconFIle: string = '';
    public iconSize: string = '';
    public textSize: string = '';
   
    ngOnInit(): void {
      this.getDatForFile();
    }
    
    private getDatForFile() {
      this.iconSize = this.size === SizeEnum.LARGE? 'text-2xl': this.size === SizeEnum.MEDIUM? 'text-xl': 'text-lg';
      this.textSize = this.size === SizeEnum.LARGE? 'text-xl': this.size === SizeEnum.MEDIUM? 'text-lg': 'text-sm';
      switch (this.fileName.split('.')[1]) {
        case 'docx':
          this.iconFIle = 'pi pi-file-word';
          this.colorTextFile = 'text-blue-500';
          this.showButtonPreview = false;
          break;
        case 'xlsx':
          this.iconFIle = 'pi pi-file-excel';
          this.colorTextFile = 'text-green-500';
          this.showButtonPreview = false;
          break;
        case 'xls':
          this.iconFIle = 'pi pi-file-excel';
          this.colorTextFile = 'text-green-500';
          this.showButtonPreview = false;
          break;
        case 'pdf':
          this.iconFIle = 'pi pi-file-pdf';
          this.colorTextFile = 'text-red-500';
          this.showButtonPreview = true;
          break;
        case 'txt':
          this.iconFIle = 'pi pi-file';
          this.colorTextFile = 'text-gray-500';
          this.showButtonPreview = false;
          break;
        case 'zip':
          this.iconFIle = 'pi pi-file';
          this.colorTextFile = 'text-gray-500';
          this.showButtonPreview = false;
          break;
        case 'rar':
          this.iconFIle = 'pi pi-file';
          this.colorTextFile = 'text-gray-500';
          this.showButtonPreview = false;
          break;
        default:
          this.iconFIle = 'pi pi-image';
          this.colorTextFile = 'text-yellow-500';
          this.showButtonPreview = true;
          break;
      }
    }
    
    public showFile(fileName: string) {
      const mimeType: string = fileName.includes('pdf')? MimeTypeEnum.PDF: MimeTypeEnum.IMAGE; 
      this.fileService.getFile(fileName).subscribe({
        next: async (resp) => {
          const file: File = new File([resp], fileName, { type: mimeType });
          this.ticketService.eventOpenModalPreviewFile.emit(file);
        }
      })
    }

}

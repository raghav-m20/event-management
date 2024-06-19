import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() eventId!: string;

  constructor(private activeModal: NgbActiveModal, private dataService: DataService){}

  close() {
    this.activeModal.close();
  }

  confirm() {
    this.dataService.deleteData("delete", this.eventId).subscribe({
      next: (data: any) => {
        this.activeModal.close("success")
      },
      error: (err: any) => {
        this.activeModal.close("failed")
      }
    })
  }
}

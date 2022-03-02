import { Component, Inject } from '@angular/core';
import { closeAction, DialogOption, ModalService } from '../modal.service';
import { HARD_REFRESH_MODAL_DATA } from './util/tokens';

@Component({
  selector: 'pmo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent {
  title!: string | undefined;
  message!: string | undefined;

  constructor(
    private modalService: ModalService,
    @Inject(HARD_REFRESH_MODAL_DATA) public data: DialogOption
  ) {
    this.setDialogData(data);
  }

  setDialogData(data: DialogOption) {
    this.title = data.title;
    this.message = data.message;
  }

  close(): void {
    const action: closeAction = { type: 'CLOSE', value: 'close' };
    this.modalService.onClose(action);
  }

  confirm(): void {
    const action: closeAction = { type: 'CONFIRM', value: true };
    this.modalService.onClose(action);
  }
}

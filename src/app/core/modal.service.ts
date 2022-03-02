import { Injectable, Injector } from '@angular/core';
import { ModalRef } from './modal/util/modal-ref';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HARD_REFRESH_MODAL_DATA } from './modal/util/tokens';

export interface DialogOption {
  title: string | undefined;
  message: string | undefined;
  type: 'WITH_OPTIONS' | 'NO_OPTIONS';
}

export interface closeAction {
  type: 'CLOSE' | 'CONFIRM';
  value: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef!: ModalRef;

  constructor(private overlay: Overlay) {}

  openModal<T>(modalComponent: any, option: DialogOption): ModalRef {
    const overlayRef = this.overlay.create();
    const injector = this.createInjector(option);
    const componentRef = new ComponentPortal(modalComponent, null, injector);
    overlayRef.attach(componentRef);
    return (this.modalRef = new ModalRef(overlayRef));
  }

  createInjector(option: DialogOption) {
    return Injector.create({
      providers: [
        {
          provide: HARD_REFRESH_MODAL_DATA,
          useValue: option,
        },
      ],
    });
  }

  onClose(val: closeAction): void {
    this.modalRef.close(val);
  }
}

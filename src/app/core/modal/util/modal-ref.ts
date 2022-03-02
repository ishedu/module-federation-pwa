import { Observable, Subject } from 'rxjs';
import { closeAction } from '../../modal.service';
import { OverlayRef } from '@angular/cdk/overlay';

export class ModalRef {
  constructor(private overlayRef: OverlayRef) {}

  private result$ = new Subject<closeAction>();
  /*
   * Function to close modals
   * */
  close(value: any): void {
    this.result$.next(value);
    this.destroy$();
  }

  /*
   * Observable that returns the value of action performed.
   * */
  afterClose(): Observable<closeAction> {
    return this.result$.asObservable();
  }

  /*
   * Function to dispose the component and deleted the complete the Observable
   * */
  private destroy$(): void {
    this.overlayRef.dispose();
    this.result$.complete();
  }
}

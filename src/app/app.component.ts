import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { closeAction, DialogOption, ModalService } from './core/modal.service';
import { ModalComponent } from './core/modal/modal.component';

export const VAPID_KEYS = {
  publicKey:
    'BC0eUBEdL6yQuZTvvZvBuRC8p5ZpLrR3lCLr6ZWXYxZDVMRBbm7H8eKQbgY2L-GmMhYbGqsvBwy60-tNZHVCCvo',
  privateKey: 'lI1AMjHMwOriWvus84JsHDF6KWZXNv8UzoWJLnb2-j4',
};

@Component({
  selector: 'pmo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'tailwindcss';
  getMessage = this.swPush.messages;
  getSubscription = this.swPush.subscription;

  constructor(
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    console.log(window.caches.keys(), 'all my cacehes');
    this.checkForPushUpdate();
    this.initSubscription();
  }

  initSubscription() {
    if (!this.swPush.isEnabled) {
      return;
    }
    this.swPush
      .requestSubscription({ serverPublicKey: VAPID_KEYS.publicKey })
      .then((sub) => {
        console.log(sub, 'here');
      });
  }

  checkForPushUpdate() {
    this.swPush.messages.subscribe((notification: Partial<Notification>) => {
      const dialogData: DialogOption = {
        title: notification.title,
        message: notification.body,
        type: 'WITH_OPTIONS',
      };
      this.openModal(dialogData);
      if (notification?.tag === 'HARD_REFRESH') {
      }
    });
  }

  hardRefresh() {
    navigator.serviceWorker
      .getRegistration()
      .then(async (registration: ServiceWorkerRegistration | undefined) => {
        if (!registration) {
          return;
        }
        await registration.unregister().then();
        window.location.assign('http://127.0.0.1:8080/');
      });
  }

  openModal(data?: DialogOption) {
    const option: DialogOption = {
      title: data?.title ?? 'Hard Refresh!',
      message:
        data?.message ??
        'A new version of the micro app(s) is available please perform a hard refresh to get the latest version',
      type: 'WITH_OPTIONS',
    };
    const modalRef = this.modalService.openModal<ModalComponent>(
      ModalComponent,
      option
    );

    modalRef.afterClose().subscribe((resp: closeAction) => {
      if (resp.type === 'CONFIRM') {
        this.hardRefresh();
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

const HEADER_COMPONENT = [HeaderComponent];

@NgModule({
  declarations: [...HEADER_COMPONENT, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [...HEADER_COMPONENT],
})
export class CoreModule {}

/*
 * list on tokens for modals
 * */
import { InjectionToken } from '@angular/core';
import { DialogOption } from '../../modal.service';
import { TOKEN_LIST } from './enums';

export const HARD_REFRESH_MODAL_DATA = new InjectionToken<DialogOption>(
  TOKEN_LIST.Hard_Data
);

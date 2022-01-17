import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalCloseModule } from './close/close.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, ModalCloseModule],
  exports: [ModalComponent],
})
export class ModalModule {}

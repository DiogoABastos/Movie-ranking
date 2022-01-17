import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [TableComponent],
})
export class TableModule {}

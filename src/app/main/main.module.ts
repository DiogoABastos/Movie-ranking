import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FilterModule } from '../components/filter/filter.module';
import { ModalModule } from '../components/modal/modal.module';
import { TableModule } from '../components/table/table.module';
import { FiltersModule } from './filters/filters.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    FilterModule,
    TableModule,
    ModalModule,
    FiltersModule,
    InfiniteScrollModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}

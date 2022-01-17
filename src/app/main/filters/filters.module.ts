import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { SelectModule } from 'src/app/components/select/select.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, FilterModule, SelectModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}

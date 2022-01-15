import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FilterModule } from '../components/filter/filter.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, FilterModule],
  exports: [MainComponent],
})
export class MainModule {}

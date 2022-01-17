import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(public mainService: MainService) {}

  ngOnInit(): void {}

  updateTop10Filter(): void {
    this.mainService.top10.next(!this.mainService.top10.value);
  }

  updateTop10PerYearFilter(event: any): void {
    this.mainService.top10PerYear.next(event);
  }

  reset(): void {
    this.mainService.reset(true);
  }
}

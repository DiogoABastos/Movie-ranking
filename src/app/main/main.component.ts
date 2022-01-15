import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public mainService: MainService) {}

  ngOnInit(): void {}

  updateTop10Filter() {
    this.mainService.top10.next(!this.mainService.top10.value);
  }

  updateTop10PerYearFilter() {
    this.mainService.top10PerYear.next(!this.mainService.top10PerYear.value);
  }
}

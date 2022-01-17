import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DetailsService } from './services/details.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;

  constructor(
    public mainService: MainService,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.detailsService.modalRef.next(this.entry);
  }

  setMovieId(id: string) {
    this.detailsService.id.next(id);
  }

  onScroll(): void {
    this.mainService.loadMore();
  }
}

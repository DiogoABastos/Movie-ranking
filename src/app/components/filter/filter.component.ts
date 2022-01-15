import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() text: string | null = '';
  @Input() selected: boolean | null = false;
  @Output() updateState: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggleSelected(): void {
    this.updateState.next(!this.selected);
  }
}

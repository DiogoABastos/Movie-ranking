import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeader, TableRow } from './utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() headers: TableHeader[] = [];
  @Input() rows: TableRow[] = [];
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  sendData(data: string): void {
    this.action.emit(data);
  }
}

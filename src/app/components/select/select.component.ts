import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectEntry } from './utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() options: SelectEntry[] = [];
  @Input() selectOption: SelectEntry = null;
  @Output() selectedOptionChange: EventEmitter<SelectEntry> =
    new EventEmitter<SelectEntry>();

  showDropdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(): void {}

  toggleShowDropdown(): void {
    this.showDropdown.next(!this.showDropdown.value);
  }

  changeSelectedOption(option: SelectEntry): void {
    this.selectOption = option;
    this.selectedOptionChange.emit(option);
    this.toggleShowDropdown();
  }
}

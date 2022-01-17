import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() body: any = [];
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log('eheh');
  }

  close() {
    this.closeMeEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit();
  }
}

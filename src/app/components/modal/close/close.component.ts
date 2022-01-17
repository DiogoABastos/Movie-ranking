import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss'],
})
export class ModalCloseComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  public imgSrc: BehaviorSubject<string> = new BehaviorSubject<string>(
    'assets/images/close-gray.svg'
  );

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.close.emit();
  }

  onMouseOver(): void {
    this.imgSrc.next('assets/images/close-blue.svg');
  }

  onMouseOut(): void {
    this.imgSrc.next('assets/images/close-gray.svg');
  }
}

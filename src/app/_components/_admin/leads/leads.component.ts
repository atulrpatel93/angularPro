import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.less']
})
export class LeadsComponent implements OnInit {

  new = [
        {id: 1, name: 'Dan1', url: '//www.google.com'},
        {id: 2, name: 'Dan2', url: '//www.google.com'},
        {id: 3, name: 'Dan3', url: '//www.google.com'}
  ];

  assigned = [
        {id: 4, name: 'Dan4', url: '//www.google.com'},
        {id: 5, name: 'Dan5', url: '//www.google.com'},
        {id: 6, name: 'Dan6', url: '//www.google.com'}

  ];

  dones = [
        {id: 7, name: 'Dan7', url: '//www.google.com'},
        {id: 8, name: 'Dan8', url: '//www.google.com'},
        {id: 9, name: 'Dan9', url: '//www.google.com'}

  ];

  constructor() { }

  ngOnInit() {
    alert(1);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container ) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {TagModule} from 'primeng/tag';
import {NgClass, TitleCasePipe} from '@angular/common';
import {Router} from '@angular/router';
import {UserProfile} from '../../interfaces/profile.model';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent implements OnInit {
  @Input()stateKey ='defaultTable'
  @Output() rowClick = new EventEmitter<UserProfile>();

  data = [
    {
      "firstName": "Sandro",
      "lastName": "Martiashvili",
      "pin": "44444444444",
      "address": "Digomi Massive",
      "phoneNumber": "568224554",
      "selectedGender": "Man",
      "profilePicture": "value"
    },
    {
      "firstName": "GIo",
      "lastName": "Giorgi",
      "pin": "33444444433",
      "address": "Didi Digomi",
      "phoneNumber": "568223344",
      "selectedGender": "Man",
      "profilePicture": null,
      "identifier":'159fcb9748f31c3639acbe2fae9aeedd445e4276ae712daca26da0b6854914bb'
    },
    {
      "firstName": "Nika",
      "lastName": "metro",
      "pin": "5556643564",
      "address": "Gldanski",
      "phoneNumber": "568223344",
      "selectedGender": "Man",
      "profilePicture": null
    }
  ];

  columns: string[] = [];
  router = inject(Router)
  ngOnInit() {
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }

  onRowClick(data:UserProfile){
    this.rowClick.emit(data);
  }
}


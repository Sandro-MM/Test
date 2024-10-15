import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {TagModule} from 'primeng/tag';
import {NgClass, TitleCasePipe} from '@angular/common';
import {Router} from '@angular/router';

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
  styleUrl: './table-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponentComponent implements OnInit {
  @Input()stateKey ='defaultTable'
  @Output() rowClick = new EventEmitter<any>();

  @Input() data : any

  columns: string[] = [];
  router = inject(Router)
  ngOnInit() {

    if (!(this.data) || this.data.length > 0) {
      if (this.data) {
        this.columns = Object.keys(this.data[0]);
      }
    }
  }

  onRowClick(data:any){
    this.rowClick.emit(data);
  }
}


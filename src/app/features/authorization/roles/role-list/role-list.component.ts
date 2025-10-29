import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RoleResponseDTO } from '../models/role-response.dto';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputFieldComponent
  ],
  templateUrl: './role-list.component.html'
})
export class RoleListComponent {
  @Input() roles: RoleResponseDTO[] = [];
  @Input() totalItems = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() loading = false;

  @Output() edit = new EventEmitter<RoleResponseDTO>();
  @Output() remove = new EventEmitter<string>();
  @Output() page = new EventEmitter<PageEvent>();
  @Output() filter = new EventEmitter<string>();
  @Output() sort = new EventEmitter<Sort>();

  displayedColumns: string[] = ['name', 'description', 'actions'];

  applyFilter(value: string | number | null) {
    const search = (value ?? '').toString().trim().toLowerCase();
    this.filter.emit(search);
  }

  onPageChange(event: PageEvent) {
    this.page.emit(event);
  }

  onSortChange(event: Sort) {
    this.sort.emit(event);
  }
}

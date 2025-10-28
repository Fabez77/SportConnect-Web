import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePermissionDTO } from '../models/create-permission.dto';
import { UpdatePermissionDTO } from '../models/update-permission.dto';
import { PermissionResponseDTO } from '../models/permission-response.dto';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './permission-form.component.html'
})
export class PermissionFormComponent implements OnChanges {
  @Input() isOpen = false; // 👈 por defecto cerrado
  @Input() editing: PermissionResponseDTO | null = null;

  @Output() save = new EventEmitter<CreatePermissionDTO | UpdatePermissionDTO>();
  @Output() toggle = new EventEmitter<void>();
  @Output() new = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  public model: Partial<CreatePermissionDTO & UpdatePermissionDTO> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editing']) {
      this.model = this.editing ? { ...this.editing } : {};
    }
  }

  onSubmit() {
    this.save.emit(this.model);
  }

  onNewClick() {
    this.model = {};
    this.new.emit(); // el Page abrirá el form en modo crear
  }

  onCancelClick() {
    this.model = {};
    this.cancel.emit(); // el Page cerrará el form
  }
}

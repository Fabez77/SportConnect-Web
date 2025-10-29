import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRoleDTO } from '../models/create-role.dto';
import { UpdateRoleDTO } from '../models/update-role.dto';
import { RoleResponseDTO } from '../models/role-response.dto';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

@Component({
    selector: 'app-role-form',
    standalone: true,
    imports: [CommonModule, FormsModule, InputFieldComponent],
    templateUrl: './role-form.component.html'
})
export class RoleFormComponent implements OnChanges {
    @Input() isOpen = false;
    @Input() editing: RoleResponseDTO | null = null;

    @Output() save = new EventEmitter<CreateRoleDTO | UpdateRoleDTO>();
    @Output() toggle = new EventEmitter<void>();
    @Output() new = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    public model: Partial<CreateRoleDTO & UpdateRoleDTO> = {};

    ngOnChanges(changes: SimpleChanges) {
        if (changes['editing']) {
            this.model = this.editing ? { ...this.editing } : {};
        }
    }

    onSubmit() {
        if (this.model.name) {
            this.save.emit(this.model as CreateRoleDTO | UpdateRoleDTO);
        }
    }


    onNewClick() {
        this.model = {};
        this.new.emit();
    }

    onCancelClick() {
        this.model = {};
        this.cancel.emit();
    }
}

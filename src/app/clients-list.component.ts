import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from './client';
import { EntityType } from './entitytype';
import { FieldInfo } from './FieldInfo';

@Component({
  selector:    'clientslist',
  templateUrl: './clients-list.component.html',
})

export class ClientsListComponent {

  @Input()
  types: EntityType[];
  @Input()
  clients: Client[];
  @Output() onSelectClient = new EventEmitter<Client>();

  // Emit the name of the selected client
  selectClient(clt: Client) {
    // console.log("Select " + clt.DisplayName);
    this.onSelectClient.emit(clt);
  }

  /**
   * Get the EntityType info for the given id
   */
  getEntityType(id: string) : EntityType {
    if (this.types.length == 0)
      return new EntityType('', '', '', '', '', '');
    for (var t of this.types) {
      if (t.Id == id)
        return t;
    }
    return new EntityType('', '', '', '', '', '');
  }

}
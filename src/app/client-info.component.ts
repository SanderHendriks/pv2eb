import { Component, Input } from '@angular/core';
import { Client } from './client';
import { FieldInfo } from './FieldInfo';

@Component({
  selector:    'client-info',
  templateUrl: './client-info.component.html',
})

export class ClientInfoComponent {

  @Input()  clt: Client;
  @Input()  fields: FieldInfo[];

  /**
   * Get the Field value for the field with the given name
   */
  getField(client: Client, fieldName: string) : string {
    // First get the ID for the field from thefields list
    if (this.fields.length == 0)
      return '';
    for (var f of this.fields) {
      if (f.Name == fieldName) {
        // Now get the field value for the given client
        var val = client.getField(f.Id);
        // console.log('Field ' + fieldName + ' = "' + val + '"');
        return val;
      }
    }
    console.log('Field ' + fieldName + ' not found for client ' + client.DisplayName);
    return '';
  }

  /**
   * Return the visiting address, composed of several address fields
   */
  getVisitAddress(clt: Client) : string {
    var adr = this.getField(clt, 'ADR_VIS_street');
    adr += " " + this.getField(clt, 'ADR_VIS_number') + this.getField(clt, 'ADR_VIS_suffix');
    var extra = this.getField(clt, 'ADR_VIS_extra');
    if (extra.length > 0)
      adr += ", " + extra;
    adr += ", " + this.getField(clt, 'ADR_VIS_postalcode') + "  " + this.getField(clt, 'ADR_VIS_city');
    // Country in fase 2, want geeft een GUID die naar een landentabel verwijst
    // var ctry = this.getField(clt, 'ADR_VIS_country');
    // if (ctry.length > 0)
    //   adr += ", " + ctry;
    return adr;
  }

  /**
   * Return the postal address, composed of several address fields
   */
  getPostalAddress(clt: Client) : string {
    var adr = this.getField(clt, 'ADR_POS_street');
    adr += " " + this.getField(clt, 'ADR_POS_number') + this.getField(clt, 'ADR_POS_suffix');
    var extra = this.getField(clt, 'ADR_POS_extra');
    if (extra.length > 0)
      adr += ", " + extra;
    adr += ", " + this.getField(clt, 'ADR_POS_postalcode') + "  " + this.getField(clt, 'ADR_POS_city');
    // Country in fase 2, want geeft een GUID die naar een landentabel verwijst
    // var ctry = this.getField(clt, 'ADR_POS_country');
    // if (ctry.length > 0)
    //   adr += ", " + ctry;
    return adr;
  }

}
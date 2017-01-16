import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { EntityType } from './entitytype';
import { FieldInfo } from './FieldInfo';
import { PerfectViewClientsService } from './perfectview-clients.service';

@Component({
  moduleId: module.id,
  selector:    'PerfectViewClients',
  templateUrl: 'perfectview-clients.component.html',
  providers:  [ PerfectViewClientsService ]
})
export class PerfectViewClientsComponent implements OnInit {

  types: EntityType[] = [];
  orgTypeId: string;
  fields: FieldInfo[] = [];
  clients: Client[] = [];
  sinceDate : string = "2016-12-31";
  clientPageNr: number = 0;
  selectedClient: Client;
  error: string = "";

  // Inject the PerfectViewClientsService
  constructor(private service: PerfectViewClientsService) { }

  // record which client is selected by the user
  onSelectClient(clt: Client) {
    console.log("onSelectClient(" + clt.DisplayName + ")");
    this.selectedClient = clt;
  }

  /**
   * Retrieve the PerfectView EntityTypes and Relations, so we can show
   * a list of PerfectView clients
   */
  ngOnInit() {
    // Set sinceDate to a week ago
    this.initSinceDate();

    // Get the PerfectView EntrityTypes
    this.service.getTypes().subscribe((ts:EntityType[]) => {
          this.types = ts;
          console.log("Types : " + ts.length);
          this.orgTypeId = this.getOrganisatieTypeId(this.types);
          console.log("Organisatie Id : " + this.orgTypeId);
        },
        err => {
          // Log errors if any
          console.log("Error getting PerfectView entity types: " + err);
          this.error = "Error getting PerfectView entity types: " + err;
        });
    // Get the PerfectView FieldInfo
    this.service.getFields().subscribe((fi:FieldInfo[]) => {
          this.fields = fi;
          console.log("Fields : " + fi.length);
        },
        err => {
          // Log errors if any
          console.log("Error getting PerfectView entity types: " + err);
          this.error = "Error getting PerfectView entity types: " + err;
        });

    // Now we can finally get the Clients from PerfectView
    this.firstPage()
  }

  private initSinceDate() {
    // Set sinceDate to a week ago
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    var mon: string = "-" + (startDate.getMonth() + 1);
    if (mon.length == 2) mon = "-0" + (startDate.getMonth() + 1);
    var dt: string = "-" + startDate.getDate();
    if (dt.length == 2) dt = "-0" + startDate.getDate();
    this.sinceDate = startDate.getFullYear() + mon + dt;
    console.log("startDate=" + this.sinceDate);
  }

  private getOrganisatieTypeId(types: EntityType[]) : string {
    for (var t of types) {
      if (t.DescriptionSingular == 'organisatie')
        return t.Id;
    }
    return null;
  }

  private filterJustOrganizations(clts: Client[]): Client[] {
    var result: Client[] = [];
    for (var c of clts) {
      if (c.EntityTypeId == this.orgTypeId)
        result.push(c);
      // else
      //   console.log("discard relation " + c.DisplayName + " ("
      //   + c.EntityTypeId + ")");
  }
    return result;
  }

  /**
   * Get the first page of Relations from PerfectView
   */
  firstPage() {
    this.service.getClientsModifiedSince(this.sinceDate).subscribe((clts:Client[]) => {
          this.clients = this.filterJustOrganizations(clts);
          console.log("Relations : " + clts.length
                      + " , organisations : "  + this.clients.length);
          this.clientPageNr = 1;
          if (! this.selectedClient && this.clients.length > 0) {
            this.selectedClient = this.clients[0];
          }
          console.log("Current selectedClient : " + this.selectedClient.DisplayName);
        },
        err => { this.logError("Error getting PerfectView clients: " + err);
        });
  }

  /**
   * Retrieve the next page of Relations from PerfectView and
   * add them to the clients list
   */
  nextPage() {
    this.service.getClientsModifiedSince(this.sinceDate, this.clientPageNr + 1).subscribe((clts:Client[]) => {
          this.clients = this.clients.concat(this.filterJustOrganizations(clts));
          this.clientPageNr++;
          console.log("Page " + this.clientPageNr + ", Clients : " + clts.length
                      + " added, total "  + this.clients.length);
          if (clts.length == 0)
            this.clientPageNr--;
        },
        err => { this.logError("Error getting PerfectView clients: " + err);
        });
  }

  // Log errors
  private logError(errMsg: string) {
          console.log(errMsg);
          this.error = errMsg;
  }
}
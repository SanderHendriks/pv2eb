export class Client {
  Id           : string;
  EntityTypeId : string;
  Info         : string;
  SortingName  : string;
  DisplayName  : string;
  IsRoot       : boolean;
  IsDummy      : boolean;
  ImportKey    : string;
  IsInactive   : boolean;
  fields: { [id: string]: string; };

  constructor(id: string, etid: string, info: string, sname: string, dname: string,
             root: string, dummy: string, key: string, inactive: string) {
    this.Id = id;
    this.EntityTypeId = etid;
    this.Info = info;
    this.SortingName = sname;
    this.DisplayName = dname;
    this.IsRoot = (root.toLowerCase() == "true");
    this.IsDummy = (dummy.toLowerCase() == "true");
    this.ImportKey = key;
    this.IsInactive = (inactive.toLowerCase() == "true");
    this.fields= {};
  }

  public addField(id: string, value: string) {
    this.fields[id] = value;
  }

  public getField(id: string) : string {
    return this.fields[id];
  }
}

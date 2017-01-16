export class FieldInfo {
  Id : string;
  Label : string;
  Name: string;
  SortIndex:  number;
  CategoryName: string;
  CategorySortIndex: number;
  HideAtEntryForm: boolean;
  UserFriendlyName: string;
  IsReadOnly: boolean;
  Description : string;
  Control: string;
  Type: string;
  Length : number;
  IsRequired: boolean;

  constructor(id: string, lbl: string, nm: string, idx: string, cat: string,
             catidx: string, hide: string, friendly: string, ro: string,
             desc: string, ctrl: string, tp: string, len: string, req: string) {
    this.Id = id;
    this.Label = lbl;
    this.Name= nm;
    this.SortIndex = Number.parseInt(idx);
    this.CategoryName= cat;
    this.CategorySortIndex= Number.parseInt(catidx);
    this.HideAtEntryForm= (hide == "1" || hide == "true");
    this.UserFriendlyName= friendly;
    this.IsReadOnly= (ro == "1" || ro == "true");
    this.Description = desc;
    this.Control= ctrl;
    this.Type= tp;
    this.Length = Number.parseInt(len);
    this.IsRequired= (req == "1" || req == "true");
  }
}

export class EntityType {
  Id           : string;
  EntityTypeId : string;
  BaseEntityType: string;
  BaseRelationType: string;
  DescriptionSingular: string;
  DescriptionPlural  : string;

  constructor(id: string, etid: string, btype: string, brtype: string,
             sdesc: string, pdesc: string) {
    this.Id = id;
    this.EntityTypeId = etid;
    this.BaseEntityType = btype;
    this.BaseRelationType = brtype;
    this.DescriptionSingular = sdesc;
    this.DescriptionPlural = pdesc;
  }
}

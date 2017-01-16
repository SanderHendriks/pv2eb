"use strict";
var EntityType = (function () {
    function EntityType(id, etid, btype, brtype, sdesc, pdesc) {
        this.Id = id;
        this.EntityTypeId = etid;
        this.BaseEntityType = btype;
        this.BaseRelationType = brtype;
        this.DescriptionSingular = sdesc;
        this.DescriptionPlural = pdesc;
    }
    return EntityType;
}());
exports.EntityType = EntityType;
//# sourceMappingURL=entitytype.js.map
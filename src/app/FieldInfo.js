"use strict";
var FieldInfo = (function () {
    function FieldInfo(id, lbl, nm, idx, cat, catidx, hide, friendly, ro, desc, ctrl, tp, len, req) {
        this.Id = id;
        this.Label = lbl;
        this.Name = nm;
        this.SortIndex = Number.parseInt(idx);
        this.CategoryName = cat;
        this.CategorySortIndex = Number.parseInt(catidx);
        this.HideAtEntryForm = (hide == "1" || hide == "true");
        this.UserFriendlyName = friendly;
        this.IsReadOnly = (ro == "1" || ro == "true");
        this.Description = desc;
        this.Control = ctrl;
        this.Type = tp;
        this.Length = Number.parseInt(len);
        this.IsRequired = (req == "1" || req == "true");
    }
    return FieldInfo;
}());
exports.FieldInfo = FieldInfo;
//# sourceMappingURL=FieldInfo.js.map
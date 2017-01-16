"use strict";
var Client = (function () {
    function Client(id, etid, info, sname, dname, root, dummy, key, inactive) {
        this.Id = id;
        this.EntityTypeId = etid;
        this.Info = info;
        this.SortingName = sname;
        this.DisplayName = dname;
        this.IsRoot = (root.toLowerCase() == "true");
        this.IsDummy = (dummy.toLowerCase() == "true");
        this.ImportKey = key;
        this.IsInactive = (inactive.toLowerCase() == "true");
        this.fields = {};
    }
    Client.prototype.addField = function (id, value) {
        this.fields[id] = value;
    };
    Client.prototype.getField = function (id) {
        return this.fields[id];
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map
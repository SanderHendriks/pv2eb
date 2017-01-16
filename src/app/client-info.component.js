"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var client_1 = require('./client');
var ClientInfoComponent = (function () {
    function ClientInfoComponent() {
    }
    /**
     * Get the Field value for the field with the given name
     */
    ClientInfoComponent.prototype.getField = function (client, fieldName) {
        // First get the ID for the field from thefields list
        if (this.fields.length == 0)
            return '';
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.Name == fieldName) {
                // Now get the field value for the given client
                var val = client.getField(f.Id);
                // console.log('Field ' + fieldName + ' = "' + val + '"');
                return val;
            }
        }
        console.log('Field ' + fieldName + ' not found for client ' + client.DisplayName);
        return '';
    };
    /**
     * Return the visiting address, composed of several address fields
     */
    ClientInfoComponent.prototype.getVisitAddress = function (clt) {
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
    };
    /**
     * Return the postal address, composed of several address fields
     */
    ClientInfoComponent.prototype.getPostalAddress = function (clt) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', client_1.Client)
    ], ClientInfoComponent.prototype, "clt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClientInfoComponent.prototype, "fields", void 0);
    ClientInfoComponent = __decorate([
        core_1.Component({
            selector: 'client-info',
            templateUrl: 'app/client-info.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], ClientInfoComponent);
    return ClientInfoComponent;
}());
exports.ClientInfoComponent = ClientInfoComponent;
//# sourceMappingURL=client-info.component.js.map
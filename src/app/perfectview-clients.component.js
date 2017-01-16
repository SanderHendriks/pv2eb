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
var perfectview_clients_service_1 = require('./perfectview-clients.service');
var PerfectViewClientsComponent = (function () {
    // Inject the PerfectViewClientsService
    function PerfectViewClientsComponent(service) {
        this.service = service;
        this.types = [];
        this.fields = [];
        this.clients = [];
        this.sinceDate = "2016-12-31";
        this.clientPageNr = 0;
        this.error = "";
    }
    // record which client si selected by the user
    PerfectViewClientsComponent.prototype.onSelectClient = function (clt) {
        console.log("onSelectClient(" + clt.DisplayName + ")");
        this.selectedClient = clt;
    };
    /**
     * Retrieve the PerfectView EntityTypes and Relations, so we can show
     * a list of PerfectView clients
     */
    PerfectViewClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Set sinceDate to a week ago
        this.initSinceDate();
        // Get the PerfectView EntrityTypes
        this.service.getTypes().subscribe(function (ts) {
            _this.types = ts;
            console.log("Types : " + ts.length);
            _this.orgTypeId = _this.getOrganisatieTypeId(_this.types);
            console.log("Organisatie Id : " + _this.orgTypeId);
        }, function (err) {
            // Log errors if any
            console.log("Error getting PerfectView entity types: " + err);
            _this.error = "Error getting PerfectView entity types: " + err;
        });
        // Get the PerfectView FieldInfo
        this.service.getFields().subscribe(function (fi) {
            _this.fields = fi;
            console.log("Fields : " + fi.length);
        }, function (err) {
            // Log errors if any
            console.log("Error getting PerfectView entity types: " + err);
            _this.error = "Error getting PerfectView entity types: " + err;
        });
        // Now we can finally get the Clients from PerfectView
        this.firstPage();
    };
    PerfectViewClientsComponent.prototype.initSinceDate = function () {
        // Set sinceDate to a week ago
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        var mon = "-" + (startDate.getMonth() + 1);
        if (mon.length == 2)
            mon = "-0" + (startDate.getMonth() + 1);
        var dt = "-" + startDate.getDate();
        if (dt.length == 2)
            dt = "-0" + startDate.getDate();
        this.sinceDate = startDate.getFullYear() + mon + dt;
        console.log("startDate=" + this.sinceDate);
    };
    PerfectViewClientsComponent.prototype.getOrganisatieTypeId = function (types) {
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var t = types_1[_i];
            if (t.DescriptionSingular == 'organisatie')
                return t.Id;
        }
        return null;
    };
    PerfectViewClientsComponent.prototype.filterJustOrganizations = function (clts) {
        var result = [];
        for (var _i = 0, clts_1 = clts; _i < clts_1.length; _i++) {
            var c = clts_1[_i];
            if (c.EntityTypeId == this.orgTypeId)
                result.push(c);
        }
        return result;
    };
    /**
     * Get the first page of Relations from PerfectView
     */
    PerfectViewClientsComponent.prototype.firstPage = function () {
        var _this = this;
        this.service.getClientsModifiedSince(this.sinceDate).subscribe(function (clts) {
            _this.clients = _this.filterJustOrganizations(clts);
            console.log("Relations : " + clts.length
                + " , organisations : " + _this.clients.length);
            _this.clientPageNr = 1;
            if (!_this.selectedClient && _this.clients.length > 0) {
                _this.selectedClient = _this.clients[0];
            }
            console.log("Current selectedClient : " + _this.selectedClient.DisplayName);
        }, function (err) {
            _this.logError("Error getting PerfectView clients: " + err);
        });
    };
    /**
     * Retrieve the next page of Relations from PerfectView and
     * add them to the clients list
     */
    PerfectViewClientsComponent.prototype.nextPage = function () {
        var _this = this;
        this.service.getClientsModifiedSince(this.sinceDate, this.clientPageNr + 1).subscribe(function (clts) {
            _this.clients = _this.clients.concat(_this.filterJustOrganizations(clts));
            _this.clientPageNr++;
            console.log("Page " + _this.clientPageNr + ", Clients : " + clts.length
                + " added, total " + _this.clients.length);
            if (clts.length == 0)
                _this.clientPageNr--;
        }, function (err) {
            _this.logError("Error getting PerfectView clients: " + err);
        });
    };
    // Log errors
    PerfectViewClientsComponent.prototype.logError = function (errMsg) {
        console.log(errMsg);
        this.error = errMsg;
    };
    PerfectViewClientsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'PerfectViewClients',
            templateUrl: 'perfectview-clients.component.html',
            providers: [perfectview_clients_service_1.PerfectViewClientsService]
        }), 
        __metadata('design:paramtypes', [perfectview_clients_service_1.PerfectViewClientsService])
    ], PerfectViewClientsComponent);
    return PerfectViewClientsComponent;
}());
exports.PerfectViewClientsComponent = PerfectViewClientsComponent;
//# sourceMappingURL=perfectview-clients.component.js.map
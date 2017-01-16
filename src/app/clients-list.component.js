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
var entitytype_1 = require('./entitytype');
var ClientsListComponent = (function () {
    function ClientsListComponent() {
        this.onSelectClient = new core_1.EventEmitter();
    }
    // Emit the name of the selected client
    ClientsListComponent.prototype.selectClient = function (clt) {
        // console.log("Select " + clt.DisplayName);
        this.onSelectClient.emit(clt);
    };
    /**
     * Get the EntityType info for the given id
     */
    ClientsListComponent.prototype.getEntityType = function (id) {
        if (this.types.length == 0)
            return new entitytype_1.EntityType('', '', '', '', '', '');
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.Id == id)
                return t;
        }
        return new entitytype_1.EntityType('', '', '', '', '', '');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClientsListComponent.prototype, "types", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClientsListComponent.prototype, "clients", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ClientsListComponent.prototype, "onSelectClient", void 0);
    ClientsListComponent = __decorate([
        core_1.Component({
            selector: 'clientslist',
            templateUrl: 'app/clients-list.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], ClientsListComponent);
    return ClientsListComponent;
}());
exports.ClientsListComponent = ClientsListComponent;
//# sourceMappingURL=clients-list.component.js.map
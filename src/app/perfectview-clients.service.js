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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var client_1 = require('./client');
var entitytype_1 = require('./entitytype');
var mock_entitytypes_1 = require('./mock-entitytypes');
var FieldInfo_1 = require('./FieldInfo');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var PerfectViewClientsService = (function () {
    function PerfectViewClientsService(http) {
        this.http = http;
        this.soapUrl = 'https://api.perfectview.nl/V1/perfectview.asmx';
        this.clientsAllBody = "\n<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:api=\"https://Api.perfectview.nl\">\n   <soap:Header/>\n   <soap:Body>\n      <api:RelationGetAll>\n         <api:credentials>\n            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>\n            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>\n            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>\n            <api:UserName></api:UserName>\n            <api:Password></api:Password>\n            <api:SourceApplication>\n               <api:Name>SKYB</api:Name>\n               <api:Category></api:Category>\n               <api:Subcategory></api:Subcategory>\n               <api:Version>1</api:Version>\n            </api:SourceApplication>\n         </api:credentials>\n         <api:pageNumber>{{pageNr}}</api:pageNumber>\n         <api:pageSize>15</api:pageSize>\n         <api:includeFields>0</api:includeFields>\n         <api:includeCounters>0</api:includeCounters>\n      </api:RelationGetAll>\n   </soap:Body>\n</soap:Envelope>\n  ";
        this.clientsBody = "\n<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:api=\"https://Api.perfectview.nl\">\n   <soap:Header/>\n   <soap:Body>\n      <api:RelationGetModified>\n         <api:credentials>\n            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>\n            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>\n            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>\n            <api:SourceApplication>\n               <api:Name>SKYB</api:Name>\n               <api:Version>1</api:Version>\n            </api:SourceApplication>\n         </api:credentials>\n         <api:pageNumber>{{pageNr}}</api:pageNumber>\n         <api:pageSize>50</api:pageSize>\n         <api:from>{{sinceDate}}T00:00:00+01:00</api:from>\n         <api:to>{{toDate}}</api:to>\n         <api:includeFields>1</api:includeFields>\n         <api:includeCounters>0</api:includeCounters>\n      </api:RelationGetModified>\n   </soap:Body>\n</soap:Envelope>";
        this.typesBody = "\n<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:api=\"https://Api.perfectview.nl\">\n   <soap:Header/>\n   <soap:Body>\n      <api:EntityTypeGetAll>\n         <api:credentials>\n            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>\n            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>\n            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>\n            <api:UserName></api:UserName>\n            <api:Password></api:Password>\n            <api:SourceApplication>\n               <api:Name>SKYB</api:Name>\n               <api:Category></api:Category>\n               <api:Subcategory></api:Subcategory>\n               <api:Version>1</api:Version>\n            </api:SourceApplication>\n         </api:credentials>\n      </api:EntityTypeGetAll>\n   </soap:Body>\n</soap:Envelope>\n  ";
        this.fieldsBody = "\n<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:api=\"https://Api.perfectview.nl\">\n   <soap:Header/>\n   <soap:Body>\n      <api:RelationGetFields>\n         <api:credentials>\n            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>\n            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>\n            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>\n            <api:SourceApplication>\n               <api:Name>SKYB</api:Name>\n               <api:Version>1</api:Version>\n            </api:SourceApplication>\n         </api:credentials>\n         <api:baseRelationType>Organisation</api:baseRelationType>\n      </api:RelationGetFields>\n   </soap:Body>\n</soap:Envelope>\n ";
    }
    /**
     * Get (the first page of) client relations
     */
    PerfectViewClientsService.prototype.getClients = function () {
        var _this = this;
        var result;
        // add the page nr to the SOAP request body
        var regex = /{{pageNr}}/g;
        var body = this.clientsAllBody.replace(regex, "1");
        // Get the clients list using a SOAP XML webservice
        return this.get(this.soapUrl, this.clientsBody)
            .map(function (res) { return _this.xml2Clients(res.text()); });
    };
    /**
     * Get (a page of) client relations
     */
    PerfectViewClientsService.prototype.getClientsPage = function (pageNr) {
        var _this = this;
        var result;
        // add the page nr to the SOAP request body
        var regex = /{{pageNr}}/g;
        var body = this.clientsAllBody.replace(regex, pageNr.toString());
        // Get the clients list using a SOAP XML webservice
        return this.get(this.soapUrl, body)
            .map(function (res) { return _this.xml2Clients(res.text()); });
    };
    /**
     * Get all client relations that where modified since the given date
     */
    PerfectViewClientsService.prototype.getClientsModifiedSince = function (since, pageNr) {
        var _this = this;
        var result;
        // add sinceDate and toDate to the SOAP request body
        var regex = /{{sinceDate}}/g;
        var body = this.clientsBody.replace(regex, since);
        // toDate is always the current date
        var regex = /{{toDate}}/g;
        var now = new Date().toISOString();
        body = body.replace(regex, now);
        if (!pageNr)
            pageNr = 1;
        // add the page nr to the SOAP request body
        regex = /{{pageNr}}/g;
        body = body.replace(regex, pageNr.toString());
        console.log("Get modified clients since " + since + " to " + now + " ; page " + pageNr);
        // Get the clients list using a SOAP XML webservice
        return this.get(this.soapUrl, body)
            .map(function (res) { return _this.xml2Clients(res.text()); });
    };
    /**
     * Get all PerfectView EntityTypes
     */
    PerfectViewClientsService.prototype.getTypes = function () {
        var result;
        return this.mockTypes();
        // Get the entity types list using a SOAP XML webservice
        // return this.get(this.soapUrl, this.typesBody)
        //   // map the xml response to an array of EntityType objects
        //   .map(res => this.xml2Types(res.text()));
    };
    PerfectViewClientsService.prototype.mockTypes = function () {
        var pr = Promise.resolve(mock_entitytypes_1.ENTITYTYPES);
        return Rx_1.Observable.fromPromise(pr);
    };
    /**
     * Get field info for PerfectView Organisation objects
     */
    PerfectViewClientsService.prototype.getFields = function () {
        var _this = this;
        var result;
        // Get the fields list using a SOAP XML webservice
        return this.get(this.soapUrl, this.fieldsBody)
            .map(function (res) { return _this.xml2Fields(res.text()); });
    };
    /**
     * Call the given HTTP SOAP service and return an Observable that will
     * produce the results.
     */
    PerfectViewClientsService.prototype.get = function (url, body) {
        // var body : string = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/soap+xml;charset=UTF-8',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        // Execute the SOAP request
        return this.http.post(url, body, options)
            .catch(function (error) { return Rx_1.Observable.throw(error.message || 'PerfectView service error'); });
    };
    /**
     * Parse the given XML text string and return the contained relations as
     * an array of Client objects.
     */
    PerfectViewClientsService.prototype.xml2Clients = function (txt) {
        // Parse the given txt into an XML DOM
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(txt, "text/xml");
        this.checkResult(xmlDoc);
        // Find the relations in <Relations><PvRelationData>
        var relationsElement = xmlDoc.getElementsByTagName("Relations");
        if (!relationsElement)
            throw new Error("No Relations tag in received response");
        var relations = relationsElement[0].getElementsByTagName("PvRelationData");
        if (!relations)
            throw new Error("No PvRelationData in received response");
        // Now parse the PvRelationData into Client objects
        var clients = [];
        for (var i = 0; i < relations.length; i++) {
            var rel = relations[i];
            // Assume that all the child elements are there
            var c = new client_1.Client(this.getTagText(rel, "Id"), this.getTagText(rel, "EntityTypeId"), this.getTagText(rel, "Info"), this.getTagText(rel, "SortingName"), this.getTagText(rel, "DisplayName"), this.getTagText(rel, "IsRoot"), this.getTagText(rel, "IsDummy"), this.getTagText(rel, "ImportKey"), this.getTagText(rel, "IsInactive"));
            // Add the field values
            var items = rel.getElementsByTagName("Items");
            if (items && items.length > 0) {
                var fields = items[0].childNodes;
                for (var j = 0; j < fields.length; j++) {
                    var f = fields.item(j);
                    var id = f.firstChild.textContent;
                    var v = f.lastChild.textContent;
                    // console.log("Client " + c.DisplayName + " has field " + id + " >> " + v);
                    c.addField(id, v);
                }
            }
            clients.push(c);
        }
        return clients;
    };
    /**
     * Parse the given XML text string and return the contained entity types as
     * an array of EntityType objects.
     */
    PerfectViewClientsService.prototype.xml2Types = function (txt) {
        // Parse the given txt into an XML DOM
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(txt, "text/xml");
        this.checkResult(xmlDoc);
        // Find the relations in <EntityTypes><PvEntityTypeData>
        var relationsElement = xmlDoc.getElementsByTagName("EntityTypes");
        if (!relationsElement)
            throw new Error("No EntityTypes tag in received response");
        var relations = relationsElement[0].getElementsByTagName("PvEntityTypeData");
        if (!relations)
            throw new Error("No PvEntityTypeData in received response");
        // Now parse the PvRelationData into Client objects
        var types = [];
        for (var i = 0; i < relations.length; i++) {
            var rel = relations[i];
            // Assume that all the child elements are there
            var t = new entitytype_1.EntityType(this.getTagText(rel, "Id"), this.getTagText(rel, "EntityTypeId"), this.getTagText(rel, "BaseEntityType"), this.getTagText(rel, "BaseRelationType"), this.getTagText(rel, "DescriptionSingular"), this.getTagText(rel, "DescriptionPlural"));
            types.push(t);
        }
        return types;
    };
    /**
     * Parse the given XML text string and return the contained entity field info
     * as an array of FieldInfo objects.
     */
    PerfectViewClientsService.prototype.xml2Fields = function (txt) {
        // Parse the given txt into an XML DOM
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(txt, "text/xml");
        this.checkResult(xmlDoc);
        // Find the relations in <Fields><PvFieldData>
        var relationsElement = xmlDoc.getElementsByTagName("Fields");
        if (!relationsElement)
            throw new Error("No Fields tag in received response");
        var relations = relationsElement[0].getElementsByTagName("PvFieldData");
        if (!relations)
            throw new Error("No PvFieldData in received response");
        // Now parse the PvRelationData into Client objects
        var fields = [];
        for (var i = 0; i < relations.length; i++) {
            var rel = relations[i];
            // Assume that all the child elements are there
            var f = new FieldInfo_1.FieldInfo(this.getTagText(rel, "Id"), this.getTagText(rel, "Label"), this.getTagText(rel, "Name"), this.getTagText(rel, "SortIndex"), this.getTagText(rel, "CategoryName"), this.getTagText(rel, "CategorySortIndex"), this.getTagText(rel, "HideAtEntryForm"), this.getTagText(rel, "UserFriendlyName"), this.getTagText(rel, "IsReadOnly"), this.getTagText(rel, "Description"), this.getTagText(rel, "Control"), this.getTagText(rel, "Type"), this.getTagText(rel, "Length"), this.getTagText(rel, "IsRequired"));
            fields.push(f);
        }
        return fields;
    };
    /**
     * PerfectView API returns info on the success of the request in the returned XML.
     * Check those success tags.
     */
    PerfectViewClientsService.prototype.checkResult = function (xmlDoc) {
        // Check <Result><Succeeded> tag; this should be 'true'
        var resultElements = xmlDoc.getElementsByTagName("Result");
        if (!resultElements)
            throw new Error("No Result tag in received response");
        var succeededElements = resultElements[0].getElementsByTagName("Succeeded");
        if (!succeededElements)
            throw new Error("No Succeeded tag in received response");
        if (succeededElements[0].textContent != "true") {
            // No success, get the error info
            var error = "";
            var descElements = resultElements[0].getElementsByTagName("Description");
            if (descElements)
                error = descElements[0].textContent;
            var codeElements = resultElements[0].getElementsByTagName("Code");
            if (codeElements)
                error += " (" + codeElements[0].textContent + ")";
            throw new Error(error);
        }
    };
    // Get the text of the given child tag of XML Element e
    PerfectViewClientsService.prototype.getTagText = function (e, tagName) {
        var els = e.getElementsByTagName(tagName);
        if (els == null || els.length == 0)
            return "";
        return els[0].textContent;
    };
    PerfectViewClientsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PerfectViewClientsService);
    return PerfectViewClientsService;
}());
exports.PerfectViewClientsService = PerfectViewClientsService;
//# sourceMappingURL=perfectview-clients.service.js.map
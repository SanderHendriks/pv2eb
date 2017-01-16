import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Client } from './client';
import { EntityType } from './entitytype';
import { ENTITYTYPES } from './mock-entitytypes';
import { FieldInfo } from './FieldInfo';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PerfectViewClientsService {
  private soapUrl: string = 'https://api.perfectview.nl/V1/perfectview.asmx';

  constructor(private http: Http) {   }

  private clientsAllBody : string = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:api="https://Api.perfectview.nl">
   <soap:Header/>
   <soap:Body>
      <api:RelationGetAll>
         <api:credentials>
            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>
            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>
            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>
            <api:UserName></api:UserName>
            <api:Password></api:Password>
            <api:SourceApplication>
               <api:Name>SKYB</api:Name>
               <api:Category></api:Category>
               <api:Subcategory></api:Subcategory>
               <api:Version>1</api:Version>
            </api:SourceApplication>
         </api:credentials>
         <api:pageNumber>{{pageNr}}</api:pageNumber>
         <api:pageSize>15</api:pageSize>
         <api:includeFields>0</api:includeFields>
         <api:includeCounters>0</api:includeCounters>
      </api:RelationGetAll>
   </soap:Body>
</soap:Envelope>
  `;

  private clientsBody : string = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:api="https://Api.perfectview.nl">
   <soap:Header/>
   <soap:Body>
      <api:RelationGetModified>
         <api:credentials>
            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>
            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>
            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>
            <api:SourceApplication>
               <api:Name>SKYB</api:Name>
               <api:Version>1</api:Version>
            </api:SourceApplication>
         </api:credentials>
         <api:pageNumber>{{pageNr}}</api:pageNumber>
         <api:pageSize>50</api:pageSize>
         <api:from>{{sinceDate}}T00:00:00+01:00</api:from>
         <api:to>{{toDate}}</api:to>
         <api:includeFields>1</api:includeFields>
         <api:includeCounters>0</api:includeCounters>
      </api:RelationGetModified>
   </soap:Body>
</soap:Envelope>`;

  private typesBody : string = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:api="https://Api.perfectview.nl">
   <soap:Header/>
   <soap:Body>
      <api:EntityTypeGetAll>
         <api:credentials>
            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>
            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>
            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>
            <api:UserName></api:UserName>
            <api:Password></api:Password>
            <api:SourceApplication>
               <api:Name>SKYB</api:Name>
               <api:Category></api:Category>
               <api:Subcategory></api:Subcategory>
               <api:Version>1</api:Version>
            </api:SourceApplication>
         </api:credentials>
      </api:EntityTypeGetAll>
   </soap:Body>
</soap:Envelope>
  `;

  private fieldsBody : string = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:api="https://Api.perfectview.nl">
   <soap:Header/>
   <soap:Body>
      <api:RelationGetFields>
         <api:credentials>
            <api:ApiKey>058c7fcf-95f8-4262-aa9c-9e503a036c4d</api:ApiKey>
            <api:DatabaseId>68814733-8f81-4015-98fe-9a8610875291</api:DatabaseId>
            <api:UserId>65fa2bf1-a2e5-4834-bb8f-96e05cefb8b7</api:UserId>
            <api:SourceApplication>
               <api:Name>SKYB</api:Name>
               <api:Version>1</api:Version>
            </api:SourceApplication>
         </api:credentials>
         <api:baseRelationType>Organisation</api:baseRelationType>
      </api:RelationGetFields>
   </soap:Body>
</soap:Envelope>
 `;

  /**
   * Get (the first page of) client relations
   */
  getClients() : Observable<any> {
    var result : string;

    // add the page nr to the SOAP request body
    var regex = /{{pageNr}}/g;
    var body = this.clientsAllBody.replace(regex, "1");

    // Get the clients list using a SOAP XML webservice
    return this.get(this.soapUrl, this.clientsBody)
      // map the xml response to an array of Client objects
      .map(res => this.xml2Clients(res.text()));
  }

  /**
   * Get (a page of) client relations
   */
  getClientsPage(pageNr: number) : Observable<any> {
    var result : string;

    // add the page nr to the SOAP request body
    var regex = /{{pageNr}}/g;
    var body = this.clientsAllBody.replace(regex, pageNr.toString());

    // Get the clients list using a SOAP XML webservice
    return this.get(this.soapUrl, body)
      // map the xml response to an array of Client objects
      .map(res => this.xml2Clients(res.text()));
  }

  /**
   * Get all client relations that where modified since the given date
   */
  getClientsModifiedSince(since: string, pageNr ?: number) : Observable<any> {
    var result : string;

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
      // map the xml response to an array of Client objects
      .map(res => this.xml2Clients(res.text()));
  }

  /**
   * Get all PerfectView EntityTypes
   */
  getTypes() : Observable<any> {
    var result : string;

    return this.mockTypes();
    // Get the entity types list using a SOAP XML webservice
    // return this.get(this.soapUrl, this.typesBody)
    //   // map the xml response to an array of EntityType objects
    //   .map(res => this.xml2Types(res.text()));
  }

  mockTypes() : Observable<any> {
    var pr : Promise<EntityType[]> = Promise.resolve(ENTITYTYPES);
    return Observable.fromPromise(pr);
  }

  /**
   * Get field info for PerfectView Organisation objects
   */
  getFields() : Observable<any> {
    var result : string;

    // Get the fields list using a SOAP XML webservice
    return this.get(this.soapUrl, this.fieldsBody)
      // map the xml response to an array of EntityType objects
      .map(res => this.xml2Fields(res.text()));
  }

  /**
   * Call the given HTTP SOAP service and return an Observable that will
   * produce the results.
   */
  public get(url: string, body: string) : Observable<any> {
    // var body : string = JSON.stringify(body); // Stringify payload
    var headers : Headers = new Headers({ 'Content-Type': 'application/soap+xml;charset=UTF-8',
    //                                      'Host' : 'api.perfectview.nl',
                                        });
    var options : RequestOptions = new RequestOptions({ headers: headers });

    // Execute the SOAP request
    return this.http.post(url, body, options)
      .catch((error:any) => Observable.throw(error.message || 'PerfectView service error'));
  }

  /**
   * Parse the given XML text string and return the contained relations as
   * an array of Client objects.
   */
  private xml2Clients(txt: string) : Client[] {
    // Parse the given txt into an XML DOM
    var parser : DOMParser = new DOMParser();
    var xmlDoc = parser.parseFromString(txt, "text/xml");
    this.checkResult(xmlDoc);

    // Find the relations in <Relations><PvRelationData>
    var relationsElement : NodeListOf<Element> = xmlDoc.getElementsByTagName("Relations");
    if (! relationsElement)
      throw new Error("No Relations tag in received response");
    var relations : NodeListOf<Element> = relationsElement[0].getElementsByTagName("PvRelationData");
    if (! relations)
      throw new Error("No PvRelationData in received response");
    
    // Now parse the PvRelationData into Client objects
    var clients: Client[] = [];
    for (var i = 0; i < relations.length; i++) {
      var rel : Element = relations[i];
      // Assume that all the child elements are there
      var c : Client = new Client(
          this.getTagText(rel, "Id"),
          this.getTagText(rel, "EntityTypeId"),
          this.getTagText(rel, "Info"),
          this.getTagText(rel, "SortingName"),
          this.getTagText(rel, "DisplayName"),
          this.getTagText(rel, "IsRoot"),
          this.getTagText(rel, "IsDummy"),
          this.getTagText(rel, "ImportKey"),
          this.getTagText(rel, "IsInactive"),
      );
      // Add the field values
      var items: NodeListOf<Element> = rel.getElementsByTagName("Items");
      if (items && items.length > 0) {
        var fields: NodeList = items[0].childNodes;
        for (var j = 0; j < fields.length; j++) {
          var f: Node = fields.item(j);
          var id:string = f.firstChild.textContent;
          var v:string = f.lastChild.textContent;
          // console.log("Client " + c.DisplayName + " has field " + id + " >> " + v);
          c.addField(id, v);
        }
      }
      clients.push(c);
    }
    return clients;
  }

  /**
   * Parse the given XML text string and return the contained entity types as
   * an array of EntityType objects.
   */
  private xml2Types(txt: string) : EntityType[] {
    // Parse the given txt into an XML DOM
    var parser : DOMParser = new DOMParser();
    var xmlDoc = parser.parseFromString(txt, "text/xml");
    this.checkResult(xmlDoc);

    // Find the relations in <EntityTypes><PvEntityTypeData>
    var relationsElement : NodeListOf<Element> = xmlDoc.getElementsByTagName("EntityTypes");
    if (! relationsElement)
      throw new Error("No EntityTypes tag in received response");
    var relations : NodeListOf<Element> = relationsElement[0].getElementsByTagName("PvEntityTypeData");
    if (! relations)
      throw new Error("No PvEntityTypeData in received response");
    
    // Now parse the PvRelationData into Client objects
    var types: EntityType[] = [];
    for (var i = 0; i < relations.length; i++) {
      var rel : Element = relations[i];
      // Assume that all the child elements are there
      var t : EntityType = new EntityType(
          this.getTagText(rel, "Id"),
          this.getTagText(rel, "EntityTypeId"),
          this.getTagText(rel, "BaseEntityType"),
          this.getTagText(rel, "BaseRelationType"),
          this.getTagText(rel, "DescriptionSingular"),
          this.getTagText(rel, "DescriptionPlural"),
         );
         types.push(t);
    }
    return types;
  }

  /**
   * Parse the given XML text string and return the contained entity field info
   * as an array of FieldInfo objects.
   */
  private xml2Fields(txt: string) : FieldInfo[] {
    // Parse the given txt into an XML DOM
    var parser : DOMParser = new DOMParser();
    var xmlDoc = parser.parseFromString(txt, "text/xml");
    this.checkResult(xmlDoc);

    // Find the relations in <Fields><PvFieldData>
    var relationsElement : NodeListOf<Element> = xmlDoc.getElementsByTagName("Fields");
    if (! relationsElement)
      throw new Error("No Fields tag in received response");
    var relations : NodeListOf<Element> = relationsElement[0].getElementsByTagName("PvFieldData");
    if (! relations)
      throw new Error("No PvFieldData in received response");
    
    // Now parse the PvRelationData into Client objects
    var fields: FieldInfo[] = [];
    for (var i = 0; i < relations.length; i++) {
      var rel : Element = relations[i];
      // Assume that all the child elements are there
      var f : FieldInfo = new FieldInfo(
          this.getTagText(rel, "Id"),
          this.getTagText(rel, "Label"),
          this.getTagText(rel, "Name"),
          this.getTagText(rel, "SortIndex"),
          this.getTagText(rel, "CategoryName"),
          this.getTagText(rel, "CategorySortIndex"),
          this.getTagText(rel, "HideAtEntryForm"),
          this.getTagText(rel, "UserFriendlyName"),
          this.getTagText(rel, "IsReadOnly"),
          this.getTagText(rel, "Description"),
          this.getTagText(rel, "Control"),
          this.getTagText(rel, "Type"),
          this.getTagText(rel, "Length"),
          this.getTagText(rel, "IsRequired"),
         );
         fields.push(f);
    }
    return fields;
  }

  /**
   * PerfectView API returns info on the success of the request in the returned XML.
   * Check those success tags.
   */
  private checkResult(xmlDoc: Document) {
    // Check <Result><Succeeded> tag; this should be 'true'
    var resultElements : NodeListOf<Element> = xmlDoc.getElementsByTagName("Result");
    if (! resultElements)
      throw new Error("No Result tag in received response");
    var succeededElements : NodeListOf<Element> = resultElements[0].getElementsByTagName("Succeeded");
    if (! succeededElements)
      throw new Error("No Succeeded tag in received response");
    if (succeededElements[0].textContent != "true" ) {
      // No success, get the error info
      var error = "";
    var descElements : NodeListOf<Element> = resultElements[0].getElementsByTagName("Description");
      if (descElements)
        error = descElements[0].textContent;
    var codeElements : NodeListOf<Element> = resultElements[0].getElementsByTagName("Code");
      if (codeElements)
        error += " (" + codeElements[0].textContent + ")";
      throw new Error(error);
    }
  }

  // Get the text of the given child tag of XML Element e
  private getTagText(e: Element, tagName: string) : string {
    var els: NodeListOf<Element> = e.getElementsByTagName(tagName);
    if (els == null || els.length == 0)
      return "";
    return els[0].textContent;
  }
}
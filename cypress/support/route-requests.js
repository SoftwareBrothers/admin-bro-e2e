export function routeRecordCreated (resource, recordCreated = 'recordCreated'){
  cy.server()
    .route('POST', `/admin/api/resources/${resource}/actions/new`)
    .as(recordCreated);
}

export function routeRecordDeleted (resource, recordDeleted = 'recordDeleted'){
  cy.server()  
    .route('GET', `/admin/api/resources/${resource}/records/*/delete`)
    .as(recordDeleted);
}

export function routeRecordLoaded (resource, recordLoaded = 'recordLoaded'){
  cy.server()  
    .route('GET', `/admin/api/resources/${resource}/records/*/show`)
    .as(recordLoaded);
}

export function routeRecordEditLoaded (resource, recordEditLoaded = 'recordEditLoaded'){
  cy.server()  
    .route('GET', `/admin/api/resources/${resource}/records/*/edit`)
    .as(recordEditLoaded);
}

export function routeRecordSaved (resource, recordSaved = 'recordSaved'){
  cy.server()  
    .route('POST', `/admin/api/resources/${resource}/records/*/edit`)
    .as(recordSaved);
}

export function routeListLoaded (resource, listLoaded = 'listLoaded'){
  cy.server()  
    .route('GET', `/admin/api/resources/${resource}/actions/list`)
    .as(listLoaded);
}

export function routeSearchLoaded (resource, searchLoaded = 'searchLoaded'){
  cy.server()  
    .route('GET', `/admin/api/resources/${resource}/actions/search`)
    .as(searchLoaded);
}


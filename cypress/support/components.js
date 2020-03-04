const components = {
  common: {
    email: '[name="email"]',
    password: '[name="password"]',
    title: '#title',
    messageBox: '[class^=message-box]',
    sidebarPanel: '[class^=drawer__Drawer]',
    sidebarLink: '[data-testid="sidebar-resource-link"]',
    sidebarDrawer: '[class^=drawer-footer]',
    sidebarPasswordInput: '[type="password"]',
    createButton: '.admin-bro-icon',
    hideSidebar: '[mr="lg"]',
    actionButton: '[class^=action-button]',
    emailsList: '[data-testid="property-list-email"]',
    idsList: '[data-testid="property-list-_id"]',
  },
  complicated: {
    name: '[data-testid="property-list-name"]',
    birthPlace: '[data-testid="property-list-nestedDetails.placeOfBirth"]',
    age: '[data-testid="property-list-nestedDetails.age"]',
    extremelyNested: '[data-testid="property-list-nestedDetails.nested.extremelyNested"]',
  },
};

export default components;

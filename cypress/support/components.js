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
    publishedAt: '[data-testid="property-edit-publishedAt"]',
    idsList: '[data-testid="property-list-_id"]',
    calendarToday: '.react-datepicker__day--today',
    dropdownFirstOption: '#react-select-3-option-0',
    nameList: '[data-testid="property-list-name"]',
    userId: '[for="userId"]',
  },
  complicated: {
    birthPlace: '[data-testid="property-list-nestedDetails.placeOfBirth"]',
    age: '[data-testid="property-list-nestedDetails.age"]',
    extremelyNested: '[data-testid="property-list-nestedDetails.nested.extremelyNested"]',
  },
};

export default components;

import { TodomvcAngularCliPage } from './app.po';

describe('todomvc-angular-cli App', () => {
  let page: TodomvcAngularCliPage;

  beforeEach(() => {
    page = new TodomvcAngularCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

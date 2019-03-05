import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have toolbar with app title', () => {
    page.navigateTo();
    const toolbar = element(by.className('mat-toolbar'));
    expect(toolbar.getText()).toContain('Password Manager');
  });
});

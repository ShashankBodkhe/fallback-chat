import { ChatFallbackPage } from './app.po';

describe('chat-fallback App', () => {
  let page: ChatFallbackPage;

  beforeEach(() => {
    page = new ChatFallbackPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { SkybPv2ebPage } from './app.po';

describe('skyb-pv2eb App', function() {
  let page: SkybPv2ebPage;

  beforeEach(() => {
    page = new SkybPv2ebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

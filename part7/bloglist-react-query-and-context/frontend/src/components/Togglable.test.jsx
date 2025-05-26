import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />...', () => {
  let container;
  const user = userEvent.setup();
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel={'show...'}>
        <div data-testid="togglable-content">togglable content</div>
      </Togglable>
    ).container;
  });

  test('render <Togglable />', () => {
    const content = screen.getByTestId('show');

    expect(content).toBeDefined();
  });

  test('render togglable content', async () => {
    const button = screen.getByTestId('show');

    await user.click(button);

    const togglableContent = screen.getByTestId('togglable-content');

    expect(togglableContent).toBeDefined();
  });
});

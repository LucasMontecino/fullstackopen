import { render, screen } from '@testing-library/react';
import NotificationMessage from './NotificationMessage';

test('render <NotificationMessage /> properly', () => {
  render(<NotificationMessage />);

  screen.debug();
});

test('render an error notification', () => {
  const { container } = render(
    <NotificationMessage type={'error'} />
  );
  const notification =
    container.querySelector('.notification');

  expect(notification).toBeDefined();
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logout from './Logout';

test('render <Logout />', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Logout handleClick={handleClick} />);

  const logoutButton = screen.getByTestId('logout');

  await user.click(logoutButton);

  expect(handleClick.mock.calls).toHaveLength(1);
  expect(screen.getByText('logout')).toBeInTheDocument();
});

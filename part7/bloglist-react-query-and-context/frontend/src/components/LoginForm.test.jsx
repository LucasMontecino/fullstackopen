import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('test the form login correctly', async () => {
  const handleLogin = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<LoginForm handleLogin={handleLogin} />);

  const username = container.querySelector('#username');
  const password = container.querySelector('#password');

  const sendButton = screen.getByTestId('submit-login');

  await user.type(username, 'lucasmontecino9');
  await user.type(password, 'lucas2025');

  await user.click(sendButton);

  expect(handleLogin.mock.calls).toHaveLength(1);
  expect(handleLogin.mock.calls[0][0].username).toBe('lucasmontecino9');
});

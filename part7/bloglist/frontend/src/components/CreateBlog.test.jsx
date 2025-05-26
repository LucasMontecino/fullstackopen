import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlog from './CreateBlog';

describe('<CreateBlog />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<CreateBlog createBlog={createBlog} />);

    const title = container.querySelector('#title');
    const author = container.querySelector('#author');
    const url = container.querySelector('#url');
    const sendButton = screen.getByTestId('create');

    await user.type(title, 'new blog...');
    await user.type(author, 'John Doe');
    await user.type(url, 'example.com');
    await user.click(sendButton);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('new blog...');
    expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
    expect(createBlog.mock.calls[0][0].url).toBe('example.com');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import Button from './Button';

describe('<Blog />', () => {
  let container;
  const updateBlog = vi.fn();
  beforeEach(() => {
    const blog = {
      title: 'Blog Testing Title',
      author: 'Someone',
      url: 'example.com',
      likes: 1,
      user: {
        id: 1,
        name: 'Creator',
        username: 'creator1',
      },
    };
    container = render(
      <Blog blog={blog} updateBlog={updateBlog}>
        <Button
          label={'cancel'}
          type={'button'}
          testid="cancel"
        />
      </Blog>
    ).container;
  });
  test('render blog with title and author by default', () => {
    const title = container.querySelector('blog-title');
    const author = container.querySelector('blog-title');
    const url = container.querySelector('blog-url');
    const likes = container.querySelector('blog-likes');
    const creator = container.querySelector('blog-creator');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
    expect(creator).toBeNull();
  });

  test('render blog details when user clicks on toggle button', async () => {
    const title = container.querySelector('blog-title');
    const author = container.querySelector('blog-title');
    const url = container.querySelector('blog-url');
    const likes = container.querySelector('blog-likes');
    const creator = container.querySelector('blog-creator');

    const user = userEvent.setup();
    const button = screen.getByTestId('toggle-button');

    await user.click(button);

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(creator).toBeDefined();
    expect(screen.getByText('Creator')).toBeInTheDocument();
  });

  test('likes handler is clicked twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId('toggle-button');

    await user.click(button);

    const likesButton = screen.getByTestId('button-likes');

    await user.click(likesButton);
    await user.click(likesButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});

describe('when blog.user is undefined or blog.user.name is undefined', () => {
  test('testing the details if it creator doesnt provide', async () => {
    const blog = {
      title: 'testing',
      author: 'testest',
      url: 'example.com',
      likes: 1,
    };

    render(<Blog blog={blog} />);

    const user = userEvent.setup();

    const button = screen.getByTestId('toggle-button');

    await user.click(button);

    expect(
      screen.getByText('unknown creator')
    ).toBeInTheDocument();
  });

  test('testing the details if it creator is undefined', async () => {
    const blog = {
      title: 'testing',
      author: 'testest',
      url: 'example.com',
      likes: 1,
      user: {},
    };

    render(<Blog blog={blog} />);

    const user = userEvent.setup();

    const button = screen.getByTestId('toggle-button');

    await user.click(button);

    expect(
      screen.getByText('unknown creator')
    ).toBeInTheDocument();
  });
});

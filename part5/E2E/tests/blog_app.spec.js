const {
  test,
  describe,
  expect,
  beforeEach,
} = require('@playwright/test');
const helper = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/register', {
      data: {
        username: 'lucasm9',
        name: 'Lucas Montecino',
        password: 'lucas_2025',
      },
    });
    await request.post('/api/register', {
      data: {
        username: 'pepesand',
        name: 'Pepe Sand',
        password: 'pepe_2025',
      },
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const loginTitle = await page.locator('.login-title');
    const username = await page.locator('#username');
    const password = await page.locator('#password');
    const button = await page.getByRole('button', {
      name: 'login',
    });

    await expect(loginTitle).toContainText(
      'log in to application'
    );
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(button).toBeVisible();
  });

  describe('Login', () => {
    test('success with correct credentials', async ({
      page,
    }) => {
      await helper.loginWith(page, 'lucasm9', 'lucas_2025');
      await expect(page.getByText('logout')).toBeVisible();
      await expect(
        page.getByText('Lucas Montecino logged in')
      ).toBeVisible();
      await expect(
        page.getByText('create new blog')
      ).toBeVisible();
    });

    test('fails with wrong credentials', async ({
      page,
    }) => {
      await helper.loginWith(page, 'lucasm9', 'lucas_2024');
      await expect(page.getByText('login')).toBeVisible();
      await expect(
        page.getByText('invalid username or password')
      ).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'lucasm9', 'lucas_2025');
      await helper.createBlog(
        page,
        'My first blog',
        'Playwright testing',
        'example.com'
      );
    });

    test('a new note can be created', async ({ page }) => {
      await expect(
        page.locator('.blog-title')
      ).toContainText('My first blog');
    });

    test('a note can be liked', async ({ page }) => {
      await page
        .getByRole('button', { name: 'view' })
        .click();

      await page
        .getByRole('button', { name: 'like' })
        .click();

      await page
        .getByRole('button', { name: 'view' })
        .click();
      await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('user creator can delete a blog', async ({
      page,
    }) => {
      await page
        .getByRole('button', { name: 'view' })
        .click();

      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });

      await page
        .getByRole('button', { name: 'remove' })
        .click();

      await expect(page.locator('.blog-title')).toHaveCount(
        0
      );
    });

    test('doesnt show remove button for other bloggers', async ({
      page,
    }) => {
      await page
        .getByRole('button', { name: 'logout' })
        .click();

      await helper.loginWith(page, 'pepesand', 'pepe_2025');

      await page
        .getByRole('button', { name: 'view' })
        .click();
      await expect(
        page.getByRole('button', { name: 'remove' })
      ).toHaveCount(0);
    });

    test('show blogs in order of most likes', async ({
      page,
    }) => {
      await helper.createBlog(
        page,
        'blog 2',
        'unknown',
        'example.com'
      );
      await helper.createBlog(
        page,
        'blog 3',
        'unknown',
        'example.com'
      );
      await helper.createBlog(
        page,
        'blog 4',
        'unknown',
        'example.com'
      );

      const blog2 = await helper.getBlogElement(
        page,
        'blog 2'
      );
      const blog3 = await helper.getBlogElement(
        page,
        'blog 3'
      );
      const blog4 = await helper.getBlogElement(
        page,
        'blog 4'
      );

      await helper.likeBlog(blog2);
      await helper.likeBlog(blog2);
      await helper.likeBlog(blog2);

      await helper.likeBlog(blog3);
      await helper.likeBlog(blog3);

      await helper.likeBlog(blog4);

      const blogElements = await page
        .locator('.blog')
        .all();

      for (const blog of blogElements) {
        const viewButton = blog.getByRole('button', {
          name: 'view',
        });
        if (await viewButton.isVisible()) {
          await viewButton.click();
        }
      }

      const likeCounts = [];
      for (const blog of blogElements) {
        const textContent = await blog.textContent();
        const match = textContent?.match(/likes (\d+)/);
        likeCounts.push(Number(match?.[1] || 0));
      }

      const sorted = [...likeCounts].sort((a, b) => b - a);
      expect(likeCounts).toEqual(sorted);
    });
  });
});

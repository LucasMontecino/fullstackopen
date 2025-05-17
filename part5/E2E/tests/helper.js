const loginWith = async (page, username, password) => {
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await page
    .getByRole('button', {
      name: 'login',
    })
    .click();
};

const createBlog = async (page, title, author, url) => {
  await page
    .getByRole('button', { name: 'create new blog' })
    .click();

  await page.locator('#title').fill(title);
  await page.locator('#author').fill(author);
  await page.locator('#url').fill(url);
  await page
    .getByRole('button', { name: 'create' })
    .click();
};

const likeBlog = async (element) => {
  await element
    .getByRole('button', { name: 'view' })
    .click();
  await element
    .getByRole('button', { name: 'like' })
    .click();
};

const getBlogElement = async (page, title) => {
  const text = await page.getByText(title, { exact: true });
  return text.locator('..');
};

export { loginWith, createBlog, likeBlog, getBlogElement };

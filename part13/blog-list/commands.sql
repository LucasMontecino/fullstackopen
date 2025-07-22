CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES 
    ('JK Rowling', 'https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone', 'Harry Potter and the Philosophers Stone'),
    ('J.R.R. Tolkien', 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings', 'The Lord of the Rings');

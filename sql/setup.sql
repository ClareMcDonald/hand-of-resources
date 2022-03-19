-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS candies;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS games;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    published INT NOT NULL
);

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    released INT NOT NULL
);

CREATE TABLE candies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    ranking INT NOT NULL
);

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    released INT NOT NULL
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    publisher TEXT NOT NULL,
    platforms TEXT[] NOT NULL
)

-- INSERT INTO
--   books (title, author, published)
-- VALUES
--   ('An Absolutely Remarkable Thing', 'Hank Green', 2018);

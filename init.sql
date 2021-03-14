CREATE TABLE IF NOT EXISTS users (
    id   Int,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    imageUrl VARCHAR NOT NULL
);

INSERT INTO users (id, name, email, imageUrl) VALUES (
    1,'name11','name11@gmail.com','/some/url'
);
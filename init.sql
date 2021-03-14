CREATE TABLE IF NOT EXISTS users (
    id   Int PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    imageUrl VARCHAR NOT NULL
);

INSERT INTO users (id, name, email, imageUrl) VALUES (
    1,'name11','name11@gmail.com','/some/url'
);

INSERT INTO users (id, name, email, imageUrl) VALUES (
    2,'name12','name12@gmail.com','/some/url2'
);
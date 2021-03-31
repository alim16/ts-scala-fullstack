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

INSERT INTO users (id, name, email, imageUrl) VALUES (
    3,'name13','name13@gmail.com','/some/url3'
);

INSERT INTO users (id, name, email, imageUrl) VALUES (
    4,'name14','name14@gmail.com','/some/url4'
);
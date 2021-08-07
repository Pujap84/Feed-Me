CREATE DATABASE feed_me;
\c feed_me

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_digest TEXT
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    user_id INT,
    name TEXT,
    spoonacular_id INT,
    notes TEXT,
    rating INT,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

-- CREATE TABLE fridge_items(
--     id SERIAL PRIMARY KEY,
--     api_id INT,
--     count INT
-- )
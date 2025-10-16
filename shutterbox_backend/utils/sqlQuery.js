export const createUserTableQuery = `CREATE TABLE user_details(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);`;

export const createPostTableQuery = `CREATE TABLE post_info(
id SERIAL PRIMARY KEY,
userId INT REFERENCES user_details(id) ON DELETE CASCADE,
image BYTEA NOT NULL,
title VARCHAR(500) NOT NULL,
description VARCHAR(5000) NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);`;

export const allUserQuery = `SELECT * FROM user_details`;

export const getUserDetailsQuery = `SELECT * FROM user_details WHERE id=$1`;

export const updateUserDetailQuery = `UPDATE user_details SET name=$1, password=COALESCE($2, password) WHERE id=$3 RETURNING *`;

export const createPostCommentTableQuery = `CREATE TABLE post_comment_info();`;

export const createUserQuery = `INSERT INTO user_details (name, email, password) VALUES($1, $2, $3) RETURNING *`;

export const loginUserQuery = `SELECT * FROM user_details WHERE email = $1 AND password = $2;`;

export const allPostQuery = `SELECT * FROM post_info`;

export const createPostQuery = `INSERT INTO post_info (userId, image, title, description) VALUES($1, $2, $3, $4) RETURNING *`;
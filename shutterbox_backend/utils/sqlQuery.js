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
likes INT DEFAULT 0,
dislikes INT DEFAULT 0,
created_at TIMESTAMP DEFAULT NOW()
);`;

export const createPostReactionTableQuery = `CREATE TABLE IF NOT EXISTS post_reactions(
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES post_info(id) ON DELETE CASCADE,
    userId INT,
    reactionType VARCHAR(10),
    UNIQUE(postId, userId)
);`;

export const createPostCommentTableQuery = `CREATE TABLE post_comment_info();`;

export const allUserQuery = `SELECT * FROM user_details`;

export const getUserDetailsQuery = `SELECT * FROM user_details WHERE id=$1`;

export const updateUserDetailQuery = `UPDATE user_details SET name=$1, password=COALESCE($2, password) WHERE id=$3 RETURNING *`;

export const createUserQuery = `INSERT INTO user_details (name, email, password) VALUES($1, $2, $3) RETURNING *`;

export const loginUserQuery = `SELECT * FROM user_details WHERE email = $1`;

export const updatePasswordQuery = `UPDATE user_details SET password = $1, token = NULL, token_expiry = NULL WHERE token = $2 AND token_expiry > NOW() RETURNING *`;

export const updateTokenQuery = `UPDATE user_details SET token = $1, token_expiry = $2 WHERE email = $3`;

export const veryfyTokenQuery = `SELECT token_expiry FROM user_details WHERE token = $1`;

export const allPostQuery = `SELECT * FROM post_info`;

export const createPostQuery = `INSERT INTO post_info(userId, image, title, description) VALUES($1, $2, $3, $4) RETURNING * `;

export const allPostReactionQuery = `SELECT * FROM post_reactions WHERE postId=$1 AND userId=$2`;

export const getAllUserPostReactionQuery = `SELECT postId, reactionType FROM post_reactions WHERE userId=$1`;

export const updatePostInfoReactionQuery = `UPDATE post_info SET likes = $1, dislikes= $2 WHERE id = $3`;

export const updatePostReactionQuery = 'UPDATE post_reactions SET reactionType = $1 WHERE postId = $2 AND userId = $3';

export const addPostReactionQuery = `INSERT INTO post_reactions(reactionType, postId, userId) VALUES($1,$2,$3) RETURNING *`;

export const deletePostReactionQuery = `DELETE FROM post_reactions WHERE postId = $1 AND userId= $2`;

export const allLikePostReactionCountQuery = `SELECT COUNT(*) FROM post_reactions WHERE postId = $1 AND reactionType = 'like'`;

export const allDislikePostReactionCountQuery = `SELECT COUNT(*) FROM post_reactions WHERE postId = $1 AND reactionType = 'dislike'`;
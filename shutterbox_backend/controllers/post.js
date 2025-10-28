import { query } from "../db/db.js";
import { addPostReactionQuery, allDislikePostReactionCountQuery, allLikePostReactionCountQuery, allPostQuery, allPostReactionQuery, allPostReactionsByUserQuery, createPostQuery, createPostReactionTableQuery, createPostTableQuery, deletePostReactionQuery, updatePostInfoReactionQuery, updatePostReactionQuery } from "../utils/sqlQuery.js";

export async function getAllPost(req, res) {
    const { title } = req.query;

    try {
        const tableCheck = await query(`SELECT to_regclass('post_info')`);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createPostTableQuery);
        }
        let queryText = allPostQuery;
        const params = [];

        if (typeof title === "string" && title.trim() !== "") {
            queryText += ` WHERE title ILIKE $1`;
            params.push(`%${title.trim()}%`);
        }

        const allPost = await query(queryText, params);

        res.status(200).json({
            status: 200,
            message: "All Post Data",
            post: allPost.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

export async function addPost(req, res) {

    const { userId, title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    try {
        if (!image) return res.status(400).json({ message: "Image is required" });

        //const userId = req.body.userId; // or req.user.id if using JWT middleware
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const tableCheck = await query(`SELECT to_regclass('post_info')`);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createPostTableQuery);
        }

        const newPost = await query(createPostQuery, [userId, image, title, description]);

        res.status(200).json({
            status: 200,
            message: "Post Added succesfully",
            post: newPost.rows[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

export async function postReactions(req, res) {
    const { userId, reactionType } = req.body;
    const postId = req.params.id;

    try {
        const tableCheck = await query(`SELECT to_regclass('post_reactions')`);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createPostReactionTableQuery);
        }

        const allPostReactionData = await query(allPostReactionQuery, [postId, userId]);

        if (allPostReactionData?.rows?.length <= 0) {
            const AddPostReactionData = await query(addPostReactionQuery, [reactionType, postId, userId])
        }
        else {
            if (allPostReactionData?.rows[0]?.reactiontype === reactionType) {
                const deletePostReactionData = await query(deletePostReactionQuery, [postId, userId])
            }
            else {
                const UpdeatePostReactionData = await query(updatePostReactionQuery, [reactionType, postId, userId])
                // console.log("Update", UpdeatePostReactionData);
            }
        }
        // Count total likes & dislikes for this post
        const likeCount = await query(allLikePostReactionCountQuery, [postId]);
        const dislikeCount = await query(allDislikePostReactionCountQuery, [postId]);

        await query(updatePostInfoReactionQuery, [likeCount?.rows[0]?.count, dislikeCount?.rows[0]?.count, postId]);

        res.status(200).json({
            status: 200,
            message: "Post Reaction Updated Successfully!!!",
            likesCount: parseInt(likeCount?.rows[0]?.count),
            dislikeCount: parseInt(dislikeCount?.rows[0]?.count),
        })
    } catch (error) {
        console.log("Error", error);
        res.status(500).send("server error");
    }
}

export async function getUserPostReaction(req, res) {
    const userId = req.params.userId;

    try {
        const result = await query(allPostReactionsByUserQuery, [userId]);
        console.log("result", result);

        if (result.rows.length > 0) {
            res.status(200).json({
                data: result.rows
            });
        } else {
            res.status(200).json({
                data: null
            });
        }
    } catch (error) {
        console.error("Error fetching user reaction:", error);
        res.status(500).json({ message: "Server error" });
    }
}

import { query } from "../db/db.js";
import { allPostQuery, createPostQuery, createPostTableQuery } from "../utils/sqlQuery.js";

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


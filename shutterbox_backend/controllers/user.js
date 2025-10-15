import { query } from "../db/db.js";
import { createUserTableQuery, getUserDetailsQuery, updateUserDetailQuery } from "../utils/sqlQuery.js";

export async function getUserDetails(req, res) {

    const { id } = req.params;

    try {
        const tableCheck = await query(`SELECT to_regclass('user_details')`);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createUserTableQuery);
        }
        const getUserData = await query(getUserDetailsQuery, [id]);

        if (getUserData.rows.count === 0) {
            return res.status(404).json({ message: "User not found!!" })
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: getUserData.rows[0]
        })
    } catch (error) {
        console.log("Error fetching user details:", error);
        res.status(500).send("server error");
    }
}

export async function updateUserDetails(req, res) {
    const { id } = req.params;
    const { name, password } = req.body
    try {

        const tableCheck = await query(`SELECT to_regclass('user_details')`);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createUserTableQuery);
        }
        const updateUserData = await query(updateUserDetailQuery, [name, password || null, Number(id)]);

        if (updateUserData.rowCount === 0) {
            return res.status(404).json({ message: "User not found!!" })
        }

        res.status(200).json({
            message: "User details Updated successfully",
            user: updateUserData.rows[0]
        })

    } catch (error) {
        console.log("Error", error);
        res.status(500).send("server error");

    }

}
import React, { useState } from 'react';
import { arrayBufferToBase64 } from '../function/Function';

function Card({ postId, image, title, description, likeCount, dislikeCount, hasLiked }) {

    const [likes, setLikes] = useState(likeCount || 0);
    const [dislikes, setDislikes] = useState(dislikeCount || 0);
    const [userReaction, setUserReaction] = useState(hasLiked == true ? "like" : hasLiked == false ? "dislike" : null); // "like" | "dislike" | null

    const userId = sessionStorage.getItem("userId");
    const convertImage = arrayBufferToBase64(image.data);
    const imageSrc = `data:image/png;base64,${convertImage}`;

    console.log("hasLiked", hasLiked);


    const reactToPost = async (type) => {
        try {
            const response = await fetch(`http://localhost:5000/post/${postId}/reaction`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        postId,
                        userId,
                        reactionType: type,
                    }),
                }
            );
            const data = await response.json();
            setLikes(data.likesCount);
            setDislikes(data.dislikeCount);
            setUserReaction(prev => (prev === type ? null : type));
        } catch (err) {
            console.error("Reaction failed:", err);
        }
    };

    return (
        <div className="col mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                    src={imageSrc}
                    className="card-img-top mx-auto mt-3"
                    alt={title}
                    style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '10px'
                    }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{title}</h5>
                    <p className="card-text text-muted">{description}</p>
                    <div className="d-flex justify-content-around mt-3">
                        <div
                            className="d-flex align-items-center"
                            style={{ cursor: "pointer", color: userReaction === "like" ? "blue" : "gray" }}
                            onClick={() => reactToPost("like")}
                        >
                            {userReaction === "like" ? (
                                <i className="bi bi-hand-thumbs-up-fill me-1"></i>
                            ) : (
                                <i className="bi bi-hand-thumbs-up me-1"></i>
                            )}
                            <span>{likes}</span>
                        </div>
                        <div className="text-secondary" style={{ cursor: "pointer" }}>
                            <i className="bi bi-chat-right-text"></i>
                        </div>
                        <div className="text-success">
                            <i className="bi bi-share"></i>
                        </div>

                        <div
                            className="d-flex align-items-center"
                            style={{ cursor: "pointer", color: userReaction === "dislike" ? "red" : "gray" }}
                            onClick={() => reactToPost("dislike")}
                        >
                            {userReaction === "dislike" ? (
                                <i className="bi bi-hand-thumbs-down-fill me-1"></i>
                            ) : (
                                <i className="bi bi-hand-thumbs-down me-1"></i>
                            )}
                            <span>{dislikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

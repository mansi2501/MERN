import { useEffect, useState } from 'react';
import Card from '../card/Card';
import Filter from '../layout/Filter';
import Button from '../layout/Button';
// import ResetFilter from '../layout/ResetFilter';

function Post({ currentPage, itemsPerPage, setTotalPosts }) {
    const [postData, setPostData] = useState([]);
    const [filterURL, setFilterURL] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const urlToFetch = filterURL && filterURL.includes("?title=") ? filterURL : `http://localhost:5000/post/reaction/${userId}`;
                const response = await fetch(urlToFetch)
                const json = await response.json();
                setPostData(json.data || []);
                setTotalPosts(json.data.length || 0);
            }
            catch {
                console.error("Error fetching posts:", err);
            }
        }
        if (userId) fetchPosts();
    }, [filterURL, userId, currentPage])

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className="container mt-4">
                <div className="row align-items-center mb-4">
                    {/* === Left side: Search Box === */}
                    <div className="col-md-6 col-sm-12 mb-2 mb-md-0">
                        <div className="position-relative" style={{ maxWidth: "350px" }}>
                            <input
                                type="text"
                                placeholder="Search by title..."
                                className="form-control ps-5 rounded-pill shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i
                                className="bi bi-search position-absolute"
                                style={{
                                    left: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                }}
                            ></i>
                        </div>
                    </div>

                    {/* === Right side: Buttons === */}
                    <div className="col-md-6 col-sm-12 text-md-end text-center">
                        <div className="d-inline-flex gap-2">
                            <Button href={"/add-post"} />
                            <Filter setFilterURL={setFilterURL} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {currentPosts?.length > 0 ? (
                    currentPosts.map((post) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={post.id}>
                            <Card
                                postId={post.id}
                                image={post.image}
                                title={post.title}
                                description={post.description}
                                likeCount={post.likes}
                                dislikeCount={post.dislikes}
                                hasLiked={post.hasliked}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No posts available.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Post;

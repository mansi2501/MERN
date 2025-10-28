import { useEffect, useState } from 'react';
import Card from '../card/Card';
import Filter from '../layout/Filter';
import Button from '../layout/Button';
// import ResetFilter from '../layout/ResetFilter';

function Post({ currentPage, itemsPerPage, setTotalPosts }) {
    const [postData, setPostData] = useState([]);
    const [filterURL, setFilterURL] = useState("")

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
            <div className="container d-flex justify-content-end mt-4">
                <div className="text-end text-sm-center text-md-end mb-3">
                    <Button href={"/add-post"} />
                </div>
                <div className='text-end text-sm-center text-md-end mb-3'>
                    <Filter setFilterURL={setFilterURL} />
                </div>
                {/* <div className="text-end text-sm-center text-md-end mb-3"><ResetFilter /></div> */}
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

import { useEffect, useState } from 'react';
import Card from '../card/Card';
import Filter from '../layout/Filter';
import Button from '../layout/Button';
import ResetFilter from '../layout/ResetFilter';

function Post({ currentPage, itemsPerPage, setTotalPosts }) {
    const [postData, setPostData] = useState([]);
    const [filterURL, setFilterURL] = useState("")

    const apiURL = 'http://localhost:5000/post';

    useEffect(() => {
        const urlToFetch = filterURL && filterURL.includes("?title=") ? filterURL : apiURL;
        fetch(urlToFetch)
            .then(response => response.json())
            .then(json => {
                setPostData(json.post);
                setTotalPosts(json.post.length);
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, [filterURL])

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className="container d-flex justify-content-end mt-4">
                <div className="text-end text-sm-center text-md-end mb-3">
                    <Button href={"/"} />
                </div>
                <div className='text-end text-sm-center text-md-end mb-3'>
                    <Filter setFilterURL={setFilterURL} />
                </div>
                {/* <div className="text-end text-sm-center text-md-end mb-3"><ResetFilter /></div> */}
            </div>

            <div className="row">
                {currentPosts?.length > 0 ? (
                    currentPosts.map((post, index) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={index}>
                            <Card
                                image={post.image}
                                title={post.title}
                                description={post.description}
                                likeCount="0"
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

import { useEffect, useState } from 'react';
import Card from '../card/Card';

function Post() {

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/post')
            .then(response => response.json())
            .then(json => {
                setPostData(json.post);
            });
    }, []);

    return (
        <div>
            <div className="container mt-4">
                <div className="text-end text-sm-center text-md-end mb-3">
                    <a
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-rounded btn-sm"
                        href="/add-post"
                    >
                        Add Post
                    </a>
                </div>
            </div>
            <div className="row">
                {postData.map((post, index) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={index}>
                        <Card image={post.image} title={post.title} description={post.description} likeCount="0" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;
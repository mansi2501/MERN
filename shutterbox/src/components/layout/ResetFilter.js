import React from 'react';
import { useEffect } from 'react';

function ResetFilter() {

    const filterReset = () => {
        fetch('http://localhost:5000/post')
            .then(response => response.json())
            .then(json => {
                setPostData(json.post);
                setTotalPosts(json.post.length);
            });
    }
    useEffect(() => {
        filterReset();
    }, [])

    return (
        <>
            <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-rounded btn-sm"
                onClick={() => filterReset()}
            >
                Reset Filter
            </button>
        </>
    );
}

export default ResetFilter;
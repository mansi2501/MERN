import React from 'react';

function Button({ href }) {
    return (
        <>
            <a
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-rounded btn-sm"
                href={href}
            >
                Add Post
            </a>
        </>
    );
}

export default Button;
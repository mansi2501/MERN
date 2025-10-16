import React from 'react';
import { arrayBufferToBase64 } from '../function/Function';

function Card({ image, title, description, likeCount }) {
    const convertImage = arrayBufferToBase64(image.data);
    const imageSrc = `data:image/png;base64,${convertImage}`;

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
                        <div className="text-primary">
                            {likeCount} <i className="bi bi-hand-thumbs-up"></i>
                        </div>
                        <div className="text-secondary">
                            {likeCount} <i className="bi bi-chat-right-text"></i>
                        </div>
                        <div className="text-success">
                            <i className="bi bi-send"></i>
                        </div>
                        <div className="text-danger">
                            <i className="bi bi-hand-thumbs-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

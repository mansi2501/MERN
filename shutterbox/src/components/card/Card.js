import React from 'react';
import { arrayBufferToBase64 } from '../function/Function';

function Card({ image, title, description, likeCount }) {

    const convertImage = arrayBufferToBase64(image.data);
    const imageSrc = `data:image/png;base64,${convertImage}`

    return (
        <div className="card d-block mx-auto" style={{ width: '18rem' }}>
            <img src={imageSrc} className="card-img-top d-block mx-auto" alt="..." style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginTop: '20px'
            }} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className='d-flex justify-content-between'>
                    <div>
                        {likeCount} <i class="bi bi-hand-thumbs-up"></i>
                    </div>
                    <div>
                        {likeCount} <i class="bi bi-chat-right-text"></i>
                    </div>
                    <div>
                        <i class="bi bi-send"></i>
                    </div>
                    <div>
                        <i class="bi bi-hand-thumbs-down"></i>
                    </div>
                </div>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    );
}

export default Card;
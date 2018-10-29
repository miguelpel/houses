import React from 'react';

import './PostedBy.css';

const PostedBy = (props) => {
    //<a href="#top">Go to top</a>
    return(
        <div>
            <p>posted by <a
                href="#top"
                onClick={e => {
                    props.addFilter({
                        category: "username",
                        value: props.username
                    })
                    }}>
                        {props.username}
                    </a> 10 days ago</p>
        </div>
    )
}

export default PostedBy;
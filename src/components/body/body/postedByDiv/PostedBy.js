import React from 'react';

import './PostedBy.css';

const getTimeLapse = (publicationdate) => {
    let now = Date.now();
    let then = Date.parse(publicationdate)
    let elapsed = now - then;
    // 3.6e+6
    let differenceInMin = Math.round(elapsed / 60000)
    if(differenceInMin > 1440) {
        let differenceInDays = Math.round(differenceInMin/1440)
        return <span>{differenceInDays} {`day${differenceInDays > 1 ? 's': ''} ago`}</span>
    } else if(differenceInMin > 60){
        let differenceInHours = Math.round(differenceInMin/60)
        return <span>{differenceInHours} {`hour${differenceInHours > 1 ? 's': ''} ago`}</span>
    } else {
        return <span>{differenceInMin} {`minute${differenceInMin > 1 ? 's': ''} ago`}</span>
    }
    // let diff_hours = difference.getHours();
    // let diff_mins = difference.getMinutes();
    // return <span>{differenceInHours}</span>
}

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
                    </a> {getTimeLapse(props.publicationdate)}</p>
        </div>
    )
}

export default PostedBy;
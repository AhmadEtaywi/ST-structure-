import React, { useState, useEffect } from 'react';
import Header from "../../albums/components/Header/Header";
import { CommentService } from '../services/comment.service';

const CommentsPage = () => {
    const postId = new URLSearchParams(window.location.search).get("postId");
    console.log(postId);
    const [comments, setComments] = useState([]);
    console.log(comments);

    useEffect(() => {
        const fetchComments = async () => {
            const [commentsData] = await new Promise((resolve, reject) => {
                CommentService.list().then((data) => resolve([data]))
                    .catch((error) => reject(error))
            });
            const filteredComments = commentsData.filter(comment => comment.postId == postId);
            setComments(filteredComments);
                console.log();
        };
        fetchComments();
    }, [postId]);
    return (

        <div>
            <Header />
            <div>
                <h1>Comments for Post {postId}</h1>
                {comments
                    .map((comment, index) => (
                        <div key={index}>
                            <div className='comments-id'>
                                <img alt="" className='comments-img' />
                                <div className='comments-id-2'>

                                </div>
                            </div>
                            <h6 className="h6-comment">{comment.body}</h6>
                        </div>
                    ))}
            </div>
        </div>
    )
}


export default CommentsPage
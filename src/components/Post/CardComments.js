import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, dateParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({ post }) => {
    const[text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post.id, userData.id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""));
        }
    }


    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenter.id === userData.id ? 
                    "comment-container client" : "comment-container"} 
                    key={comment.id}>
                        <div className="left-part">
                            <img src={
                                !isEmpty(usersData[0]) && 
                                usersData.map((user) => {
                                    if (user.id === comment.commenter.id) return `${process.env.REACT_APP_API_URL}${user.picture}`
                                    else return null
                                }).join("")          
                            } 
                            alt="commenter-pic"
                        />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenter.pseudo}</h3>
                                    {comment.commenter.id !== userData.id && (
                                        <FollowHandler 
                                            idToFollow={comment.commenter.id} 
                                            type={'card'} 
                                        />
                                    )}
                                </div>
                                <span>{dateParser(comment.createdAt)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post.id} />
                        </div>
                    </div>    


                )
            })}
            {userData.id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input 
                        type="text" 
                        name="text" 
                        onChange={(e) => setText(e.target.value)} value={text} 
                        placeholder="Commenter"
                    />
                    <br/>
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    );
};
export default CardComments;
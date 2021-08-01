import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true); //loader
    const[isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return (
        <li className="card-container" key={postMessage.id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={
                            !isEmpty(usersData[0]) && 
                                usersData.map((user) => {
                                    if (user.id === post.posterId) return `${process.env.REACT_APP_API_URL}${user.picture}`
                                    else return null
                                }).join("")          
                        } alt="poster-pic"/>
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                {
                                    !isEmpty(usersData[0]) && 
                                        usersData.map((user) => {
                                            if (user.id === post.posterId) return user.pseudo
                                            else return null
                                            }).join("")          
                                }
                                </h3>
                                {post.posterId !== userData.id && (
                                    <FollowHandler idToFollow={post.posterId} type={"card"} />
                                )}                              
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p> {post.message} </p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
                        )}
                        {post.picture && <img src={`${process.env.REACT_APP_API_URL}${post.picture}`} alt="card-pic" className="card-pic"/>}
                        {post.video && 
                            (
                                <iframe //paramètres youtube
                                    width="500"
                                    height="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={post.id} //élément unique (sinon erreur)
                                ></iframe>
                            )
                        }
                        {userData.id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit"/>
                                </div>
                                <DeleteCard id={post.id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img 
                                    onClick={() => setShowComments(!showComments)} 
                                    src="./img/icons/message1.svg" 
                                    alt="comment" 
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post}/>
                            <img src="./img/icons/share.svg" alt="share" />

                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    )
}

export default Card;
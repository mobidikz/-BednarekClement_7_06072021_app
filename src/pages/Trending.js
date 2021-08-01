import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from '../components/Utils';
import Card from "../components/Post/Card";
import { getTrends } from '../actions/post.actions';
import Trends from '../components/Trends';



const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  
  useEffect(() => {
      if (!isEmpty(posts[0])) {
          const postsArr = Object.keys(posts).map((i) => posts[i]); // crééer un array avec comme base l'object
          let sortedArray = postsArr.sort((a, b) => {
              return b.likers.length - a.likers.length; // range dans l'ordre des plus liker au moins liker
          })
          sortedArray.length = 10;
          dispatch(getTrends(sortedArray))
      }

  }, [posts, dispatch])

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) && 
          trendList.map((post) => <Card post={post} key={post.id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
            {/* <Trends /> */}
        </div>

      </div>
    </div>
  );
};

export default Trending;
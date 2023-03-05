import React, { useState, useContext, useEffect } from 'react';
import { PostService } from './services';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router';
import Comments from './Comments';
import Ellipse from './images/Ellipse.png';
import TabBar from './images/Tab Bar.jpg';
import './index.css'
import AddPost from './components/AddPost';

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [displayCount, setDisplayCount] = useState(5);
  // const [newPost, setNewPost] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 5);
  };

  const handleKeyPress = (e, postId) => {
    if (e.key === "Enter") {
      const comment = {
        postId,
        text: e.target.value,
        username: currentUser.username,
        name: currentUser.name
      };
      setComments([...comments, comment]);
      e.target.value = "";

    }
  };

  const addNewPost = async (postText) => {
    const newPost1 = await PostService.create({ body: postText });
    setPosts([newPost1, ...posts]);
    setShowAddPost(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [postsData] = await Promise.all([
        PostService.list(),
      ]);

      const userPosts = postsData.filter(
        item => item.userId === currentUser?.id,
      );
      setPosts(
        userPosts
      )
    };
    fetchData();
  }, [currentUser?.id]);

  const showComments = (id) => {
    navigate(`/posts/comments?posts=${id}`)
  };
  const albumsPage = () => {
    navigate(`/albums`)
  }


  return (
    <div className="Discover-page">
      <div className="Discover">
        <p >Discover</p>
        <p>WHAT'S NEW TODAY</p>
      </div>

      <div className="test1">
        <p onClick={albumsPage}>Albums</p>

        <div className="search-container">
          <input className="search-bar" type="text" placeholder="Search Posts" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        {showAddPost && <AddPost addNewPost={addNewPost} setNewPost={setShowAddPost} />}

        {posts
          .filter(post => post.body.toLowerCase().includes(searchValue.toLowerCase()))
          .slice(0, displayCount)
          .map((post, index) => (

            <div key={Math.random()} className="inner-div">
              <div className="inner-div-2">
                <div className="post-id">
                  <img alt="" src={Ellipse} className="pro-img-class" />
                  <div className="post-id-2">
                    <h6 className="h6_name">{currentUser.name}</h6>
                    <h6 className="h6_username">@{currentUser.username}</h6>
                  </div>
                </div>
                <p className="js-body" id={post.id} onClick={() => showComments(post.id, post, post.body)}>
                  {post.body}
                </p>
              </div>
              <Comments
                comments={comments}
                postId={post.id}
                currentUser={currentUser}
                handleKeyPress={handleKeyPress} />
            </div>
          )
          )
        }
        <div>

          <button className="show-more" onClick={handleLoadMore}>Show More</button>
        </div>

        <img alt="" onClick={() => setShowAddPost(!showAddPost)}
          src={TabBar} className="tab-bar" />

      </div>

    </div>

  )

}

export default Posts
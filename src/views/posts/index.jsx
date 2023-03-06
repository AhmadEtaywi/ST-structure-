import React, { useState, useContext, useEffect } from 'react';
import { PostService } from './services';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router';
import Comments from './Comments';
import Ellipse from './images/Ellipse.png';
import TabBar from './images/Tab Bar.jpg';
import AddPost from './components/AddPost';
import styles from './index.module.css';
// import { Link } from 'react-router-dom';


const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [displayCount, setDisplayCount] = useState(5);
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

  const showComments = (postId) => {
    navigate(`/posts/comments?postId=${postId}`);
  };

  // const showComments = (postId) => {
  //   navigate(`/posts/comments/${postId}`);
  // };
  const albumsPage = () => {
    navigate(`/albums`)
  }
  return (
    <div className={styles.DiscoverPage}>
      <div className={styles.Discover}>
        <p >Discover</p>
        <p>WHAT'S NEW TODAY</p>
      </div>

      <div className={styles.albumsPage}>
        <p onClick={albumsPage}>Albums</p>

        <div className={styles.searchContainer}>
          <input className={styles.searchBar}
            type="text"
            placeholder="Search Posts"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        {showAddPost && <AddPost addNewPost={addNewPost} setNewPost={setShowAddPost} />}

        {posts
          .filter(post => post.body.toLowerCase().includes(searchValue.toLowerCase()))
          .slice(0, displayCount)
          .map((post, index) => (

            <div key={Math.random()} className={styles.innerDiv}>
              <div className={styles.inner_div_2}>
                <div className={styles.post_id}>
                  <img alt="" src={Ellipse} className={styles.pro_img_class} />
                  <div className={styles.post_id_2}>
                    <h6 className={styles.h6_name}>{currentUser.name}</h6>
                    <h6 className={styles.h6_username}>@{currentUser.username}</h6>
                  </div>
                </div>
                <p className={styles.js_body}
                  id={post.id}
                  onClick={() => showComments(post.id, post, post.body)}>
                  {post.body}
                  {/* <Link to={`/posts/comments/${post.id}`}>{post.body}</Link> */}

                  {/* above this code  */}
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
          <button className={styles.show_more} onClick={handleLoadMore}>Show More</button>
        </div>

        <img alt="" onClick={() => setShowAddPost(!showAddPost)}
          src={TabBar} className={styles.tab_bar} />
      </div>


    </div>

  )

}

export default Posts
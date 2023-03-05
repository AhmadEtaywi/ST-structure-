import React, { useState } from 'react';
// import './AddPost.css'
import styles from './AddPost.module.css';

// import '../index.css'
// import Header from '../albums/components/Header/Header';

const AddPost = ({ addNewPost, setNewPost }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewPost(postText);
      setPostText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.AddPost_box} onSubmit={handleSubmit}>
      <textarea
        rows="5"
        cols="33"
        type="textarea"
        placeholder="Enter new post"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <button type="submit">Add post</button>
      <button type="button" onClick={() => setNewPost(false)}>Cancel</button>
    </form>
  );
};
export default AddPost
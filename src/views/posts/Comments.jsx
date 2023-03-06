import Ellipse from './images/Ellipse.png';
import styles from './index.module.css';

const Comments = ({ comments, postId, currentUser, handleKeyPress }) => {
  return (
    <div>
      {comments
        .filter(comment => comment.postId === postId)
        .map(comment => (
          <div key={comment.text} className={styles.comment}>
            <div className={styles.comment_id_2}>
              <img alt="" className={styles.comment_img} src={Ellipse} />
              <div className={styles.comment_id}>
                <h6>{comment.name} </h6>
                <h6>@{comment.username}</h6>
              </div>
            </div>
            <p className={styles.posts_comment}>{comment.text}</p>
          </div>
        ))}
      <textarea
        className={styles.comment_textarea}
        placeholder="Add Comment"
        onKeyPress={(e) => handleKeyPress(e, postId)}
      />
    </div>
  );
};

export default Comments;

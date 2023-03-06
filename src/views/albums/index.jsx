import React, { useState, useContext, useEffect } from 'react';
import { AlbumService } from './services';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router';
import Header from './components/Header/Header';
import styles from './index.module.css';



const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const { currentUser } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      const [albumsData] = await Promise.all([
        AlbumService.list(),
      ]);

      const userAlbums = albumsData.filter(
        item => item.userId === currentUser?.id,
      );

      setAlbums(
        userAlbums
      )
    };
    fetchData();
  }, [currentUser?.id]);

  const showPhotos = (id) => {
    navigate(`/albums/photos?albums=${id}`)
  };
  return (
    <div className={styles.wrapper}>

      <Header title={<p>Albums</p>} />
      <div className={styles.main} >
        {albums.map((albums, index) => (
          <div key={index} className={styles.albums} >
            <div className={styles.albums_Container}>
              <p id={albums.id} onClick={() => showPhotos(albums.id)} >{albums.title} </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
export default Albums;

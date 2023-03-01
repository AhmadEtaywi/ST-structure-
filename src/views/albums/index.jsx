import React, { useState, useContext, useEffect, startTransition } from 'react';
import { AlbumService } from './services';
import { UserContext } from '../../context';
import { useNavigate } from 'react-router';
import './Index.css';
import Header from './components/Header/Header';



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
    // startTransition(() => {
    //   navigate(`/albums/photos?albums=${id}`);
    // });
    navigate(`/albums/photos?albums=${id}`)
  };
  return (
    <div>

      <Header title={<p>Albums</p>} />
      <div className="main" >
        {albums.map((albums, index) => (
          <div key={index} className="albums" >
            <div className="albums-Container">
              <p id={albums.id} onClick={() => showPhotos(albums.id)} >{albums.title} </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
export default Albums;

import React, { useState, useContext, useEffect, startTransition } from 'react';

import Gallery from './components/Gallery';
import { AlbumService, PhotoService } from './services';
import { UserContext } from '../../context';
import Test from './test';
import { useNavigate } from 'react-router';
import UserAlbumsContext from './context/index';


const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  // const [photos, setPhotos] = useState([]);
  const { currentUser } = useContext(UserContext);
  const userAlbums = albums.filter((item) => item.userId === currentUser?.id);

  // console.log(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      const [albumsData, photosData] = await Promise.all([
        AlbumService.list(),
        PhotoService.list(),
      ]);

      const userAlbums = albumsData.filter(
        item => item.userId === currentUser?.id,
      );
      const test=userAlbums;

      setAlbums(
        userAlbums
      )


      // setPhotos(
      //   photosData
      //     .filter(el => userAlbums.some(item => item.id === el.albumId))
      //     .map(item => ({ src: item.url, width: 600, height: 600 })),

      // );

    };
    fetchData();
  }, [currentUser?.id]);

  const showPhotos = (id) => {
    startTransition(() => {
      navigate(`/albums/photos?albums=${id}`);
    });
  };

  // console.log(albums);
  return (
    <div>
      <h1
        style={{
          color: 'blue',
        }}>
        Albums
      </h1>

      <div className="main" >
        {albums.map((albums, index) => (
          <div key={index} className="albums" >
            <div className="albums-Container">
            <p id={albums.id} onClick={() => showPhotos(albums.id)} >{albums.title} </p>
            </div>
          </div>
        ))}
      </div>

      <UserAlbumsContext.Provider value={userAlbums}>
        <Test />
      </UserAlbumsContext.Provider>
      {/* <Gallery photos={photos} /> */}
    </div>
  );
};

export default Albums;

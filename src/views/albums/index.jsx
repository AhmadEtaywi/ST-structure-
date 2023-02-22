import React, { useState, useContext, useEffect } from 'react';

import Gallery from './components/Gallery';
import { AlbumService, PhotoService } from './services';
import { UserContext } from '../../context';
import Test from './test';
const Albums = () => {
  /* my code  */
const [albums,setAlbums]=useState([]);
// console.log(albums);
  /* end of my code  */
  const [photos, setPhotos] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const [albumsData, photosData] = await Promise.all([
        AlbumService.list(),
        PhotoService.list(),
      ]);

      const userAlbums = albumsData.filter(
        item => item.userId === currentUser?.id,
        );

        // console.log(userAlbums[0].title);
/* my code  */
// console.log(albumsData);
setAlbums(
albumsData.map(item =>({asd:item.title})),
)
/* end of my code  */

  // console.log(userAlbums);

      setPhotos(
        photosData
          .filter(el => userAlbums.some(item => item.id === el.albumId))
          .map(item => ({ src: item.url, width: 600, height: 600 })),
          
      );
      // console.log(photos);
      // console.log(userAlbums);
    };
    fetchData();
  }, [currentUser?.id]);

  return (
    <div>
      <h1
        style={{
          color: 'blue',
        }}>
        Photos
      </h1>
      <Test albums={albums} />
      <Gallery photos={photos} />
    </div>
  );
};

export default Albums;

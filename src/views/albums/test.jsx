import { useContext, useState } from 'react';
import Gallery from './components/Gallery';
import { PhotoService } from './services';
import UserAlbumsContext from './context/index';

const Test = () => {
  const albumsId = new URLSearchParams(window.location.search).get('albums');
  const userAlbums = useContext(UserAlbumsContext); // consume the context
  const [photos, setPhotos] = useState([]);
  const photosData = PhotoService.list();
//   console.log(photosData);



  setPhotos(
    photosData
      .filter(el => userAlbums.some(item => item.id === el.albumId))
      .map(item => ({ src: item.url, width: 600, height: 600 })),

  );

  return (
    <div>
      {/* <p>{albumsId}</p> */}
      {/* use the userAlbums state */}
      {/* <Gallery
        photos={photos.filter((el) =>
          userAlbums.some((item) => item.id === el.albumId)
        )}
      /> */}
      <Gallery photos={photos} />
      </div>
  );
};

export default Test;

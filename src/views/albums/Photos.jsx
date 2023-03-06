import { useState, useEffect } from 'react';
import { PhotoService } from './services';
import styles from './Photos.module.css'
import Header from './components/Header/Header';

const Photos = () => {
  const albumsId = Number(new URLSearchParams(window.location.search).get('albums'));
  const [photos, setPhotos] = useState([]);
console.log(photos);
  useEffect(() => {
    const fetchData = async () => {
      const [photosData] = await new Promise((resolve, reject) => {
        PhotoService.list().then((data) => resolve([data]))
          .catch((error) => reject(error))
      });

      setPhotos(
        photosData
          .filter(
            (el) =>
              el.albumId === albumsId
          )
          .map((item) => ({
            title: item.title,
            id: item.id,
            src: item.url,
            width: 150,
            height: 150,
          }))
      );
    };

    fetchData();
  }, [albumsId]);
  return (

    <div className={styles.wrapper}>
      <Header title={<p>Photos</p>} />
      <div className={styles.photos_main}>
        {photos.map((photo, index) => (

          <div className={styles.container} key={index}>
            <p className={styles.photos_title}>{photo.title}</p>
            <img alt="" src={photos[index].src}
              width={photos[index].width}
              height={photos[index].height}  ></img>
          </div>
        ))}
      </div>
    </div>

  );
};
export default Photos;
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { fetchPhotos } from './services/api';
import GalleryList from './cmps/galllery-list';
import { ReactComponent as BigTrash } from './assets/icons/big-trash.svg'
import { AddPhoto } from './cmps/add-photo';

// Define a type for a photo
export type Photo = {
  url: string;
  title: string;
};

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [deletingPhotos, setDeletingPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [enlargedPhoto, setEnlargedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetchPhotos().then((response) => setPhotos(response.data.photos));
  }, []);


  useEffect(() => { console.log(photos) }, [photos])

  const handleSelect = (photo: Photo) => {
    setSelectedPhotos((prev) => {
      // Check if photo already exists in the deletingPhotos state
      const photoExists = prev.some(pic => pic.url === photo.url);

      if (photoExists) {
        // If it exists, filter it out
        return prev.filter((pre) => pre.url !== photo.url);
      } else {
        // If it doesn't exist, add it
        return [...prev, photo];
      }
    });
  }

  const handleDelete = (photo: Photo) => {
    setDeletingPhotos((prev) => [...prev, photo]);

    // Remove the photo after the animation duration (0.4s)
    setTimeout(() => {
      setDeletingPhotos((prev) => prev.filter((url) => url.url !== photo.url));
      setPhotos((prev) => prev.filter((p) => p.url !== photo.url));
    }, 400);
  };

  const handleDeleteMultiple = () => {
    setDeletingPhotos((prev) => [...prev, ...selectedPhotos]);

    setTimeout(() => {
      // Remove all selected photos from photos state
      setPhotos((prev) => prev.filter((p) => !selectedPhotos.includes(p)));
      setDeletingPhotos((prev) => [...prev, ...selectedPhotos]);
      setSelectedPhotos([]);  // Clear the selected photos
    }, 400);
  };

  const handleImageError = (failedPhotoUrl: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.url !== failedPhotoUrl));
  };

  const onAddPhoto = (photo: Photo) => {
    setPhotos(prevPhotos => [...prevPhotos, photo])
  }

  return (<>

    <button onClick={handleDeleteMultiple} className={`big-trash ${selectedPhotos.length > 0 ? 'open' : ''}`}>
      <BigTrash width='24px' />
    </button>


    {enlargedPhoto && (
      <div className={`enlarged-background ${enlargedPhoto ? 'active' : ''}`} onClick={() => setEnlargedPhoto(null)}>
        <img src={enlargedPhoto.url} alt={enlargedPhoto.title} className="enlarged-photo" />
      </div>
    )}

    <AddPhoto onAddPhoto={onAddPhoto}/>
    
    <GalleryList
      photos={photos}
      error={handleImageError}
      handleDelete={handleDelete}
      handleSelect={handleSelect}
      deletingPhotos={deletingPhotos}
      selectedPhotos={selectedPhotos}
      setEnlargedPhoto={setEnlargedPhoto} />
  </>
  )
};


export default Gallery;

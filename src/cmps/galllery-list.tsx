/* eslint-disable array-callback-return */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Photo } from '../Gallery'
import { ReactComponent as Trash } from '../assets/icons/trash.svg'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';

interface Props {
  photos: Photo[],
  deletingPhotos: Photo[],
  selectedPhotos: Photo[]
  error: (failedPhotoUrl: string) => void,
  handleDelete: (photo: Photo) => void,
  handleSelect: (photo: Photo) => void,
  setEnlargedPhoto: Dispatch<SetStateAction<Photo | null>>
}

function GalleryList({ photos, error, handleDelete, deletingPhotos, selectedPhotos, handleSelect, setEnlargedPhoto }: Props) {

  return (
    <div className='photos-container'>
      {photos.map((photo, index) => {
        if (photo) {
          return (
            <div
              key={photo.url}
              className={`photo-item ${deletingPhotos?.includes(photo) ? 'photo-item-delete' : ''}`}
              data-checked={selectedPhotos.includes(photo) ? 'true' : 'false'}>
              <div className='actions-container'>
                <button className='photo-item-button' onClick={() => handleDelete(photo)}>
                  <Trash />
                </button>
                <div className={`photo-item-checkbox ${selectedPhotos.includes(photo)} ? 'choose' : '' `}>
                  <input type='checkbox' id={index + ''} onChange={() => handleSelect(photo)}/>
                  <label htmlFor={index + ''}></label>
                </div>
              </div>
              <img 
              src={photo.url} 
              alt={photo.title}
              onError={() => error(photo.url)} 
              loading="lazy"
              onClick={() => setEnlargedPhoto(photo)} />
            </div>
          );
        }
      })}
    </div>
  )
}


export default GalleryList

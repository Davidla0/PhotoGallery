import React, { useState } from 'react';
import { ReactComponent as Plus } from '../assets/icons/plus.svg'
import { Photo } from '../Gallery';

interface Props{
    onAddPhoto: (photo: Photo) => void;
}
export const AddPhoto = ({onAddPhoto}:Props) => {

    const [photo, setPhoto] = useState<Photo>({
        url: '',
        title: ''
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = ({title, value}: { title: string, value: string }) => {
        setPhoto(prevPhoto => ({
            ...prevPhoto,
            [title]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (photo.url && photo.title) {
            onAddPhoto(photo)
            setPhoto({
                url: '',
                title: ''
            });  // reset the link
        }
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (

        <div className='add-photo'>
            <div onClick={toggleOpen} className={`plus-icon ${isOpen ? 'open' : ''}`}>
                <Plus />
            </div>
            <div className={`add-photo-form ${isOpen ? 'open' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        title='url'
                        placeholder="Paste your photo link here"
                        value={photo.url}
                        onChange={e => handleChange({ title: e.target.title, value: e.target.value })}
                    />
                    <input
                        type="text"
                        title='title'
                        placeholder="Write your photo title"
                        value={photo.title}
                        onChange={e => handleChange({ title: e.target.title, value: e.target.value })}
                    />
                    <button type="submit" onClick={toggleOpen}>Add Photo Link</button>
                </form>
            </div>
        </div>
    );
};


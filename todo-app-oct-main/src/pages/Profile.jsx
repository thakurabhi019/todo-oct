import React, { useState } from 'react';

function Profile(props) {
    const [image, setImage] = useState(null);
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleChange = async (e) => {
        let file = e.target.files[0];
        let baseImage = await convertBase64(file);
        setImage(baseImage);
    }
    return (
        <div>
            Profile
            <label htmlFor="upload">Upload</label>
            <input type="file" onChange={handleChange} />

            <img src={image} alt="" />
        </div>
    );
}

export default Profile;
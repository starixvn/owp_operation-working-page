import axios from 'axios';
import AccountIcon from 'mdi-react/AccountIcon';
import { useEffect, useRef, useState } from 'react';
import FileUploadIcon from '../../../../assets/svg-element/FileUploadIcon';
import { post } from '../../../Shared/Service/Service';
import { urlSaveProfileAvatar, urlUploadFile } from '../../const/const';

const ProfilePicture = () => {
  const [source, setSource] = useState<string | null>('Tickets/2006_image_2024-04-22_17-27-03.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    //var fileName = axios.get()
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.currentTarget.files && event.currentTarget.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const { data } = await axios.post(urlUploadFile, formData);
      const model = {
        url: urlSaveProfileAvatar,
        FileId: data
      };
      await post(model);

    }
  };

  return (
    <div className='profile'>
      <h4 className='title'>Profile Picture</h4>
      <div className='col'>
        <div className='img'>
          {source
            ? <img src={source} />
            : <AccountIcon size={80} className='default-img' />
          }
        </div>
        <div className='right'>
          <input type="file" accept="image/*" onChange={handleSubmit} hidden ref={fileInputRef} />
          <button className='button-submit' onClick={handleClick} >
            Upload image
            <FileUploadIcon />
          </button>
          <div>
            PNG, JPEG under 15MB
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
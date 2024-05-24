import axios from 'axios';
import AccountIcon from 'mdi-react/AccountIcon';
import { useEffect, useRef, useState } from 'react';
import FileUploadIcon from '../../../../assets/svg-element/FileUploadIcon';
import { get, post } from '../../../Shared/Service/Service';
import { urlGetProfileAvatar, urlSaveProfileAvatar, urlUploadFile } from '../../const/const';
import { getUrlTicketFile } from '../../../Shared/chatBoardNew/helper/chatBoardHelper';
import ToastrWrapper from '../../../components/ToastrWrapper';
import { isFileExceed5Mb } from '../../const/helper/helper';

const ProfilePicture = () => {
  const [source, setSource] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProfileAvatar = async () => {
    const { data } = await get({ url: urlGetProfileAvatar });
    if (data) {
      const imageUrl = getUrlTicketFile(data);
      setSource(imageUrl);
    }
  };

  useEffect(() => {
    fetchProfileAvatar();
  }, []);

  const handleClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    if (file) {
      if (!isFileExceed5Mb(file)) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        const { data } = await axios.post(urlUploadFile, formData);
        const model = {
          url: urlSaveProfileAvatar,
          FileId: data
        };
        await post(model);
        await fetchProfileAvatar();
      }
      else {
        ToastrWrapper.showError('The file size can not exceed 5 MB. Please try another one');
      }
    };
  };

  return (
    <div className='profile'>
      <h4 className='title'>Profile Picture</h4>
      <div className='col'>
        <div className='img'>
          {source
            ? <img src={source} alt='Avatar' />
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
            PNG, JPG under 5MB
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
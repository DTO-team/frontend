import { projectStorage } from '../config';

export const setStorage = () => {
  let error = null;
  let filePath = null;

  const uploadAvatar = async (userID: any, file: any) => {
    filePath = `users/${userID}/avatar/${file.name}`;
    const storageRef = projectStorage.ref(filePath);
    try {
      const res = await storageRef.put(file);
      let url = await res.ref.getDownloadURL();
      return url;
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    uploadAvatar
  };
};

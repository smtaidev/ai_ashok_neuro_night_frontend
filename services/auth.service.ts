import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return true;
  } else {
    return false;
  }
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getAccessToken = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return authToken;
  } else {
    return "";
  }
};

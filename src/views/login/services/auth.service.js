import axios from 'axios';

import { StorageService } from '../../../services';

export const AuthService = {
  login: async email => {
    const result = await axios.get('users');

    const verifiedUser = result.data.find(el => el.email === email);

    if (verifiedUser) {
      StorageService.setAuthKey(verifiedUser);
      return verifiedUser;
    }
    return false;
  },
};

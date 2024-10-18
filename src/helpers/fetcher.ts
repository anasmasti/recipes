import axios from 'axios';
import {setToken, logout} from '../core/store/authSlice';
import {store} from '../core/store/store';

export const fetcher = async (url: string) => {
  const state = store.getState();
  const token = state.auth.token;

  try {
    const response = await axios.get(url, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const refreshToken = state.auth.token;
      try {
        const refreshResponse = await axios.post(
          'https://dummyjson.com/auth/refresh',
          {
            refreshToken,
          },
        );
        const {token: newToken} = refreshResponse.data;

        store.dispatch(setToken(newToken));

        const retryResponse = await axios.get(url, {
          headers: {Authorization: `Bearer ${newToken}`},
        });
        return retryResponse.data;
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        store.dispatch(logout());
        throw new Error('Session expired. Please log in again.');
      }
    }

    throw error;
  }
};

export const BASE_URL = "https://medexam1.amaderthikana.com/api";
export const IMAGE_URL = "https://medexam1.amaderthikana.com/uploads/admin";

import axios from 'axios';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import { toast } from 'sonner';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  speed: 500,
  easing: 'ease',
  trickleSpeed: 200,
});

export const injectNProgressStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      #nprogress .bar {
        height: 4px !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://medexam1.amaderthikana.com/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'TOKEN_LOGIN';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Token expires in 7 days
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

// Request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    NProgress.start();
    window.dispatchEvent(new CustomEvent('api-loading-start'));
    const token = getToken();
    if (token) {
      config.headers.TOKEN_MEMBER = token;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    window.dispatchEvent(new CustomEvent('api-loading-end'));
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if(error.response.data.status === "duplicate_found"){
      return Promise.reject(error.response.data);
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Unauthorized', {
            description: 'You are not authorized to perform this action'
          }); 
          Object.keys(Cookies.get()).forEach(cookieName => {
            Cookies.remove(cookieName);
          });
          removeToken();
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access forbidden', {
            description: 'You do not have permission to perform this action'
          });
          break;
        case 404:
          toast.error('Resource not found', {
            description: 'The requested resource could not be found'
          });
          break;
        case 500:
          toast.error('Internal server error', {
            description: 'An unexpected error occurred on the server'
          });
          break;
        case 422:
          // Handle validation errors
          const validationErrors = error.response.data.errors;
          if (validationErrors) {
            // Get the first error message from each field
            const errorMessages = Object.entries(validationErrors)
              .map(([field, messages]) => `${field}: ${messages[0]}`)
              .join('\n');
            toast.error('Validation Error', {
              description: errorMessages.length > 150 ? errorMessages.substring(0, 150) + '...' : errorMessages
            });
          } else {
            const message = error.response.data.message || 'Please check your input';
            toast.error('Validation Error', {
              description: message.length > 150 ? message.substring(0, 150) + '...' : message
            });
          }
          break;
        default:
          const defaultMessage = error.response.data.message || 'An unexpected error occurred';
          toast.error('Error', {
            description: defaultMessage.length > 150 ? defaultMessage.substring(0, 150) + '...' : defaultMessage
          });
      }
    } else {
      toast.error('Network Error', {
        description: 'Please check your internet connection'
      });
    }
    return Promise.reject(error);
  }
);

const cleanQueryParams = (config) => {
  if (config?.params) {
    const cleanedParams = {};
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanedParams[key] = value;
      }
    });
    return { ...config, params: cleanedParams };
  }
  return config;
};

export const apiService = {
  // Auth methods
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    const { token } = response.data;
    setToken(token);
    return response.data;
  },

  silentLogin: async (token) => {
    setToken(token);
    return api.get('/user');
  },

  logout: () => {
    return api.post('/logout');
  },

  // Forgot password methods
  forgotPassword: async (email) => {
    const formData = new FormData();
    formData.append('email', email);
    return api.post('/forget-password', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  resetPassword: async (token, password, password_confirmation) => {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    return api.post(`/reset-password/${token}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Generic API methods
  get: (url, config = {}) => api.get(url, cleanQueryParams(config)),
  post: (url, data, config = {}) => api.post(url, data, cleanQueryParams(config)),
  put: (url, data, config = {}) => api.put(url, data, cleanQueryParams(config)),
  delete: (url, config = {}) => api.delete(url, cleanQueryParams(config)),
  patch: (url, data, config = {}) => api.patch(url, data, cleanQueryParams(config)),
  
  // PDF download method
  downloadPdf: async (url, filename) => {
    try {
      console.log("Url", url);
      const newWindow = window.open(url, '_blank');

      
      if (newWindow) {
        toast.success('Download started', {
          description: 'The PDF download should begin shortly. If prompted, please log in again.'
        });
      } else {
        toast.info('Popup blocked', {
          description: 'Please allow popups and try again, or copy the URL to download manually.'
        });
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Download failed', {
        description: 'Failed to download the PDF file. Please try again.'
      });
    }
  },
};

export default apiService; 
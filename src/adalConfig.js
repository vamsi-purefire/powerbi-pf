import { AuthenticationContext } from 'react-adal';
import { adalFetch } from 'react-adal';


export const adalConfig = {
  tenant: '5f3300dc-a00e-4cdd-9a2c-900d69deab53',
  clientId: '9c391866-80fd-410b-bcd4-64ab81deddfa',
  endpoints: {
    api: '9c391866-80fd-410b-bcd4-64ab81deddfa'
  },
  cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
adalFetch (authContext, adalConfig.endpoints.api, fetch, url, options);

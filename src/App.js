import logo from './logo.svg';
import './App.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useState, useEffect, ReactDOM } from 'react';
import Login from './Login';
import { runWithAdal } from 'react-adal';
import { authContext, adalApiFetch, adalConfig } from './adalConfig'; // Create this file in the n
import Appss from './AppHome';


const App = () => {
  const login = () => {
    authContext.login();
  };

  useEffect(() => {
    authContext.handleWindowCallback();
    authContext.acquireToken(adalConfig.endpoints.api, (error, token) => {
      if (error || !token) {
        console.error('Error acquiring token:', error);
      } else {
        console.log('Access token:', token);
        setAccessToken(token);
        setIsAuthenticated(true);
        // Use the token to authenticate and access Power BI embedded reports
        // Make API calls to Power BI with the token
      }
    });
  }, []);

  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(" ");
  };



  return (
    <div className="App">
     <button onClick={logout}>Logout</button> 
      {isAuthenticated ? (
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: '0b899235-c7d8-4d83-a9c1-f20c47d95c05',
            embedUrl: 'https://app.powerbi.com/reportEmbed',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzLyIsImlhdCI6MTY4OTgyOTQxMiwibmJmIjoxNjg5ODI5NDEyLCJleHAiOjE2ODk4MzM0ODgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFhMXYzTzBuUFpvM0U1MStxV1I3L0NWWnR0bExYN291M2FSSkc2NG4vcU51V0oyTlR2ZXdab0VuMDdvK1UrdldjYVBBS1EzT0Z0UlRZYUNVdEhSYTd3NFE2ZW8wZFprM1hKY3dyYnpsSktOWT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJTaGFybWEiLCJnaXZlbl9uYW1lIjoiUGl5dXNoIiwiaXBhZGRyIjoiMjQwMTo0OTAwOjFmMzI6OGZmZjo6Mjc2OjUzNWUiLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsIm9pZCI6ImZhOTI0YWNiLTBhMmEtNDE5NC05YmIzLTUyZmNhMDBhMzQ2NyIsInB1aWQiOiIxMDAzMjAwMjlGOTMxMEE1IiwicmgiOiIwLkFYRUEzQUF6WHc2ZzNVeWFMSkFOYWQ2clV3a0FBQUFBQUFBQXdBQUFBQUFBQUFDSEFDay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLTHlERklXNWVRVDl6VjBObHRiQjNOT2l2eVhIaUFDeFg0Q1FSSFpDZUhBIiwidGlkIjoiNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzIiwidW5pcXVlX25hbWUiOiJwaXl1c2hAcHVyZWZpcmV0ZWNoLmNvbSIsInVwbiI6InBpeXVzaEBwdXJlZmlyZXRlY2guY29tIiwidXRpIjoiODMzT0RlVGVORUtFRUN5R0VITkpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.gv4DDwFnJtny1vR6PCT25mzPuuKajcAj9EwqE0XjSkG1YvCC6pFjzqiAu6DohngiyxjoAS4TmO6s4f2OWvK6Md7LFl111mOfYjUsX3f-_a4AlqgRav7i5KUYOpE_y3OwxfJ2Fvkfqw7HKovfn6JxWT5ruq4-thRG5hNuvXhhmIIRPT_SiNznYZxY0LN1MJNymm0mW21atqfnDHlD84md7a1bolB-CbGvRGiLWKIGT3QAemmiXTsjhzhTQFU-fgb1BG_8kBhWwAeMNL9FDgU-8g7P9LEOST_K2ktyYjKLwrfDBFv6xMFPxrkyN10GHd44NwNRN6JGS2ZoPn4IaGM3Dg',
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              background: models.BackgroundType.Transparent
            }
          }}
          eventHandlers={
            new Map([
              ['loaded', function () {
                console.log('Report loaded');
              }],
              ['rendered', function () {
                console.log('Report rendered');
              }],
              ['error', function (event) {
                console.log(event.detail);
              }],
              ['visualClicked', () => console.log('visual clicked')],
              ['pageChanged', (event) => console.log(event)]
            ])
          }
          cssClassName={'Embed-container'}
          getEmbeddedComponent = { (embedObject) => {
            console.log(embedObject);
            
          }}

        />
      ) : (
        <Login />
      )}
    </div>
  );
};



export default App;
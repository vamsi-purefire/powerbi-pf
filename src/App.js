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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzLyIsImlhdCI6MTY4OTM5NTIwMCwibmJmIjoxNjg5Mzk1MjAwLCJleHAiOjE2ODkzOTk3NjAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUEwWU5qeVhSc2t6Tm5KYXBkYk5RUVNnSkk1cytMQmFZS3doY1ErWlR5VllybmNOdlNCTGpMTFNaZnoxdDdScEp6UFA1d2FOQUtWdjJsOG8zOEVOVFh0eDlraFJERnRiRVZ6K1I0ckZTVDFrYz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJTaGFybWEiLCJnaXZlbl9uYW1lIjoiUGl5dXNoIiwiaXBhZGRyIjoiMjQwMTo0OTAwOjFmMzI6OGZmZjo6MjcwOjdkZjAiLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsIm9pZCI6ImZhOTI0YWNiLTBhMmEtNDE5NC05YmIzLTUyZmNhMDBhMzQ2NyIsInB1aWQiOiIxMDAzMjAwMjlGOTMxMEE1IiwicmgiOiIwLkFYRUEzQUF6WHc2ZzNVeWFMSkFOYWQ2clV3a0FBQUFBQUFBQXdBQUFBQUFBQUFDSEFDay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLTHlERklXNWVRVDl6VjBObHRiQjNOT2l2eVhIaUFDeFg0Q1FSSFpDZUhBIiwidGlkIjoiNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzIiwidW5pcXVlX25hbWUiOiJwaXl1c2hAcHVyZWZpcmV0ZWNoLmNvbSIsInVwbiI6InBpeXVzaEBwdXJlZmlyZXRlY2guY29tIiwidXRpIjoid0dwYUtiZGFmMFdHb2d5eGRmOWpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.stiT8ln3QvRqOG4TbsQS-OiJRZFzU8v45Y-O3KFMOfUqbkAU_C9Ig3i3kUobGfv07WBNDIenv9TdgsoHz2JHWMIt4qKhHBG_o2geZxoUK5ZvGeBpM16-wwXqwWCarg1kjxCZbteZvMz7wzQ10mhel5EMDHbbg8GgzmalUoOQor5yjbJj_S7CcHO9TfkGYG_Z82PVGpyTtkeD6TBwrC1wbtzdoFaKGWV58ZARU80ZOfzQfD_2WuiWaLeEhdweT4_9E30yyEklEwK7hI88T2BSCxSKBYYEDZ2inXTSisQXtMzJpX9dZh40VS9hReSOd73eCJF0ogBan7BocIpIUZQLtA',
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
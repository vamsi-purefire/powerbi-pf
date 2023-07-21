import './App.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import { authContext, adalConfig } from './adalConfig'; // Create this file in the n


const App = () => {

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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzLyIsImlhdCI6MTY4OTk0MjAwNiwibmJmIjoxNjg5OTQyMDA2LCJleHAiOjE2ODk5NDcyMDEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF4aEJ4YkJkZ05tUnJGeUhhQmEvZUxpTHNuUlFKOG5CTGZhcGFOSEo0SW8xMHRkVEZkMHJhR2hjZllsanF1U0x3U1FUemR6YzhKcGtaSEJuUlNvR3B1L3MydXMzRCswaUNxdjVUVHV6dXhyRT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJTaGFybWEiLCJnaXZlbl9uYW1lIjoiUGl5dXNoIiwiaXBhZGRyIjoiMTEwLjIyNS4yMjcuMzMiLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsIm9pZCI6ImZhOTI0YWNiLTBhMmEtNDE5NC05YmIzLTUyZmNhMDBhMzQ2NyIsInB1aWQiOiIxMDAzMjAwMjlGOTMxMEE1IiwicmgiOiIwLkFYRUEzQUF6WHc2ZzNVeWFMSkFOYWQ2clV3a0FBQUFBQUFBQXdBQUFBQUFBQUFDSEFDay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJLTHlERklXNWVRVDl6VjBObHRiQjNOT2l2eVhIaUFDeFg0Q1FSSFpDZUhBIiwidGlkIjoiNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzIiwidW5pcXVlX25hbWUiOiJwaXl1c2hAcHVyZWZpcmV0ZWNoLmNvbSIsInVwbiI6InBpeXVzaEBwdXJlZmlyZXRlY2guY29tIiwidXRpIjoib3Nla1pSdUx6MEdCT0VtbnpNQmZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.g6_0VPAFhz5KOAXVtzLMzBYbEe96x8HRIjjV1OVgtjjei305DP1DN6DLHu6U78VIJ9KODYnFyCXXDw2cl85GgEWNhWodIR6aHoQtwWVcsM3Q9Md_HlL2xsiOiSK-P4jNRCe30YJRFyokPMSE_EZ3qWNHcVOPGLYH3usILm-cIJuRj-QJ4lD8LJKofFGRTWvmsspQGUjQVCDJkUasECy_FonOW96OmAQfzciPjQjqknHSx3LQiNE4RtEtUU5c4ZK7r-qpabmOn6XKgOGAg6oVPPPlY7zzoQKbpiSEdQswxLkjFWA4tBY75dhb9PNHtEOKongK1A6sjBtnQmW366HVQQ',
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

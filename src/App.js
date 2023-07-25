import logo from './logo.svg';
import './App.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useState, useEffect, ReactDOM } from 'react';
import Login from './Login';
import { runWithAdal } from 'react-adal';
import { authContext, adalApiFetch, adalConfig } from './adalConfig'; // Create this file in the n
import Appss from './AppHome';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

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
      {isAuthenticated ? (
        <>
        <button onClick={logout}>Logout</button> 
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: '0b899235-c7d8-4d83-a9c1-f20c47d95c05',
            embedUrl: 'https://app.powerbi.com/reportEmbed',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzLyIsImlhdCI6MTY5MDI3ODI3NCwibmJmIjoxNjkwMjc4Mjc0LCJleHAiOjE2OTAyODM1MjUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUE5VGd6TjRWM3Fjb0czMHRpdEQ5cEE1VmxzZmhPNmF5SzRBWDMrbFgzOFBXZnEyV3VzQTBpNHdFWGJKclMvT1hPY01OOVUvQjRsSldjdTAxSnpDL0MvUnJsRHYveldJbzJNdnAzek13ZGxVWT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJTaGFybWEiLCJnaXZlbl9uYW1lIjoiUGl5dXNoIiwiaXBhZGRyIjoiMTIyLjE3My4yOS4yMjciLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsIm9pZCI6ImZhOTI0YWNiLTBhMmEtNDE5NC05YmIzLTUyZmNhMDBhMzQ2NyIsInB1aWQiOiIxMDAzMjAwMjlGOTMxMEE1IiwicmgiOiIwLkFYRUEzQUF6WHc2ZzNVeWFMSkFOYWQ2clV3a0FBQUFBQUFBQXdBQUFBQUFBQUFDSEFDay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLTHlERklXNWVRVDl6VjBObHRiQjNOT2l2eVhIaUFDeFg0Q1FSSFpDZUhBIiwidGlkIjoiNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzIiwidW5pcXVlX25hbWUiOiJwaXl1c2hAcHVyZWZpcmV0ZWNoLmNvbSIsInVwbiI6InBpeXVzaEBwdXJlZmlyZXRlY2guY29tIiwidXRpIjoibzItcTNTbXp1MHExbkdOZDA0QXRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.AQZ_l95gjxKgqSlIYTxFAGmafXgEgp225fROP--xu-8hpehL1MJvdBRGJHceXi5LimbbLfQw-deVs_yppLKOd73tFmE74wzhnufdzsUjpQgJyj8r9mvJ8hZKOhGNLsJKDpjDWwgH_gXj0YaNckmAj-Fh4BpkxZFPQjCc7FuKpIwvDxYKMjO8UN-oUvfcHvYGrVU7fNN6eBUxveXOAMN-7GjWmPkzRtbFhq1EZ9m0q0sEdrpGwSRka3SogacFpwjNAhTGihFApzK3U8b-DnbcIBHW65iVEZliAkvq1x7m8ZunvNfP3848CTCoYJeRcbQ6roHZsCQGK8k3qCT4uk2g4g',
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
        </>
        
      ) : (
        <Login />
      )}
    </div>
  );
};



export default App;
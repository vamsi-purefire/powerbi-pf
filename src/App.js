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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzLyIsImlhdCI6MTY5MDI4NzMyOSwibmJmIjoxNjkwMjg3MzI5LCJleHAiOjE2OTAyOTE0ODcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF6T1MxZkJxblVKTXNmMkk1NUZQOFBFZnNFQXVrU3p2cmFES0MxOGErY1hUTkZ5T2pPR2IyOVg2S1IreWhhYTNPTHp3RlhtYnJKU2N0WmptWFlCcGlWa1RIVTlkVmM4RmwreTFnbGpuSlFHMD0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJTaGFybWEiLCJnaXZlbl9uYW1lIjoiUGl5dXNoIiwiaXBhZGRyIjoiMTIyLjE3My4yOS4yMjciLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsIm9pZCI6ImZhOTI0YWNiLTBhMmEtNDE5NC05YmIzLTUyZmNhMDBhMzQ2NyIsInB1aWQiOiIxMDAzMjAwMjlGOTMxMEE1IiwicmgiOiIwLkFYRUEzQUF6WHc2ZzNVeWFMSkFOYWQ2clV3a0FBQUFBQUFBQXdBQUFBQUFBQUFDSEFDay4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJLTHlERklXNWVRVDl6VjBObHRiQjNOT2l2eVhIaUFDeFg0Q1FSSFpDZUhBIiwidGlkIjoiNWYzMzAwZGMtYTAwZS00Y2RkLTlhMmMtOTAwZDY5ZGVhYjUzIiwidW5pcXVlX25hbWUiOiJwaXl1c2hAcHVyZWZpcmV0ZWNoLmNvbSIsInVwbiI6InBpeXVzaEBwdXJlZmlyZXRlY2guY29tIiwidXRpIjoiX2h6VnQ3aE80azZHMmNEc2NSbEtBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.MNhiYr61ETJ5uQfkh6XBTUkIEeAs2OvQlrhPfUSm0uYKIetnRaj6c7WiV-yU9MIeNwnKb5W5YZ05UZK7Q5mKYVol_o_6npY9rs4eDRhXkEb7QKvDeodeAOrQfVdm2nFnEqv4zHBilENX4dpON-tdtX3Uu-SrJKKOc6I_hQiwdEZCif_ym-3VLvzX7wd0XH4AbHcuGDxgY84SOkg8KRrB5JCqbwdx7PuDTjVc4IAMUYqBO_oItvcV27SfRZOyLmf3h7H4-qb4UeMuhoOUFEZEOfSV1Uh3W8ZAnU8RxtN3QWSSkg9_YbtFIFIMvDNliQEI1yf1gadqSnp0sz2_YCfYfQ',
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

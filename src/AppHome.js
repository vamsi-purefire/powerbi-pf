import logo from './logo.svg';
import './App.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig'; // Create this file in the n


const AppHome = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  return (
    <div className="App">
      {isAuthenticated ? (
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: 'ae93d49e-24a5-42cf-aca4-d84c55a0e109',
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ae93d49e-24a5-42cf-aca4-d84c55a0e109&groupId=89a9a2b9-e30f-42ca-beb4-f51709a3af4e&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
            accessToken: accessToken,
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
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      ) : (
        <Login />
      )}
    </div>
  );
};


export default AppHome;
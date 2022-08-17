import React from 'react';

import {BrowserRouter, Route, Link, HashRouter} from 'react-router-dom';

import Welcome from './Welcome';
import Secured from './Secured';
import SigningInPage  from "./SigningInPage";

import './App.css';


import { KeycloakContext } from './keycloak-service/KeycloakContext';
import {AccountServiceContext} from "./account-service/AccountClientContext";
import {AccountServiceClient} from "./account-service/account.service";
import {KeycloakClient, KeycloakService} from './keycloak-service/keycloak.service'

declare const keycloak: KeycloakClient;
export interface AppProps {keycloak: KeycloakClient};
export class App extends React.Component<AppProps> {
  static contextType = KeycloakContext;
  context: React.ContextType<typeof KeycloakContext>;

  public constructor(props: AppProps, context: React.ContextType<typeof KeycloakContext>) {
    super(props);
    this.context = context;
  }

  public render(): React.ReactNode {
  const keycloakService =  new KeycloakService(keycloak);


    return (
        <HashRouter>
          <KeycloakContext.Provider value={keycloakService}>
            <AccountServiceContext.Provider value={new AccountServiceClient(keycloakService)}>
              <BrowserRouter>
                <div className="container">
                  <ul>
                    <li><Link to="/">public component</Link></li>
                    <li><Link to="/secured">secured component</Link></li>
                    <li><Link to="/modifier">modifier</Link></li>
                  </ul>
                  <Route exact path="/" component={Welcome} />
                  <Route path="/secured" component={Secured} />
                  <Route path="/modifier" component={SigningInPage}/>
                </div>
              </BrowserRouter>
            </AccountServiceContext.Provider>
          </KeycloakContext.Provider>

        </HashRouter>



    );
  }
};


export default App;




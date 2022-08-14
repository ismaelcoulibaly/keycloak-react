import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import Welcome from './Welcome';
import Secured from './Secured';
import SigningInPage  from "./SigningInPage";

import './App.css';

import {KeycloakService} from './keycloak-service/keycloak.service';

// import {PageNav} from './PageNav';

import {makeRoutes} from './ContentPages';

import {
  Brand,
  Page,
  PageHeader,
  PageSidebar
} from '@patternfly/react-core';

import { KeycloakContext } from './keycloak-service/KeycloakContext';


declare const brandImg: string;
declare const brandUrl: string;

export interface AppProps {};
export class App extends React.Component<AppProps> {
  static contextType = KeycloakContext;
  context: React.ContextType<typeof KeycloakContext>;

  public constructor(props: AppProps, context: React.ContextType<typeof KeycloakContext>) {
    super(props);
    this.context = context;
  }

  public render(): React.ReactNode {


    // // check login
    // if (!this.context!.authenticated()) {
    //   this.context!.login();
    // }

    // const Header = (
    //     <PageHeader
    //         logo={<a id="brandLink" href={brandUrl}><Brand src={brandImg} alt="Logo" className="brand"/></a>}
    //         showNavToggle
    //     />
    // );

    // const Sidebar = <PageSidebar nav={<PageNav/>} />;

    return (
        // <Page header={Header} sidebar={Sidebar} isManagedSidebar>
        //   {makeRoutes()}
        // </Page>

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
    );
  }
};
// function App() {
//   return (
//     <BrowserRouter>
//       <div className="container">
//         <ul>
//           <li><Link to="/">public component</Link></li>
//           <li><Link to="/secured">secured component</Link></li>
//           <li><Link to="/modifier">modifier</Link></li>
//         </ul>
//         <Route exact path="/" component={Welcome} />
//         <Route path="/secured" component={Secured} />
//         <Route path="/modifier" component={SigningInPage}/>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;




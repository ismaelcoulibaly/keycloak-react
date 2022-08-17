/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import * as ReactDOM from 'react-dom';

import {HashRouter} from 'react-router-dom';

import App from './App';
import {ContentItem, ModulePageDef, flattenContent, initGroupAndItemIds, isExpansion, isModulePageDef} from './ContentPages';

import { KeycloakContext } from './keycloak-service/KeycloakContext';
import { AccountServiceClient } from './account-service/account.service';
import { AccountServiceContext } from './account-service/AccountClientContext';

import KeycloakClient from 'keycloak-js';
import keycloak from "./keycloak";
import { useKeycloak } from '@react-keycloak/web'
import SigningInPage from './SigningInPage';
import Keycloak from "keycloak-js";

export interface MainProps {keycloak: KeycloakClient, authenticated: boolean}


export default class Main extends React.Component<MainProps, any> {
    public constructor(props: MainProps) {
        super(props);
        this.state = {keycloak: null, authenticated: false};
    }

    componentDidMount() {
        const keycloak = new Keycloak('http://localhost:3000/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            console.log(authenticated);
            this.setState({keycloak: keycloak, authentißcated: authenticated})
        }).catch(() =>{
            alert('failed to initialize keycloak')
        });
    }


    render() {
        console.log(this.state)
        if(this.state){
            return  (<App keycloak ={ this.state.keycloak}/>);
        }else return (<div>unable to authenticate !</div>);

    }
};

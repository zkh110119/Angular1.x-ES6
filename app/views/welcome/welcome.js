import '@babel/polyfill';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import welcomeTemp from './welcome.html';

class Welcome {
    constructor() {
        this.welcome = angular.module('mainApp.welcome', [uiRouter, welcomeTemp]);
        this.config();
        this.controller();
    }

    config() {
        this.welcome.config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('welcome', {
                url: '/welcome',
                templateUrl: 'ui/welcome/welcome.html',
                controller: 'welcomeController',
                controllerAs: 'welcome'
            });
        }]);

        return this;
    }

    controller() {
        this.welcome.controller('welcomeController', [function () {
            this.name = '我是欢迎页面';
        }]);

        return this;
    }
}

new Welcome();

export default 'mainApp.welcome';

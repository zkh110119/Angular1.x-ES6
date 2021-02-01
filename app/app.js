import "@babel/polyfill";

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import './app.css';

import welcome from "./views/welcome/welcome";

class App {
    constructor() {
        this.app = angular.module('mainApp', [uiRouter, welcome]);
        this.config();
        this.controller();
    }

    config() {
        this.app.config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/welcome')
        }]);
    }

    controller() {
        this.app.controller('appController', ['$scope', function ($scope) {
            $scope.parent_name = `我是首页！`;
        }]);
    }
}

new App();

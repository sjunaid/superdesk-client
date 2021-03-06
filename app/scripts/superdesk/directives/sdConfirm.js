define(['angular'], function(angular) {
    'use strict';

    return angular.module('superdesk.confirm.directives', [])
        .directive('sdConfirm', ['$window', function($window) {
            return {
                scope: {
                    msg: '@sdConfirm',
                    action: '&ngClick'
                },
                link: function(scope, element, attrs) {
                    element.click(function(e) {
                        if ($window.confirm(scope.msg)) {
                            scope.action();
                        }
                    });
                }
            };
        }]);
});

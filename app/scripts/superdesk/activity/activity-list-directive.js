define([
    'lodash'
], function(_) {
    'use strict';

    return ['superdesk', 'activityService', 'workflowService', function(superdesk, activityService, workflowService) {
        return {
            scope: {
                item: '=',
                type: '@',
                action: '@',
                done: '&'
            },
            templateUrl: 'scripts/superdesk/activity/views/activity-list.html',
            link: function(scope, elem, attrs) {
                var intent = {
                    action: scope.action
                };

                if (scope.type) {
                    intent.type = scope.type;
                } else {
                    return;
                }

                scope.activities = _.filter(superdesk.findActivities(intent), function(activity) {
                    return workflowService.isActionAllowed(scope.item, activity.action);
                });

                scope.run = function runActivity(activity, e) {
                    e.stopPropagation();
                    activityService.start(activity, {data: {item: scope.item}})
                        .then(function() {
                            if (typeof scope.done === 'function') {
                                scope.done(scope.data);
                            }
                        });
                };
            }
        };
    }];
});

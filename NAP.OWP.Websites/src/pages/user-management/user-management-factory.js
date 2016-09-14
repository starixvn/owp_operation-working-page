/* global common */
/* exported userManagementFactory */
'use strict';

var userManagementFactory = (function ($) {
    var urls = {
        getUsers: "api/user-management/paging",
        updateUser: "state-api/simple-data/update",
        syncUser: "state-api/simple-data/update",
        getSyncUserSimpleDataApi: "state-api/simple-data/query"
    };

    return {
        getUsers: function (criteria) {
            return $.ajax({
                url: common.ResolveRootUrl(urls.getUsers),
                dataType: 'json',
                data: criteria,
                method: 'POST',
                error: common.HandleAjaxError
            });
        },
        updateUser: function (criteria) {
            criteria.apikey = 'update-user';
            return $.ajax({
                url: common.ResolveRootUrl(urls.updateUser),
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(criteria),
                method: 'POST',
                error: common.HandleAjaxError
            });
        },

        getSyncUserSimpleDataApi: function () {
            const criteria = {
                'apikey': 'get-user-change-from-admin-site'
            };
            return $.ajax({
                url: common.ResolveRootUrl(urls.getSyncUserSimpleDataApi),
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(criteria),
                method: 'POST',
                error: common.HandleAjaxError
            });
        },
        syncUser: function () {
            const criteria = {
                'apikey': 'sync-user-change-from-admin-site'
            };

            return $.ajax({
                url: common.ResolveRootUrl(urls.syncUser),
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(criteria),
                method: 'POST',
                error: common.HandleAjaxError
            });
        }
    };
})(jQuery);
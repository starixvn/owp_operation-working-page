/* global common */
/* exported eventPickingFactory */
'use strict';

var eventPickingFactory = (function ($) {
    var urls = {
        RenderEventPickingTable: 'TaskScheduling/EventPicking/EventPickingTable',
        ExportEventPickingExcel: 'TaskScheduling/EventPicking/EventPickingExcel',
        ValidateParamGetEventPicking: 'TaskScheduling/EventPicking/ValidateParamGetEventPicking',
        UrlOfSearchLeague: 'EventManagement/LeagueManagement/GetLeague?selectTop=50'
    };

    return {
        RenderEventPickingTable: function (model) {
            return $.ajax({
                url: common.ResolveRootUrl(urls.RenderEventPickingTable),
                dataType: 'json',
                data: model,
                method: 'POST',
                error: common.HandleAjaxError
            });
        },
        ExportEventPickingExcel: function (model, success) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                success();
            };
            xhr.open("POST", common.ResolveRootUrl(urls.ExportEventPickingExcel), true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var downloadUrl = window.URL.createObjectURL(xhr.response);
                    var disposition = xhr.getResponseHeader('Content-Disposition').replace(/"/g, '');
                    var fileName = disposition.split('filename=');
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = downloadUrl;
                    a.download = fileName[1];
                    a.click();
                    a.parentNode.removeChild(a);
                }
            };
            xhr.responseType = 'blob';
            xhr.send(model);
        },
        ValidateParamGetEventPicking: function (model) {
            return $.ajax({
                url: common.ResolveRootUrl(urls.ValidateParamGetEventPicking),
                dataType: 'json',
                data: model,
                error: common.HandleAjaxError
            });
        },
        
        GetUrlOfLeague: function () {
            return urls.UrlOfSearchLeague;
        }
    };
})(jQuery);
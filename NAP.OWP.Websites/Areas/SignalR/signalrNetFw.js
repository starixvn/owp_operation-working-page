
(function () {
    var netFwConnection = $.connection.notifyHub;
    let retry = 0;
    netFwConnection.client.notify = function (data) {
        toastr.options = {
            'newestOnTop': false,
            "closeButton": true,
            "timeOut": 0,
            "extendedTimeOut": 5000,
            "positionClass": "toast-bottom-right"
        };

        var messages = data.messages;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].IsImportant) {
                pushNotification(messages[i].MessageContent);
                var messageContent = messageBox.RenderAssigneeMessageContent(messages[i].MessageType, messages[i].MessageContent);
                switch (messages[i].MessageType) {
                    case 1:
                    case 8:
                        toastr.assigned(messageContent);
                        break;
                    case 2:
                    case 9:
                        toastr.removed(messageContent);
                        break;
                    case 6:
                    case 7:
                        toastr.cancelled(messageContent);
                        break;
                    default:
                        toastr.info(messageContent);
                        break;
                }
            }
        }
    };

    function start() {
        // Start the connection
        $.connection.hub.start({ transport: 'webSockets' })
            .done(function () {
                retry = 0;
                console.log('[NetFW] Now connected, connection ID=' + $.connection.hub.id);
            })
            .fail(function () {
                console.log('Could not Connect!');
            });
    }

    start();

    // Re-start connection after 5 seconds
    $.connection.hub.disconnected(function () {
        retry = retry+1;
        if (retry < 3) {
            setTimeout(function () {
                start();
            }, 5000);
        }
    });
})();

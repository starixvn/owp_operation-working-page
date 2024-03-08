function pushNotification(notificationContent) {
    if (!window.Notification || window.Notification.permission !== 'granted') {
        return;
    }
    console.log(notificationContent);

    var bodyContent = (notificationContent.messageContent.replaceAll('<b>', '')).replaceAll('</b>', '');

    var notification = new window.Notification('OWP Notification', {
        icon: '@Url.Content("~/favicon.ico")',
        body: bodyContent,
    });
    notification.onclick = function (event) {
        console.log(event);
        if (notificationContent.ticketId) {
            window.open('@Url.Content("~/?actorId="' + notificationContent.userId + '"&eventType="' + notificationContent.eventType + '"&ticketId="' + notificationContent.ticketId + '"")');
        }
        else {
            window.open('@Url.Content("~/MessageBoxManagement")');

        }
    };

};
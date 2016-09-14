function pushNotification(notificationContent) {
    if (!window.Notification || window.Notification.permission !== 'granted') {
        return;
    }

    var notification = new window.Notification('OWP Notification', {
        icon: '@Url.Content("~/favicon.ico")',
        body: notificationContent,
    });
    notification.onclick = function () {
        window.open('@Url.Content("~/MessageBoxManagement")');
    };

};
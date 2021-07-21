export var getWeekData = function (weekOffset) {
    var weekContents = [];
    for (var weekday = 0; weekday < 7; ++weekday) {
        var entryCount = (Math.random() * 10) | 0;
        var dayContents = [];
        for (var i = 0; i < entryCount; ++i) {
            dayContents.push({
                id: weekOffset + "-" + weekday + "-" + i,
                title: Math.random().toString(),
            });
        }
        weekContents.push(dayContents);
    }
    return weekContents;
};

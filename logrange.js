// todo dynamic base
// todo snappoints
// todo custom max
var logrange = new Object();

logrange.config = new Object();
logrange.config.snappoints = [];

logrange.range_modified = function (number,range) {
    number.value = Math.round(Math.pow(10,range.value));
    // todo snappoints
}

logrange.update_range = function (range,target) {
    while(target >= range.max*1 - 1) {
        range.min++;
        range.max++;
    }
    while(target <= range.min*1 + 1 && range.min > 0) {
        range.min--;
        range.max--;
    }
}

logrange.number_modified = function (number,range) {
    range_target = Math.log10(number.value*1);
    logrange.update_range(range,range_target);
    range.value = range_target;
}


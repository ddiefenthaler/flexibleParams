// todo snappoints
// todo custom min ?
// todo custom round ?
var logrange = new Object();

logrange.config = new Object();
logrange.config.base = 2;
// todo too global
logrange.config.snappoints = [];

logrange.log = function (x) {
    switch(logrange.config.base) {
        case 2:
            return Math.log2(x);
        case 10:
            return Math.log10(x);
        case Math.E:
            return Math.log(x);
        default:
            return Math.log(number.max*1)/Math.log(logrange.config.base);
    }
}

logrange.range_modified = function (number,range) {
    number.value = Math.round(Math.pow(logrange.config.base,range.value));
    // todo snappoints
}

logrange.update_range = function (number,range,target) {
    while(target >= range.max*1 - 1 && ((isNaN(number.max) || number.max == "") ||
                                        range.max < logrange.log(number.max*1)
                                       )
         ) {
        range.min++;
        range.max++;
        if((!isNaN(number.max) && number.max != "") &&
           range.max > logrange.log(number.max*1)
          ) {
            range.max = logrange.log(number.max*1);
        }
    }
    while(target <= range.min*1 + 1 && range.min > 0) {
        range.max = Math.ceil(range.max);
        
        range.min--;
        range.max--;
    }
}

logrange.number_modified = function (number,range) {
    var range_target = logrange.log(number.value*1);
    logrange.update_range(number,range,range_target);
    range.value = range_target;
}


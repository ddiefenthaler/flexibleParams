// todo logrange javascript
// todo quantity javascript maxQuantity
// todo store form + information in history (except passwords)
// todo concept graphics

var flexibleParams = new Object();
flexibleParams.linebreak = false;

flexibleParams.config = new Object();

/**
 * functions that allow to configure the numbering of labels
 * todo will not work like this
 */
flexibleParams.config.getIdSuffix = function (quantityPosition) {
    var quantityIdSuffix = "";
    for(var i=0; i < quantityPosition.length; i++) {
        quantityIdSuffix += "_"+quantityPosition[i];
    }
    return quantityIdSuffix;
}
flexibleParams.config.getLabelSuffix = function (quantityPosition) {
    var quantityLabelSuffix = "";
    for(var i=0; i < quantityPosition.length; i++) {
        if(i == 0) {
            quantityLabelSuffix += " "+quantityPosition[i];
        } else {
            quantityLabelSuffix += "."+quantityPosition[i];
        }
    }
    return quantityLabelSuffix;
}

/**
 * creates a group (fieldset) with the specified contents and quantity
 * supported content parameter types are:
 *  group
 *  text
 *  password
 *  number
 *  range
 *  todo logrange
 *  selection
 *  todo selection multiple
 *  br - meta
 */
flexibleParams.createGroup = function (name,params,quantity = 1,quantityPosition = []) {
    var quantityIdSuffix = flexibleParams.config.getIdSuffix(quantityPosition);
    
    var group = document.createElement("fieldset");
    group.setAttribute("id",name+quantityIdSuffix);
    group.setAttribute("class","flexibleParams_container");
    if(flexibleParams.linebreak) {
        group.setAttribute("class","flexibleParams_container"+" flexibleParams_linebreak");
        flexibleParams.linebreak = false;
    }
    
    var quantityCount;
    var quantityDynamic = false;
    if(quantity == undefined || (isNaN(quantity) && document.getElementById(quantity) == null)) {
        quantityCount = 1;
    } else if(!isNaN(quantity)) {
        quantityCount = quantity;
    } else {
        quantityDynamic = true;
        // todo javascript event
        // todo maxQuantity
    }
    
    for(var k = 0; k < quantityCount; k++) {
        if(k != 0) {
            flexibleParams.linebreak = true;
        }
        var subgroupQuantityPosition = quantityPosition;
        if(quantityCount > 1) {
            subgroupQuantityPosition = subgroupQuantityPosition.concat(k);
        }
        
        for(var i = 0; i < params.length; i++) {
            switch(params[i].type) {
                case "group":       // fieldset
                    group.appendChild(flexibleParams.createGroup(params[i].name,params[i].content,params[i].quantity,subgroupQuantityPosition));
                    break;
                case "text":
                case "password":
                case "number":
                case "range":
                case "logrange":    // combined number + range
                    var subQuantityCount;
                    var subQuantityDynamic = false;
                    if(params[i].quantity == undefined || (isNaN(params[i].quantity) && document.getElementById(params[i].quantity) == null)) {
                        subQuantityCount = 1;
                    } else if(!isNaN(params[i].quantity)) {
                        subQuantityCount = params[i].quantity;
                    } else {
                        subQuantityDynamic = true;
                        // todo javascript event
                        // todo maxQuantity
                    }
                    
                    for(var j=0; j < subQuantityCount; j++) {
                        var subQuantityPosition = subgroupQuantityPosition;
                        if(subQuantityCount > 1) {
                            subQuantityPosition = subQuantityPosition.concat(k);
                        }
                        group.appendChild(flexibleParams.createParam(params[i].name,params[i].type,params[i].label,params[i].value,params[i].min,params[i].max,subQuantityPosition));
                    }
                    break;
                case "selection":   // implicit group for additional parameters
                case "selection-multiple":
                    var subQuantityCount;
                    var subQuantityDynamic = false;
                    if(params[i].quantity == undefined || (isNaN(params[i].quantity) && document.getElementById(params[i].quantity) == null)) {
                        subQuantityCount = 1;
                    } else if(!isNaN(params[i].quantity)) {
                        subQuantityCount = params[i].quantity;
                    } else {
                        subQuantityDynamic = true;
                        // todo javascript event
                        // todo maxQuantity
                    }
                    
                    for(var j=0; j < subQuantityCount; j++) {
                        var subQuantityPosition = subgroupQuantityPosition;
                        if(subQuantityCount > 1) {
                            subQuantityPosition = subQuantityPosition.concat(k);
                        }
                        group.appendChild(flexibleParams.createSelection(params[i].name,params[i].type,params[i].values,params[i].size,params[i].label,params[i].value,subQuantityPosition));
                    }
                    break;
                case "br":    // css only linebreak
                    flexibleParams.linebreak = true;
                    break;
                default:
                    console.warn("unknown parameter type: "+params[i].type);
                    break;
            }
        }
    }
    
    return group;
}

/**
 * creates a input field with specified type and values
 */
flexibleParams.createParam = function (name,type,labelStr,value,min,max, quantityPosition = []) {
    var quantityIdSuffix = flexibleParams.config.getIdSuffix(quantityPosition);
    
    for(var i=0; i < quantityPosition.length; i++) {
        if(Array.isArray(value) && quantityPosition[i] < value.length) {
            value = value[quantityPosition[i]];
        } else {
            break;
        }
    }
    
    var cont = document.createElement("div");
    var input;
    var input_range;
    
    cont.setAttribute("class","flexibleParams_container");
    if(flexibleParams.linebreak) {
        cont.setAttribute("class","flexibleParams_container"+" flexibleParams_linebreak");
        flexibleParams.linebreak = false;
    }
    
    if(type == "logrange") {
        input = flexibleParams.createInput(name+quantityIdSuffix,"number",value,min,max);
        input_range = flexibleParams.createInput(name+"_range"+quantityIdSuffix,"range",undefined,min,max);
        // todo event handlers
    } else {
        input = flexibleParams.createInput(name+quantityIdSuffix,type,value,min,max);
    }
    if(labelStr) {
        var label = document.createElement("label");
        var quantityLabelSuffix = flexibleParams.config.getLabelSuffix(quantityPosition);
        label.appendChild(document.createTextNode(labelStr+quantityLabelSuffix));
        label.setAttribute("for",name+quantityIdSuffix);
        label.setAttribute("class","flexibleParams_label");
        
        cont.appendChild(label);
    }
    cont.appendChild(input);
    if(type == "logrange") {
        cont.appendChild(input_range);
    }
    
    return cont;
}

flexibleParams.createInput = function (name,type,value,min,max) {
    
    var input = document.createElement("input");
    input.setAttribute("name",name);
    input.setAttribute("id",name);
    input.setAttribute("class","flexibleParams_input");
    input.setAttribute("type",type);
    if(value) {
        input.setAttribute("value",value);
    }
    if(min != undefined) {
        input.setAttribute("min",min);
    }
    if(max != undefined) {
        input.setAttribute("max",max);
    }
    
    return input;
}

/**
 * creates a selection field with specified values
 */
flexibleParams.createSelection = function (name,type,values,size,labelStr,value, quantityPosition = []) {
    var quantityIdSuffix = flexibleParams.config.getIdSuffix(quantityPosition);
    
    for(var i=0; i < quantityPosition.length; i++) {
        if(Array.isArray(value) && quantityPosition[i] < value.length &&
           (type != "selection-multiple" ||
           (type == "selection-multiple" && Array.isArray(value[i])))
          ) {
            value = value[quantityPosition[i]];
        } else {
            break;
        }
    }
    
    var set = document.createElement("fieldset");
    var cont = document.createElement("div");
    var sel = document.createElement("select");
    
    set.setAttribute("class","flexibleParams_container");
    if(flexibleParams.linebreak) {
        set.setAttribute("class","flexibleParams_container"+" flexibleParams_linebreak");
        flexibleParams.linebreak = false;
    }
    cont.setAttribute("class","flexibleParams_container");
    sel.setAttribute("name",name+quantityIdSuffix);
    sel.setAttribute("id",name+quantityIdSuffix);
    sel.setAttribute("class","flexibleParams_input");
    if(type == "selection-multiple") {
        sel.multiple = true;
    }
    if(size != undefined) {
        sel.setAttribute("size",size);
    }
    
    if(labelStr) {
        var label = document.createElement("label");
        var quantityLabelSuffix = flexibleParams.config.getLabelSuffix(quantityPosition);
        label.appendChild(document.createTextNode(labelStr+quantityLabelSuffix));
        label.setAttribute("for",name+quantityIdSuffix);
        label.setAttribute("class","flexibleParams_label");
        
        cont.appendChild(label);
    }
    cont.appendChild(sel);
    set.appendChild(cont);
    
    for(var i=0; i < values.length; i++) {
        var opt = document.createElement("option");
        opt.setAttribute("value",values[i].name);
        if(values[i].label) {
            opt.appendChild(document.createTextNode(values[i].label));
        } else {
            opt.appendChild(document.createTextNode(values[i].name));
        }
        sel.appendChild(opt);
        
        if(values[i].params != undefined) {
            var opt_radio = document.createElement("input");
            if(type != "selection-multiple") {
                opt_radio.setAttribute("type","radio");
            } else {
                opt_radio.setAttribute("type","checkbox");
            }
            opt_radio.setAttribute("name",name+quantityIdSuffix+"_radio");
            opt_radio.setAttribute("id",name+quantityIdSuffix+values[i].name+"_radio");
            opt_radio.setAttribute("class","flexibleParams_selectionHelper");
            if(i == 0) {
                opt_radio.checked = true;
            }
            
            set.appendChild(opt_radio);
            set.appendChild(flexibleParams.createGroup(name+"_group_"+i,values[i].params));
        }
        
        if(value != undefined &&
           ((typeof value == "string" && value == values[i].name) ||
            (typeof value == "number" && value == i) ||
            (type == "selection-multiple" && (value.includes(i) || value.includes(values[i].name)))
           )
          ) {
            opt.selected = true;
            if(values[i].params != undefined) {
                opt_radio.checked = true;
            }
        }
    }
    
    sel.addEventListener("change",function(e) {
        for(var i = 0; i < e.target.options.length; i++) {
            if(document.getElementById(e.target.id+e.target.options[i].value+"_radio") != null) {
                document.getElementById(e.target.id+e.target.options[i].value+"_radio").checked = e.target.options[i].selected;
            }
        }
    });
    
    return set;
}

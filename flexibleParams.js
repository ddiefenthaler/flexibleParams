// todo logrange javascript
// todo selection-multiple
// todo quantity value s
// todo quantity javascript maxQuantity
// todo store form + information in history (except passwords)

var flexibleParams = new Object();
flexibleParams.linebreak = false;

flexibleParams.config = new Object();

/**
 * functions that allow to configure the numbering of labels
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
    if(quantity == undefined || (isNaN(quantity) && document.getElementById(quantity) == null)) {
        quantityCount = 1;
    } else if(!isNaN(quantity)) {
        quantityCount = quantity;
    } else {
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
                    if(params[i].quantity == undefined || (isNaN(params[i].quantity) && document.getElementById(params[i].quantity) == null) || params[i].quantity <= 1) {
                        group.appendChild(flexibleParams.createParam(params[i].name,params[i].type,params[i].label,params[i].value,params[i].min,params[i].max,subgroupQuantityPosition));
                    } else if(!isNaN(params[i].quantity)) {
                        for(var j=0; j < params[i].quantity; j++) {
                            group.appendChild(flexibleParams.createParam(params[i].name,params[i].type,params[i].label,params[i].value,params[i].min,params[i].max,subgroupQuantityPosition.concat(j)));
                        }
                    } else {
                        // todo javascript event
                        // todo maxQuantity
                    }
                    break;
                case "selection":   // implicit group for additional parameters
                    if(params[i].quantity == undefined || (isNaN(params[i].quantity) && document.getElementById(params[i].quantity) == null) || params[i].quantity <= 1) {
                        group.appendChild(flexibleParams.createSelection(params[i].name,params[i].values,params[i].label,params[i].value,subgroupQuantityPosition));
                    } else if(!isNaN(params[i].quantity)) {
                        for(var j=0; j < params[i].quantity; j++) {
                            group.appendChild(flexibleParams.createSelection(params[i].name,params[i].values,params[i].label,params[i].value,subgroupQuantityPosition.concat(j)));
                        }
                    } else {
                        // todo javascript event
                        // todo maxQuantity
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
flexibleParams.createSelection = function (name,values,labelStr,value, quantityPosition = []) {
    var quantityIdSuffix = flexibleParams.config.getIdSuffix(quantityPosition);
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
            opt_radio.setAttribute("type","radio");
            opt_radio.setAttribute("name",name+quantityIdSuffix+"_radio");
            opt_radio.setAttribute("id",name+quantityIdSuffix+values[i].name+"_radio");
            opt_radio.setAttribute("class","flexibleParams_helper");
            if(i == 0) {
                opt_radio.checked = true;
            }
            
            set.appendChild(opt_radio);
            set.appendChild(flexibleParams.createGroup(name+"_group_"+i,values[i].params));
        }
        
        if((typeof value == "string" && value == values[i].name) || (typeof value == "number" && value == i)) {
            opt.selected = true;
            if(values[i].params != undefined) {
                opt_radio.checked = true;
            }
        }
    }
    
    sel.onchange = function(e) {
        for(var i = 0; i < e.target.options.length; i++) {
            if(document.getElementById(e.target.id+e.target.options[i].value+"_radio") != null) {
                document.getElementById(e.target.id+e.target.options[i].value+"_radio").checked = e.target.options[i].selected;
            }
        }
    }
    
    return set;
}
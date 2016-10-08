// todo logrange javascript
// todo selection-multiple
// todo quantity
// todo quantity javascript maxQuantity
// todo css line break
// todo store form + information in history (except passwords)

var flexibleParams = new Object();

flexibleParams.createGroup = function (name,params) {
    var group = document.createElement("fieldset");
    group.setAttribute("id",name);
    group.setAttribute("class","flexibleParams_container");
    for(var i = 0; i < params.length; i++) {
        switch(params[i].type) {
            case "group":       // fieldset
                group.appendChild(flexibleParams.createGroup(params[i].name,params[i].content));
                break;
            case "text":
            case "number":
            case "range":
            case "logrange":    // combined number + range
                group.appendChild(flexibleParams.createParam(params[i].name,params[i].type,params[i].label,params[i].value,params[i].min,params[i].max));
                break;
            case "selection":   // implicit group for additional parameters
                group.appendChild(flexibleParams.createSelection(params[i].name,params[i].values,params[i].label,params[i].value));
                break;
            default:
                console.warn("unknown type: "+params[i].type);
                break;
        }
    }
    
    return group;
}

flexibleParams.createParam = function (name,type,labelStr,value,min,max) {
    var cont = document.createElement("div");
    var input;
    var input_range;
    
    cont.setAttribute("class","flexibleParams_container");
    
    if(type == "logrange") {
        input = flexibleParams.createInput(name,"number",value,min,max);
        input_range = flexibleParams.createInput(name+"_range","range",undefined,min,max);
        // todo event handlers
    } else {
        input = flexibleParams.createInput(name,type,value,min,max);
    }
    if(labelStr) {
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(labelStr));
        label.setAttribute("for",name);
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

flexibleParams.createSelection = function (name,values,labelStr,value) {
    var set = document.createElement("fieldset");
    var cont = document.createElement("div");
    var sel = document.createElement("select");
    
    set.setAttribute("class","flexibleParams_container");
    cont.setAttribute("class","flexibleParams_container");
    sel.setAttribute("name",name);
    sel.setAttribute("id",name);
    sel.setAttribute("class","flexibleParams_input");
    
    if(labelStr) {
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(labelStr));
        label.setAttribute("for",name);
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
            opt_radio.setAttribute("name",name+"_radio");
            opt_radio.setAttribute("id",values[i].name+"_radio");
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
            if(document.getElementById(e.target.options[i].value+"_radio") != null) {
                document.getElementById(e.target.options[i].value+"_radio").checked = e.target.options[i].selected;
            }
        }
    }
    
    return set;
}
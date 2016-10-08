var ex01 = // todo complete
[
{"name":"numUnits","label":"Number of Units","desc":"","type":"number"},
{"name":"pattern","label":"Pattern","desc":"","type":"selection","values":[]},
{"name":"numDim","label":"Number of Dimensions","desc":"","type":"range","min":1,"max":5},
{"name":"memArrangement","label":"Memory Arrangement","desc":"","type":"selection","values":[]},
{"name":"dim","label":"Dimenson","desc":"","type":"logrange"}
];

var ex02 = // how to not do it
[
{"name":"numUnits","label":"Number of Units","type":"number",}, // Contained in Teamspec?
{"name":"pattern","label":"Pattern","type":"selection",
"values":[
{"name":"TilePattern<1>","params":[{"name":"size","label":"Size","type":"number","quantity":1},
                                   {"name":"dist","label":"Distribution","type":"selection","quantity":1,
                                    "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]}]},
                                   {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":1}
                                  ]},
{"name":"TilePattern<2>","params":[{"name":"size","label":"Size","type":"number","quantity":2},
                                   {"name":"dist","label":"Distribution","type":"selection","quantity":2,
                                    "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]}]},
                                   {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":2}
                                  ]},
{"name":"TilePattern<3>","params":[{"name":"size","label":"Size","type":"number","quantity":3},
                                   {"name":"dist","label":"Distribution","type":"selection","quantity":3,
                                    "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]}]},
                                   {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":3}
                                  ]},
{"name":"TilePattern<4>","params":[{"name":"size","label":"Size","type":"number","quantity":4},
                                   {"name":"dist","label":"Distribution","type":"selection","quantity":4,
                                    "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]}]},
                                   {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":4}
                                  ]},
{"name":"ShiftTilePattern<1>","params":[{"name":"size","label":"Size","type":"number","quantity":1},
                                        {"name":"dist","label":"Distribution","type":"selection","quantity":1,
                                         "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"blockSize","label":"Block Size","type":"number","quantity":1}]}]},
                                        {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":1}
                                  ]},
{"name":"ShiftTilePattern<2>","params":[{"name":"size","label":"Size","type":"number","quantity":2},
                                   {"name":"dist","label":"Distribution","type":"selection","quantity":2,
                                    "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"Block Size","type":"number","quantity":1}]}]},
                                   {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":2}
                                       ]},
{"name":"ShiftTilePattern<3>","params":[{"name":"size","label":"Size","type":"number","quantity":3},
                                        {"name":"dist","label":"Distribution","type":"selection","quantity":3,
                                         "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"Block Size","type":"number","quantity":1}]}]},
                                        {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":3}
                                  ]},
{"name":"ShiftTilePattern<4>","params":[{"name":"size","label":"Size","type":"number","quantity":4},
                                        {"name":"dist","label":"Distribution","type":"selection","quantity":4,
                                         "values":[{"name":"BLOCKED"},{"name":"CYCLIC"},{"name":"NONE"},{"name":"TILE","params":[{"name":"Block Size","type":"number","quantity":1}]},{"name":"BLOCKCYCLIC","params":[{"name":"Block Size","type":"number","quantity":1}]}]},
                                        {"name":"teamSpec","label":"TeamSpec","type":"number","quantity":4}
                                        ]}
]}
]
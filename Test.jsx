
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":2,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Test","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"On","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"Off","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,2],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// PALETTE
// =======
var palette = new Window("palette"); 
    palette.text = "Test"; 
    palette.orientation = "column"; 
    palette.alignChildren = ["center","top"]; 
    palette.spacing = 10; 
    palette.margins = 16; 

var button1 = palette.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "On"; 

var button2 = palette.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Off"; 

palette.show();


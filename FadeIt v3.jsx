    // FadeIt v3 by Viv Chawda 
    // v3: 11-2019
    // Twitter: @vivchawda
    //
    // Inspired from kd_AutoFade v1.3 by @takumi_kashima
    // This script automatically adds fadeIn and fadeOut expressions to selected layers.
	// Select option "M" to add fadeIn & fadeOut at layer markers 1 & 2 instead (ctrl+8)
    
function fadit_main(thisObj){

    function fadit_createPalette(thisObj) {
        palette= (thisObj instanceof Panel) ? thisObj : new Window("palette", "FadeIt v3", undefined, {resizeable: true});
        palette.alignChildren = 'left';
        with(palette){
            palette.H = add('group');
            palette.H.orientation = 'row';
            with(palette.H){
                palette.H.sText = add('statictext', undefined, 'T(s):');
                palette.H.ftime = add('edittext', undefined, '0.5');
                palette.H.ftime.preferredSize = [40,20];
                palette.H.inout = add('dropdownlist',[10,10,100,30],['In and Out', 'In only', 'Out only']);
                palette.H.inout.selection = 0;
                palette.H.easing = add('checkbox', undefined, 'E');
                palette.H.easing.value = true;
                palette.H.marker = add('checkbox', undefined, 'M');
                }
        
            palette.F = add('group');
            palette.F.orientation = 'row';
            palette.F.alignChildren = 'fill';
            with(palette.F){
                palette.F.Btn = add('button', undefined, 'Apply');
                palette.F.Btn2 = add('button', undefined, 'Remove');
                }
            palette.F.Btn.onClick = applyExpression;
            palette.F.Btn2.onClick = removeExpression;
        
            };
        return palette;
    }

    var fadit_palette = fadit_createPalette(thisObj);
    if (fadit_palette instanceof Window){
        fadit_palette.show();
    }else{
        fadit_palette.layout.layout(true);
    }

    function removeExpression() {
        var curComp = app.project.activeItem; 

        for (var layerId = 0; layerId < curComp.selectedLayers.length; layerId++){
            var layer = curComp.selectedLayers[layerId];
            layer('opacity').expression='';
        }
    }

    function applyExpression() {
        var ExpText = '';
        var curComp = app.project.activeItem;
        
        for (var layerId = 0; layerId < curComp.selectedLayers.length; layerId++){
            var layer = curComp.selectedLayers[layerId];
                ExpText = makeExpression(palette.H.ftime.text, palette.H.inout.selection.text,palette.H.marker.value)
                layer('opacity').expression=ExpText;
            
        }
        
    }

        function makeExpression(ftime, ioc, mar){
            exp='';
            func1 = 'easeIn';
            func2 = 'easeOut';
            from = 0;
            to = 100;
            
            if(mar){
                if(ioc == 'In and Out'){
                    exp = 'fadeIn = easeIn(time, marker.key(1).time, marker.key(1).time + '+ftime+', 0, 100)\nfadeOut = easeOut(time, marker.key(2).time - '+ftime+', marker.key(2).time, 0, 100)\nfadeIn - fadeOut';
                }else if(ioc == 'In only'){
                    exp = 'easeIn(time, marker.key(1).time, marker.key(1).time + '+ftime+', 0, 100)';
                }else if(ioc == 'Out only'){
                    exp = 'easeOut(time, marker.key(2).time - '+ftime+', marker.key(2).time, 100, 0)';
                }
            }else{
                if(ioc == 'In and Out'){
                    exp = 'fTime = '+ftime+';\r'+
                            'if(time <= thisLayer.inPoint+fTime){\r'+
                            '	'+func1+'(time,thisLayer.inPoint,thisLayer.inPoint+fTime,'+from+','+to+');\r' +
                            '}else if(time >= thisLayer.outPoint-fTime){\r' +
                            '	'+func2+'(time,thisLayer.outPoint-fTime,thisLayer.outPoint,'+to+','+from+');\r' +
                            '}else{\r' +
                            '	'+to+';\r'+
                            '}';
                }else if(ioc == 'In only'){
                    exp = 'fTime = '+ftime+';\r'+
                            'if(time <= thisLayer.inPoint+fTime){\r'+
                            '	'+func1+'(time,thisLayer.inPoint,thisLayer.inPoint+fTime,'+from+','+to+');\r' +
                            '}else{\r' +
                            '	'+to+';\r'+
                            '}';
                }else if(ioc == 'Out only'){
                    exp = 'fTime = '+ftime+';\r'+
                            'if(time >= thisLayer.outPoint-fTime){\r' +
                            '	'+func2+'(time,thisLayer.outPoint-fTime,thisLayer.outPoint,'+to+','+from+');\r' +
                            '}else{\r' +
                            '	'+to+';\r'+
                            '}';
                }  
            }
        return exp;
    }

}

fadit_main(this);




    // FadeIt v5 by Viv Chawda
    // v5: 04-2020
    // updated during Covid Pandemic
    // Twitter: @vivchawda
    //
    // Inspired from kd_AutoFade v1.3 by @takumi_kashima
    // This script automatically adds fadeIn and fadeOut expressions to selected layers.
	  // Select option "M" to add fadeIn & fadeOut at layer markers 1 & 2 instead (ctrl+8).
    // Select option "P" to preserve existing opacity value.

    function fadit_main(thisObj){

        //var curOpacity = app.project.activeItem.selectedLayers.opacity;
    
        function fadit_createPalette(thisObj) {
            palette= (thisObj instanceof Panel) ? thisObj : new Window("palette", "Test", undefined, {resizeable: true});
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
                    palette.H.preserve = add('checkbox', undefined, 'P');
                    palette.H.preserve.value = true;
                    palette.H.curOpacity = add('edittext', undefined, '100');
                    palette.H.curOpacity.preferredSize = [40,20];
                    }
    
                palette.F = add('group');
                palette.F.orientation = 'row';
                palette.F.alignChildren = 'fill';
                with(palette.F){
                    palette.F.apply = add('button', undefined, 'Apply');
                    palette.F.deapply = add('button', undefined, 'Remove');
                    }
                palette.F.apply.onClick = applyExpression;
                palette.F.deapply.onClick = removeExpression;
    
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
            var ExpText = palette.H.curOpacity.text;
            var curComp = app.project.activeItem;
    
            for (var layerId = 0; layerId < curComp.selectedLayers.length; layerId++){
                var layer = curComp.selectedLayers[layerId];
                    layer('opacity').expression=ExpText;
    
            }
    
            }
    
       
    
        }      
    
    fadit_main(this);
    

      let dragElement = null
      function onDragStart(e) {
        // 获取当前拖拽元素
        dragElement = e.currentTarget
      }
      function onDragOver(e) {

        e.preventDefault()
      }
      function onDrop(e) {

        let dropElement = e.currentTarget
        if (dragElement != null && dragElement != dropElement) {
          let wrapper = document.querySelector('.wrapper')

          let temp = document.createElement('div')

          wrapper.appendChild(temp)

          wrapper.replaceChild(temp, dropElement)
          temp.style.top=dropElement.style.top;
          temp.style.left=dropElement.style.left;
          temp.id=dropElement.id;

          wrapper.replaceChild(dropElement, dragElement)
          dropElement.style.top=dragElement.style.top;
          dropElement.style.left=dragElement.style.left;
          dropElement.id=dragElement.id;

          wrapper.replaceChild(dragElement, temp)
          dragElement.style.top=temp.style.top;
          dragElement.style.left=temp.style.left;
          dragElement.id=temp.id;

          var newPalette = d3.select("#palette").property("value");
          var newCondition = d3.select("#displaycondition").property("value");
          if (newPalette != null)           // when interfaced with jQwidget, the ComboBox handles keyup event but value is then not available ?
          {
            //changePalette(newCondition, newPalette, "#heatmap");
            redrawRawData("#heatmap");
            redrawHeatmap_albxx("#heatmap");
            redrawHeatmap_albcat("#heatmap");
            updateAlbxxPoints();
            updateAlbcatPoints();
            updateLink();
            $('#palette').val("cGAP");
            $("#displaycondition").prop('selectedIndex', 0);  
            $("#isColorReverse").attr('disabled','disabled');
            $("#displaycondition").attr('disabled','disabled');   
            $('#restricted_display').css('display', 'none');
            $("#optionDataMap").prop('selectedIndex', 0);
            optionTargetDataMap = "rawdata";
            $("#palette option[value='cGAP']").removeAttr('disabled');  
            setInputRange(rdminInputRange1,rdmaxInputRange1,rdminInputRange2,rdmaxInputRange2,min_value, max_value);
          }

        }
      }

      function rgbcube_click(e) {

        if(e.className == "arrow nagitive_z")
        {
          e.className = "arrow positive_z";
          rgbcube_z = 1;
        }         
        else if(e.className == "arrow positive_z")
        {
          e.className = "arrow nagitive_z";
          rgbcube_z = -1;
        }      
        else if(e.className == "arrow up")
        {
          e.className = "arrow down";
          rgbcube_y = -1;
        }    
        else if(e.className == "arrow down")
        {
          e.className = "arrow up";
          rgbcube_y = 1;
        }     
        else if(e.className == "arrow left")
        {
          e.className = "arrow right";
          rgbcube_x = 1;
        }
        else
        {
          e.className = "arrow left";
          rgbcube_x = -1;
        }

        var newPalette = d3.select("#palette").property("value");
        var newCondition = d3.select("#displaycondition").property("value");
        if (newPalette != null)           // when interfaced with jQwidget, the ComboBox handles keyup event but value is then not available ?
        {
          //changePalette(newCondition, newPalette, "#heatmap");
          redrawRawData("#heatmap");
          redrawHeatmap_albxx("#heatmap");
          redrawHeatmap_albcat("#heatmap");
          updateAlbxxPoints();
          updateAlbcatPoints();
          updateLink();
          $('#palette').val("cGAP");
          $("#displaycondition").prop('selectedIndex', 0);  
          $("#isColorReverse").attr('disabled','disabled');
          $("#displaycondition").attr('disabled','disabled');   
          $('#restricted_display').css('display', 'none');
          $("#optionDataMap").prop('selectedIndex', 0);
          optionTargetDataMap = "rawdata";
          $("#palette option[value='cGAP']").removeAttr('disabled');  
          setInputRange(rdminInputRange1,rdmaxInputRange1,rdminInputRange2,rdmaxInputRange2,min_value, max_value);
        }
      }

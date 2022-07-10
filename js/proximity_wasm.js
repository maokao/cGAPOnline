//emcc hctree.cpp r2e.cpp list.cpp ordering.cpp proximity.cpp homals.cpp -s ALLOW_MEMORY_GROWTH=1 -s "EXPORTED_FUNCTIONS=['_hctree_sort','_ellipse_sort','_computeProximity','_run_homals','_computeProximity_r','_computeProximity_c']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -o seriation.js
//emcc hctree.cpp r2e.cpp list.cpp ordering.cpp proximity.cpp -s ALLOW_MEMORY_GROWTH=1 -s "EXPORTED_FUNCTIONS=['_hctree_sort','_ellipse_sort','_computeProximity']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -o seriation.js
//emcc hctree.cpp r2e.cpp list.cpp ordering.cpp proximity.cpp -s "EXPORTED_FUNCTIONS=['_hctree_sort','_ellipse_sort','_computeProximity']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -o seriation.js

var runProximityWASM_r = Module.cwrap("computeProximity_r", null, ["number", "number", "number", "number"]); // void function
var runProximityWASM_c = Module.cwrap("computeProximity_c", null, ["number", "number", "number", "number", "number", "number"]); // void function
//function runProximity(proxType, side, isContainMissingValue) {
function runProximity_r(albxx, nrow, ncol) {  

        var len = nrow * ncol; 

        var rowProxData = [];

        var inputRawData = new Float64Array(len);


        for(var i = 0; i < nrow; i++)
        {
          for(var j = 0; j < ncol; j++)
          {
              inputRawData[i*ncol+j] = albxx[i+1][j+1]; 
              //console.log((i*ncol+j)+":"+inputRawData[i*ncol+j]);
          }         
        }

        var bytes_per_element = inputRawData.BYTES_PER_ELEMENT;   // 8 bytes each element
        console.log("bytes_per_element:"+inputRawData.BYTES_PER_ELEMENT);
    
        var start = 0;
        var end = 0;
        start = new Date().getTime();
        // 要測試的 function 開始 =======

        // alloc memory
        var input_ptr = Module._malloc(len * bytes_per_element);
        var output_prox_ptr;
        var prox_len = 0;
        //if(side == 0)
        //{
          output_prox_ptr = Module._malloc(nrow * nrow * 8 );
          prox_len = nrow * nrow;
        //}
        //else
        //{
        //  output_prox_ptr = Module._malloc(col_number * col_number * 8 );
        //  prox_len = col_number * col_number;
        //}

        Module.HEAPF64.set(inputRawData, input_ptr / bytes_per_element); // write WASM memory calling the set method of the Float64Array

        runProximityWASM_r(input_ptr, output_prox_ptr, nrow, ncol);
        /*
        Module.ccall(
          "hctree_sort", //c function name
          null,   //output type
          ["number", "number", "number", "number", "number", "number", "number", "number"], //input type
          [input_ptr, output_left_ptr, output_right_ptr, output_hgt_ptr, output_order_ptr, row_number, row_number, 0]       //input value
        );
*/

        var output_prox_array = new Float64Array(Module.HEAPF64.buffer, output_prox_ptr, prox_len); // extract data to another JS array
 
        // 要測試的 function 結束 =======
        end = new Date().getTime();
        // 計算花多久時間
        console.log((end - start) / 1000 + "sec");
        console.log("output_prox_array: "+output_prox_array[1]);
        
        freeHeap(input_ptr);
        freeHeap(output_prox_ptr);



  return output_prox_array;
  
}

function runProximity_c(albyyr, albyyg, albyyb, nrow, ncol) {  

        var len = nrow * ncol; 

        var colProxData = [];

        var inputRawDataR = new Float64Array(len);
        var inputRawDataG = new Float64Array(len);
        var inputRawDataB = new Float64Array(len);

        for(var i = 0; i < nrow; i++)
        {
          for(var j = 0; j < ncol; j++)
          {
              inputRawDataR[i*ncol+j] = albyyr[i+1][j+1]; 
              inputRawDataG[i*ncol+j] = albyyg[i+1][j+1]; 
              inputRawDataB[i*ncol+j] = albyyb[i+1][j+1]; 
              //console.log((i*col_number+j)+":"+inputRawDataR[i*col_number+j]);
          }         
        }

        var bytes_per_element = inputRawDataR.BYTES_PER_ELEMENT;   // 8 bytes each element
        console.log("bytes_per_element:"+inputRawDataR.BYTES_PER_ELEMENT);
    
        var start = 0;
        var end = 0;
        start = new Date().getTime();
        // 要測試的 function 開始 =======

        // alloc memory
        var input_ptr_R = Module._malloc(len * bytes_per_element);
        var input_ptr_G = Module._malloc(len * bytes_per_element);
        var input_ptr_B = Module._malloc(len * bytes_per_element);
        var output_prox_ptr;
        var prox_len = 0;
        //if(side == 0)
        //{
          output_prox_ptr = Module._malloc(ncol * ncol * 8 );
          prox_len = ncol * ncol;
        //}
        //else
        //{
        //  output_prox_ptr = Module._malloc(col_number * col_number * 8 );
        //  prox_len = col_number * col_number;
        //}

        Module.HEAPF64.set(inputRawDataR, input_ptr_R / bytes_per_element); // write WASM memory calling the set method of the Float64Array
        Module.HEAPF64.set(inputRawDataG, input_ptr_G / bytes_per_element); // write WASM memory calling the set method of the Float64Array
        Module.HEAPF64.set(inputRawDataB, input_ptr_B / bytes_per_element); // write WASM memory calling the set method of the Float64Array
        runProximityWASM_c(input_ptr_R, input_ptr_G, input_ptr_B, output_prox_ptr, nrow, ncol);
        /*
        Module.ccall(
          "hctree_sort", //c function name
          null,   //output type
          ["number", "number", "number", "number", "number", "number", "number", "number"], //input type
          [input_ptr, output_left_ptr, output_right_ptr, output_hgt_ptr, output_order_ptr, row_number, row_number, 0]       //input value
        );
*/

        var output_prox_array = new Float64Array(Module.HEAPF64.buffer, output_prox_ptr, prox_len); // extract data to another JS array
 
        // 要測試的 function 結束 =======
        end = new Date().getTime();
        // 計算花多久時間
        console.log((end - start) / 1000 + "sec");
        console.log("output_prox_array: "+output_prox_array[1]);
        
        freeHeap(input_ptr_R);
        freeHeap(input_ptr_G);
        freeHeap(input_ptr_B);
        freeHeap(output_prox_ptr);



  return output_prox_array;
  
}
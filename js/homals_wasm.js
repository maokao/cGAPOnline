//Module['onRuntimeInitialized'] = runHomals;
var runHomalsWASM = Module.cwrap(
          "run_homals", //c function name
          null,   //output type
          ["number", "number", "number","number", "number", "number","number", "number", "number", "boolean", "boolean", "boolean", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);

//**go to emsdk folder
//source ./emsdk_env.sh --build=Release  
//**go to project folder   
//emcc hctree.cpp r2e.cpp list.cpp ordering.cpp homals.cpp proximity.cpp -s ALLOW_MEMORY_GROWTH=1 -s "EXPORTED_FUNCTIONS=['_hctree_sort','_ellipse_sort','_run_homals','_computeProximity_r','_computeProximity_c']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -o seriation.js
//emrun --no_browser --port 8000 .


function runHomals(data, nrow, ncol) {

        var hml_dimension = 3;
        //var nrow = row_number;
        //var ncol = col_number;
        //var hml_maxcat = 0;
        var hml_itoutmax = 1000;
        var hml_itinmax = 1000;
        var hml_navar = ncol;
        var hml_npvar = 0;
        var hml_weight = 0;
        var hml_timer = false;
        var hml_weighted = false;
        var hml_objscores = true;
        var hml_avars = [];
        var hml_pvars = [];
        //var hml_acat = [];
        var hml_pcat = [];
        var hml_arnk = [];
        var hml_prnk = [];
        var hml_alev = [];
        var hml_plev = [];
        var hml_data = [];
        var hml_epsilon0=1e-10;
        var hml_epsilon1=1e-10;
        //var hml_epsilon0=Math.pow(10.0,-10);
        //var hml_epsilon1=Math.pow(10.0,-10);
        var tmpdata = [];
        //var albxx = [];
        //var albcat = [];
//albxx = new double [nrow+1][4];
        albxx = new Array(nrow+1);
         for (i = 0; i < nrow+1; i++) {
            albxx[i] = new Array(4);
         }

         tmpdata = new Array(nrow);
         for (i = 0; i < nrow; i++) {
            tmpdata[i] = new Array(ncol);
         }

/*
        var hml_amaxcat = [];
        var hml_amincat = [];
        var hml_amaxcat_temp = [];
        var hml_atotalcat = [];
        var ntotalcat = 0;
        var ncat=0;
*/
        albyyr = new Array(nrow+1);
        albyyg = new Array(nrow+1);
        albyyb = new Array(nrow+1);
         for (i = 0; i <= nrow; i++) {
            albyyr[i] = new Array(ncol+1);
            albyyg[i] = new Array(ncol+1);
            albyyb[i] = new Array(ncol+1);
         }

         var len = nrow*ncol;

        var inputData = new Int32Array(len); // extract data to another JS array

        for(i = 0; i < row_number; i++)
        {
          for(j = 0; j < col_number; j++)
          {
            //inputData[i*col_number+j] = parseFloat(Object.values(dataset[i])[j+1]); 
            if(data[i][j]==missing_value)
            {
                tmpdata[i][j]=-1;
                //inputData[i*col_number+j] = 0;
                //inputData[a] = 0;
            }
            else
            {
                tmpdata[i][j]=data[i][j];
                //inputData[i*col_number+j] = tmpdata[i][j]; 
                //inputData[a] = tmpdata[i][j]; 
            }
            //console.log(i+","+j+": "+inputData[i*col_number+j]+","+data[i][j]);
          }
          
          //inputRowProx = inputRowProx.concat(rowProxData[i]);
        }

        var jump=0;
         for(i=1;i<=nrow;i++){
             for(j=1;j<=ncol;j++){
                 if(hml_amincat[j-1]!=1)
                 {
                     if(data[i-1][j-1]==missing_value)
                         inputData[jump]=0;
                     else
                         inputData[jump]=(data[i-1][j-1]-hml_amincat[j-1]+1);
                 }
                 else
                 {
                     if(data[i-1][j-1]==missing_value)
                         inputData[jump]=0;
                     else
                         inputData[jump]=data[i-1][j-1];
                 }
                 jump++;
             }
         }
       
        console.log(row_number);
        console.log(col_number);

        for(i=0;i<hml_navar;i++){
                 hml_avars[i]=i;
                 //hml_arnk[i]=0;
                 hml_arnk[i]=0;
                 hml_alev[i]=0; //0:Nominal, 1:Ordinal

                 hml_pvars[i]=0;
                 hml_prnk[i]=0;
                 hml_plev[i]=0;
                 hml_pcat[i]=0;
                 //hml_acat[i]=2;
         }
/*
         for(j=0;j<ncol;j++)
             hml_acat[j]=0;

         for(j=0;j<ncol;j++)
         {
             for(i=0;i<nrow;i++)
             {
                 if(data[i+1][j+1]!=-1)
                 {
                     hml_amaxcat[j]=data[i][j];
                     hml_amincat[j]=data[i][j];
                     break;
                 }
             }
         }

         for(j=0;j<ncol;j++){
             for(i=0;i<nrow;i++){
                 if(data[i][j]>hml_amaxcat[j]) 
                    hml_amaxcat[j]=data[i][j];
                 if(data[i][j]<hml_amincat[j]&&data[i][j]!=-1) hml_amincat[j]=data[i][j];
                 //pt++;
             }
         }
         for(j=0;j<ncol;j++){
             hml_atotalcat[j]=hml_amaxcat[j]-hml_amincat[j]+1;
             ntotalcat=ntotalcat+hml_atotalcat[j];

         }
         for(j=0;j<ncol;j++)
         {
             if(hml_amincat[j]>1)
             {
                 hml_amaxcat_temp[j]=hml_amaxcat[j]-hml_amincat[j]+1;
             }
             else if(hml_amincat[j]<1)
             {
                 hml_amaxcat_temp[j]=hml_amaxcat[j]+1;
             }
             else
             {
                 hml_amaxcat_temp[j]=hml_amaxcat[j];
             }
         }

         for(j=0;j<ncol;j++){
             hml_acat[j]=hml_atotalcat[j];
             //console.log(j+": "+hml_acat[j]);
         }

         hml_maxcat=hml_amaxcat_temp[0];
         for(j=0;j<ncol;j++)
         {
             if(hml_amaxcat_temp[j]>hml_maxcat)
                 hml_maxcat=hml_amaxcat_temp[j];
         }
         
         for(j=0;j<ncol;j++){
             ncat+=hml_acat[j];
         }
          //console.log("ncat: "+ncat);
*/
         var m=0;
         var temptype=0;
         var var_range = [];
         var type_data = new Array(nrow);
         for (i = 0; i < nrow; i++) {
            type_data[i] = new Array(ncol);
         }

         for(j=0;j<ncol;j++)
         {
            for(i=0;i<nrow;i++)
            {
                type_data[i][j]=-1;
            }
         }

         for(j=0;j<ncol;j++)
         {
                     k=0;
                     for(i=0;i<nrow;i++)
                     {
                         for(m=0;m<=nrow;m++)
                         {
                             if(type_data[m][j]==tmpdata[i][j])
                             {
                                 break;
                             }
                             else
                             {
                                 if(type_data[m][j]==-1)
                                 {
                                     type_data[k][j]=tmpdata[i][j];
                                     k++;
                                     break;
                                 }
                             }
                         }
                     }
                     var_range[j]=k;
                     for(i=k-2;i>=0;i--)
                     {
                         for(m=0;m<=i;m++)
                         {
                             if(type_data[m][j]>type_data[m+1][j])
                             {
                                 temptype=type_data[m][j];
                                 type_data[m][j]=type_data[m+1][j];
                                 type_data[m+1][j]=temptype;
                             }
                         }
                     }
        }
         //albcat = new double [ncat+1][4];
         albcat = new Array(ncat+1);
         for (i = 0; i < ncat+1; i++) {
            albcat[i] = new Array(4);
         }
         //othercolor_legend = new double [ncat+1][4];
         var othercolor_legend = new Array(ncat+1);
         for (i = 0; i < ncat+1; i++) {
            othercolor_legend[i] = new Array(4);
         }
         //cat_list=new int[ncat+1]; 
         var cat_list = new Array(ncat+1);
         /*cat_list_2 = new double [hml_maxcat][ncol];
         for(j=0;j<ncol;j++)
         {
                 for(i=0;i<hml_maxcat;i++)
                 {
                  cat_list_2[i][j]=missing_value; 
                 }
         }*/
         cat_list_2 = new Array(hml_maxcat);
         for (i = 0; i < hml_maxcat; i++) {
            cat_list_2[i] = new Array(ncol);
            for(j=0;j<ncol;j++)
            {
                cat_list_2[i][j]=missing_value;  
            }
         }
         
         var pt=1;
         for(j=0;j<ncol;j++)
         {
                 for(i=0;i<hml_acat[j];i++)
                 {
                         //cat_list[pt]=type_data[i][j];
                         cat_list[pt]=hml_amincat[j]+i;
                         cat_list_2[i][j]=cat_list[pt];
                         pt++;
                 }
         }

         //cat_list[],
         for(j=0;j<ncol;j++)
         {
             for(i=0;i<hml_acat[j];i++)
             {
                 type_data[i][j]=hml_amincat[j]+i;
             }
         }

         //catmap=new int[hml_navar];
         var catmap = new Array(hml_navar);
         catmap[0]=0;
         for(i=1;i<hml_navar;i++){
                 catmap[i]=catmap[i-1]+hml_acat[i-1];
         }

        var bytes_per_element = inputData.BYTES_PER_ELEMENT;   // 8 bytes each element
         console.log("bytes_per_element:"+inputData.BYTES_PER_ELEMENT);
    
        var start = 0;
        var end = 0;
        start = new Date().getTime();
        // 要測試的 function 開始 =======

        /*
         hml_avars = new int [hml_navar];
         hml_pvars = new int [hml_navar];
         hml_acat = new int [hml_navar];
         hml_pcat = new int [hml_navar];
         hml_arnk = new int [hml_navar];
         hml_prnk = new int [hml_navar];
         hml_alev = new int [hml_navar];
         hml_plev = new int [hml_navar];
        */
        // alloc memory: hml_data
        var input_ptr = Module._malloc(len * bytes_per_element);
        //int *hml_avars, 
        var input_hml_avars_ptr = Module._malloc(hml_navar * 4);
        var input_hml_avars = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_avars[i] = hml_avars[i];
        Module.HEAP32.set(input_hml_avars, input_hml_avars_ptr / 4);
        //int *hml_pvars,
        var input_hml_pvars_ptr = Module._malloc(hml_navar * 4);
        var input_hml_pvars = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_pvars[i] = hml_pvars[i];
        Module.HEAP32.set(input_hml_pvars, input_hml_pvars_ptr / 4);
        //int *hml_acat,
        var input_hml_acat_ptr = Module._malloc(hml_navar * 4);
        var input_hml_acat = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_acat[i] = hml_acat[i];
        Module.HEAP32.set(input_hml_acat, input_hml_acat_ptr / 4);
        //int *hml_pcat,
        var input_hml_pcat_ptr = Module._malloc(hml_navar * 4);
        var input_hml_pcat = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_pcat[i] = hml_pcat[i];
        Module.HEAP32.set(input_hml_pcat, input_hml_pcat_ptr / 4);
        //int *hml_arnk,
        var input_hml_arnk_ptr = Module._malloc(hml_navar * 4);
        var input_hml_arnk = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_arnk[i] = hml_arnk[i];
        Module.HEAP32.set(input_hml_arnk, input_hml_arnk_ptr / 4);
        //int *hml_prnk,
        var input_hml_prnk_ptr = Module._malloc(hml_navar * 4);
        var input_hml_prnk = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_prnk[i] = hml_prnk[i];
        Module.HEAP32.set(input_hml_prnk, input_hml_prnk_ptr / 4);
        //int *hml_alev,
        var input_hml_alev_ptr = Module._malloc(hml_navar * 4);
        var input_hml_alev = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_alev[i] = hml_alev[i];
        Module.HEAP32.set(input_hml_alev, input_hml_alev_ptr / 4);
        //int *hml_plev,
        var input_hml_plev_ptr = Module._malloc(hml_navar * 4);
        var input_hml_plev = new Int32Array(hml_navar); // extract data to another JS array
        for(i=0; i<hml_navar;i++)
          input_hml_plev[i] = hml_plev[i];
        Module.HEAP32.set(input_hml_plev, input_hml_plev_ptr / 4);


        //albxx = new double [nrow+1][4];
        var output_albxx_ptr = Module._malloc(row_number * 3 * 8 );
        //albcat = new double [ncat+1][4];
        var output_albcat_ptr = Module._malloc(ncat * 3 * 8 );

        Module.HEAP32.set(inputData, input_ptr / bytes_per_element);


        runHomalsWASM(hml_dimension,ncol,nrow,hml_maxcat,hml_itoutmax,hml_itinmax,hml_navar,hml_npvar,hml_weight,
          hml_timer,hml_weighted,hml_objscores,input_hml_avars_ptr,input_hml_pvars_ptr,input_hml_acat_ptr,input_hml_pcat_ptr,input_hml_arnk_ptr,input_hml_prnk_ptr,input_hml_alev_ptr,input_hml_plev_ptr,
          input_ptr,hml_epsilon0,hml_epsilon1,output_albxx_ptr,output_albcat_ptr,ncat);
        /*
        Module.ccall(
          "run_homals", //c function name
          null,   //output type
          ["number", "number", "number","number", "number", "number","number", "number", "number",
           "boolean", "boolean", "boolean", "number", "number", "number", "number", "number", "number", "number", "number", 
           "number", "number", "number", "number", "number", "number"], //input type
          [hml_dimension,ncol,nrow,hml_maxcat,hml_itoutmax,hml_itinmax,hml_navar,hml_npvar,hml_weight,
          hml_timer,hml_weighted,hml_objscores,input_hml_avars_ptr,input_hml_pvars_ptr,input_hml_acat_ptr,input_hml_pcat_ptr,input_hml_arnk_ptr,input_hml_prnk_ptr,input_hml_alev_ptr,input_hml_plev_ptr,
          input_ptr,hml_epsilon0,hml_epsilon1,output_albxx_ptr,output_albcat_ptr,ncat] //input value   
        );*/

        var output_albxx_array = new Float64Array(Module.HEAPF64.buffer, output_albxx_ptr, row_number*3); // extract data to another JS array
        for(i=0; i<nrow; i++)
        {
          for(j=0; j<3; j++)
          {
            albxx[i+1][j+1] = output_albxx_array[i*3+j];
          }
        }
        var output_albcat_array = new Float64Array(Module.HEAPF64.buffer, output_albcat_ptr, ncat*3); // extract data to another JS array
        for(i=0; i<ncat; i++)
        {
          for(j=0; j<3; j++)
          {
            albcat[i+1][j+1] = output_albcat_array[i*3+j];
          }
        }

        console.log(albxx);
        console.log(albcat);
/*
        Module.HEAPF64.set(inputRowProx, input_ptr / bytes_per_element); // write WASM memory calling the set method of the Float64Array

        Module.ccall(
          "hctree_sort", //c function name
          null,   //output type
          ["number", "number", "number", "number", "number", "number", "number", "number"], //input type
          [input_ptr, output_left_ptr, output_right_ptr, output_hgt_ptr, output_order_ptr, row_number, row_number, 0]       //input value
        );

        var output_left_array = new Int32Array(Module.HEAP32.buffer, output_left_ptr, row_number-1); // extract data to another JS array
        var output_right_array = new Int32Array(Module.HEAP32.buffer, output_right_ptr, row_number-1); // extract data to another JS array
        var output_hgt_array = new Float64Array(Module.HEAPF64.buffer, output_hgt_ptr, row_number-1); // extract data to another JS array
        var output_order_array = new Int32Array(Module.HEAP32.buffer, output_order_ptr, row_number); // extract data to another JS array
*/
        // 要測試的 function 結束 =======
        end = new Date().getTime();
        // 計算花多久時間
        console.log((end - start) / 1000 + "sec");


        pt=0;
        ptc=0;
        //console.log("nrow: "+nrow+", col: "+ncol);
        for(i=1;i<=nrow;i++){
                for(j=1;j<=ncol;j++){
                    for(k=1;k<=hml_acat[j-1];k++)
                    {
                        //if(cat_list[catmap[j-1]+k]==hml_data[pt])
                        if(cat_list[catmap[j-1]+k]==tmpdata[i-1][j-1])
                        {
                                break;
                        }
                    }
                    if(tmpdata[i-1][j-1]!=-1)
                    {
                        ptc=catmap[j-1]+k;
                        //console.log(i+","+j+":"+data[i-1][j-1]+":"+ptc);
                        //console.log(albcat[ptc][1]);
                        //console.log(albcat[ptc][2]);
                        //console.log(albcat[ptc][3]);
                        albyyr[i][j]=albcat[ptc][1];
                        albyyg[i][j]=albcat[ptc][2];
                        albyyb[i][j]=albcat[ptc][3];

                        //pt++;
                    }
                    else
                    {
                        albyyr[i][j]=0;
                        albyyg[i][j]=0;
                        albyyb[i][j]=0;
                    }
                }
        }
        console.log(albyyr);
        console.log(albyyg);
        console.log(albyyb);

        albcat_R = new Array(hml_maxcat);
        albcat_G = new Array(hml_maxcat);
        albcat_B = new Array(hml_maxcat);
         for (i = 0; i < nrow; i++) {
            albcat_R[i] = new Array(ncol);
            albcat_G[i] = new Array(ncol);
            albcat_B[i] = new Array(ncol);
         }

        var foundflag = false;
        for(j=0;j<ncol;j++)
        {
            for(i=0;i<hml_acat[j];i++)
            {
                foundflag = false;
                for(k=0; k<nrow; k++)
                {
                    if(cat_list_2[i][j]==tmpdata[k][j]||cat_list_2[i][j]==-1)
                    {
                        foundflag = true;
                        break;
                    }    
                }
                //console.log(i+","+j+","+k+":"+cat_list_2[i][j]);
                if(cat_list_2[i][j]==missing_value||foundflag == false)
                {
                    albcat_R[i][j]=0;
                    albcat_G[i][j]=0;
                    albcat_B[i][j]=0;
                }
                else
                {
                    albcat_R[i][j]=albyyr[k+1][j+1];
                    albcat_G[i][j]=albyyg[k+1][j+1];
                    albcat_B[i][j]=albyyb[k+1][j+1];                    
                }

            }
        }

        //var maxrgbvalue = [];
        maxrgbvalue = new Array(3);
        maxrgbvalue[0]=Math.abs(albxx[1][1]);
        maxrgbvalue[1]=Math.abs(albxx[1][2]);
        maxrgbvalue[2]=Math.abs(albxx[1][3]);
        for(i=2;i<=nrow;i++){
            if(Math.abs(albxx[i][1])>Math.abs(maxrgbvalue[0])) maxrgbvalue[0]=albxx[i][1];
            if(Math.abs(albxx[i][2])>Math.abs(maxrgbvalue[1])) maxrgbvalue[1]=albxx[i][2];
            if(Math.abs(albxx[i][3])>Math.abs(maxrgbvalue[2])) maxrgbvalue[2]=albxx[i][3];
        }
        for(i=1;i<=ncat;i++){
            if(Math.abs(albcat[i][1])>Math.abs(maxrgbvalue[0])) maxrgbvalue[0]=albcat[i][1];
            if(Math.abs(albcat[i][2])>Math.abs(maxrgbvalue[1])) maxrgbvalue[1]=albcat[i][2];
            if(Math.abs(albcat[i][3])>Math.abs(maxrgbvalue[2])) maxrgbvalue[2]=albcat[i][3];
        }

        console.log(maxrgbvalue[0]);
        console.log(maxrgbvalue[1]);
        console.log(maxrgbvalue[2]);
        //euclidean_r(albxx, nrow, hml_dimension, obj_euc);
        var rowProxData1D = [];
       /* rowProxData = new Array(nrow);
        for(i = 0; i < nrow; i++) {
            rowProxData[i] = new Array(nrow);
            for(j = 0; j < nrow; j++) {
                rowProxData[i][j] = 0;
            }
        }*/
        rowProxData1D = runProximity_r(albxx, nrow, hml_dimension);
        for(i=0; i<nrow; i++)
        {
          for(j=0; j<nrow; j++)
          {
            rowProxData[i][j] = rowProxData1D[i*nrow+j];
          }
        }
        //console.log("rowProxData: "+rowProxData);

        //euclidean_c(albyyr, albyyg, albyyb, nrow, ncol, var_euc);
        var tmpcolProxData = [];
        /*colProxData = new Array(ncol);
        for(i = 0; i < ncol; i++) {
            colProxData[i] = new Array(ncol);
            for(j = 0; j < ncol; j++) {
                colProxData[i][j] = 0;
            }
        }*/
        tmpcolProxData = runProximity_c(albyyr, albyyg, albyyb, nrow, ncol);
        for(i=0; i<ncol; i++)
        {
          for(j=0; j<ncol; j++)
          {
            colProxData[i][j] = tmpcolProxData[i*ncol+j];
          }
        }




        freeHeap(input_ptr);
        //freeHeap(output_ptr);

/*
        console.log("output_left_array");
        console.log(output_left_array);
        console.log("output_right_array");
        console.log(output_right_array);
        console.log("output_hgt_array");
        console.log(output_hgt_array);
        console.log("output_order_array");
        console.log(output_order_array);
*/




  
}
 
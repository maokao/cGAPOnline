$("#nodeModeBtn").click(function(){ 
	if(nodeMode == 0)
	{
		nodeMode = 1;
		var ele = $('#nodeModeIcon');
	    if(ele.hasClass('fa-s')){
	        ele.removeClass('fa-s')
	           .addClass('fa-c')
	    }	    
	}
	else if(nodeMode == 1)
	{
		nodeMode = 2;
		var ele = $('#nodeModeIcon');
	    if(ele.hasClass('fa-c')){
	        ele.removeClass('fa-c')
	           .addClass('fa-a')
	    }
	}
	else
	{
		nodeMode = 0;
		var ele = $('#nodeModeIcon');
	    if(ele.hasClass('fa-a')){
	        ele.removeClass('fa-a')
	           .addClass('fa-s')
	    }
	}
	drawStarPlot(false);

});

$("#linkModeBtn").click(function(){ 
	if(lineMode == 0)
	{
		lineMode = 1;
		$('#linkModeIcon').removeClass("unclickMode").addClass("clickMode");	    
	}
	else
	{
		lineMode = 0;
		$('#linkModeIcon').removeClass("clickMode").addClass("unclickMode");
	}
	drawStarPlot(false);

});

function drawStarPlot(initMode) {

		if(initMode == true)
		{
			if(firstInitScene == true)
			{
				var renderer;
				var container;
			    //var w = container.offsetWidth;
			    //var h = container.offsetHeight;
			    var w;
			    var h;
				var camera;
				let cameraControl;

				init();
				drawFrame();	
				draw8Balls();
				drawAlbxxPoints();
				drawAlbcatPoints();
				drawLink();
				render();
				firstInitScene = false;	
			}
			else
			{
				drawAlbxxPoints();
				drawAlbcatPoints();
				drawLink();
				//render();
			}
		}
		else
		{
			if(nodeMode == 1)
			{
				let albxx_object = scene.getObjectByName("albxx");
			//	object.dynamic = true;
			//	object.verticesNeedUpdata = true;
				albxx_object.material.visible = false;
				let albcat_object = scene.getObjectByName("albcat");
				albcat_object.material.visible = true;
			}
			else if(nodeMode == 2)
			{
				let albxx_object = scene.getObjectByName("albxx");
				albxx_object.material.visible = true;
				if(lineMode == 1)
				{
					let link_object = scene.getObjectByName("link");
					link_object.material.visible = true;
				}
				else
				{
					let link_object = scene.getObjectByName("link");
					link_object.material.visible = false;					
				}
			}
			else
			{
				let albcat_object = scene.getObjectByName("albcat");
				albcat_object.material.visible = false;	

				let link_object = scene.getObjectByName("link");
				link_object.material.visible = false;			
			}
		}

		function init()
		{
			scene = new THREE.Scene();	
			scene.background = new THREE.Color( 0xffffff );				
		    //var w = container.offsetWidth;
		    //var h = container.offsetHeight;
			w = 400;
		    h = 400;
			renderer = new THREE.WebGLRenderer();
		    renderer.setSize(w, h);
			container = document.getElementById('canvas');
			container.appendChild( renderer.domElement );

			camera = new THREE.PerspectiveCamera( 45, 1, 1, 20000 );
			camera.position.set( 0, 0, 800 );
			camera.lookAt( 0, 0, 0 );
			// 建立 OrbitControls
			cameraControl = new THREE.OrbitControls(camera, renderer.domElement);

			//cameraControl.enableDamping = true; // 啟用阻尼效果
			//cameraControl.dampingFactor = 0.25; // 阻尼系數
			//cameraControl.autoRotate = true;    // 啟用自動旋轉				

		}
			
		function drawFrame()
		{
			//draw lines
			const material = new THREE.LineBasicMaterial( { color: 0x666666 } );
			const points = [];

	        points.push( new THREE.Vector3(-200.0,-200.0,-200.0));
	        points.push( new THREE.Vector3(200.0,-200.0,-200.0));

	        points.push( new THREE.Vector3(-200.0,-200.0,-200.0));
	        points.push( new THREE.Vector3(-200.0,200.0,-200.0));
	        
	        points.push( new THREE.Vector3(-200.0,-200.0,-200.0));
	        points.push( new THREE.Vector3(-200.0,-200.0,200.0));

	        points.push( new THREE.Vector3(200.0,200.0,200.0));
	        points.push( new THREE.Vector3(200.0,200.0,-200.0));

			points.push( new THREE.Vector3(200.0,200.0,200.0));
	        points.push( new THREE.Vector3(-200.0,200.0,200.0));
	        
	        points.push( new THREE.Vector3(200.0,200.0,200.0));
	        points.push( new THREE.Vector3(200.0,-200.0,200.0));

	        points.push( new THREE.Vector3(-200.0,-200.0,200.0));
	        points.push( new THREE.Vector3(200.0,-200.0,200.0));
	        
	        points.push( new THREE.Vector3(-200.0,-200.0,200.0));
	        points.push( new THREE.Vector3(-200.0,200.0,200.0));		        

	        points.push( new THREE.Vector3(-200.0,200.0,-200.0));
	        points.push( new THREE.Vector3(-200.0,200.0,200.0));
	        
	        points.push( new THREE.Vector3(-200.0,200.0,-200.0));
	        points.push( new THREE.Vector3(200.0,200.0,-200.0));

	        points.push( new THREE.Vector3(200.0,-200.0,-200.0));
	        points.push( new THREE.Vector3(200.0,200.0,-200.0));
	        
			points.push( new THREE.Vector3(200.0,-200.0,-200.0));
	        points.push( new THREE.Vector3(200.0,-200.0,200.0));

			const geometry = new THREE.BufferGeometry().setFromPoints( points );
			const line = new THREE.LineSegments( geometry, material );
			scene.add( line );

		}

		function draw8Balls()
		{
			//draw 8 balls
			const geometry3 = new THREE.SphereGeometry( 16, 32, 32 );	// (radius, widthSegments, heightSegments)
			const material3 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
			const red_sphere = new THREE.Mesh( geometry3, material3 );
			//red_sphere.radius = 1;
			red_sphere.position.set(200, -200, -200);
			scene.add( red_sphere );

			const green_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
			green_sphere.radius = 1;
			green_sphere.position.set(-200, 200, -200);
			scene.add( green_sphere );

			const blue_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
			blue_sphere.radius = 1;
			blue_sphere.position.set(-200, -200, 200);
			scene.add( blue_sphere );

			const yellow_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
			yellow_sphere.radius = 1;
			yellow_sphere.position.set(200, 200, -200);
			scene.add( yellow_sphere );

			const cyan_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0x00ffff } ) );
			cyan_sphere.radius = 1;
			cyan_sphere.position.set(-200, 200, 200);
			scene.add( cyan_sphere );

			const magenta_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
			magenta_sphere.radius = 1;
			magenta_sphere.position.set(200, -200, 200);
			scene.add( magenta_sphere );

			const white_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
			white_sphere.radius = 1;
			white_sphere.position.set(200, 200, 200);
			scene.add( white_sphere );

			const black_sphere = new THREE.Mesh( geometry3, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
			black_sphere.radius = 1;
			black_sphere.position.set(-200, -200, -200);
			scene.add( black_sphere );
		}

		function drawLink()
		{
			//draw lines
			const material = new THREE.LineBasicMaterial( { 
				color: 0x666666,
				transparent: true,
                opacity: 0.5
			} );
			material.visible = false;
			const points = [];

			for(let i=0; i<row_number; i++)
			{
				for(let j=0; j<col_number; j++)
				{
					for (let k = 0; k < hml_maxcat; k++) 
					{
						if(data[i][j]==cat_list_2[k][j])
						{
	        				let x1 = 200*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
						    let y1 = 200*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
						    let z1 = 200*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);

						    let x2 = 200*albcat_R[k][j]/Math.abs(maxrgbvalue[0]);
						    let y2 = 200*albcat_G[k][j]/Math.abs(maxrgbvalue[1]);
						    let z2 = 200*albcat_B[k][j]/Math.abs(maxrgbvalue[2]);

	        				points.push( new THREE.Vector3(x1, y1, z1));
	        				points.push( new THREE.Vector3(x2, y2, z2));							
							break;
						}
					}
				}
			}

			const geometry = new THREE.BufferGeometry().setFromPoints( points );
			let line = new THREE.LineSegments( geometry, material );
			line.name = "link";
			scene.add( line );

		}

		function drawAlbxxPoints()
		{
			//draw points
			const geometry4 = new THREE.BufferGeometry();

			const vertices = [];
			const colors = [];

  			const color = new THREE.Color();

			material4 = new THREE.PointsMaterial({
			    size: 15,
			    vertexColors: true
			});

			let albxx_points;
			const particleCount = row_number;
			const range = 400;
			for (let i = 0; i < particleCount; i++) {

			    let x = 200*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
			    let y = 200*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
			    let z = 200*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);

			    vertices.push(x, y, z);

			    let vx = ( x / 400 ) + 0.5;
			    let vy = ( y / 400 ) + 0.5;
			    let vz = ( z / 400 ) + 0.5;

			    color.setRGB( vx, vy, vz );

			    colors.push( color.r, color.g, color.b );
			}

			// 加個 position 屬性記錄各頂點位置
			geometry4.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
			geometry4.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

			albxx_points = new THREE.Points(geometry4, material4);
			albxx_points.name = "albxx";
			scene.add(albxx_points);
		}

		function drawAlbcatPoints()
		{
			//draw points
			const geometry4 = new THREE.BufferGeometry();
			const vertices = [];
			const colors = [];
			
  			const color = new THREE.Color();

			material4 = new THREE.PointsMaterial({
			    size: 30,
			    vertexColors: true
			});

			material4.visible = false;

			let albcat_points;
			const particleCount = ncat;
			const range = 400;
			for (let i = 0; i < particleCount; i++) {

			    let x = 200*albcat[i+1][1]/Math.abs(maxrgbvalue[0]);
			    let y = 200*albcat[i+1][2]/Math.abs(maxrgbvalue[1]);
			    let z = 200*albcat[i+1][3]/Math.abs(maxrgbvalue[2]);

			    vertices.push(x, y, z);

			    let vx = ( x / 400 ) + 0.5;
			    let vy = ( y / 400 ) + 0.5;
			    let vz = ( z / 400 ) + 0.5;

			    color.setRGB( vx, vy, vz );

			    colors.push( color.r, color.g, color.b );
			}

			// 加個 position 屬性記錄各頂點位置
			geometry4.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
			geometry4.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

			albcat_points = new THREE.Points(geometry4, material4);
			albcat_points.name = "albcat";
			scene.add(albcat_points);
		}



		//renderer.render( scene, camera );
		function render() {
			requestAnimationFrame(render);
			cameraControl.update(); // 需設定 update
			renderer.render(scene, camera);
		}
		
}

function clearScene(){
	let albcat_object = scene.getObjectByName("albcat");
	let link_object = scene.getObjectByName("link");
	let albxx_object = scene.getObjectByName("albxx");
	scene.remove(albxx_object);
	scene.remove(albcat_object);
	scene.remove(link_object);

	var ele = $('#nodeModeIcon');
	if(ele.hasClass('fa-a'))
	{
		ele.removeClass('fa-a').addClass('fa-s');
	}
	else if(ele.hasClass('fa-c'))
	{
		ele.removeClass('fa-c').addClass('fa-s');
	}
	if($('#linkModeIcon').hasClass('clickMode'))
		$('#linkModeIcon').removeClass("clickMode").addClass("unclickMode");	
	//while(scene.children.length > 0)
	//	scene.remove(scene.children[0]);
}

function updateAlbxxPoints()
{
	let albxx_object = scene.getObjectByName("albxx");
	scene.remove(albxx_object);

	//draw points
	const geometry4 = new THREE.BufferGeometry();
	const vertices = [];
	const colors = [];

  	const color = new THREE.Color();

	material4 = new THREE.PointsMaterial({
		size: 15,
		vertexColors: true
	});

	if(nodeMode == 0)
		material4.visible = true;
	else if(nodeMode == 1)
		material4.visible = false;
	else
		material4.visible = true;

	let albxx_points;
	const particleCount = row_number;
	const range = 400;
	for (let i = 0; i < particleCount; i++) {

		let x;
		let y;
		let z;
		if($("#rgbcube_xx").attr("name")=="rgbcube_r")
            x = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
        else if($("#rgbcube_xx").attr("name")=="rgbcube_g")
            y = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
        else if($("#rgbcube_xx").attr("name")=="rgbcube_b")
            z = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
        if($("#rgbcube_yy").attr("name")=="rgbcube_g")
            y = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
        else if($("#rgbcube_yy").attr("name")=="rgbcube_r")
            x = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
        else if($("#rgbcube_yy").attr("name")=="rgbcube_b")
            z = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
        if($("#rgbcube_zz").attr("name")=="rgbcube_b")
            z = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);
        else if($("#rgbcube_zz").attr("name")=="rgbcube_r")
            x = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);
        else if($("#rgbcube_zz").attr("name")=="rgbcube_g")
            y = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);

		vertices.push(x, y, z);

		let vx = ( x / 400 ) + 0.5;
		let vy = ( y / 400 ) + 0.5;
		let vz = ( z / 400 ) + 0.5;

		color.setRGB( vx, vy, vz );

		colors.push( color.r, color.g, color.b );
	}

	// 加個 position 屬性記錄各頂點位置
	geometry4.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
	geometry4.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	albxx_points = new THREE.Points(geometry4, material4);
	albxx_points.name = "albxx";
	scene.add(albxx_points);
}

function updateAlbcatPoints()
{
	let albcat_object = scene.getObjectByName("albcat");
	scene.remove(albcat_object);

	//draw points
	const geometry4 = new THREE.BufferGeometry();
	const vertices = [];
	const colors = [];

  	const color = new THREE.Color();

	material4 = new THREE.PointsMaterial({
		size: 30,
		vertexColors: true
	});

	if(nodeMode == 0)
		material4.visible = false;
	else if(nodeMode == 1)
		material4.visible = true;
	else
		material4.visible = true;

	let albcat_points;
	const particleCount = ncat;
	const range = 400;
	for (let i = 0; i < particleCount; i++) {

		let x;
		let y;
		let z;
		if($("#rgbcube_xx").attr("name")=="rgbcube_r")
            x = 200*rgbcube_x*albcat[i+1][1]/Math.abs(maxrgbvalue[0]);
        else if($("#rgbcube_xx").attr("name")=="rgbcube_g")
            y = 200*rgbcube_x*albcat[i+1][1]/Math.abs(maxrgbvalue[0]);
        else if($("#rgbcube_xx").attr("name")=="rgbcube_b")
            z = 200*rgbcube_x*albcat[i+1][1]/Math.abs(maxrgbvalue[0]);
        if($("#rgbcube_yy").attr("name")=="rgbcube_g")
            y = 200*rgbcube_y*albcat[i+1][2]/Math.abs(maxrgbvalue[1]);
        else if($("#rgbcube_yy").attr("name")=="rgbcube_r")
            x = 200*rgbcube_y*albcat[i+1][2]/Math.abs(maxrgbvalue[1]);
        else if($("#rgbcube_yy").attr("name")=="rgbcube_b")
            z = 200*rgbcube_y*albcat[i+1][2]/Math.abs(maxrgbvalue[1]);
        if($("#rgbcube_zz").attr("name")=="rgbcube_b")
            z = 200*rgbcube_z*albcat[i+1][3]/Math.abs(maxrgbvalue[2]);
        else if($("#rgbcube_zz").attr("name")=="rgbcube_r")
            x = 200*rgbcube_z*albcat[i+1][3]/Math.abs(maxrgbvalue[2]);
        else if($("#rgbcube_zz").attr("name")=="rgbcube_g")
            y = 200*rgbcube_z*albcat[i+1][3]/Math.abs(maxrgbvalue[2]);

		vertices.push(x, y, z);

		let vx = ( x / 400 ) + 0.5;
		let vy = ( y / 400 ) + 0.5;
		let vz = ( z / 400 ) + 0.5;

		color.setRGB( vx, vy, vz );

		colors.push( color.r, color.g, color.b );
	}

	// 加個 position 屬性記錄各頂點位置
	geometry4.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
	geometry4.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	albcat_points = new THREE.Points(geometry4, material4);
	albcat_points.name = "albcat";
	scene.add(albcat_points);
}

function updateLink()
{
	let link_object = scene.getObjectByName("link");
	scene.remove(link_object);
	//draw lines
	const material = new THREE.LineBasicMaterial( { 
		color: 0x666666,
		transparent: true,
        opacity: 0.5
	} );

	if(lineMode==0)
		material.visible = false;
	else
		material.visible = true;

	const points = [];

	for(let i=0; i<row_number; i++)
	{
		for(let j=0; j<col_number; j++)
		{
			for (let k = 0; k < hml_maxcat; k++) 
			{
				if(data[i][j]==cat_list_2[k][j])
				{
					let x1;
					let y1;
					let z1;
					let x2;
					let y2;
					let z2;

					if($("#rgbcube_xx").attr("name")=="rgbcube_r")
			            x1 = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
			        else if($("#rgbcube_xx").attr("name")=="rgbcube_g")
			            y1 = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
			        else if($("#rgbcube_xx").attr("name")=="rgbcube_b")
			            z1 = 200*rgbcube_x*albxx[i+1][1]/Math.abs(maxrgbvalue[0]);
			        if($("#rgbcube_yy").attr("name")=="rgbcube_g")
			            y1 = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
			        else if($("#rgbcube_yy").attr("name")=="rgbcube_r")
			            x1 = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
			        else if($("#rgbcube_yy").attr("name")=="rgbcube_b")
			            z1 = 200*rgbcube_y*albxx[i+1][2]/Math.abs(maxrgbvalue[1]);
			        if($("#rgbcube_zz").attr("name")=="rgbcube_b")
			            z1 = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);
			        else if($("#rgbcube_zz").attr("name")=="rgbcube_r")
			            x1 = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);
			        else if($("#rgbcube_zz").attr("name")=="rgbcube_g")
			            y1 = 200*rgbcube_z*albxx[i+1][3]/Math.abs(maxrgbvalue[2]);

					if($("#rgbcube_xx").attr("name")=="rgbcube_r")
			            x2 = 200*rgbcube_x*albcat_R[k][j]/Math.abs(maxrgbvalue[0]);
			        else if($("#rgbcube_xx").attr("name")=="rgbcube_g")
			            y2 = 200*rgbcube_x*albcat_R[k][j]/Math.abs(maxrgbvalue[0]);
			        else if($("#rgbcube_xx").attr("name")=="rgbcube_b")
			            z2 = 200*rgbcube_x*albcat_R[k][j]/Math.abs(maxrgbvalue[0]);
			        if($("#rgbcube_yy").attr("name")=="rgbcube_g")
			            y2 = 200*rgbcube_y*albcat_G[k][j]/Math.abs(maxrgbvalue[1]);
			        else if($("#rgbcube_yy").attr("name")=="rgbcube_r")
			            x2 = 200*rgbcube_y*albcat_G[k][j]/Math.abs(maxrgbvalue[1]);
			        else if($("#rgbcube_yy").attr("name")=="rgbcube_b")
			            z2 = 200*rgbcube_y*albcat_G[k][j]/Math.abs(maxrgbvalue[1]);
			        if($("#rgbcube_zz").attr("name")=="rgbcube_b")
			            z2 = 200*rgbcube_z*albcat_B[k][j]/Math.abs(maxrgbvalue[2]);
			        else if($("#rgbcube_zz").attr("name")=="rgbcube_r")
			            x2 = 200*rgbcube_z*albcat_B[k][j]/Math.abs(maxrgbvalue[2]);
			        else if($("#rgbcube_zz").attr("name")=="rgbcube_g")
			            y2 = 200*rgbcube_z*albcat_B[k][j]/Math.abs(maxrgbvalue[2]);			        

	        		points.push( new THREE.Vector3(x1, y1, z1));
	        		points.push( new THREE.Vector3(x2, y2, z2));							
					break;
				}
			}
		}
	}

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	let line = new THREE.LineSegments( geometry, material );
	line.name = "link";
	scene.add( line );

}
/*
function clearScene(myObjects){
	// 從scene中刪除模型並釋放記憶體
	if(myObjects.length > 0){		
		for(var i = 0; i< myObjects.length; i++){
			var currObj = myObjects[i];
			
			// 判斷型別
			if(currObj instanceof THREE.Scene){
				var children = currObj.children;
				for(var i = 0; i< children.length; i++){
					deleteGroup(children[i]);
				}	
			}else{				
				deleteGroup(currObj);
			}
			scene.remove(currObj);
		}
	}
}
// 刪除group，釋放記憶體
function deleteGroup(group) {
	//console.log(group);
    if (!group) return;
    // 刪除掉所有的模型組內的mesh
    group.traverse(function (item) {
        if (item instanceof THREE.Mesh) {
            item.geometry.dispose(); // 刪除幾何體
            item.material.dispose(); // 刪除材質
        }
    });
}*/

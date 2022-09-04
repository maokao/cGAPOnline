(function( $ ){
$( document ).ready( function() {
	//$("#inputRange1").slider({});
	//$("#inputRange2").slider({});
	$( '.input-range').each(function(){
		var value = $(this).attr('data-slider-value');
		var separator = value.indexOf(',');
		if( separator !== -1 ){
			value = value.split(',');
			value.forEach(function(item, i, arr) {
				arr[ i ] = parseFloat( item );
			});
		} else {
			value = parseFloat( value );
		}
		$( this ).slider({
			formatter: function(value) {
				//console.log(value);
				return value;
			},
			min: parseFloat( $( this ).attr('data-slider-min') ),
			max: parseFloat( $( this ).attr('data-slider-max') ), 
			range: $( this ).attr('data-slider-range'),
			value: value,
			tooltip_split: $( this ).attr('data-slider-tooltip_split'),
			tooltip: $( this ).attr('data-slider-tooltip')
			
		});
	});
	
 } );
} )( jQuery );

function resetInputRange(minValue, maxValue)
{
        //$("#inputRange1").slider({range: [minValue,maxValue]});
        let range = (maxValue-minValue)/100;
        if(range<1 && range>=0.1)
        	range = 0.1;
        else if(range<0.1 && range>=0.01)
        	range = 0.01;
        else if(range<0.01 && range>=0.001)
        	range = 0.001;
        else if(range<0.001)
        	range = 0.0001;
        else
        	range = 1;

        $("#inputRange1").slider('setAttribute', 'step', range);
        $("#inputRange2").slider('setAttribute', 'step', range);

        $("#inputRange1").slider({min: minValue});
        $("#inputRange1").slider({max: maxValue});
        $("#inputRange1").slider('refresh');
        $('#inputRange1').slider('setValue',[minValue,maxValue]);

        $("#inputRange2").slider({min: minValue});
        $("#inputRange2").slider({max: maxValue});
        $("#inputRange2").slider('refresh');
        $('#inputRange2').slider('setValue',[minValue,maxValue]);
}

function setInputRange(setmin1, setmax1, setmin2, setmax2, minValue, maxValue)
{
        //$("#inputRange1").slider({range: [minValue,maxValue]});
        //
        //$("#inputRange1").slider({min: minValue, max: maxValue});
        //$("#inputRange1").slider('refresh');
		let range = (maxValue-minValue)/100;
        if(range<1 && range>=0.1)
        	range = 0.1;
        else if(range<0.1 && range>=0.01)
        	range = 0.01;
        else if(range<0.01 && range>=0.001)
        	range = 0.001;
        else if(range<0.001)
        	range = 0.0001;
        else
        	range = 1;

        $("#inputRange1").slider('setAttribute', 'step', range);
        $("#inputRange2").slider('setAttribute', 'step', range);

        $("#inputRange1").slider({min: minValue});
        $("#inputRange1").slider({max: maxValue});
        $("#inputRange2").slider('refresh');
        $('#inputRange1').slider('setValue',[setmin1,setmax1]);

        $("#inputRange2").slider({min: minValue});
        $("#inputRange2").slider({max: maxValue});
        $("#inputRange2").slider('refresh');
        $('#inputRange2').slider('setValue',[setmin2,setmax2]);
}
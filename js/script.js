/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */

// On your marks, get set...
$(document).ready(function(){
						
	// Cache the Window object
	$window = $(window);
	
	// 所有带有 data-type 属性的元素
	// each 在这里是遍历所有符合条件的元素用的
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// 素有 data type = background 属性的 section
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
	
		// offset() 返回当前元素距离 left 和 top 的偏移
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// window.scrollTop() 是当前 window 距离顶部的距离

			// 这个地方的逻辑需要稍微小心一点
			// 需要两个不等式 bound 这个事情
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// console.log($self.attr("id"));
				// sth like this
				// 50% -257.6666564941406px
				// if($self.attr("id") == "second"){
				// 	// console.log("second");
				// 	console.log(coords)
				// 	console.log($self)
				// }

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// // Check for any Videos that need scrolling
				// $('[data-type="video"]', $self).each(function() {
					
				// 	// Cache the video
				// 	var $video = $(this);
					
				// 	// There's some repetition going on here, so 
				// 	// feel free to tidy this section up. 
				// 	var yPos = -($window.scrollTop() / $video.data('speed'));					
				// 	var coords = (yPos + $video.data('offsetY')) + 'px';
	
				// 	$video.css({ top: coords });													
					
				// }); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

}); // document ready

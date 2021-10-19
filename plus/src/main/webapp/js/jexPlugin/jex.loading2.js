/**
 * LodingBar
 */
$(function() {
	if(top==window)
	{
		var _JexLoding = JexPlugin.extend({
			init : function() {
				this.queue = [];
				
				this.className = "jexLoading";
				var $mainDiv = $("<div id='jexLoading_main' style='display:none;position:absolute;top:0px;left:0px;width:100%;height:100%;z-index: 30000;'>");
				$mainDiv.addClass(this.className);
				
				var $backDiv = $("<div style='display:none;position:absolute;width:100%;height:100%;background-color:#000000;filter:alpha(opacity=20); opacity:0.2; -moz-opacity:0.2;'></div>");
				$backDiv.addClass(this.className);
				
				var $imgDiv = $("<div id='jexLoading_img' style='display:none;margin-left: 0 !important;position: absolute;text-align: center;top: 40%;width: 100%;'><img alt='잠시만 기다려주세요.' src='/img/loading/ajax-loading.gif' ></div>");
				$imgDiv.addClass(this.className);
				
				$mainDiv.append($backDiv);
				$mainDiv.append($imgDiv);
				
				$(document.body).append($mainDiv);
			},start : function() {
				if(this.queue.length == 0)
				{
					var wrap;
					var loadingBackWidth;
					if( !!top.document.getElementById("header") )
					{
						wrap = top.document.getElementById("header");
						loadingBackWidth = $(wrap).css("min-width");
					}
					else
					{
						loadingBackWidth = $(top).width();
					}
					$("#jexLoading_main", top.document).css("min-width", loadingBackWidth);
					$("#jexLoading_main", top.document).css("min-height", jex.getDocHeight());
					
					$("."+this.className, top.document).fadeIn(0);
				}
				
				this.queue.push( this.queue.length );
			},stop	: function() {
				this.queue.pop();
				
				if(this.queue.length == 0)
				{
					$("."+this.className, top.document).fadeOut(0);
				}
			}
		});
		jex.plugin.add("JEX_LODING", new _JexLoding());
	
	}
	
	jex.plugin.add("JEX_LODING",top.jex.plugin.get("JEX_LODING"));
});

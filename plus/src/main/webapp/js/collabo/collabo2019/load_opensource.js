var load_opensource = (function() {
	
	return {
		load : load
	};
	
	function load(nm, l_callback){

		//날짜
		if(nm === "moment"){
			if(typeof(moment) == "undefined"){
				loadNlog('/js/lib/moment.min.js');
				if(_FLOW_LANG === "ko"){
					loadNlog('/js/collabo/lang/kr.js', l_callback);
				} else{
					if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
						l_callback();
					} else {
						//done
					}
				}	
	    	} else {
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
	    	}

		//비동기
		} else if (nm === "rx"){
			if(typeof(Rx) == "undefined"){
				loadNlog('/js/lib/rx.all.js', l_callback);
        	} else {
    			if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
    				l_callback();
    			} else {
    				//done
    			}
        	}
			
		//엑셀내려받기
		} else if (nm === "excel"){
			if(typeof(XLSX) == "undefined"){
				loadNlog('/js/excel/xlsx.core.min.js');
			} else{
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
			}
			if(typeof(saveAs) == "undefined"){
				loadNlog('/js/excel/FileSaver.js', l_callback);
			} else {
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
			}
			
		//구글맵
		} else if (nm === "googleMap"){
			if(typeof(google) == "undefined"){
				loadNlog('https://maps.googleapis.com/maps/api/js?key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw&libraries=places', l_callback);
			} else{
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
			}
			
		//캘린더	
		} else if (nm === "calendar"){
			if(typeof($.fullCalendar) == "undefined"){
				loadNlog('/js/lib/fullcalendar/fullcalendar.js');
				loadNlog('/js/lib/fullcalendar/locale-all.js', l_callback);
			} else {
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
			}
		
		//미디엄에디터
		} else if (nm === "mediumEditor"){
        	if(typeof(MediumEditor) == "undefined"){
        		loadNlog('/js/lib/medium-editor/js/medium-editor.js', l_callback);			
        	} else {
    			if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
    				l_callback();
    			} else {
    				//done
    			}
        	}
        
        //차트
		} else if (nm === "jui"){
			if(typeof(jui) == "undefined"){
				loadNlog('/jui-chart-master/dist/chart.js', l_callback);			
			} else {
				if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
					l_callback();
				} else {
					//done
				}
			}
			
		//외부드라이브	
		} else if (nm === "drive"){
			if($('script[data=googleapi]').length == 0 && $('script[data=dropboxapi]').length == 0){
				var _HTML = '<script data="googleapi" type="text/javascript" src="https://apis.google.com/js/api.js"></script>';
				_HTML 	 += '<script data="dropboxapi"type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js"';
				_HTML 	 += 'id="dropboxjs" data-app-key="mby426ffrxlv4qn"></script>';
				$('body').append($(_HTML));
			} else {
				// done
			}
			if(coalesce3(l_callback) != "" && typeof l_callback === "function"){
				l_callback();
			} else {
				//done
			}
		} else {
			//done
		}
	}
	
	function loadNlog(source, callback){	
		$.loadScript(source, function(){
			if(coalesce3(callback) != "" && typeof(callback) == "function"){
				callback();
			} else {
				//done
			}
		});	
	}
})();
/* RU
* ProgressBarr - создаем прогресс бар в заданном элементе
* Params: 
* blInput 		(str) 	- id или класс элемента. ОБЯЗАТЕЛЬНЫЙ
* progress 		(num) 	- значение прогресса. По умолчанию: 0
* autoRender 	(bool) 	- рендеринг прогресс-бара. По умолчанию: true
* addCss 		(bool) 	- рендеринг стилей для прогресс-бара. По умолчанию: false
* Methods:
* addProgressBarr (blInput*) - добавить в выбранный элемент прогресс-бар
* changeProgress (progress*, blInput) - изменить значение прогресса
* Construct: 
* e = new ProgressBarr (blInput*, progress, autoRender, addCss)
* ===============================================================================
* EN
* ProgressBarr - create a progress bar in a given element
* Params:
* blInput 		(str) 	- id or class of the element. required
* progress 		(num) 	- the value of progress. Default: 0
* autoRender 	(bool) 	- rendering progress bar. Default: true
* addCss 		(bool) 	- rendering styles for the progress bar. Default: false
* Methods:
* addProgressBarr (blInput*) - add progress bar in selected item 
* changeProgress (progress*, blInput) -change the value of progress
* Construct: 
* e = new ProgressBarr (blInput*, progress, autoRender, addCss)
*/
window.ProgressBarr = function(blInput, progress, autoRender, addCss) {
		if(blInput === undefined) throw new Error('Sorry. Missing required argument: class or id');
		if(progress === undefined) var progress = 0; // если progress не определен, стартуем с 0
		if(autoRender === undefined) var autoRender = true; // если autoRender не определен, то рендерим прогресс-бар
		if(addCss === undefined) var addCss = false; // если добавление стилей не определено - не будем их рендерить

		var _self = {
			_bI: blInput,
			_pr: progress,
			_ar: autoRender,
			_acss: addCss,
			_tmpName: function(blInput) {
				return blInput.split(' ').join('-');
			},
			// получаем элемент по классу
			_getBlockInputByClass: function(blInput) {
				return document.getElementsByClassName(blInput)[0];
			},
			// получаем элемент по id
			_getBlockInputById: function(blInput) {
				return document.getElementById(blInput);
			},
			// находим элемент для вставки
			_findBlockInput: function(blInput) {
				if(_self._getBlockInputByClass(blInput) !== undefined) {
					var curBlock = _self._getBlockInputByClass(blInput);
					return curBlock;
				} else if(_self._getBlockInputById(blInput) !== undefined) {
					var curBlock = _self._getBlockInputById(blInput);
					return curBlock;
				} else {
					return false;
				}
			},
			// отрисовываем прогресс-бар
			_renderBarr: function(blInput) {				
				var tmp = _self._tmpName(blInput); // если ввели несколько классов - склеиваем их
				return 	 '<div class="' + tmp + '-barr barr_size_big">'
						+'<div class="' + tmp + '-barr__cavity">'
						+'<div class="' + tmp + '-barr__progress"></div>'
						+'<div class="' + tmp + '-barr__condition">0%</div>'
						+'</div>'		
						+'</div>';
			},
			// render css
			_renderCss: function() {
				// добавляем елемент style в head
				var head = document.getElementsByTagName('head')[0];
				var styleBlock = document.createElement("style");
				var cssStr = 	"*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}"
								+".barr_size_big{width:80%}.barr_size_small{width:40%}"
								+"div[class$='-barr__cavity']{background: #fff;height:10px;width:100%;margin:5px;border:1px solid #f7f7f7;border-top:2px solid #c4c4c4;-webkit-border-radius:10px;-moz-border-radius:10px;-ms-border-radius:10px;-o-border-radius:10px;border-radius:10px;-webkit-box-shadow:0 0 10px rgba(0,0,0,0.05);-moz-box-shadow:0 0 10px rgba(0,0,0,0.05);box-shadow:0 0 10px rgba(0,0,0,0.05);position:relative}"
								+"div[class$='-barr__progress']{height:10px;width:0;margin:-2px 0 0 -1px;border:1px solid #9af351;border-top:2px solid #b6f681;border-bottom:1px solid #65d00e;border-radius:10px;background:#9af351;background:-moz-linear-gradient(top,#9af351 0,#65d00e 50%,#9af351 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#9af351),color-stop(50%,#65d00e),color-stop(100%,#9af351));background:-webkit-linear-gradient(top,#9af351 0,#65d00e 50%,#9af351 100%);background:-o-linear-gradient(top,#9af351 0,#65d00e 50%,#9af351 100%);background:-ms-linear-gradient(top,#9af351 0,#65d00e 50%,#9af351 100%);background:linear-gradient(to bottom,#9af351 0,#65d00e 50%,#9af351 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='$color_progress_border',endColorstr='$color_progress_border',GradientType=0)}"
								+"div[class$='-barr__condition']{width:100%;height:10px;font-size:10px;font-weight:bold;position:absolute;top:-3px;z-index:10;left:47%}";
				head.appendChild(styleBlock);
				styleBlock.innerHTML = cssStr;
			},
			// вставляем прогресс-бар
			_insertBarr: function(blInput) {
				autoRender = _self._ar;
				addCss = _self._acss;
				// если нужно рендерим css
				if (addCss != false) { 
					_self._renderCss(); }
				// можно создавать объект не показывая прогресс бар 
				if (autoRender != false) {
					var currBlockInput = _self._findBlockInput(blInput);
					// проверяем существует ли прогресс бар в текущем блоке (при повторном создании объекта)
					var blockBarr  = currBlockInput.getElementsByClassName(_self._tmpName(blInput)+'-barr');
					if(blockBarr.length > 0){
						var parent = blockBarr[0].parentNode; 													// ссылка на родителя	
						var newBar = document.createElement('div'); 											// создаем элемент
						newBar.innerHTML = _self._renderBarr(blInput);
						parent.replaceChild(newBar, blockBarr[0]);												// заменяем существующий бар на новый
						} else {
						var contentBlockInput = _self._findBlockInput(blInput).innerHTML;
						_self._findBlockInput(blInput).innerHTML = contentBlockInput + _self._renderBarr(blInput);
					}
					
				} else {
					return false;
				};	
			},
			// устанавливаем прогресс
			_setProgress: function(progress, blInput) {
				if(blInput === undefined) var blInput = _self._bI;
				if(progress === undefined) throw new Error('Sorry. Missing required argument: progress');
				var tmp = _self._tmpName(blInput); // если ввели несколько классов - склеиваем их
				var currBarr = _self._findBlockInput(blInput); 
				currBarr.getElementsByClassName(tmp + '-barr__progress')[0].style.width = progress+'%'; // изменяем размер 
				currBarr.getElementsByClassName(tmp + '-barr__condition')[0].innerText =  progress+'%'; // меняем значение
			},
			// публичные методы
			public: {
				// рендер прогресс бара в заданном элементе (по классу или id)
				addProgressBarr: function(blInput){
					_self._insertBarr(blInput);
				},
				// изменяем статус прогресса
				changeProgress: function(progress, blInput) {
					_self._setProgress(progress, blInput);
				},
			},
		};
		// конструктор 
		if(_self.public.addProgressBarr(blInput) !== false) _self.public.changeProgress(progress, blInput);
		// открываем доступ к публичным методам
		return _self.public;
	}
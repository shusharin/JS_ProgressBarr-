// function initProgressBarr(classBarr,progress) { 
// 		// var progress;
// 		// var classBarr;
// 		// progress = 50;
// 		// classBarr = 'barr';
// 		document.getElementsByClassName(classBarr)[0].style.padding = '5px';
// 		document.getElementsByClassName(classBarr)[0].getElementsByClassName('barr__progress')[0].style.width = progress+'%';
// 		document.getElementsByClassName(classBarr)[0].getElementsByClassName('barr__condition')[0].innerText =  progress+'%';
// 	}

	var ProgressBarr, blInput, progress, autoRender, addCss;

	ProgressBarr = function(blInput, progress, autoRender, addCss) {
		if(blInput === undefined) throw new Error('Sorry. Missing required argument: class or id')
		if(progress === undefined) var progress = 0; // если progress не определен, стартуем с 0
		if(autoRender === undefined) var autoRender = true; // если autoRender не определен, то рендерим прогресс-бар
		if(addCss === undefined) var addCss = false; // если добавление стилей не определено - не будем их рендерить

		var _self = {
			_bI: blInput,
			_pr: progress,
			_ar: autoRender,
			_acss: autoRender,
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
				console.log(blInput);
				var tmp = _self._tmpName(blInput);
				return 	 '<div class="' + tmp + '-barr barr_size_big">'
						+'<div class="' + tmp + '-barr__cavity">'
						+'<div class="' + tmp + '-barr__progress"></div>'
						+'<div class="' + tmp + '-barr__condition">0%</div>'
						+'</div>'		
						+'</div>';
			},
			// render css
			_renderCss: function(blInput) {
				// return style
			}
			// вставляем прогресс-бар
			_insertBarr: function(blInput) {
				var contentBlockInput = _self._findBlockInput(blInput).innerHTML;
				_self._findBlockInput(blInput).innerHTML = contentBlockInput + _self._renderBarr(blInput);
			},
			// устанавливаем прогресс
			_setProgress: function(progress, blInput) {
				if(blInput === undefined) var blInput = _self._bI;
				// console.log(blInput);
				var tmp = _self._tmpName(blInput);
				var currBarr = _self._findBlockInput(blInput);
				currBarr.getElementsByClassName(tmp + '-barr__progress')[0].style.width = progress+'%';
				currBarr.getElementsByClassName(tmp + '-barr__condition')[0].innerText =  progress+'%';;
			},
			// публичные методы
			public: {
				addProgressBarr: function(blInput, autoRender){
					if(autoRender === undefined) var autoRender = _self._ar; // если autoRender не определен, то действуем по умолчанию
					if (autoRender != false) {
						// console.log(autoRender);
						_self._insertBarr(blInput);
					} else {
						console.log(autoRender);
						return false;
					};					
				},
				changeProgress: function(progress, blInput) {
					_self._setProgress(progress, blInput);
				},
			},
		};
		if(_self.public.addProgressBarr(blInput) !== false) _self.public.changeProgress(progress, blInput);
		
		return _self.public;
	}
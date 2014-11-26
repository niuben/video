/*
* 视频播放插件：通过用户设置，在页面生成视频文件。
* 具体功能：提供视频封面、循环播放、
*/
$.fn.video = function (options) {
	
	var _this = this;
	
	//默认设置，可以通过自定义覆盖
	var config = {
		cover: "",
		url: "",
		height: 320,
		width: 320,	
		loop: 0,
		controls: 0,
	};
	$.extend(config, options);
	
	/*
	* 初始化组件，生成初始封面图片、播放按钮
	* 点击播放按钮时，生成video节点，并绑定相关事件
	*/
	$.extend(this, {
		init: function(){
			//生成一个内置区域
			this.append('<div class="smartVideo"></div>');			
			this.$el = this.find(".smartVideo");
			this.$el.css({
				height: config.height + "px",
				width: config.width + "px"
			});
			
			/*
			*生成图片、播放按钮
			*/
			this.$el.append('<img src="' + config.cover + '" /><div class="play"></div><div class="loading"></div>');
			
			this.$cover = this.$el.find("img");
			this.$play = this.$el.find(".play");
			this.$loading = this.$el.find(".loading");

			this.$play.on("click", function(){

				_this.initVideo();

				//有的android手机，需要延迟触发play函数，不然video无法播放。				
				if($.os.iphone){
					_this.$video[0].play();
					return true;
				};
				
				setTimeout(function(){
					_this.$video[0].play();
				}, 0);
			});

		},
		initVideo: function() {
			
			if(this.isInitVideo) return false;
			this.isInitVideo = 1;

			var videoTpl = '<video height="' + config.height + '" width="' + config.width + '"';								
			videoTpl += config.loop ? ' loop="loop"' : "";					
			videoTpl += config.controls ? ' controls="controls"' : "";
			videoTpl += '></video>';

			this.$el.append(videoTpl);			
			this.$video = this.$el.find("video");

			var eventHandler = this.bind(this, this.handler);
			this.$video.on("play", eventHandler );
			this.$video.on('pause', eventHandler );
			this.$video.on('timeupdate', eventHandler );
			this.$video.on('ended', eventHandler );
			this.$video.on('error', eventHandler );
			
			this.$video.on("click", function(e){
				_this.$video[0].pause();
			});

			this.$video.attr("src", config.url);
		}
	});

	/*
	* 绑定事件：播放、暂定、重播
	*/
	$.extend(this, {
		handler: function(e){
			switch(e.type) {				
				case "play":
					this.view("loading");
					this.playing = 1;
				break;
				case "timeupdate":
					var currentTime = this.$video[0].currentTime;	
					if(currentTime && this.playing == 1){
						this.prevCurrentTime = currentTime;
						this.view("playing");						
					}
				break;				
				case "ended":
					this.view("pause");
				break;
				case "pause":
					this.view("pause");
					this.playing = 0;
				break;

			}
		},
		bind:function(context, fn){
			return function(){
				fn.apply(context, arguments);				
			}
		}
	});

	/*
	* 整体UI修改
	*/
	$.extend(this, {
		view: function(type){
			switch(type) {
				case "loading":
					this.$cover.show();
					this.$play.hide();
					this.$loading.show();
					this.$video.css({
						"width": config.width + "px",
						"height": config.height + "px",
						"opacity": 1
					}).attr({
						"width": config.width,
						"height": config.height
					});
				break;
				case "pause":
					this.$cover.show();
					this.$play.show();
					this.$loading.hide();
					this.$video.css({
						"opacity": 0,
						"width": "0px",
						"height": "0px"
					});
				break;
				case "playing":
					this.$cover.hide();
					this.$play.hide();
					this.$loading.hide();
					this.$video.css({
						"z-index": 10,
						"opacity": 1						
					});
				break;				
			}
		}
	});

	this.init();
};



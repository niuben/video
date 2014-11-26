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
		isAutoPlay: 0, 
		height: 320,
		width: 320,	
		isLoop: 0
	};
	$.extend(config, options);
	
	/*
	* 生成封面图片、播放按钮、视频
	*/
	$.extend(this, {
		init: function(){
			
			this.append('<div class="smartVideo"></div>');
			
			this.$el = this.find(".smartVideo");
			this.$el.css({
				height: config.height + "px",
				width: config.width + "px"
			});
			
			this.$el.append('<img src="' + config.cover + '" /><div class="play"></div><div class="loading"></div>');
			this.$cover = this.$el.find("img");
			this.$play = this.$el.find(".play");
			this.$loading = this.$el.find(".loading");

			this.$el.click(function(){
				!_this.isCreateVideo && _this.createVideo();
				if(!this.playing) {
					_this.$video[0].play();
				}else {
					_this.$video[0].pause();					
				}
			});

		},
		createVideo: function() {
			
			if(this.isCreateVideo) return false;
			this.isCreateVideo = 1;

			var videoTpl = '<video src="' + config.url + '" height="' + config.width + '" width="' + config.height + '"';					
			
			videoTpl += config.isAutoPlay ? ' autoplay="autoplay"' : "";
			videoTpl += config.isLoop ? ' loop="loop"' : "";					
			videoTpl += "></video>";

			this.$el.append(videoTpl);

			this.$video = this.find("video");					
			
			var eventHandler = this.bind(this, this.handler);
			this.$video.on("play", eventHandler );
			this.$video.on("canplay", eventHandler);
			this.$video.on('pause', eventHandler );
			this.$video.on('timeupdate', eventHandler );
			this.$video.on('ended', eventHandler );
			this.$video.on('error', eventHandler );

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
				case "canplay":
					this.view("playing");
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
					this.$cover.hide();
					this.$play.hide();
					this.$loading.show();
				break;
				case "pause":
					this.$cover.show();
					this.$play.show();
					this.$video.css("opacity", 0);
				break;
				case "playing":
					this.$loading.hide();
					this.$video.css("opacity", 1);
				break;
			}
		}
	});

	this.init();
};


$("div").video({
	cover: "http://bcs-sandbox.baidu.com/motuimage-1/1e5ce0edfd80e6048d75dfda3c6c061f.jpg",
	url: "http://bcscdn.baidu.com/motuvideo-1/628234e70ea403328817d44825a2c958.mp4",
	height: 400,
	width: 400
});
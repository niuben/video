smartvideo
========

### 一个移动端视频播放插件

  插件介绍：在html5中可以使用video标签播放视频，实际运用会有一些兼容性问题和操作不方便等问题。这个插件解决了一部分兼容问题，改进了一些交互。
  
  运用场景：需要在手机或者ipad播放视频
  
  引用文件： _jquery.smartvideo.css、_jquery.smartvideo.js、zepto.js

API
---
**参数**

<pre>
参数名称      默认值  	描述
cover         ""    	视频封面图
url           ""    	视频地址
width  		  320 		视频宽度
height        320    	视频高度
loop          1       	是否循环播放
controls	  0     	滑动开始触发,会传入event和当前页数
</pre>


代码示例
---------
 **Html**
 <pre>
&lt;div &gt;
&lt;/div&gt;
 </pre>
  
**Javascript**
<pre>
	$("div").video({
		cover: "http://p3.v.iask.com/595/514/136433491_2.jpg",
		url: "http://60.221.254.173/edge.v.iask.com/136435750.mp4?KID=sina,viask&Expires=1417104000&ssig=y7NWkb%2BooF&wshc_tag=1&wsts_tag=5475ab4c&wsid_tag=3d87a95c&wsiphost=ipdbm",
		height: 300,
		width: 400,
	});  
</pre>

版本历史
--------
v 0.0.1     beta    2014-11-26    具有播放单个视频功能
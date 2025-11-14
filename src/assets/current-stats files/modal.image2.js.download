SqueezeBox.handlers.image2=function(url)
{var size,tmp=new Image();this.asset=null;tmp.onload=tmp.onabort=tmp.onerror=(function(){tmp.onload=tmp.onabort=tmp.onerror=null;if(!tmp.width){this.onError.delay(10,this);return;}
var box=this.doc.getSize();box.x-=this.options.marginImage.x;box.y-=this.options.marginImage.y;size={x:tmp.width,y:tmp.height};if(size.x>box.x){size.y*=box.x / size.x;size.x=box.x;}else if(size.y>box.y){size.x*=box.y / size.y;}
size.x=size.x.toInt();size.y=size.y.toInt();this.asset=document.id(tmp);tmp=null;this.asset.width=size.x;this.asset.height=size.y;this.asset.setStyle('max-height',size.y.toInt()+'px');this.asset.setStyle('max-width',size.x.toInt()+'px');this.win.setStyle('max-width',size.x.toInt()+'px');function onShow(evt)
{this.win.setStyle('height','auto');}
this.addEvent('onShow',function()
{onShow.apply(this,arguments);this.removeEvent('onShow',onShow);});this.content.set('opacity',1);this.applyContent(this.asset,size);this.content.setStyle('height','auto');this.content.setStyle('width','auto');function onClose(evt)
{this.content.set('opacity',null);this.content.setStyle('height','');this.content.setStyle('width','');this.win.setStyle('height','');this.win.setStyle('max-width','');}
this.addEvent('onClose',function()
{onClose.apply(this,arguments);this.removeEvent('onClose',onClose);});}).bind(this);tmp.src=url;if(tmp&&tmp.onload&&tmp.complete)tmp.onload();return(this.asset)?[this.asset,size]:null;};SqueezeBox.parsers.image2=SqueezeBox.parsers.image;
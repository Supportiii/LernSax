
// <script type="text/javascript">//
window.ww=new function() {
this.is_ww=true;
this.p_no=1;
this.p_is_initialized=false;
this.p_top_iframe_zindex=70000;
this.p_top_opener={};
this.p_top_mouseover_no=-1;
this.is_dev=false;
this.p_form_is_changed=false;
this.p_form_ignore_changes=false;
this.p_msie8_resize_bug_fix=false;
this.browser={};
this.browser.is_ios=navigator.platform.match(/iPad|iPhone|iPod/);
this.browser.is_msie8=navigator.userAgent.match(/MSIE 8\.0/);
this.browser.is_msie6=(document.all && !window.XMLHttpRequest && !this.browser.is_msie8);
this.browser.p_flash_detected=null;
this.browser.is_flash_available=function() {
if(window.ww.browser.p_flash_detected===null) {
window.ww.browser.p_flash_detected=false;
try {
var a=navigator.plugins;
if(a && (a.length>0)) { // Fast alle Browser
for(var i in a) {
if(a[i].name && a[i].name.match(/Shockwave Flash/)) {
window.ww.browser.p_flash_detected=true;
}
}
} else { // IE
var obj=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
if(obj && !obj.activeXError) {
window.ww.browser.p_flash_detected=true;
}
}
} catch(err) {
}
}
return window.ww.browser.p_flash_detected;
};
this.init=function() {
if(!this.p_is_initialized) {
this.p_is_initialized=true;
this.p_no=top.ww.p_no++;
if(!window.original_open) {
window.original_open=window.open;
window.original_close=window.close;
try {
window.open=this.open;
window.close=function() { // IE9 ruft das trotzdem nicht auf ...
if(ww.is_dev) {
alert('window.close()');
}
ww.close();
}
} catch(e) {
}
}
$(function() {
$(document).on('mousemove touchmove',function(evt) {
if(ww.is_dev) {
ww.set_debug('Frame',ww.p_no);
var $iframe=ww.get_$iframe();
ww.set_debug('Frame css',$iframe.attr('style'));
ww.set_debug('Frame size',$iframe.attr('width')+'x'+$iframe.attr('height'));
ww.set_debug('Window size',$(window).width()+'x'+$(window).height());
ww.set_debug('Document size',$(document).width()+'x'+$(document).height());
}
ww.pointer_position(evt);
}).on('mouseup touchend click',function(evt) {
ww.pointer_position(evt);
ww.pointer_detach();
});
$(document).on('change','textarea,input:not([type|="hidden"],[type|="radio"],[type|="checkbox"])',function(evt) {
ww.p_form_is_changed=true;
});
var is_iframe=ww.is_iframe();
$('body').addClass(is_iframe?'mode_iframes':'mode_popups');
if(!$('#body_inner').length) {
if(ww.is_dev) {
alert('"body_inner" fehlt.');
}
}
if(ww.is_document()) {
if(ww.browser.is_ios && top.process_main_frame) {
top.process_main_frame();
}
$('#mode_switch img').attr('alt',lg(is_iframe?1110:1112)).attr('title',lg(is_iframe?1110:1112)).attr('src',is_iframe?'../pics/mode_popups.svg':'../pics/mode_iframes.svg');
$('img#top_mode').attr('alt',lg(is_iframe?1110:1112)).attr('title',lg(is_iframe?1110:1112)).attr('src',is_iframe?'../pics/top_mode_popups.svg':'../pics/top_mode_iframes.svg');
}
$(window).on('resize',function() {ww.p_fit_all();});
$(window).on('orientationchange',function() {ww.p_fit_all(1);});
ww.p_fit_all(1);
if(is_iframe) {
ww.set_debug('platform',navigator.platform);
if(ww.is_document()) {
top.document.title=window.document.title;
if((window.location.pathname.search('/55.php')<1) || (window.location.href.search('redirect_after_login')>1)) {
top.update_hash(window);
}
} else if(ww.is_popup()) {
$(document).on('mousedown',function(evt) {
if($(ww.get_iframe()).css('z-index')!=top.ww.p_top_iframe_zindex) {
ww.set_debug('action','raising');
$(ww.get_iframe()).css({zIndex:(++top.ww.p_top_iframe_zindex)});
if(ww.browser.is_msie8) {
ww.set_debug('MSIE 8.0','found');
$(ww.get_iframe()).stop().fadeOut(1).fadeIn(1);
}
}
});
var tfs=function() {
if(document.fullscreenEnabled) {
var $i,src;
ww.add_icon({
name: 'fullscreen',
class: 'toggle_fullscreen',
src: 'popup_fullscreen0',
title: lg(1120),
onclick: function() {
var $iframe=ww.get_$iframe();
var topdoc=top.document;
if(topdoc.fullscreenElement) {
topdoc.exitFullscreen();
} else {
ww.save_position();
$iframe.get(0).requestFullscreen().then(function() {
$i.attr({src:src.replace('0','1')});
window.setTimeout(function() {
top.$(top).one('fullscreenchange',function() {
$i.attr({src:src});
ww.load_position();
});
},10);
}).catch(function() {
alert('Denied. :-(');
});
}
}
});
$i=$('#popup_top_icons_icon_fullscreen').find('img');
src=$i.attr('src');
}
};
tfs();
ww.add_icon({
name: 'popup',
class: 'iframe_to_popup',
src: 'popup_open',
onclick: function() {ww.iframe_to_popup();},
title: lg(1100)
});
if(!$('.bottom_submits_outer').length) {
$('div#content_inner').append('<div class="bottom_submits_spacer"></div><div class="bottom_submits_outer"><input type="submit" class="submit" style="visibility:hidden" disabled></div>');
}
var $bot=$('div.bottom_submits_outer');
$bot.prepend('<div id="popup_resize_dragger">&#160;</div>');
$('table.popup_top_main').css({position:"fixed",zIndex:90001});
// $('#heading').html($bot.outerWidth()+' - '+$(window).width());
$('#popup_resize_dragger').css({paddingRight:($bot.outerWidth()-$(window).width())+'px'});
$('#popup_resize_dragger').on('mousedown touchstart',function(evt) {
evt.preventDefault();
try {
ww.pointer_position(evt);
} catch(err) {
}
top.ww.pointer_attach({element:ww.get_iframe(),action:'resize'});
});
$('.popup_top_left, .popup_top_title_left, .popup_top_title_middle, .popup_top_title_right, .popup_top_space').on('mousedown touchstart',function(evt) {
evt.preventDefault();
ww.pointer_position(evt);
top.ww.pointer_attach({element:ww.get_iframe(),action:'move'});
if(ww.is_dev) {
ww.get_$iframe().stop(true,true).fadeTo('fast',0.7);
}
}).css({cursor:'move'});
ww.jail();
}
} else {
if(ww.browser.is_msie8 && $('div.bottom_submits_outer').length) { // IE8 vergisst ab und an die Positionierung der Submit-Buttons
$(window).resize(function() {
if(ww.p_msie8_resize_bug_fix) {
window.clearTimeout(ww.p_msie8_resize_bug_fix);
}
ww.p_msie8_resize_bug_fix=window.setTimeout(function() {
$('.bottom_submits_outer').fadeOut(1).fadeIn(1);
},200);
});
$('.bottom_submits_outer').fadeOut(1).fadeIn(1);
}
}
if(ww.browser.is_msie6 && $('div.bottom_submits_outer').length) {
var t_ie6_bso=function() {
var $bot=$('div.bottom_submits_outer');
var $top=$('table.popup_top_main');
var $win=$(window);
$bot.css({position:'absolute',zIndex:900});
$top.css({position:'absolute',zIndex:900});
$bot.width($win.width()-$bot.outerWidth()+$bot.width());
$top.width($win.width()-$top.outerWidth()+$top.width());
$bot.offset({left:$win.scrollLeft(),top:($win.height()+$win.scrollTop()-$bot.outerHeight())});
$top.offset({left:$win.scrollLeft(),top:$win.scrollTop()});
}
t_ie6_bso();
window.setInterval(t_ie6_bso,1000);
$(window).resize(t_ie6_bso).scroll(t_ie6_bso);
}
});
}
}
this.is_document=function() {
return $('body.document').length?true:false;
}
this.is_popup=function() {
return $('body.popup_document').length?true:false;
}
this.is_top=function() {
return this.is_same(top);
}
this.is_iframe=function() {
return !this.is_same(top);
};
this.window=function() {
return window;
};
this.is_same=function(obj) { /** Selbes Fenster? Eigene Routine, da === bei IE6-8 nicht funktioniert */
try {
if(obj && obj.ww) {
obj=obj.ww;
}
return (obj && obj.p_no && (obj.p_no===this.p_no));
} catch(e) {
return false;
}
};
this.get_iframe=function() {
// ww.set_debug('ERROR','');
var arr=top.document.getElementsByTagName('iframe');
for(var i=0;i<arr.length;i++) {
var IF=arr[i];
if((IF.contentWindow && ww.is_same(IF.contentWindow)) || (IF.window && ww.is_same(IF.window))) { // W3C vs. IE
return IF;
}
}
// ww.set_debug('ERROR','IFrame not found.');
return null;
};
this.get_$iframe=function() {
return $(this.get_iframe());
}
this.get_opener=function() {
try {
if(this.is_iframe()) {
var IF=top.document.getElementById(top.ww.p_top_opener[ww.get_$iframe().attr('id')]);
return IF.contentWindow?IF.contentWindow:IF.window;
} else {
return window.opener;
}
} catch(e) {
// alert('ww: Opener not found.');
return null;
}
}
this.get_document=function() {
try {
var IF=top.document.getElementById('main_frame');
if(IF) {
return IF.contentWindow?IF.contentWindow:IF.window;
} else if(this.is_document()) {
return window;
} else {
return this.get_opener().get_document();
}
} catch(e) {
return null;
}
}
this.calc_centered_position=function(w,h) {
return {
left: Math.max(8,Math.round(($(top).width()-w)/2)),
top: Math.max(8,Math.round($(top).height()/2-h/1.75))
};
}
this.hip=function(d) {
var l=ww.get_popups().length;
d=(d?d:0);
if(d<l) {
top.$('body').addClass('has_iframe_popup');
} else {
top.$('body').removeClass('has_iframe_popup');
}
}
this.parse_window_features=function(params) {
var r={};
if(params) {
var a=params.replace(/\s/g,'').split(',');
for(var i in a) {
var a2=a[i].split('=',2);
r[a2[0]]=a2[a2.length-1];
}
}
return r;
};
this.open=function(url,target,params) {
if(top.use_iframes) {
if(top.document && top.document.fullscreenElement && top.document.exitFullscreen) {
top.document.exitFullscreen();
}
var ap=this.parse_window_features(params);
var w=ap.width;
var h=ap.height;
var c=this.calc_centered_position(w,h);
if(ap.bottom) {
c.top=$(top).height()-parseInt(h)-parseInt(ap.bottom)-6;
}
var id=ww.create_id();
top.$('body').append('<iframe id="'+id+'" class="iframe_popup" width="'+w+'" height="'+h+'" frameborder="0" src="'+url+'" style="display:none;position:absolute;margin:0;left:'+c.left+'px;top:'+c.top+'px;z-index:'+(++top.ww.p_top_iframe_zindex)+'" allowfullscreen></iframe>');
top.$('#'+id).fadeIn();
top.ww.p_top_opener[id]=ww.get_$iframe().attr('id');
var IF=top.document.getElementById(id);
ww.hip(-1);
ww.p_jail(IF);
return IF.contentWindow?IF.contentWindow:IF.window;
// return top;
} else {
return window.original_open(url,target,params);
}
};
this.close=function() {
if(ww.is_iframe()) { // ww anstatt this, ansonsten klappt window.close() nicht
if(ww.confirm_loose_form_changes()) {
var $iframe=ww.get_$iframe();
$iframe.fadeOut(function() {
ww.hip(1);
$iframe.remove();
});
ww.hip(1);
hide_tooltip();
}
} else {
window.setTimeout(function() {
$('<p style="margin:20px"></p>').text(lg(204)).appendTo($('body').empty());
},500);
window.original_close();
}
return false;
};
this.print=function() {
hide_tooltip();
window.print();
return false;
};
this.ppp;
this.p_pos=function(d) {
if(this.is_iframe()) {
var $iframe=this.get_$iframe();
if(d) {
this.ppp={
w:$iframe.width(),
h:$iframe.height(),
o:$iframe.offset()
};
} else if(this.ppp) {
$iframe.attr({'width':this.ppp.w,'height':this.ppp.h});
$iframe.offset(this.ppp.o);
this.p_jail(this.get_iframe());
}
}
};
this.save_position=function() {
this.p_pos(1);
};
this.load_position=function() {
this.p_pos(0);
};
this.resize_to=function(w,h,rc) {
if(this.is_iframe()) {
var iframe=this.get_iframe();
if(rc) {
var c=this.calc_centered_position(w,h);
$(iframe).css({left:c.left+'px',top:c.top+'px'});
}
this.dom.set_size(iframe,w,h);
this.p_jail(iframe);
} else {
try {
window.resizeTo(w,h);
if(ww.browser.is_msie8) {
$('.bottom_submits_outer').stop().fadeOut(1).fadeIn(1);
}
} catch(e) {
}
}
return false;
};
this.resize_by=function(dx,dy) {
if(this.is_iframe()) {
var $iframe=this.get_$iframe();
this.resize_to($iframe.width()+dx,$iframe.height()+dy);
} else {
try {
window.resizeBy(dx,dy);
if(ww.browser.is_msie8) {
$('.bottom_submits_outer').stop().fadeOut(1).fadeIn(1);
}
} catch(e) {
}
}
return false;
};
this.focus=function() {
window.focus();
};
this.p_iframe_to_popup_url=null;
this.set_iframe_to_popup_url=function(url) {
this.p_iframe_to_popup_url=url;
};
this.iframe_to_popup=function() {
if(this.is_iframe()) {
if(ww.confirm_loose_form_changes()) {
var width=$(window).width();
var height=$(window).height();
var p_opener=this.get_opener();
if(!p_opener) {
p_opener=top;
}
var url=this.p_iframe_to_popup_url?this.p_iframe_to_popup_url:window.location.href;
var t_popup=p_opener.original_open(url,'_blank','width='+width+',height='+height+',resizable=yes,scrollbars=yes,toolbar=no,status=yes,menubar=no');
ww.hip(1);
this.get_$iframe().remove();
}
}
return false;
};
this.switch_mode=function() {
if(ww.is_iframe()) {
if(ww.p_close_all_iframe_popups_confirm()) {
top.location.href=window.location.href;
}
} else {
window.location.href='9.php#'+window.location.pathname+window.location.search;
}
return false;
};
this.p_jail=function(elem,duration) {
duration=duration?duration:0;
var x0=180,x1=100,y0=2,y1=40,w0=250,h0=100,w1=24,h1=24;
var $top=$(top);
if(elem && ($top.width()>Math.max(x0+x1,h0)) && ($top.height()>Math.max(y0+y1,w0))) {
var $elem=$(elem);
var offset=$elem.offset();
var w=Math.max(w0,Math.min($elem.width(),$top.width()-w1));
var h=Math.max(h0,Math.min($elem.height(),$top.height()-h1));
var l=Math.max(x0-w,Math.min(offset.left,$top.width()-x1));
var t=Math.max(y0,Math.min(offset.top,$top.height()-y1));
if((l!=offset.left) || (t!=offset.top)) {
$elem.stop(true,true).animate({left:l+'px',top:t+'px'},duration);
}
if((w!=$elem.width()) || (h!=$elem.height())) {
ww.dom.set_size(elem,w,h);
}
try {
var win=elem.contentWindow?elem.contentWindow:elem.window;
if(win && win.ww && win.ww.is_popup()) {
win.ww.p_fit_all(1);
}
} catch(err) {
}
}
};
this.jail=function(duration) {
ww.p_jail(ww.get_iframe(),duration);
};
this.p_shrink=function() {
var max_width=$('#content_inner').width()-2;
var w,h;
if(max_width>50) {
$('.shrink').each(function() {
var $this=$(this);
var mw=max_width;
var ds=$this.attr('data-shrink');
if(ds) {
var tds=0;
ds.split(/, */).forEach(function(e) {
if(e && (e[0]>='0') && (e[0]<='9')) {
tds+=parseInt(e);
} else {
tds+=$(e).outerWidth();
}
});
mw-=tds;
}
var mmw=$this.attr('data-shrink-max-width');
if(!mmw) {
mmw=$this.css('max-width');
// alert(mmw);
mmw=(mmw.match(/^[0-9]+px$/)?parseInt(mmw):9999);
$this.attr({'data-shrink-max-width':mmw});
}
mw=Math.min(mw,mmw);
if((w=$this.attr('width')) && (h=$this.attr('height'))) {
$this.css({maxWidth:mw+'px',maxHeight:Math.ceil(mw*h/w)+'px'});
if($this.attr('usemap')) {
var name=$this.attr('usemap').substring(1);
var cw=$this.width();
var scale=(w<=cw)?1:(cw/w);
$('map[name="'+name+'"]').children('area[coords]').each(function() {
var $area=$(this);
var s=$area.data('coords');
if(!s) {
$area.data('coords',s=$area.attr('coords'));
}
if(s) {
var coords=s.split(',');
for(var i in coords) {
coords[i]=Math.round(scale*coords[i]);
}
$area.attr('coords',coords.join(','));
}
});
}
} else if($this.find('.border')) {
$this.css({maxWidth:(mw+2)+'px'});
} else {
$this.css({maxWidth:mw+'px'});
}
});
}
};
this.p_redraw_div_table=function() {
$('div.table').each(function() {
var $this=$(this);
var cols=0;
$this.children().each(function() {
if(cols && ('table-row'==$(this).css('display'))) {
return false;
}
cols++;
});
var ocols=$this.data('cols_count');
if(cols!=ocols) {
if(ocols) {
$this.css({display:'block'});
}
window.setTimeout(function() {
$this.css({display:'table'});
$this.data('cols_count',cols);
},0);
};
});
};
this.p_fit=function($outer,$elements_measure,$elements_resize,$temp_resize,cssMaxWidth) {
var w=$outer.width();
if($temp_resize) {
$temp_resize.width(2048);
}
if(cssMaxWidth) {
$elements_resize.css({maxWidth:''});
} else {
$elements_resize.width('');
}
var d=-w;
$elements_measure.each(function() {
d+=$(this).outerWidth(true);
});
if(d>0) {
$elements_resize.not('select').css({overflow:'hidden'});
var wes=0;
$elements_resize.each(function() {
wes+=$(this).width();
});
var q=Math.max(0,1-d/wes);
$elements_resize.each(function() {
var w=Math.max(16,Math.floor($(this).width()*q));
if(cssMaxWidth) {
$(this).css({maxWidth:w+'px'});
} else {
$(this).width(w);
}
if(!$(this).attr('title')) {
$(this).attr('title',$(this).text());
}
});
}
if($temp_resize) {
$temp_resize.width('auto');
}
}
this.p_fit_fast=function() {
if(ww.is_popup) {
ww.p_fit($(window),$('table.popup_top_main'),$('#heading'),null,true);
ww.p_fit($(window),$('.bottom_submits_outer').children(),$('.bottom_submits_outer input, .bottom_submits_outer select'));
}
}
this.p_fit_slow=function() {
$('div.block_main').each(function() {
var $this=$(this);
ww.p_fit($this,$this.find('table.block_head td'),$this.find('td.block_head_inactive_title, td.block_head_active_title'),$this,true);
ww.p_fit($this,$this.find('table.block_bottom'),$this.find('table.block_bottom select'));
});
this.p_shrink();
this.p_redraw_div_table();
}
this.p_fit_slow_timeout=null;
this.p_fit_all=function(init) {
ww.p_fit_fast();
if(ww.p_fit_slow_timeout) {
window.clearTimeout(ww.p_fit_slow_timeout);
}
if(init) {
ww.p_fit_slow();
}
ww.p_fit_slow_timeout=window.setTimeout(function() {
ww.p_fit_slow_timeout=null;
ww.p_fit_slow();
},100);
}
this.get_popups=function() { /** Alle "Pop-up"-window-Objekte */
var arr=[];
top.$('iframe').each(function() {
var win=this.contentWindow?this.contentWindow:this.window;
if(win && win.ww && win.ww.is_iframe() && win.ww.is_popup()) {
arr.push(win);
}
});
return arr;
};
this.p_close_all_iframe_popups_confirm=function() {
var result=true;
if(this.is_iframe()) {
var arr=this.get_popups();
if(arr && arr.length) {
if(result=confirm(lg(1200,arr.length))) {
for(var i in arr) {
arr[i].ww.close();
}
}
}
}
return result;
}
this.confirm_logout=function() {
return ww.p_close_all_iframe_popups_confirm();
}
this.confirm_loose_form_changes=function() {
if(ww && ww.p_form_is_changed && !ww.p_form_ignore_changes) {
if(confirm(lg(1210))) {
ww.p_form_ignore_changes=true;
} else {
return false;
}
}
return true;
}
this.add_icon=function(p) {
if(!p['before'] || !$(p['before']).length) {
p['before']='td.popup_top_icons_icon';
}
if(!p['src'].match(/[.]/)) {
p['src']='../pics/'+p['src']+'.svg'
}
var $tds=$('<td class="popup_top_icons_icon'+(p['class']?(' '+p['class']):'')+'" id="popup_top_icons_icon_'+p['name']+'"><a href="#"><img src="'+p['src']+'" class="ip mo" alt=""></a></td><td class="popup_top_icons_space '+p['class']+'" id="popup_top_icons_space_'+p['name']+'"><img src="/0.gif" alt=""></td>').insertBefore($(p.before).last());
$tds.find('img').first().attr({alt:p['title'],title:p['title']});
$tds.find('a').on('click',function(evt) {
evt.preventDefault();
var f=p['onclick'];
f();
});
};
this.p_pointer_attachments=[];
this.pointer_attach=function(arr) {
if(arr) {
var $e=$(arr['element']);
if($e.length==1) {
arr['element_is_iframe']=($e.get(0).nodeName=='IFRAME');
arr['element_offset']=$e.offset();
arr['element_width']=$e.width();
arr['element_height']=$e.height();
arr['pointer_offset']=this.pointer_position();
this.p_pointer_attachments.push(arr);
this.set_debug('action',arr['action']);
} else {
this.set_debug('action','Element not found.');
}
}
}
this.pointer_detach=function() {
for(var i in this.p_pointer_attachments) {
var arr=this.p_pointer_attachments[i];
this.p_jail(arr['element'],'fast');
if(arr['element_is_iframe'] && ww.is_dev) {
$(arr['element']).stop(true,true).fadeTo('fast',1);
}
}
this.p_pointer_attachments=[];
if(!this.is_top()) {
top.ww.pointer_detach();
}
this.set_debug('action','none');
}
this.p_pointer_position={left:-1,top:-1};
this.pointer_position=function(p) {
if(!p) {
return this.p_pointer_position;
} else if(p.originalEvent) {
var t_p=p;
try {
if(typeof(p.originalEvent.targetTouches[0].pageX)!='undefined') {
t_p=p.originalEvent.targetTouches[0];
}
} catch(e) {
}
if(t_p.pageX && t_p.pageY) {
this.pointer_position({left:t_p.pageX,top:t_p.pageY});
if(this.p_pointer_attachments && this.p_pointer_attachments.length) {
try {
p.preventDefault();
} catch(e) {
ww.set_debug('Error','p.preventDefault()');
}
}
}
} else {
this.p_pointer_position=p;
if(this.is_top()) {
this.set_debug('Pointer@Window',p.left+'x'+p.top);
} else {
var $win=$(window);
var offset=this.get_$iframe().offset();
this.set_debug('Pointer@Frame',p.left+'x'+p.top);
try {
top.ww.pointer_position({left:offset.left+p.left-$win.scrollLeft(),top:offset.top+p.top-$win.scrollTop()});
this.set_debug('Scroll',$win.scrollLeft()+'x'+$win.scrollTop());
if(top.ww.top_mouseover_no!==ww.p_no) {
top.ww.top_mouseover_no=ww.p_no;
hide_tooltip();
}
} catch(e) {
}
}
for(var i in this.p_pointer_attachments) {
var arr=this.p_pointer_attachments[i];
if(arr) {
var $e=$(arr['element']);
if(arr['action']==='move') {
this.set_debug('action','moving');
$e.offset({left:arr['element_offset'].left+p.left-arr['pointer_offset'].left,top:arr['element_offset'].top+p.top-arr['pointer_offset'].top});
} else if(arr['action']==='resize') {
this.set_debug('action','resizing');
var min_width=Math.max(50,arr['element_width']+p.left-arr['pointer_offset'].left);
var min_height=Math.max(50,arr['element_height']+p.top-arr['pointer_offset'].top);
this.dom.set_size(arr['element'],min_width,min_height);
}
}
}
}
};
this.p_debug={jQuery:$.fn.jquery,i:0};
this.get_debug=function() {
return top.ww.p_debug;
};
this.set_debug=function(name,html) {
if(this.is_dev) {
try {
var t_opener=window;
var t_operer2;
while(t_opener2=t_opener.ww.get_opener()) {
t_opener=t_opener2;
}
t_opener.top.ww.p_debug['i']++;
t_opener.top.ww.p_debug[name]=html;
} catch(err) {
}
}
};
this.p_top_create_id=0;
this.create_id=function() {
var dt=new Date();
return 'auto_'+(++top.ww.p_top_create_id)+'_'+dt.getTime()+'_'+dt.getMilliseconds();
};
this.dom=new function() {
this.set_size=function(e,w,h) {
ww.set_debug('set_size',w+'x'+h);
if(e) {
if(e.nodeName=='IFRAME') {
$(e).attr('width',w).attr('height',h);
if(ww.browser.is_ios) {
try {
$(e).css({overflow:'hidden'});
var cw=e.contentWindow;
var $t=$(cw.document.getElementById('body_inner'));
if($t) {
$t.css({overflow:'auto',display:'block',position:'absolute',width:w+'px',height:h+'px'});
ww.set_debug('iOS',$t.width()+'x'+$t.height());
if(cw.ww && cw.ww.is_document && cw.ww.is_document()) {
$t.css({'-webkit-overflow-scrolling':'touch' }); // -> Fehldarstellung in Pop-ups
}
}
} catch(err) {
}
}
} else {
$(e).width(w).height(h);
}
}
};
};
this.form=new function() {
this.set_ignore_changes=function(b) {
ww.p_form_ignore_changes=b;
};
this.set_is_changed=function(b) {
ww.p_form_is_changed=b;
};
};
};
window.ww.init();
// ~ep~
$(function() {
$('.popup_document.logged_in .block_head_inactive_title a').on('click',function(event) {
if(!ww.confirm_loose_form_changes()) {
event.stopImmediatePropagation();
event.preventDefault();
}
});
});
//
var location_dir=window.location.pathname.replace(/\/[^\/]+$/,'');
var is_document=false;
var is_popup=false;
var disable_tooltips=0;
var enable_autoupload=1;
var overwrite_cms_data=null;
var ww_message_delay=1000;
var slideshow_delay=5000;
var session_regexp=/sid=([0-9]+)/;
var session_id=session_regexp.exec(window.location.search+'&sid=0')[1];
var arr_image_gallery=new Array();
var resizePopupMax=250;
var resizePopupTimeout=100;
//
if(!top.cms_data) {
$.getJSON('cms_data.json',function(data,status) {
top.cms_data=data;
});
}
$(function() {
if($('#content_right').length) {
if(!$('.content_right_inner').length) {
$('#content_right').remove();
var arr_parts=['outer','top','main','inner','footer','bottom_spacer','bottom'];
for(var i in arr_parts) {
var s=arr_parts[i];
$('.content_narrow_'+s).addClass('content_'+s).removeClass('content_narrow_'+s);
}
}
}
});
function lg(id,p1,p2,p3,p4,p5) {
var translations=
{"2":{
"en":"You must log in to use this function.",
"de":"Um diese Funktion nutzen zu k&#246;nnen, m&#252;ssen Sie sich einloggen.",
"fr":"Pour pouvoir utiliser cette fonction vous devez &#234;tre connect&#233;.",
"es":"Para utilizar esta funci&#243;n, es necesario que est&#233; conectado/a.",
"it":"Per usare questa funzione lei deve collegarsi.",
"tr":"Bu &#304;&#351;lemi kullanmak i&#231;in giri&#351; yapman&#305;z gerekli."
},"10":{
"en":"Your browser does not support this feature.",
"de":"Ihr Browser unterst&#252;tzt diese Funktion nicht.",
"fr":"Votre navigateur ne supporte pas cette fonction.",
"es":"Su navegador no soporta esta funci&#243;n.",
"it":"Il vostro browser non supporta questa funzione.",
"tr":"Taray&#305;c&#305;n&#305;z bu &#246;zelli&#287;i desteklemiyor."
},"100":{
"en":"Loading ...",
"de":"Lade ...",
"fr":"Chargement ...",
"es":"Cargando ...",
"it":"Caricamento in corso ...",
"tr":"Loading ..."
},"102":{
"en":"Please wait ...",
"de":"Bitte warten ...",
"fr":"Merci de patienter ...",
"es":"Espere por favor ...",
"it":"Attendere, per cortesia ...",
"tr":"L&#252;tfen Bekleyin ..."
},"200":{
"en":"An error occurred.",
"de":"Es ist ein Fehler aufgetreten.",
"fr":"Une erreur est survenue.",
"es":"Ha ocurrido un error.",
"it":"Si &#232; verificato un errore.",
"tr":"Bir hata olu&#351;tu."
},"202":{
"en":"Technical information:",
"de":"Technische Informationen:",
"fr":"Informations techniques:",
"es":"Informaciones t&#233;cnicas:",
"it":"Informazioni tecniche:",
"tr":"Teknik Bilgiler:"
},"204":{
"en":"This window could not be closed. Please close it manually.",
"de":"Das Fenster konnte nicht geschlossen werden. Bitte schlie&#223;en Sie es manuell.",
"fr":"La fen&#234;tre ne pouvait pas &#234;tre ferm&#233;e. Veuillez le fermer manuellement.",
"es":"No se pudo cerrar la ventana. Por favor, cierre la ventana manualmente.",
"it":"La finestra non poteva essere chiusa. Si prega di chiuderla manualmente.",
"tr":"Pencere kapat&#305;lamad&#305;. L&#252;tfen el ile kapat&#305;n."
},"206":{
"en":"Upload failed.",
"de":"Upload fehlgeschlagen.",
"fr":"Le t&#233;l&#233;chargement a &#233;chou&#233;.",
"es":"Error de subida.",
"it":"Upload non riuscito.",
"tr":"Y&#252;kleme ba&#351;ar&#305;s&#305;z oldu."
},"210":{
"en":"An error occurred while connecting to the server.",
"de":"Bei der Verbindung zum Server ist ein Fehler aufgetreten.",
"fr":"Erreur de connexion avec le serveur.",
"es":"Error al conectar con el servidor.",
"it":"Errore con la connezione con il server.",
"tr":"Ana Sunucu ile ba&#287;lant&#305;da hata olu&#351;tu."
},"300":{
"en":"Your entries in the fields \"%1\" and\"%2\" must be identical.",
"de":"Ihre Eingaben in den Feldern \"%1\" und \"%2\" m&#252;ssen identisch sein.",
"fr":"Vos entr&#233;es dans les zones \"%1\" et \"%2\" doivent &#234;tre identiques.",
"es":"Sus entradas en los campos \"%1\" y \"%2\" deben ser id&#233;nticas.",
"it":"I campi \"%1\" e \"%2\" devono essere identici.",
"tr":"\"%1\" ve \"%2\" alanlar&#305;ndaki giri&#351;leriniz ayn&#305; olmal&#305;d&#305;r."
},"400":{
"en":"Download table as OpenDocument Spreadsheet (.ods)",
"de":"Tabelle als OpenDocument Spreadsheet (.ods) herunterladen",
"fr":"T&#233;l&#233;charger les tableaux en tant qu&#8217; OpenDocument Spreadsheet (.ods)",
"es":"Descargar tabla como OpenDocument Spreadsheet (.ods)",
"it":"Scaricare le tabelle come OpenDocument Spreadsheet (.ods)",
"tr":"Tabloyu OpenDocument Spreadsheet (.ods) olarak indirin\n"
},"790":{
"en":"Text",
"de":"Text",
"fr":"Texte",
"es":"Texto",
"it":"Testo",
"tr":"Metin"
},"800":{
"en":"Help",
"de":"Hilfe",
"fr":"Aide",
"es":"Ayuda",
"it":"Aiuto",
"tr":"Yardim"
},"801":{
"en":"Styles preview",
"de":"Format-Vorschau",
"fr":"WYSIWYG",
"es":"Vista previa del formato",
"it":"Anteprima del formato",
"tr":"WYSIWYG"
},"802":{
"en":"Bold",
"de":"Fett",
"fr":"Gras",
"es":"Negrita",
"it":"Grassetto",
"tr":"Kalin"
},"804":{
"en":"Italic",
"de":"Kursiv",
"fr":"Italique",
"es":"Cursiva",
"it":"Corsivo",
"tr":"Italik"
},"806":{
"en":"Underlined",
"de":"Unterstrichen",
"fr":"Souligner",
"es":"Subrayado",
"it":"Sottolineato",
"tr":"Alti &#199;izili"
},"808":{
"en":"Striked out",
"de":"Durchgestrichen",
"fr":"Barr&#233;",
"es":"Tachado",
"it":"Cancellato",
"tr":"&#252;st&#252; &#231;izildi"
},"809":{
"en":"Subscript",
"de":"Tiefgestellt",
"fr":"Indice",
"es":"Sub&#237;ndice",
"it":"Basso",
"tr":"Al&#231;altildi"
},"810":{
"en":"Superscript",
"de":"Hochgestellt",
"fr":"Exposant",
"es":"Super&#237;ndice",
"it":"Alto",
"tr":"Dikey"
},"812":{
"en":"Link to file from file storage",
"de":"Link auf Datei aus Dateiablage setzen",
"fr":"Choisir depuis le classeur",
"es":"Enlace a un archivo en un servidor de archivos",
"it":"Scegliere da archivio file",
"tr":"Klas&#246;r Listesi"
},"820":{
"en":"The input field contains elements which cannot be displayed in the styles preview and therefore will be lost. Are you sure you want to continue?",
"de":"Das Eingabefeld enth&#228;lt Elemente, die in der Format-Vorschau nicht dargestellt werden k&#246;nnen und deshalb verloren gehen. M&#246;chten Sie trotzdem fortfahren?",
"fr":"Le champ contient des &#233;l&#233;ments qui ne pourront pas &#234;tre affich&#233;s et qui seront donc perdus. Souhaitez-vous vraiment continuer?",
"es":"El campo de entrada contiene elementos que no se pueden mostrar en la vista previa y por eso pueden desaparecer. &#191;Est&#225; seguro/a que desea continuar?",
"it":"I campi di input contengono elementi non visualizzabili attraverso l'anteprima del formato e verranno persi. Volete continuare?",
"tr":"Emin misiniz?"
},"900":{
"en":"Copy to Clipboard",
"de":"In Zwischenablage kopieren",
"fr":"Copier dans le Presse-papiers",
"es":"Copiar al portapapeles",
"it":"Copia negli Appunti",
"tr":"Panoya Kopyala"
},"902":{
"en":"Text copied to clipboard.",
"de":"Text in Zwischenablage kopiert.",
"fr":"Texte copi&#233; dans le Presse-papiers",
"es":"Texto copiado en el Portapapeles",
"it":"Testo copiato negli Appunti",
"tr":"Panoya kopyalanan metin"
},"904":{
"en":"Text could not be copied.",
"de":"Der Text konnte nicht kopiert werden.",
"fr":"Une erreur est survenue.",
"es":"Ha ocurrido un error.",
"it":"Si &#232; verificato un errore.",
"tr":"Bir hata olu&#351;tu."
},"910":{
"en":"Generate QR code",
"de":"QR-Code erzeugen",
"fr":"G&#233;n&#233;rer le QR-Code",
"es":"Generar el c&#243;digo QR",
"it":"Generare il codice QR",
"tr":"QR Kodu Olu&#351;turun"
},"912":{
"en":"Graphic copied to clipboard.",
"de":"Grafik in Zwischenablage kopiert.",
"fr":"Graphique copi&#233; dans le presse-papiers.",
"es":"Gr&#225;fico copiado al portapapeles.",
"it":"Grafica copiata negli appunti.",
"tr":"Grafik panoya kopyaland&#305;."
},"1016":{
"en":"More functions",
"de":"Weitere Funktionen",
"fr":"Autres actions",
"es":"M&#225;s funciones",
"it":"Altre funzioni",
"tr":"Di&#287;er &#304;&#351;levler"
},"1018":{
"en":"Expand",
"de":"Aufklappen",
"fr":"D&#233;velopper",
"es":"Abrir",
"it":"Aprire",
"tr":"A&#231;"
},"1019":{
"en":"Collapse",
"de":"Zuklappen",
"fr":"R&#233;duire",
"es":"Cerrar",
"it":"Chiudere",
"tr":"Kapat"
},"1033":{
"en":"You can upload a maximum of %1 MB of files using drag and drop. For larger files please use the \"normal\" upload.",
"de":"Per Drag & Drop k&#246;nnen maximal %1 MB gro&#223;e Dateien hochgeladen werden. F&#252;r gr&#246;&#223;ere Dateien verwenden Sie bitte den \"normalen\" Upload.",
"fr":"Le t&#233;l&#233;versement par cliquer & d&#233;poser est limit&#233; &#224; %1 Mo. Pour des fichiers plus volumineux, veuillez utiliser le t&#233;l&#233;versement \"normal\".",
"es":"Mediante drag 1 drop puede subir archivos con un tama&#241;o m&#225;ximo de %1 MB. Si desea subir archivos m&#225;s grandes, debe utilizar la subida \"normal\".",
"it":"Con Drag & Drop possono essere caricati al massimo %1 MB di dati. Per quantit&#224; maggiori usare l'Upload \"tradizionale\".",
"tr":"Maks. %1MB"
},"1100":{
"en":"Open as a pop-up",
"de":"Als Pop-up-Fenster &#246;ffnen",
"fr":"Ouvrir comme pop-up",
"es":"Abrir como pop-up",
"it":"Aprire come pop-up",
"tr":"Pop-up olarak a&#231;"
},"1110":{
"en":"Switch to: Display contents in pop-up windows",
"de":"Umschalten auf: Inhalte in Pop-up-Fenstern anzeigen",
"fr":"Passer en mode de lecture dans les fen&#234;tres surgissantes",
"es":"Cambiar a: Ver contenidos en ventana pop-up",
"it":"Modificare in: Visualizza i contenuti con la finestra di pop-up.",
"tr":"&#350;una ge&#231;: &#304;&#231;eri&#287;i a&#231;&#305;l&#305;r pencerelerde g&#246;r&#252;nt&#252;le"
},"1112":{
"en":"Switch to: Display contents in the main window",
"de":"Umschalten auf: Inhalte im Hauptfenster einblenden",
"fr":"Passer en mode de lecture dans la fen&#234;tre principale",
"es":"Cambiar a: Ver contenidos en ventana principal",
"it":"Modificare in: Visualizza i contenuti nella finestra principale.",
"tr":"&#350;una ge&#231;: &#304;&#231;eri&#287;i ana pencerede g&#246;r&#252;nt&#252;le"
},"1120":{
"en":"Toggle Fullscreen",
"de":"Vollbildmodus umschalten",
"fr":"Activer/d&#233;sactiver le mode plein &#233;cran",
"es":"Activar/desactivar pantalla completa",
"it":"Attiva/disattiva schermo intero",
"tr":"Tam Ekrana Ge&#231;"
},"1200":{
"en":"%1 window(s) will be closed. Are you sure?",
"de":"Es wird/werden %1 Fenster geschlossen. Sind Sie sicher?",
"fr":"Fermeture de %1 fen&#234;tre(s). Voulez-vous continuer?",
"es":"Va ha cerrar %1 ventana(s). &#191;Est&#225; seguro/a?",
"it":"%1 finestra verr&#224; chiusa: confermate?",
"tr":"%1 pencere kapat&#305;lacak. Emin misiniz?"
},"1210":{
"en":"Your changes will be lost. Are you sure?",
"de":"Ihre &#196;nderungen gehen verloren. Sind Sie sicher?",
"fr":"Vos modifications seront ignor&#233;es. Voulez-vous continuer?",
"es":"Va ha perder sus modificaciones. &#191;Est&#225; seguro/a?",
"it":"I cambiamenti verranno perso: confermate?",
"tr":"De&#287;i&#351;iklikleriniz kaybolacak. Emin misiniz?"
},"1212":{
"en":"Target window is already closed!",
"de":"Das Ziel-Fenster wurde bereits geschlossen!",
"fr":"La fen&#234;tre est d&#233;j&#224; ferm&#233;e.",
"es":"La ventana destinada ya ha sido cerrada",
"it":"La finestra di selezione &#232; gi&#224; stata chiusa!",
"tr":"Hedef-Pencere zaten kapal&#305;!"
},"1220":{
"en":"Click to close",
"de":"Zum Schlie&#223;en anklicken",
"fr":"Cliquer pour fermer",
"es":"Pulse para cerrar",
"it":"Clicca per chiudere",
"tr":"Ekran&#305; kapat"
}}
;
var locale=$('html').attr('lang');
var result='['+id+']';
if(locale && translations[id] && translations[id][locale]) {
result=html_entity_decode(translations[id][locale]);
}
return result.replace(/%1/,p1).replace(/%2/,p2).replace(/%3/,p3).replace(/%4/,p4).replace(/%5/,p5);
};
function json_encode(o) {
var result='';
if(o==null) {
result+='null';
} else {
switch(typeof(o)) {
case 'undefined':
result+='null';
break;
case 'array':
result+='[';
var i=0;
for(var x in o) {
result+=(i>0?',':'')+json_encode(o[x]);
i++;
}
result+=']';
break;
case 'object':
result+='{';
var i=0;
for(var x in o) {
result+=(i>0?',':'')+json_encode(x)+':'+json_encode(o[x]);
i++;
}
result+='}';
break;
case 'boolean':
result+=(o?'true':'false');
break;
case 'number':
result+=o.toString();
break;
case 'string':
result+='"'+o.replace(/"/,'\\"').replace(/\\/,'\\\\')+'"';
break;
default:
result+='"'+typeof(o)+'"';
break;
}
}
return result;
};
//
function i1(obj,out) {
if($(obj).attr('data-mo')) {
obj=$('#'+$(obj).attr('data-mo')).get(0);
}
if(obj && obj.src) {
if(out) {
obj.src=obj.src.replace(/_over(\.\w+)$/,'$1');
} else {
if(obj.src.search(/(_over|_down|\/0)\.\w+$/)==-1) {
obj.src=name=obj.src.replace(/(\.\w+)$/,'_over$1');
}
}
}
}
function i0(obj) {
i1(obj,1);
}
$(document).on('mouseover','.mo',function() {
i1(this);
}).on('mouseout','.mo',function() {
i1(this,1);
});
var cache_image=function(src) {
if(!top.arr_cached_images) {
top.arr_cached_images={};
}
if(src && !top.arr_cached_images[src]) {
var i=new Image();
i.src=src;
top.arr_cached_images[src]=i;
}
};
$(window).load(function() {
var ai=['p1','pe1','n1'];
for(var i in ai) {
cache_image('../pics/'+ai[i]+'.svg');
}
$('img.mo,input.mo').each(function() {
var src=this.src;
if(src && (src.search(/(_over|_down|\/0)\.\w+$/)==-1)) {
cache_image(src.replace(/(\.\w+)$/,'_over$1'));
}
});
});
function ui(obj) {
var s='';
var $obj=$(obj);
if((s=$obj.attr('html_title')) || (s=$obj.attr('title'))) {
$obj.data('ui_save',{'html':$obj.html(),'html_title':$obj.attr('html_title'),'title':$obj.attr('title'),'cursor':$obj.css('cursor')})
.attr('html_title','')
.attr('title','')
.html('&#34;'+$obj.html()+'&#34;'+' &lt;'+s+'&gt;')
.css('cursor','auto');
} else if($obj.data('ui_save') && !get_selected_text().toString().length) {
$obj.html($obj.data('ui_save').html)
.attr('title',$obj.data('ui_save').title)
.attr('html_title',$obj.data('ui_save').html_title)
.css('cursor',$obj.data('ui_save').cursor)
.data('ui_save',null);
}
hide_tooltip();
}
//
var klein=0;
function innen_showPic(name,sx,sy) {
return OpenPopUpImage(URL,sx,sy);
}
//
function my_init() {
}
function my_submit() {
return true;
}
//
function get_free_id() {
var id;
do {
id='auto_'+(Math.random().toString().replace(/[^0-9]/,''));
} while(document.getElementById(id));
return id;
}
function html_entity_decode(s) {
return s.replace(/&#([0-9]+);/g,function(match,t) {
return String.fromCodePoint?String.fromCodePoint(t):match;
}).replace(/&([a-z]+|#x[0-9a-fA-F]+|#[0-9]+);/g,function(match,t) {
return $('<div></div>').html(match).text();
});
}
function msgbox(s) {
alert(html_entity_decode(s));
}
function get_selected_text() {
var text='';
if(document.selection && document.selection.createRange) {
text=document.selection.createRange().text;
} else if(window.getSelection) {
text=window.getSelection();
}
return text;
}
function swap_checkboxes(objregexp) {
var form=document.forms[0];
if(form && form.elements && form.elements.length) {
for(var i=0;i<form.elements.length;i++) {
var e=form.elements[i];
if(e.type=='checkbox') {
if((!objregexp) || objregexp.test(e.name)) {
e.checked = !e.checked;
}
}
}
}
return false;
}
function get_opener_checkboxes(delimiter,required,get_names) {
var result='';
var t_opener=ww.get_opener();
if(t_opener && t_opener.document) {
var f=t_opener.document.forms[0];
for(var i=0;i<f.length;i++) {
if(f[i].type=='checkbox') {
if(f[i].checked) {
var v=(get_names?f[i].name:f[i].value);
if((!required) || (v.indexOf(required)>0)) {
if(result) {
result+=delimiter;
}
result+=v;
}
}
}
}
} else {
alert('Opener not found');
}
return result;
}
var submit_count=0;
function gray_submit() {
var form=document.forms[0];
if(form) {
if(form.elements) {
for(var i=0;i<form.elements.length;i++) {
var e=form.elements[i];
if(e.type=='submit') {
e.className+=' submitting';
}
}
}
}
submit_count++;
}
var form_blur=null;
function form_submit() {
if(!form_blur) {
var allow_submit=true;
var sel='input[type="text"],input[type="password"]';
var $inputs=$(sel);
$inputs.each(function() {
var $i=$(this);
var n=$i.attr('name');
if(n && n.match(/^[a-zA-Z0-9_>-]+$/)) {
if($inputs.filter('[name="'+n+'"]').length>1) {
var v=$i.val();
if(v) {
$inputs.filter('[name="'+n+'"]').each(function() {
var $i2=$(this);
if($i2.val() && ($i2.val()!=v) && allow_submit) {
var l1,l2;
var $p;
$('label,'+sel).each(function() {
var $t=$(this);
if($t.is($i) || $t.is($i2)) {
var l=$p.contents().not('.info,.mandatory').text();
if($t.is($i)) {
l1=l;
} else {
l2=l;
}
}
$p=$t;
});
show_message(lg(300,l1,l2));
focus_field(n);
allow_submit=false;
}
});
}
}
}
});
if(allow_submit && my_submit()) {
gray_submit();
if(submit_count==1) {
try {
document.activeElement.blur();
} catch(err) {
}
return true;
}
}
} else {
if(form_blur.blur) {
form_blur.blur();
}
form_blur=null;
}
return false;
}
function set_input_and_submit(name,value) {
var f=document.forms[0];
var e=f[name];
if(e) {
e.value=value;
f.submit();
} else {
alert('Specified element does not exist.');
}
return false;
}
function to_username(s) {
var a=[352,'S',338,'OE',381,'Z',353,'s',339,'oe',382,'z',376,'Y',181,'u',192,'A',193,'A',194,'A',195,'A',196,'Ae',197,'A',198,'AE',199,'C',200,'E',201,'E',
202,'E',203,'E',204,'I',205,'I',206,'I',207,'I',208,'DH',209,'N',210,'O',211,'O',212,'O',213,'O',214,'Oe',216,'Oe',217,'U',218,'U',219,'U',220,'Ue',
221,'Y',222,'TH',223,'ss',224,'a',225,'a',226,'a',227,'a',228,'ae',229,'a',230,'ae',231,'c',232,'e',233,'e',234,'e',235,'e',236,'i',237,'i',238,'i',
239,'i',240,'dh',241,'n',242,'o',243,'o',244,'o',245,'o',246,'oe',248,'oe',249,'u',250,'u',251,'u',252,'ue',253,'y',254,'th',255,'y'];
var r='';
for(var i=0;i<s.length;i++) {
var c=s.charAt(i);
if(c.match(/[a-zA-Z0-9.-]/)) {
r+=c;
} else {
var cc=c.charCodeAt(0);
var f='';
for(var j=0;j<a.length;j+=2) {
if(cc==a[j]) {
f=a[j+1];
}
}
r+=f?f:'.';
}
}
r=r.toLowerCase().replace(/([.-])[.-]+/,'$1').replace(/^[.-]/,'').replace(/[.-]$/,'');
return r;
}
//
var files_show_info_last_that=null;
function files_show_info(that,info) {
if(files_show_info_last_that) {
files_show_info_last_that.className='files_normal';
}
files_show_info_last_that=that;
files_show_info_last_that.className='files_highlighted';
document.getElementById('desc').innerHTML=info;
}
function url_select(obj_select) {
if(obj_select.options[obj_select.selectedIndex].value>' ') {
window.location.href=obj_select.options[obj_select.selectedIndex].value;
}
return false;
}
function language_select(obj_select) {
if(obj_select.options[obj_select.selectedIndex].value>' ') {
refresh('language=' + obj_select.options[obj_select.selectedIndex].value);
}
return false;
}
function getBody() {
return ((window.document.compatMode && (window.document.compatMode=='CSS1Compat')) ? window.document.documentElement : window.document.body);
}
function getWindowHeight() {
return $(document).height();
}
function getBodyHeight() {
return $(window).height();
}
function resizePopup() {
var WindowHeight = getWindowHeight();
var BodyHeight = getBodyHeight();
var d = WindowHeight - BodyHeight;
if((d < resizePopupMax) && (d > 0)) {
ww.resize_by(0,d);
}
}
var $rta_tas=null;
function resizeTextArea() {
if($rta_tas) {
var t_offset=$('.popup_content_outer').offset();
var t_top=(t_offset && t_offset.top)?t_offset.top:25;
var d_height=getBodyHeight()-$('#content').height()-t_top;
if(d_height) {
var id_if=$rta_tas.data('id_if');
var $t=id_if?$('#'+id_if):$rta_tas;
var t_height=Math.max($t.height()+d_height,200);
$t.height(t_height);
if(id_if) {
try {
$($t.get(0).contentWindow.document.body).css({minHeight:(t_height-16)+'px'});
} catch(e) {
alert('RESIZE ERROR');
}
}
}
}
}
function resizeTextArea_init() {
if(is_popup) {
$rta_tas=$('textarea.high');
if($rta_tas.length===1) {
$rta_tas=$rta_tas.first();
window.onresize=resizeTextArea;
resizeTextArea();
} else {
$rta_tas=null;
}
}
}
function scroll_up(processing) {
if (document.body && document.body.scrollTop) {
window.scrollTo(0,Math.floor(document.body.scrollTop/(1.3)));
window.setTimeout(function() {
scroll_up(1);
},20);
} else if(document.documentElement && document.documentElement.scrollTop) {
window.scrollTo(0,Math.floor(document.documentElement.scrollTop/(1.3)));
window.setTimeout(function() {
scroll_up(1);
},20);
} else if(document.getElementById('skeleton_main') && document.getElementById('skeleton_main').scrollTop) {
document.getElementById('skeleton_main').scrollTop=Math.floor(document.getElementById('skeleton_main').scrollTop/(1.3));
window.setTimeout(function() {
scroll_up(1);
},20);
} else {
if(!processing) {
window.scrollTo(0,5);
}
window.scrollTo(0,0);
$('#body_inner').scrollTop(0);
}
return false;
}
function getScrollTop() {
if(document.body && document.body.scrollTop) {
return document.body.scrollTop;
} else if(document.documentElement && document.documentElement.scrollTop) {
return document.documentElement.scrollTop;
} else if(document.getElementById('skeleton_main') && document.getElementById('skeleton_main').scrollTop) {
return document.getElementById('skeleton_main').scrollTop;
} else if(window.pageYOffset) {
return window.pageYOffset;
}
return 0;
}
function getScrollLeft() {
if(document.body && document.body.scrollLeft) {
return document.body.scrollLeft;
} else if(document.documentElement && document.documentElement.scrollLeft) {
return document.documentElement.scrollLeft;
} else if(document.getElementById('skeleton_main') && document.getElementById('skeleton_main').scrollLeft) {
return document.getElementById('skeleton_main').scrollLeft;
} else if(window.pageXOffset) {
return window.pageXOffset;
}
return 0;
}
function getAbsoluteLeft(obj) {
if(obj.offsetParent) {
return (obj.offsetLeft + getAbsoluteLeft(obj.offsetParent));
} else {
return obj.offsetLeft;
}
}
function getAbsoluteTop(obj) {
if(obj.offsetParent) {
return (obj.offsetTop + getAbsoluteTop(obj.offsetParent));
} else {
return obj.offsetTop;
}
}
function doOpenPopUp2(url,target,params) {
var w;
try {
w=ww.open(url,target,params);
} catch(e) {
}
if(!w || !w.focus) {
if(is_document) {
trPopUpBlocked();
} else if(parent.is_document) {
parent.trPopUpBlocked();
}
}
}
function doOpenPopUp(url,target,params,notimer) {
var f=function() {
doOpenPopUp2(url,target,params);
};
if(notimer) {
f();
} else {
window.setTimeout(f,10);
}
hide_tooltip();
return false;
}
function OpenPopUp(URL,noreturn,notimer) {
var w=0;
var h=0;
var a;
if(top && top.cms_data && (a=top.cms_data.popups)) {
if(window.overwrite_cms_data && window.overwrite_cms_data.popups) {
a=a.concat(window.overwrite_cms_data.popups);
}
var p=-1;
for(var i in a) {
var o=a[i];
if(o.n && (-1!=(p=URL.indexOf(o.n))) && ((0==p) || ('/'==URL.charAt(p-1)))) {
w=o.w;
h=o.h;
}
}
}
if(w && h) {
URL+='&enableautogrow=1';
doOpenPopUp(URL,'_blank','width='+w+',height='+h+',resizable=yes,scrollbars=yes,toolbar=no,status=yes,menubar=no',notimer);
} else {
URL+='&enableautoresize=1';
doOpenPopUp(URL,'_blank','width=480,height=400,resizable=yes,scrollbars=yes,toolbar=no,status=yes,menubar=no',notimer);
}
if(!noreturn) {
return false;
}
}
function help(URL) {
return OpenPopUp(URL,false,true);
}
function iconPrint() {
return ww.print();
}
top.openpopupimage_interval=null;
function OpenPopUpImage(URL) {
var is_ie6=(document.all && !window.XMLHttpRequest);
var position_fixed=(is_ie6?'absolute':'fixed');
var height=(is_ie6?($(top).height()+'px'):'100%');
top.$('#ww_layer_media, #ww_layer_black').remove();
top.$('body').append('<div id="ww_layer_black" style="position:'+position_fixed+';left:0px;top:0px;display:none;z-Index:1000000">&#160;</div><div id="ww_layer_media" style="position:'+position_fixed+';left:0px;top:0px;display:none;z-Index:1000001;overflow:auto;width:100%;height:100%"><table style="width:100%;height:100%"><tr><td><table class="ww_layer_media_inner" style="margin:auto"><tr><td><img id="ww_layer_image" src="'+URL+'" alt="" title="'+lg(1220)+'" style="cursor:pointer"></td></tr></table></td></tr></table></div>');
top.$('#ww_layer_black').fadeTo('normal',0.7);
top.$('#ww_layer_media').fadeIn('fast').bind('click',function() {
top.$('#ww_layer_media, #ww_layer_black').stop().fadeOut('fast');
top.$('#ww_layer_media img').attr('html_title','');
top.clearInterval(top.openpopupimage_interval);
// top.$('#tooltip').remove();
top.hide_tooltip();
hide_tooltip();
});
top.openpopupimage_interval=top.setInterval(function() {
top.$('#ww_layer_black, #ww_layer_media').height($(top).height()).width($(top).width());
},100);
if(is_ie6) {
scroll_up();
}
hide_tooltip();
return false;
}
function OpenPopUpGallery(startID) {
var height=0;
var width=0;
for(var id=0;id<arr_image_gallery.length / 5;id++) {
width=Math.max(width,arr_image_gallery[id*5+1]);
height=Math.max(height,arr_image_gallery[id*5+2]);
}
width+=60;
height+=200;
return doOpenPopUp('420217.php?sid='+session_id+'&s='+startID,'_blank','width='+width+',height='+height+',scrollbars=yes,resizable=yes,toolbar=no,status=yes,menubar=no');
}
function OpenPopUpPons() {
var search=''
try {
if(!(search=get_selected_text().toString())) {
var arr=ww.get_popups();
for(var i in arr) {
if(search=arr[i].get_selected_text().toString()) {
break;
}
}
}
} catch(e) {
}
return OpenPopUp('577625.php?sid='+session_id+'&search='+encodeURIComponent(search));
}
function opener_navigate(URL,noreturn) {
var t_opener=ww.get_opener();
if(t_opener && t_opener.location) {
t_opener.location.href=URL;
} else {
ww.close();
}
if(!noreturn) {
return false;
}
}
function document_navigate(URL,noreturn) {
if(is_document) {
window.location.href=URL;
} else {
var t_opener=ww.get_opener();
if(t_opener && t_opener.location) {
t_opener.document_navigate(URL);
}
}
if(!noreturn) {
return false;
}
}
function redirect(URL,leave_in_history) {
gray_submit();
if(leave_in_history) {
window.location.href=URL;
} else {
window.location.replace(URL);
}
return false;
}
function showHide(id) {
var e;
if (document.all) {
e=document.all[id];
} else {
e=document.getElementById(id);
}
if(e) {
if(e.style.display=='none') {
e.style.display='';
} else {
e.style.display='none';
}
} else {
alert('showHide: Element "'+id+'" nicht gefunden');
}
return false;
}
function init1() {
initSlides();
cwInit();
trInit();
init_memory();
}
function init2() {
initSlides2();
}
function auto_grow() {
if(document.all && !window.XMLHttpRequest) {
var e_auto_grow = document.getElementById('auto_grow');
if(e_auto_grow && e_auto_grow.style) {
var e_menu = document.getElementById('menu');
var e_content = document.getElementById('content');
var height=0;
if(e_menu && e_menu.offsetHeight) {
height=Math.max(height,getAbsoluteTop(e_menu) + e_menu.offsetHeight);
}
if(e_content && e_content.offsetHeight) {
height=Math.max(height,getAbsoluteTop(e_content) + e_content.offsetHeight);
}
new_height=(height-getAbsoluteTop(e_auto_grow));
if(new_height>0) {
e_auto_grow.style.height=new_height+'px';
}
}
}
}
var my_scrolls=new Array();
function add_scroll(call) {
my_scrolls[my_inits.length]=call;
}
function all_scroll() {
for(var i=0;i < my_scrolls.length;i++) {
eval(my_scrolls[i]);
}
}
function page_scroll() {
if(document.all && !window.XMLHttpRequest) {
var e;
if(e=document.getElementById('skeleton_epilog')) {
e.style.top='-'+getScrollTop()+'px';
}
}
all_scroll();
}
function popup_scroll() {
all_scroll();
}
var my_inits=new Array();
function add_init(call) {
my_inits[my_inits.length]=call;
}
function all_init() {
auto_grow();
my_init();
for(var i=0;i < my_inits.length;i++) {
eval(my_inits[i]);
}
}
function popup_init() {
is_popup=true;
all_init();
try {
if(document.forms[0]) {
var i=0;
var b=0;
while((document.forms[0].elements[i]) && (b==0)) {
if((!document.forms[0].elements[i].isDisabled) && ((document.forms[0].elements[i].type=='text') || (document.forms[0].elements[i].type=='password') || (document.forms[0].elements[i].type=='textarea'))) {
document.forms[0].elements[i].focus();
b=1;
}
if(document.forms[0].elements[i].name=='disable_input_focus') {
b=1;
}
i++;
}
}
} catch(e) {
}
resizeTextArea_init();
if((window.location.search.indexOf('enableautoresize')>=0)||(window.location.search.indexOf('enableautogrow')>=0)) {
window.setTimeout(function() {
resizePopup()
},resizePopupTimeout);
}
if(window.location.search.indexOf('refreshopener')>=0) {
window.setTimeout(function() {
ww.get_opener().refresh();
},100);
}
}
function refresh(add_params) {
gray_submit();
if(add_params) {
window.location.replace(refresh_url+((refresh_url.indexOf('?')>0)?'&':'?')+add_params);
} else {
window.location.replace(refresh_url);
}
return false;
}
function login_focus() {
if(document.forms[0]) {
if(document.getElementById && document.forms[0].login_nojs) {
document.forms[0].login_nojs.value='';
}
if(document.forms[0].login_login) {
document.forms[0].login_login.focus();
}
}
}
function page_init() {
is_document=true;
init2();
all_init();
if(auto_refresh) {
window.setTimeout(function() {
if(!$('input[type=checkbox]:checked').length) {
refresh();
}
},auto_refresh);
}
top.document.title=document.title; // @todo: raus
window.setTimeout(function() {
login_focus();
},200);
}
function open_document(url) {
if(is_document) {
window.location=url;
return false;
} else {
var t_opener=ww.get_opener();
return t_opener.open_document(url);
}
}
//
var progress_initial='';
var progress_last='';
var progress_i=0;
function draw_progress() {
if(document.getElementById) {
var elem;
if(elem=document.getElementById('heading')) {
if(elem.innerHTML) {
if(!(progress_initial)) {
progress_initial=elem.innerHTML;
progress_last=progress_initial + ' ';
}
var s='.........';
var p=9-Math.abs(progress_i-9)
elem.innerHTML=progress_last + '[' + s.substr(0,p) + '&lt;&gt;' + s.substr(0,9-p) + ']';
progress_i=((progress_i+1) % 18);
}
}
}
}
function end_progress() {
progress_i=0;
if(progress_initial) {
if(document.getElementById) {
var elem;
if(elem=document.getElementById('heading')) {
if(elem.innerHTML) {
elem.innerHTML=progress_initial;
}
}
}
}
}
//
function unhighlight_tr(obj) {
var i=0;
var o=obj;
if(o) {
while((o.nodeName!='TR') && o.parentNode && (i++<10)) {
o=o.parentNode;
}
if((o.nodeName=='TR') && o.className) {
o.className=o.className.replace(/highlighted/gi,' ',o.className);
}
}
return false;
}
//
function onKeyPressCtrlEnterSubmit(event) {
if(window.event) {
event=window.event;
}
if(event && event.ctrlKey && event.keyCode && ((event.keyCode==10)||(event.keyCode==13))) {
document.forms[0].submit();
}
return true;
}
function onKeyPressEnterBlur(e) {
if(window.event) {
if(window.event.keyCode) {
if((window.event.keyCode==10)||(window.event.keyCode==13)) {
e.blur();
}
}
}
return true;
}
//
function textarea_insert(tag0,tag1,example,field) {
var ok=false;
var gap='';
function gap_transform(gap) {
var trailer='';
while(gap && (gap.charAt(gap.length-1)==' ')) {
gap=gap.substring(0,gap.length-1);
trailer+=' ';
}
if(!gap) {
gap=example;
}
return tag0 + gap + tag1 + trailer;
}
if(!field) {
if(document.forms[0]) {
var i=0;
var b=0;
while((document.forms[0].elements[i]) && (b==0)) {
if(document.forms[0].elements[i].type=='textarea') {
field=document.forms[0].elements[i];
b=1;
}
i++;
}
}
}
if(field) {
var scroll_top=field.scrollTop;
field.focus();
if(document.selection && document.selection.createRange) {
document.selection.createRange().text=gap_transform(document.selection.createRange().text);
ok=true;
} else if(field.selectionStart || (field.selectionStart=='0')) {
var p0=field.selectionStart;
var p1=field.selectionEnd;
gap = gap_transform(field.value.substring(p0,p1));
field.value=field.value.substring(0,p0)+gap+field.value.substring(p1,field.value.length);
field.selectionStart=(((p0!=p1)||tag0)?p0:(p0+gap.length));
field.selectionEnd=p0+gap.length;
ok=true;
}
if(scroll_top) {
field.focus();
field.scrollTop=scroll_top;
}
}
hide_tooltip();
if(!ok) {
alert(gap_transform(''));
}
return false;
}
function clean_up_html(html) {
var tags={
br: 'br',
p: 'div',
div: 'div',
b: 'b',
i: 'i',
u: 'u',
s: 's',
sup: 'sup',
sub: 'sub',
q: 'q',
strong: 'b',
strike: 's',
em: 'i'
};
var c_min='';
var c_max='';
var s0='';
var s1='';
var replacements={};
for(var tag0 in tags) {
var tag1=tags[tag0];
s0+=(s0?'|':'')+tag0;
s1+=(s1?'|':'')+tag1;
replacements[tag0]=tag1;
s0+='|/'+tag0;
s1+='|/'+tag1;
}
var exp0=new RegExp('^('+s1+')$','i');
var exp1=new RegExp('^('+s0+')( .*)?$','i');
var no_tag=new RegExp('^[^a-z/!]$','i');
var l=html.length;
var tag='';
var b=true;
for(var i=0;i<l;i++) {
var t;
var c=html.substr(i,1);
if(b && (c!=='<') && (c!=='>')) {
c_min+=c;
c_max+=c;
} else if(b) {
if(c==='<') {
b=false;
} else {
c_min+='&gt;';
c_max+='&gt;';
}
} else { // !b
if(!tag && c.match(no_tag)) {
c_min+='&lt;';
c_max+='&lt;';
b=true;
i--;
} else if(c!=='>') {
tag+=c;
} else {
if(tag.match(exp0)) {
c_min+='<'+tag+'>';
c_max+='<'+tag.toLowerCase()+'>';
} else if(t=tag.match(exp1)) {
var index=t[1];
var tag0='';
var tag1='';
if(index) {
tag0=index=index.toLowerCase();
if(index.substr(0,1)==='/') {
index=index.substr(1);
tag1+='/';
}
}
if(index && replacements[index]) {
tag1+=replacements[index];
c_min+='<'+tag0+'>';
c_max+='<'+tag1+'>';
} else {
// dump(t);
}
} else {
}
tag='';
b=true;
}
}
}
c_max=c_max.replace(new RegExp('<'+'/br>','g'),'')
.replace(new RegExp('^<'+'div>','g'),'')
.replace(new RegExp('<'+'div><'+'/div>','g'),'')
.replace(new RegExp('<'+'br><'+'/div>','g'),'')
.replace(new RegExp('<'+'br><'+'div>','g'),'<div>')
.replace(new RegExp('(<'+'div>)+','g'),'<'+'br>')
.replace(new RegExp('<'+'/div>','g'),'')
.replace(new RegExp('&'+'nbsp;','g'),' ')
.replace(new RegExp('&'+'amp;','g'),'&')
.replace(new RegExp('&'+'lt;','g'),'<')
.replace(new RegExp('&'+'gt;','g'),'>')
;
return [c_min,c_max];
}
function auto_update_wysiwyg(id_if,id_ta,once) {
var if_document=document.getElementById(id_if)?document.getElementById(id_if).contentWindow.document:null;
if(if_document) {
var $div=$(if_document.body);
var html=$div.html();
if($div.data('lastHTML')!==html) {
var $textarea=$('#'+id_ta);
var a=clean_up_html(html);
var c_min=a[0];
var c_max=a[1];
var text=c_max.replace(/<[b][r]>/g,'\r');
$textarea.val(text);
if(c_min.toLowerCase()!==html.toLowerCase()) {
$div.html('<div>'+c_max+'</div>');
}
$div.data('lastHTML',$div.html());
try {
if($div.data('nextCall')) {
ww.form.set_is_changed(1);
}
$div.data('nextCall',1);
} catch(e) {
}
}
if(!once) {
window.setTimeout(function() {
auto_update_wysiwyg(id_if,id_ta);
},200);
}
}
}
function switch_wysiwyg(id,auto) {
var pre_id_if='wysiwyg_iframe_578825_';
var id_ta=id.replace(new RegExp(pre_id_if,'i'),'');
var id_if=pre_id_if+id_ta;
var $ta=$('#'+id_ta);
if(document.getElementById(id_if)) {
auto_update_wysiwyg(id_if,id_ta,1);
$('#'+id_if).remove();
$ta.show().data('id_if',null).focus();
} else {
var text=$ta.val();
var a=clean_up_html(text);
var new_text=a[1];
var do_open=true;
if(new_text!==text) {
var msg=lg(820);
do_open=(!auto && confirm(msg));
}
if(do_open) {
var is_editable=!($ta.is('[disabled]')||$ta.is('[readonly]'));
if(text!==new_text) {
$ta.val(new_text);
}
$ta.after('<iframe id="'+id_if+'" class="wysiwyg max"></iframe>');
var $if=$('#'+id_if);
var $t=$('<div></div>').append($('link[rel="stylesheet"]').clone());
var if_window=document.getElementById(id_if).contentWindow;
var if_document=if_window.document;
if_document.open();
if_document.write('<!DOCTYPE HTML><html><head><title></title>'+$t.html()+'</head><body'+(is_editable?' contentEditable="true"':'')+' class="wysiwyg"><div>'+new_text.replace(/\r/g,'').replace(/\n/g,'<br />')+'</div></body></html>');
if_document.close();
$t.remove();
$if.height($ta.height()); // .width($ta.width())
$ta.data('id_if',id_if).hide();
try {
if_document.execCommand('styleWithCSS',false,false);
} catch(e) {
}
try {
if_document.execCommand('insertBrOnReturn',false,true);
} catch(e) {
}
var $body=$(if_document.body);
$body.css({minHeight:($if.height()-16)+'px'});
$body.focus({'obj':$if.get(0)},function(evt) {
position_textarea_icons(evt.data.obj);
hide_tooltip();
}).blur({'obj':$if.get(0)},function(evt) {
position_textarea_icons(evt.data.obj,true);
});
$body.keydown(function(e) { // Sonderbehandlung IE 6-10
if((e.keyCode==13) && if_document.selection && if_document.selection.createRange) {
var range = if_document.selection.createRange();
if(range.pasteHTML) {
range.pasteHTML('<br />');
e.preventDefault();
return false;
}
}
});
auto_update_wysiwyg(id_if,id_ta);
if(!auto) {
$body.focus();
}
try {
if_window.addEventListener('dragenter',function(e){e.stopPropagation();e.preventDefault();},false);
if_window.addEventListener('dragleave',function(e){e.stopPropagation();e.preventDefault();},false);
if_window.addEventListener('dragover' ,function(e){e.stopPropagation();e.preventDefault();},false);
if_window.addEventListener('drop' ,function(e){e.stopPropagation();e.preventDefault();},false);
} catch(e) {
}
}
}
resizeTextArea();
return false;
}
var add_icons_to_textareas_params={};
var last_focused_textarea;
var currently_focused_textarea;
var currently_focused_textarea_interval;
var currently_focused_textarea_delete;
var textarea_icon_error;
var textarea_icon_click=function(i_icon,text) {
var obj=currently_focused_textarea;
obj=obj?obj:last_focused_textarea;
var icon=add_icons_to_textareas_params.all_icons[i_icon];
if(!icon) {
icon={pre:text,post:''};
}
try {
if(obj.tagName=='IFRAME') {
var if_document=obj.contentWindow.document;
if(icon.cmd) {
if_document.execCommand(icon.cmd,false,false);
} else {
if(!if_document.execCommand('insertText',false,html_entity_decode(icon.pre+icon.post))) {
if(!textarea_icon_error) {
alert(lg(10));
textarea_icon_error=true;
}
}
}
$(if_document.body).focus();
} else if(obj.tagName=='TEXTAREA') {
textarea_insert(html_entity_decode(icon.pre.replace(/[\\']/,'\\$1')),html_entity_decode(icon.post.replace(/[\\']/,'\\$1')),' ',obj);
} else {
alert(obj.tagName);
}
} catch(e) {
}
hide_tooltip();
return false;
};
var textarea_icon_insert=function(text) {
textarea_icon_click(-1,text);
};
var position_textarea_icons=function(obj,destroy) {
if(obj && !destroy) {
var obj_id=$(obj).attr('id');
$('#textarea_icons').remove();
hide_tooltip();
currently_focused_textarea_delete=false;
if(!add_icons_to_textareas_params.all_icons) {
var default_icons=[
{pre:'<b>',post:'</b>',src:'../pics/format/b.svg',tip:lg(802),cmd:'bold'},
{pre:'<i>',post:'</i>',src:'../pics/format/i.svg',tip:lg(804),cmd:'italic'},
{pre:'<u>',post:'</u>',src:'../pics/format/u.svg',tip:lg(806),cmd:'underline'},
{pre:'<s>',post:'</s>',src:'../pics/format/s.svg',tip:lg(808),cmd:'strikethrough'},
{pre:'<sub>',post:'</sub>',src:'../pics/format/sub.svg',tip:lg(809),cmd:'subscript'},
{pre:'<sup>',post:'</sup>',src:'../pics/format/sup.svg',tip:lg(810),cmd:'superscript'}
];
var icons=default_icons;
if(add_icons_to_textareas_params.additional_icons) {
icons=add_icons_to_textareas_params.additional_icons.concat(icons);
}
add_icons_to_textareas_params.all_icons=icons;
} else {
var icons=add_icons_to_textareas_params.all_icons;
}
var html='<div id="textarea_icons">';
for(var i in icons) {
var icon=icons[i];
html+='<a href="#" data-w="'+i+'"><img src="'+icon.src.replace(/[\\']/,'\\$1')+'" alt="'+icon.tip.replace(/[\\']/,'\\$1')+'" title="'+icon.tip.replace(/[\\']/,'\\$1')+'" class="textarea_icon mo"></a>';
}
if(add_icons_to_textareas_params.file_picker) {
html+='<a href="#" data-w="file_picker"><img src="../pics/format/fp.svg" alt="'+lg(812)+'" title="'+lg(812)+'" class="textarea_icon mo"></a>';
}
if(add_icons_to_textareas_params.enable_wysiwyg) {
html+='<a href="#" data-w="switch"><img src="../pics/format/w.svg" alt="'+lg(801)+'" title="'+lg(801)+'" class="textarea_icon mo"></a>';
}
html+='<a href="#" data-w="help"><img src="../pics/format/help.svg" alt="'+lg(800)+'" title="'+lg(800)+'" class="textarea_icon textarea_icon_help mo"></a></div>';
$(html).appendTo('body').show();
$('#textarea_icons').css({position:'absolute',left:0,top:0,whiteSpace:'pre',zIndex:59999});
$('#textarea_icons a').on('click',function(evt) {
evt.preventDefault();
var d=$(this).attr('data-w');
if(d=='help') {
help('498841.php?sid='+session_id);
} else if(d=='switch') {
switch_wysiwyg(obj_id);
} else if(d=='file_picker') {
OpenPopUp(add_icons_to_textareas_params.file_picker+'&function_text=textarea_icon_insert');
} else {
textarea_icon_click(d);
}
});
currently_focused_textarea=obj;
if(!currently_focused_textarea_interval) {
currently_focused_textarea_interval=window.setInterval(function() {
position_textarea_icons()
},250); // Nicht jede Aenderung (resize Textarea, Laden der Icons) ein Event.
}
}
if(destroy) {
currently_focused_textarea_delete=true;
window.setTimeout(function() {
if(currently_focused_textarea_delete) {
if(currently_focused_textarea_interval) {
window.clearInterval(currently_focused_textarea_interval);
currently_focused_textarea_interval=null;
}
$('#textarea_icons').fadeOut(function() {
hide_tooltip();
});
last_focused_textarea=currently_focused_textarea;
currently_focused_textarea=null;
}
},1000);
}
if(currently_focused_textarea) {
var $this=$(currently_focused_textarea);
if($this) {
var $icons=$('#textarea_icons');
var offset=$this.offset();
var top=offset.top-$icons.outerHeight();
var left=offset.left+$this.outerWidth()-$icons.outerWidth();
$icons.css({'left':left,'top':top});
}
}
};
function add_icons_to_textareas(params) {
add_icons_to_textareas_params=params;
var $objects=$('textarea');
if(add_icons_to_textareas_params.filter) {
$objects=$objects.filter(add_icons_to_textareas_params.filter);
}
$objects.not('[id]').each(function() {
$(this).attr('id',get_free_id())
});
$objects.focus(function(evt) {
position_textarea_icons(this);
}).blur(function(evt) {
position_textarea_icons(null,true);
});
if(params.default_wysiwyg) {
if($objects.length===1) {
$objects.each(function() {
if($(this).css('display')!=='none') {
switch_wysiwyg($(this).attr('id'),true);
}
});
}
}
$(window).resize(function() {
position_textarea_icons();
});
};
//
var sour='';
var soif='';
function send_result(e) {
if(sour) {
if(frames['if'+soif]) {
frames['if'+soif].location.replace(location_dir + '/' + sour+'&m='+soif+'&e='+e);
}
} else {
var t_opener=ww.get_opener();
if(t_opener && t_opener.send_result) {
t_opener.send_result(e);
} else if(window.parent && (window.parent!=window) && window.parent.send_result) {
window.parent.send_result(e);
}
}
return undefined;
}
function send_passed() {
return send_result(0);
}
function send_failed() {
return send_result(1);
}
var ajax_ping_url_508777='';
var ajax_ping_timeout_508777;
function ajax_ping(url,timeout) {
ajax_ping_url_508777=url;
ajax_ping_timeout_508777=timeout;
window.setTimeout(function() {
$.ajax({
dataType: 'json',
url: ajax_ping_url_508777,
success: function(data,status) {
if(data && data['interval']) {
if(data['open']) {
OpenPopUp(data['open']);
}
ajax_ping(data['next'],data['interval']);
}
},
error: function() {
ajax_ping(ajax_ping_url_508777,ajax_ping_timeout_508777);
top.show_message(lg(210));
},
});
},timeout*1000);
}
function copyright() {
ww.open('107720.php?sid='+session_id,'_blank','width=310,height=330,status=yes,resizable=yes,menubar=no,toolbar=no,location=no,scrollbars=no');
return false;
}
function toggle_popup_link(event,params) {
event.preventDefault();
if($('#dh_popup_link').length) {
$('#dh_popup_link').remove();
} else {
var html;
var ul=false;
html= '<table id="dh_popup_link" style="position:absolute;'+(is_popup?'right:16px;top:16px;':'left:0px;top:0px;')+'display:none;visibility:visible;margin:0;z-Index:59999" class="box_news"><tr><td><ul class="links no_space" style="float:right"><li><a href="#" onclick="return help(\''+params['help_link']+'\');">'+params['help_title']+'</a></li></ul>';
for(var p in params) {
if(p.match(/_link$/) && (p!='help_link') && params[p]) {
var l=params[p];
if(params['name'] && l.match(/~title_of_link~/) && $(params['name']).html()) {
l=l.replace(/~title_of_link~/,$(params['name']).html().replace(/<[^>]*>/g,''));
}
if(!ul) {
html+= '<ul class="bullets no_space">';
ul=true;
}
html+= '<li><div><b>'+params[p.replace(/_link$/,'_title')]+'</b></div><div class="line_to_copy">'+l+'</div></li>';
} else if(p.match(/_heading$/)) {
if(ul) {
html+= '</ul>';
ul=false;
}
html+='<h3>'+params[p]+'</h3>';
}
}
if(ul) {
html+= '</ul>';
}
html+= '</td></tr></table>';
if(is_popup) {
$('#content').append(html);
} else {
$('body').append(html);
}
var $t=$('#dh_popup_link');
$t.fadeIn('fast');
hide_tooltip();
init_line_to_copy();
if(!is_popup) {
var x=Math.max(5,Math.min(event.pageX-10,$(window).width()-$t.width()-10));
$t.offset({top:event.pageY+20,left:x});
}
}
}
function toggle_ajax_html(event,url) {
event.preventDefault();
if($('#dh_ajax_html').length) {
$('#dh_ajax_html').remove();
} else {
$('body').append('<table id="dh_ajax_html" style="position:absolute;left:0px;top:0px;display:none;visibility:visible;margin:0;z-Index:59999" class="box_news"><tr><td>'+lg(100)+'</td></tr></table>');
$('#dh_ajax_html').fadeIn('fast').offset({top:event.pageY+20,left:event.pageX-10});
$('#dh_ajax_html td').load(url);
hide_tooltip();
}
}
function highlight_words(node,words,classname) {
function inner(node,word,classname) {
var b=0;
if(node.nodeType==3) {
var p=node.data.toUpperCase().indexOf(word);
if(p>=0) {
var n_old=node.splitText(p);
var t=n_old.splitText(word.length);
var n_new=document.createElement('span');
n_new.className=classname;
n_new.appendChild(n_old.cloneNode(true));
node.parentNode.replaceChild(n_new,n_old);
b=1;
}
} else if((node.nodeType==1) && node.childNodes && (-1==node.tagName.search(/(script|style)/i))) {
for(var i=0;i<node.childNodes.length;++i) {
i+=inner(node.childNodes[i],word,classname);
}
}
return b;
}
var arr_words=words.split(/,/g);
for(var i in arr_words) {
inner(node,arr_words[i].toUpperCase(),classname);
}
return this;
};
$(function() {
var words,a;
if(a=/[?&;]highlight_words=([^&]+)/.exec(unescape(window.location.search))) {
words=a[1];
highlight_words(document.getElementById('content_inner'),words,'highlighted_word');
}
});
var hide_tooltip=function(by_mouseleave) {
// $('#tooltip').remove();
if(by_mouseleave) {
if(top.global_tooltip_t) {
var t_date=new Date();
top.global_tooltip_t=t_date.getTime();
}
}
top.global_tooltip_s='';
top.$('#tooltip').remove();
}
$(function() {
var css;
if(!disable_tooltips) {
if(!top.global_tooltip_i) {
top.global_tooltip_s='';
top.global_tooltip_t=0;
top.global_tooltip_i=1;
}
var t_function=function(evt) {
var evt_move=function(evt) {
var evt_move_inner=function() {
var $element=top.$('#tooltip');
if(!css) {
css={
p: parseFloat($element.css('padding-top')),
r: parseFloat($element.css('border-top-left-radius')),
fc: $element.css('background-color'),
sc: $element.css('border-top-color'),
sw: parseFloat($element.css('border-top-width')),
};
}
var $td=top.$('#tooltip_td');
var $window=top.$(top);
var $target=$(evt.currentTarget);
var max_w=$window.width()*0.45;
$td.css({maxWidth:max_w+'px',overflow:'hidden'});
var x=(evt.clientX?evt.clientX:0);
var y=(evt.clientY?evt.clientY:0);
if(ww.is_iframe()) {
var o=ww.get_$iframe().offset();
x+=o.left;
y+=o.top;
var b_left=(x<($window.width()/2));
var b_top=(y<($window.height()/2));
var n_left=(!b_left?(x-$element.outerWidth()-8):(x+8)); // +10
var n_top=(!b_top?(y-$element.outerHeight()-16):(y+16)); // +20
} else {
var b_left=(x<($window.width()/2));
var b_top=(y<($window.height()/2));
var n_left=(!b_left?(evt.pageX-$element.outerWidth()-8):(evt.pageX+8)); // +10
var n_top=(!b_top?(evt.pageY-$element.outerHeight()-16):(evt.pageY+16)); // +20
}
$element.css({'left':n_left+'px','top':n_top+'px'});
if(window.btoa) {
var w=$element.outerWidth();
var h=$element.outerHeight();
var p=css.p;
var r=css.r;
var fc=css.fc;
var sc=css.sc;
var sw=css.sw;
var w2=w-sw;
var h2=h-sw-p;
// M = moveto, L = lineto, H = horizontal lineto, V = vertical lineto, Q = quadratic Bezier curve
// N NO O SO S / | SW W NW
var d=['M',r,0,'H',w2-r,'Q',w2,0,w2,r,'V',h2-r,'Q',w2,h2,w2-r,h2,'H',r+p/2,'L',r*0.7,h2+p/2-sw,'L',r,h2,'Q',0,h2,0,h2-r,'V',r,'Q',0,0,r,0];
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
var tf='';
if(b_left) {
if(b_top) {
tf='matrix(1 0 0 -1 '+(sw/2)+' '+(h-sw/2-p/2)+')';
} else {
tf='matrix(1 0 0 1 '+(sw/2)+' '+(sw/2+p/2)+')';
}
} else {
if(b_top) {
tf='matrix(-1 0 0 -1 '+(w-sw/2)+' '+(h-sw/2-p/2)+')';
} else {
tf='matrix(-1 0 0 1 '+(w-sw/2)+' '+(sw/2+p/2)+')';
}
}
var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><path d="'+d.join(' ')+'" fill="'+fc+'" stroke-width="'+sw+'" stroke="'+sc+'" transform="'+tf+'" /></svg>';
var url='url("data:image/svg+xml;base64,'+window.btoa(svg)+'")';
$element.css({'background':url,'border':'none','border-radius':0});
}
$element.find('img').off('load.tooltip').on('load.tooltip',function() {
evt_move_inner();
});
if($target.filter(':focus').filter('select').length) {
hide_tooltip();
}
}
evt_move_inner();
};
var $target=$(evt.currentTarget);
var s=$target.attr('html_title');
if(!s && (s=$target.attr('title'))) {
$target.attr('html_title',s=s.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;').replace(/"/g,'&#34;').replace(/\n/g,'<br />'));
}
$target.attr('title','');
if((s!=top.global_tooltip_s) || ($('#tooltip').length==0)) {
hide_tooltip();
if(s) {
top.$('<div id="tooltip" style="display:none;position:absolute;z-index:1000002;left:0px;top:0px">'+s+'</div>')
.appendTo('body').delay(150).fadeIn('fast',function(){if(top){top.global_tooltip_t=1;}});
top.global_tooltip_s=s;
evt_move(evt);
var t_date=new Date();
if(top.global_tooltip_t && (Math.abs(top.global_tooltip_t-t_date.getTime())<200)) { // ms
top.$('#tooltip').stop(true,true).show();
} else {
top.global_tooltip_t=0;
}
$(evt.currentTarget).bind('mouseleave.tooltip',function(evt) {
$(evt.currentTarget).unbind('.tooltip');
hide_tooltip(true);
}).bind('mousemove.tooltip',evt_move);
}
}
};
if(-1==navigator.userAgent.search(/(iPad|iPhone)/)) {
$('[title]:not([pattern])').each(function() {
var $target=$(this);
var s=$target.attr('title');
if(s && !$target.attr('html_title')) {
$target.attr('html_title',s=s.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;').replace(/"/g,'&#34;').replace(/\n/g,'<br />'));
}
$target.attr('title','');
});
$('div.locked').each(function() {
var $this=$(this);
var $span=$(this).children();
if(($this.width()<$span.width())||($this.height()<$span.height())) {
$this.attr('html_title',$span.html());
}
});
if(document.getElementById('courselet')) {
$('*[title],*[html_title]').bind('mouseover',t_function);
} else {
$(document).on('mouseover','[title]:not([pattern]),[html_title]',t_function);
}
$(document).on('focus','select',function() {
hide_tooltip();
});
hide_tooltip();
}
}
});
function decorate_selects(filter) {
if((navigator.userAgent.indexOf('MSIE 6')>0)||(navigator.userAgent.indexOf('MSIE 7')>0)) {
} else {
var s='';
var i=0;
var $selects=$(filter);
$selects.each(function() {
var title=$(this).attr('html_title');
if(!title) {
title=$(this).attr('title');
}
if($('option:selected',this).val()!='') {
title=$('option:selected',this).html();
}
var c=$(this).attr('class').replace(/(^|[ ]+)/,'$1decorated_select_');
$(this).css({'z-index':2,'opacity':0,'-khtml-appearance':'none','position':'relative','display':'inline-block'})
.after('<span id="decorated_select_'+i+'" class="'+c+'" style="display:inline-block;overflow:hidden;width:1px;height:1px;cursor:default;z-index:1;">'+title+'</span>')
.change(function() {
$(this).next().html($('option:selected',this).html());
});
i++;
});
i=0;
$selects.each(function() {
var h=$(this).outerHeight();
var w=$(this).outerWidth();
$('#decorated_select_'+i).width(w+'px').height(h+'px').css({'line-height':h+'px','margin-top':'-'+h+'px'});
i++;
});
};
}
function set_min_height(target,minimum,ref0,add0,ref1,add1,ref2,add2,ref3,add3) {
var h=minimum?minimum:0;
h=Math.max(h,ref0?($(ref0).height()+(add0?add0:0)):0);
h=Math.max(h,ref1?($(ref1).height()+(add1?add1:0)):0);
h=Math.max(h,ref2?($(ref2).height()+(add2?add2:0)):0);
h=Math.max(h,ref3?($(ref3).height()+(add3?add3:0)):0);
if(h) {
$(target).css('min-height',h+'px');
}
}
function p_limit_table_list() {
var cw=$('.document #content_inner').width();
var $table=$('table.table_list').first();
var ct=$table.width();
var mw=parseFloat($table.css('margin-left'));
if(ct && mw && (mw<0)) {
ct+=mw;
}
if(ct && cw && (ct>cw)) {
var widths=[];
var limits=[];
var work=0;
var $th=$table.children('thead').children('tr').children('th');
$th.removeAttr('width');
$th.each(function(i) {
widths[i]=$(this).width();
limits[i]=$(this).hasClass('limit_width');
work+=limits[i];
});
if(work) {
var max=0;
for(var i in widths) {
max=Math.max(max,widths[i]);
}
var diff=ct-cw;
while((diff>0)&&(max>50)) {
max--;
for(var i in widths) {
if(limits[i] && (widths[i]>max)) {
widths[i]--;
diff--;
if(!diff) {
break;
}
}
}
}
$th.each(function(i) {
$(this).width(widths[i]);
});
$('table.table_list td').css({'word-wrap':'break-word'});
$table.css({tableLayout:'fixed'});
} else {
if(ww.is_dev) {
alert('DEV: Die Tabelle ist zu breit ('+ct+'>'+cw+'), aber es sind keine verkleinerbaren Spalten definiert (th.limit_width).');
}
}
}
}
$(window).load(function() {
window.setTimeout(function() {
p_limit_table_list();
},100);
});
function ajaj_call(url,data,$elem) {
$.ajax({
dataType: 'json',
url: url,
data: data,
type: 'POST', // Einziger Unterschied zu $.getJSON, GET wird gecacht
success: function(data,status) {
if(data) {
if(data['alert']) {
alert(data['alert']);
}
if($elem) {
var a=['src','title','html_title'];
for(var i in a) {
if((typeof data[a[i]])!=='undefined') {
$elem.attr(a[i],data[a[i]]);
}
}
$elem.fadeOut(200).fadeIn(200);
}
}
hide_tooltip();
}
});
return false;
}
$(function() {
$('a[href*=\\.html]').not('[href*=\\JavaScript]').not('[target]').attr('target','_blank');
});
$(function() {
$('.hide_on_load').hide();
});
$(function() {
if(window._paq) {
$('a').on('click',function(evt) {
var href=$(this).attr('href');
var regexp=/^\/[u]?deref.php[?].*?url=(.+?)(&|$)/;
var matches=regexp.exec(href);
if(matches) {
var url=decodeURIComponent(matches[1]);
_paq.push(['trackLink',url,'link']);
}
});
}
});
function blink(p_selector,p_next,p_count,p_delay,p_class,p_b) {
var $o=$(p_selector);
if(p_next) {
$o=$o.next();
}
if(p_b || p_count) {
if(p_b) {
$o.removeClass(p_class);
p_count--;
} else {
$o.addClass(p_class);
}
window.setTimeout(function() {
blink(p_selector,p_next,p_count,p_delay,p_class,!p_b);
},p_delay);
}
}
$(function() {
var h=window.location.hash;
if(h && ('#'!==h)) {
blink('a[name="'+h.replace(/#/g,'')+'"]',1,7,133,'anker_highlight');
blink('[id="'+h.replace(/#/g,'')+'"] > :first-child',0,7,133,'anker_highlight');
}
});
function wrap_to_two_columns(filter,min_count) {
$(filter).each(function() {
var $ul=$(this);
var l=$ul.children().length;
if(l>=min_count) {
$ul.css({minWidth:'49%',float:'left'});
var $ul2=$('<ul></ul>');
$ul2.attr('class',$ul.attr('class')).attr('style',$ul.attr('style'));
$ul.css({marginRight:'5px'});
$ul.after($ul2);
var $lis=$ul.children(':gt('+Math.ceil(l/2-1)+')');
$ul2.append($lis);
}
});
}
$(function() {
var a=[
'table.tab_main',
'div.div_filter_input',
'.equalize_height'
];
for(var i in a) {
var h=0;
$(a[i]).each(function() {
h=Math.max(h,$(this).height());
}).height(h);
}
});
$(window).load(function() {
var $outer=$('.slideshow_outer').first();
if($outer && $outer.length) {
if($outer.parent().css('display')==='table') {
$outer.parent().css({display:'block'});
}
var active=0;
var total=-1;
var width=-1;
var timer=0;
var $inner=$outer.find('.slideshow_inner');
var $slider=$inner.find('.slideshow_slider');
$('.slideshow_outer').not($outer).each(function() {
$(this).find('.slideshow_segment').appendTo($slider);
$(this).remove();
});
total=$slider.children().length;
$slider.css({display:'table'});
$slider.children().css({display:'table-cell'});
$outer.append('<div class="slideshow_nav_line"></div>');
$slider.children().each(function(i) {
$('.slideshow_nav_line').append('<span id="slideshow_nav_point_'+i+'" class="slideshow_nav_point"><a href="'+$(this).find('a').attr('href')+'">'+$(this).find('.slideshow_line2').html()+'</a></span>');
});
$slider.children().first().clone().appendTo($slider);
$inner.append('<div class="slideshow_prev">&#9665;</div><div class="slideshow_next">&#9655;</div>');
var cb_reset=function() {
if(timer) {
window.clearInterval(timer);
timer=0;
}
width=$inner.width();
$slider.children().width(width);
$slider.find('img.slideshow_image').width(width);
$('div.slideshow_nav_line').width(width);
if(active>=total) {
active=0;
}
$slider.stop(true,false).css({marginLeft:-(active*width)+'px'});
timer=window.setTimeout(function() {
cb_next();
},slideshow_delay);
};
$(window).on('resize',cb_reset);
$(window).on('orientationchange',cb_reset);
var cb_activate=function(num) {
cb_reset();
if(num>total) {
num=0;
} else if(num<0) {
num=total-1;
active=total;
$slider.css({marginLeft:-(active*width)+'px'});
}
active=num;
$('.slideshow_nav_point').removeClass('active');
$('#slideshow_nav_point_'+((active!=total)?active:0)).addClass('active');
$slider.animate({marginLeft:-(active*width)+'px'},400,'swing',cb_reset);
}
cb_activate(0);
var cb_next=function() {
cb_activate(active+1);
};
var cb_prev=function() {
cb_activate(active-1);
}
$outer.find('.slideshow_nav_point').on('mouseover',function() {
cb_activate(parseInt($(this).attr('id').replace(/\D/g,''),10));
});
$outer.find('.slideshow_prev').on('click',cb_prev);
$outer.find('.slideshow_next').on('click',cb_next);
}
});
$(function() {
var sel='.js_fade_out_expand, .js_fade_out_expand_once';
var $jsfoe=$(sel);
if($jsfoe) {
var expand=function($this,$parent) {
$this.remove();
$parent.data('mh733825',$parent.css('max-height')).css('max-height','');
$parent.children('.js_fade_out_expand').one('click',function() {
contract($(this),$parent);
});
};
var contract=function($this,$parent) {
var mh=$parent.data('mh733825');
if(mh) {
$parent.css('max-height',mh);
}
$parent.css({position:'relative'}).append('<span class="fade_out_bottom js_733825" style="display:block;position:absolute;bottom:0;height:30px;max-height:50%;width:100%;cursor:pointer">&#160;</span>');
};
$(document).on('click','.js_733825',function() {
expand($(this),$(this).parent());
});
window.js_fade_out_expand_init=function() {
function i($this) {
if(!$this.hasClass('js_fade_i1')) {
var $parent=$this.parent();
if($parent.height()<$this.height()) {
$this.addClass('js_fade_i1');
contract($this,$parent);
}
if(!$this.hasClass('js_fade_i0')) {
$this.addClass('js_fade_i0');
$this.find('img').on('load',function() {
i($this);
});
i($this);
}
}
}
$(sel).not('.js_fade_i0').each(function() {
i($(this));
});
}
window.js_fade_out_expand_init();
}
});
$(function() {
var touch_visible;
var last_visible;
var was_touch;
$('.top_menu_chapter a').on('touchstart',function() {
was_touch=1;
var $t=$('.top_menu_inner:visible');
touch_visible=0;
if($t.length) {
touch_visible=$t.get(0);
}
}).on('click',function(evt) {
if(was_touch) {
var $t=$('.top_menu_inner:visible');
if($t.length) {
if(!touch_visible || (touch_visible!=$t.get(0)) || !last_visible || (last_visible!=$t.get(0))) {
evt.preventDefault();
last_visible=$t.get(0);
}
}
}
});
});
$(function() {
$('.input_grid').each(function(z) {
var input_id=function(x,y) {
return 'input_grid_'+x+'_'+y+'_'+z;
};
var add_row_y=0;
var add_row=function() {
var html='';
for(var x=0;x<cols;x++) {
html+='<td><input id="'+input_id(x,add_row_y)+'" type="text" class="max"></td>';
}
$div.find('tbody').append('<tr>'+html+'</tr>');
add_row_y++;
}
var draw_table=function() {
var html='';
html+='<table><thead><tr>';
for(var i=0;i<data.heads.length;i++) {
var w=data.widths[i];
html+=' <th'+(w?' width="'+w+'"':'')+'>'+data.heads[i]+'</th>';
}
html+='</tr></thead><tbody></tbody></table>';
$div.empty().html(html);
for(var y=0;y<=data.cells.length;y++) {
add_row();
}
$div.find('table tbody tr').each(function(y) {
$(this).find('input').each(function(x) {
if(data.cells[y] && data.cells[y][x]) {
$(this).val(data.cells[y][x]);
}
});
});
$div.find('table tbody').on('change keyup','input',function(evt) {
read_data();
$div.find('table tbody tr').last().find('input').each(function() {
if($(this).val()) {
add_row();
return false;
}
});
}).on('keydown','input',function(evt) {
var a=$(this).attr('id').match(/[0-9]+/g);
switch(evt.which) {
case 33: // PgUp
case 38: // UP
$('#'+input_id(a[0],parseInt(a[1])-1)).focus();
evt.preventDefault();
break;
case 34: // PgDw
case 40: // DOWN
$('#'+input_id(a[0],parseInt(a[1])+1)).focus();
evt.preventDefault();
break;
}
});
read_data();
};
var read_data=function() {
var a=[];
$div.find('table tbody tr').each(function(y) {
var t=[];
$(this).find('input').each(function(x) {
t.push($(this).val().trim());
});
if(t.join('').length) {
a.push(t);
}
});
data.fields=a;
$('#'+data.name).val(JSON.stringify(a));
}
var $div=$(this);
var data=JSON.parse($div.attr('data-settings'));
var cols=data.heads.length;
$div.after('<input type="hidden" id="'+data.name+'" name="'+data.name+'">');
draw_table();
});
});
$(function() {
if('.block_bottom .files_path_names_inner') {
var $bb=$('.block_bottom');
var $path=$('.files_path_names_inner');
var $children=$path.children();
var fit=function() {
$path.hide();
var wbb=$bb.width();
$path.show();
$children.show();
if($bb.width()>wbb) {
$children.each(function() {
if($bb.width()>wbb) {
$(this).hide();
} else {
return false;
}
});
}
};
$(window).on('resize',fit);
fit();
}
});
$(function() {
if(navigator.userAgent.indexOf('Chrome')!==-1) { // Nur Chrome unterstuetzt DownloadURL
window.setTimeout(function() {
$('[data-drag_downloadurl]').attr({draggable:'true'}).on('dragstart',function(evt) {
if(evt && evt.originalEvent && evt.originalEvent.dataTransfer && evt.originalEvent.dataTransfer.setData) {
evt.originalEvent.dataTransfer.setData('DownloadURL',$(this).attr('data-drag_downloadurl'));
}
});
},100);
}
});
function img_to_clipboard(img,msg_success) {
console.log('img_to_clipboard');
if(img) {
var w=img.naturalWidth;
var h=img.naturalHeight;
if((w>1) && (h>1)) {
try {
var c=document.createElement('canvas');
var ctx=c.getContext('2d');
c.width=w;
c.height=h;
ctx.drawImage(img,0,0);
c.toBlob(function(blob) {
var o={}
o[blob.type]=blob;
var data=[new ClipboardItem(o)];
navigator.clipboard.write(data).then(function() {
console.log('Image copied to clipboard');
if(msg_success) {
top.show_message(msg_success);
}
},function(err) {
console.log(err);
});
});
} catch(err) {
console.log('unsupported.');
}
} else {
console.log('image has no size');
}
} else {
console.log('image is null');
}
}
$(function() {
var $tables=$('table.table_list,table.table_misc');
$tables.each(function() {
var $table=$(this);
var table=$table.get(0);
var cl=($table.hasClass('table_list')?'table_list':'table_misc');
var $thead=$table.find('thead').first();
var l=function(s) {
console.log(JSON.stringify(s));
};
var $v;
var hh=$('body.mode_iframes .popup_top_main').height();
hh=hh?hh:0;
var f=function() {
var rects=table.getClientRects();
// {"0":{"x":17,"y":-67,"width":533,"height":569,"top":-67,"right":550,"bottom":502,"left":17}}
if(rects && rects[0]) {
var y=rects[0]['y'];
var x=rects[0]['x'];
var b=rects[0]['bottom'];
// l(rects);
if($v) {
$v.remove();
$v=null;
}
if((y<hh) && (b>hh+$thead.height())) {
$v=$('<table class="'+cl+' '+cl+'_clone print_hide"></table>').append($thead.clone());
if($table.hasClass('table_list_admin')) {
$v.addClass('table_list_admin');
}
if($table.hasClass('text_center')) {
$v.addClass('text_center');
}
$v.css({'position':'fixed','top':hh+'px','left':x+'px'}).width($table.width());
var $oth=$thead.find('th');
var $cth=$v.find('th');
$oth.each(function(i) {
var $o=$(this);
var $c=$($cth.get(i));
$c.width($o.width());
$c.find('a').on('click',function(evt) {
evt.preventDefault();
evt.stopImmediatePropagation();
$o.find('a').trigger('click');
window.setTimeout(f,1);
});
});
$v.insertAfter($table);
}
}
};
var t=null;
var e=function() {
if(t) {
window.clearTimeout(t);
}
t=window.setTimeout(function() {
t=0;
f();
},30);
};
$(document).on('scroll load',e);
$(window).on('resize',e);
e();
});
});
var checkboxboundv=0;
var checkboxbound=function(a) {
var $b=$('.checkboxbound');
if($b.length) {
if($('input[type="checkbox"]:checked:not(.unbound)').length) {
if(!checkboxboundv) {
if(a) {
$b.fadeIn('fast');
} else {
$b.show();
}
checkboxboundv=1;
}
} else {
if(checkboxboundv) {
if(a) {
$b.fadeOut('fast');
} else {
$b.hide();
}
checkboxboundv=0;
}
}
}
}
$(function() {
if($('.checkboxbound').length) {
$(document).on('change','input[type="checkbox"]',function() {
checkboxbound(1);
});
checkboxbound(0);
}
});
$(function() {
if($('.filebound').length) {
$('.filebound').addClass('filebound_hidden');
$('input[type="file"]').on('change',function() {
$('.filebound').removeClass('filebound_hidden').removeClass('filebound_visible');
});
}
});
$(function() {
$('textarea.height_by_contents').each(function() {
if(this.scrollHeight) {
$(this).height(this.scrollHeight+10);
}
});
});
$(function() {
var c='annotation_section_hover';
$('.annotation_icon').on('mouseover',function() {
$(this).nextUntil('.annotation_icon, .annotation_end').addClass(c);
}).on('mouseout',function() {
$('.'+c).removeClass(c);
});
});
$(function() {
var sel='main h2.foldable, main h3.foldable';
var $f=$(sel);
if($f.length) {
var en=function() {
$f.removeClass('foldable_expanded_next');
var b=0;
$f.each(function() {
var $t=$(this);
if(b) {
$t.addClass('foldable_expanded_next');
}
b=($t.hasClass('foldable_expanded') && !$t.hasClass('foldable_end'));
});
};
var u=function($h) {
var $n=$h.nextUntil(sel);
var v=$h.hasClass('foldable_expanded');
$h.attr('html_title',lg(v?1019:1018));
if(v) {
$h.removeClass('foldable_collapsed');
$n.removeClass('screen_hide');
} else {
$h.addClass('foldable_collapsed');
$n.addClass('screen_hide');
}
};
$f.not('.foldable_end').each(function() {
u($(this));
en();
}).on('click',function() {
var $t=$(this);
if($t.hasClass('foldable_entangled') && !$t.hasClass('foldable_expanded')) {
var $o=$f.filter('.foldable_entangled.foldable_expanded');
if($o.length) {
u($o.removeClass('foldable_expanded'));
}
}
u($t.toggleClass('foldable_expanded'));
en();
hide_tooltip();
$(window).trigger('resize').trigger('resize');
});
}
});
$(function() {
var $tables=$('table.table_list.attach_download_as_ods');
if($tables.length) {
$tables.each(function() {
var $table=$(this);
$('<a href="#" class="download_as_ods"></a>').attr({title:lg(400)}).prependTo($table.find('th').last()).on('click',function(e) {
e.preventDefault();
var a=[];
var $tr=$table.children().children('tr');
$tr.each(function() {
var $cells=$(this).children($table.attr('data-download_as_ods_filter'));
var r=[];
$cells.each(function() {
var s=$(this).text();
r.push(s);
});
a.push(r);
});
$.ajax({
dataType: 'json',
url: '991.php?sid='+session_id,
data: {
name: $table.attr('data-download_as_ods_name'),
title: $table.attr('data-download_as_ods_title'),
table: JSON.stringify(a),
"return": 'url'
},
type: 'POST',
success: function(data,status) {
if(data.url) {
$('<iframe src="'+data.url+'" style="display:none"></iframe>').appendTo('body');
} else {
alert(lg(200)+"\n\nurl is missing.");
}
},
error: function(jqXHR,textStatus,errorThrown) {
alert(lg(200)+"\n\n"+errorThrown);
}
});
});
});
}
});
var init_line_to_copy_gap=0;
function init_line_to_copy() {
if(ww ) {
$('div.line_to_copy:not(.line_to_copy_initialized)').each(function() {
var $div=$(this);
var $input=$('<input type="text" class="max onall_select line_to_copy" readonly>').attr('value',$(this).html());
var val=$input.val();
$div.empty().css({'white-space':'nowrap'}).append($input).addClass('line_to_copy_initialized');
var gap=0;
var hdhpl=function() {
var $t=$('table#dh_popup_link');
if($t.length) {
$t.fadeOut(500,function() { $t.remove(); });
}
};
if(navigator && navigator.clipboard && navigator.clipboard.writeText) {
var $cp=$('<img src="../pics/line_to_copy.svg" class="mo oc" title="'+lg(900)+'" alt="'+lg(900)+'">').on('click',function(evt) {
navigator.clipboard.writeText(val).then(function() {
show_message(lg(902));
},function() {
show_message(lg(904));
});
hdhpl();
});
var sp='<span class="bsp"></span>';
$div.append(sp).append(sp).append($cp);
gap+=30;
}
if(val.match(/^https:\/\/[a-zA-Z0-9\/.?%_=-]+$/)) {
var $cp=$('<img src="../pics/line_to_qr.svg" class="mo oc" title="'+lg(910)+'" alt="'+lg(910)+'">').on('click',function(evt) {
OpenPopUpImage('/0.gif');
top.$('img#ww_layer_image').on('load',function() {
img_to_clipboard(this,lg(912));
}).attr({'src':'992.php?url='+val});
hdhpl();
});
var sp='<span class="bsp"></span>';
$div.append(sp).append(sp).append($cp);
gap+=30;
}
if(gap) {
$div.addClass('vam').append(sp);
init_line_to_copy_gap=Math.max(init_line_to_copy_gap,gap);
}
});
if(init_line_to_copy_gap) {
$('div.line_to_copy_initialized input').css({'width':'calc(100% - '+init_line_to_copy_gap+'px)'});
}
}
}
function show_message(s) {
if(s) {
$('<div class="ww_message"></div>').appendTo('body').text(s);
}
var $ww_message=$('.ww_message');
if($ww_message.length) {
$ww_message.each(function(i) {
if(i && $(this).attr('data-first')) {
$(this).remove();
}
});
var $t=$('#ww_message_outer');
if(!$t.length) {
$t=$('<div id="ww_message_outer"><div id="ww_message_inner"></div></div>').appendTo('body');
}
$('.ww_message').appendTo('#ww_message_inner').show();
$t.stop(true).fadeIn().delay(ww_message_delay+30*$('#ww_message_inner').text().length).fadeOut(function() {
$(this).remove();
}).click(function() {
$(this).remove();
});
}
}
function focus_field(n) {
$('<div></div>').attr({class:'oc','data-focus_field':n}).appendTo('body').click().remove();
}
$(function() {
if($('.fullsize').length) {
var $fs=$('.fullsize').css({position:'absolute'}).appendTo('body');
$('html,body').children().addBack().not($fs.children().addBack()).css({overflow:'hidden'});
var fsrs=function() {
var pw=$(window).width();
var ph=$(window).height();
var th=$('.popup_top_main').outerHeight();
var bh=$('.bottom_submits_outer').outerHeight();
var rh=Math.max(100,ph-th-bh);
var o=$fs.offset();
if(o.top!=th) {
$fs.offset({left:0,top:th});
}
if(($fs.width()!=pw)||($fs.height()!=rh)) {
$fs.width(pw);
$fs.height(rh);
}
}
$(window).on('resize',function() {
fsrs();
});
window.setInterval(fsrs,1000);
fsrs();
}
$(document).on('click, focus, mouseup','.onall_select',function() {
$(this).select();
});
init_line_to_copy();
$('.onchange_submit').on('change',function() {
this.form.submit();
});
$('a.a_audio_play').on('click',function(evt) {
var o=$(this).prev('audio').get(0);
if(o) {
if(o.paused) {
o.play();
} else {
o.pause();
}
}
evt.preventDefault();
});
$('audio').on('play pause ended',function() {
$(this).next('a.a_audio_play').children('img').attr('src','../pics/audio_'+(this.paused?'play':'pause')+'.svg');
});
$('.toggle_between').on('click',function() {
$(this).nextUntil('.toggle_between').toggle('fast');
});
$('table.table_list[data-empty]').each(function() {
if(!$(this).find('tbody tr').length) {
$(this).after('<p class="info">'+$(this).attr('data-empty')+'</p>').remove();
}
});
window.setTimeout(function() {
var $a=$('table.table_list:first th a.oc[data-sort]');
if($a.length) {
var m=$('table.table_list:first').hasClass('sort_skip_first')?2:1;
if($('table.table_list:first tbody:first tr').not('.tr_gap').length<=m) {
$a.each(function() {
$(this).after('<span>'+$(this).html()+'</span>').remove();
});
}
}
},1);
$('.preformating_point').on('click',function() {
$(this).parent().toggleClass('preformated');
});
$('table.table_lr td.title').each(function() {
if(this.scrollWidth && this.clientWidth && (this.scrollWidth>this.clientWidth) && !$(this).attr('title') && !$(this).attr('html_title')) {
$(this).attr('title',$(this).text());
}
});
window.setTimeout(function() {
show_message();
},10);
});
$(function() {
window.setTimeout(function() {
$('body').addClass('loaded').removeClass('loading');
},1);
});
window.oc_ajaj_call=function(req) {
req.dataType='json',
req.type='POST',
req.success=function(data,status) {
if(data['queue']) {
for(var i in data['queue']) {
var c=data['queue'][i];
if((!c['if_selector'] || $(c['if_selector']).length) && (!c['if_not_selector'] || !$(c['if_not_selector']).length)) {
switch(c['method']) {
case 'append':
$(c['selector']).append(c['html']);
break;
case 'replaceWith':
$(c['selector']).replaceWith(c['html']);
break;
case 'hide':
$(c['selector']).hide();
break;
case 'remove':
$(c['selector']).remove();
break;
}
}
}
ww.p_fit_all();
}
if(window.js_fade_out_expand_init) {
window.js_fade_out_expand_init();
}
if(data['alert']) {
alert(data['alert']);
}
};
if(!req.data) {
req.data='0=';
}
req.data+='&is_flash_available='+(ww.browser.is_flash_available()?1:0);
req.error=function(data,status,http_error) {
// alert('ERROR\n'+status+'\n'+http_error);
};
$.ajax(req);
};
$(document).on('click','.oc',function(event) {
var $t=$(this);
var s='';
if(!(s=$t.attr('data-confirm')) || confirm(s.replace(/&#34;/g,'"'))) {
event.stopImmediatePropagation();
event.preventDefault();
var w=window;
if($t.attr('data-opener')) {
try {
w=ww.get_opener();
if(!w.$.isWindow(w)) {
throw 'bad window';
}
} catch(e) {
alert(lg(1212));
ww.close();
}
}
if(s=$t.attr('data-resize')) {
var a=s.split(',');
ww.resize_to(a[0],a[1],a[2]);
}
if(s=$t.attr('data-remove_class')) {
$t.parents().add(this).removeClass(s);
}
if(s=$t.attr('data-call_function')) {
w[s]($t.attr('data-call_parameter'));
}
if((s=$t.attr('data-field')) || $t.attr('data-post') || $t.attr('data-clear') || $t.attr('data-concat') || $t.attr('data-concat_checkboxes')) {
var $form=w.$('form').first();
s=s?s:'js-post';
var $field=$form.find('[name="'+s+'"]');
if(!$field.length) {
$field=w.$('<input type="hidden" name="'+s+'">').appendTo($form.get(0));
}
var field=$field.get(0);
var is_multiline=(field.nodeName.toUpperCase()=='TEXTAREA');
if($t.attr('data-clear')) {
$field.val('');
}
if(s=$t.attr('data-concat')) {
$field.val($field.val()+($field.val()?(is_multiline?'\n':', '):'')+s);
} else if(s=$t.attr('data-concat_checkboxes')) {
if(s=='1') {
$('input[type="checkbox"]').each(function() {
if($(this).prop('checked')) {
$field.val($field.val()+($field.val()?(is_multiline?'\n':', '):'')+$(this).val());
}
});
} else {
alert('@nyi');
}
} else {
$field.val($t.attr('data-post'));
}
if($t.attr('data-post')) {
$form.submit();
} else if(is_multiline) {
field.scrollTop=field.scrollHeight;
} else {
field.scrollLeft=field.scrollWidth;
}
}
if($t.attr('data-clear_checkboxes')) {
$('input[type="checkbox"]').prop('checked',0);
}
if(s=$t.attr('data-switch_checkboxes')) {
var $e;
if(s=='1') {
$e=$('input[type="checkbox"]');
} else if(s=='2') {
$e=$t.parents('table').first().find('input[type="checkbox"]');
} else {
$e=$('input[type="checkbox"]').filter(s);
}
if($e) {
$e.each(function() {
$(this).prop('checked',!$(this).prop('checked'));
});
} else {
alert('@nyi');
}
checkboxbound(1);
}
if(s=$t.attr('data-ajaj_href')) {
window.oc_ajaj_call({
url: s,
data: $t.attr('data-ajaj_data'),
async: ($t.attr('data-href') || $t.attr('data-close')),
});
}
if(s=$t.attr('data-alert')) {
alert(s);
}
if(s=$t.attr('data-focus_field')) {
var $e=$('input[name="'+s+'"],textarea[name="'+s+'"]');
if(!$e || !$e.length) {
$e=$('input[name^="'+s+'"]');
}
if($e && $e.length) {
$e.get(0).focus();
$e.fadeTo(250,0.1,function() {
$e.css({backgroundColor:'yellow'});
}).fadeTo(250,1).fadeTo(250,0.1,function() {
$e.css({backgroundColor:''}).fadeTo(250,1);
});
}
}
if(s=$t.attr('data-lightbox')) {
if(s=='1') {
s=$t.attr('src');
}
if(s) {
OpenPopUpImage(s);
}
}
if(s=$t.attr('data-popup')) {
OpenPopUp(s);
}
if(s=$t.attr('data-document')) {
open_document(s);
}
if(((s=$t.attr('data-href')) || (s=$t.attr('href'))) && (s.length>1) ) {
w.location.assign(s);
}
if(s=$t.attr('data-sort')) {
sort_table(this,(s=='1')?1:0);
}
if($t.attr('data-blink')) {
$t.fadeOut('fast').fadeIn('fast');
}
if(s=$t.attr('data-show')) {
$(s).fadeIn();
}
if(s=$t.attr('data-hide')) {
if(s=='1') {
$t.fadeOut();
} else {
$(s).fadeOut($t.attr('data-show')?0:'normal');
}
}
if(s=$t.attr('data-toggle')) {
if(s=='1') {
$t.toggle();
} else {
$(s).toggle();
}
}
if(s=$t.attr('data-remove')) {
if(s=='1') {
$t.remove();
} else {
$(s).remove();
}
}
if($t.attr('data-close')) {
ww.close();
}
if(s=$t.attr('data-sleep_close')) {
window.setTimeout(function() {
ww.close();
},parseInt(s));
}
hide_tooltip();
}
});
$(document).on('keydown','.oc, .ellipsis',function(event) {
if(event.keyCode==13) {
$(this).trigger('click');
event.preventDefault();
}
});
$(function() {
$('.onload').addClass('oc').trigger('click').removeClass('oc');
});
window.oc_call=function(a) {
var $t=$('<div class="oc" style="display:none"></div>');
for(var i in a) {
$t.attr('data-'+i,a[i]);
}
$t.appendTo('body').trigger('click').removeClass('oc');
};
$(function() {
var asets=[];
$('img.placeholder').each(function() {
var aset=$(this).attr('class').match(/set[0-9]+/);
if(aset && !asets[aset[0]]) {
asets[aset[0]]=1;
if(!$('img.'+aset[0]+':not(.placeholder)').length) {
$('img.'+aset[0]).remove();
}
}
});
});
var slideIDs=new Array();
var slideTexts=new Array();
var slideCurrentZ=16;
var slideDragId=null;
var slideDragX;
var slideDragY;
var useSmallSliders=0;
if(document.all) {
var slideIsIE=true;
} else {
var slideIsIE=false;
}
function slideGetEvent(evt) {
if(slideIsIE) {
return window.event;
} else {
return evt;
}
}
function slide(sid) {
return document.getElementById('slide' + sid);
}
function slideStart(id) {
return document.getElementById('start' + id);
}
function slideEnd(id) {
return document.getElementById('end' + id);
}
function addSlide(sid,text) {
slideIDs[slideIDs.length]=sid;
slideTexts[slideTexts.length]=html_entity_decode(text);
}
function initSlides() {
var i;
for (i=0;i<slideIDs.length;i++) {
if(useSmallSliders==1) {
document.write('<div id="slide' + slideIDs[i] + '" class="slide_small" onmousedown="dragStart(event,\'' + slideIDs[i] + '\');" UNSELECTABLE="on">' + slideTexts[i] + '</div>');
} else {
document.write('<div id="slide' + slideIDs[i] + '" class="slide" onmousedown="dragStart(event,\'' + slideIDs[i] + '\');" UNSELECTABLE="on">' + slideTexts[i] + '</div>');
}
}
}
function initSlides2() {
var i;
for(i=0;i<slideIDs.length;i++) {
slide(slideIDs[i]).style.left=getAbsoluteLeft(slideStart(slideIDs[i]))+'px';
slide(slideIDs[i]).style.top=getAbsoluteTop(slideStart(slideIDs[i]))+'px';
for(i2=0;i2<document.forms[0].elements.length;i2++) {
e=document.forms[0].elements[i2]
if(e.type=='text') {
l=getAbsoluteLeft(e);
t=getAbsoluteTop(e)
if (e.value==slideTexts[i]) {
besetzt=0;
for (i3=0;i3<slideIDs.length;i3++) {
if((l==parseInt(slide(slideIDs[i3]).style.left)) && (t==parseInt(slide(slideIDs[i3]).style.top))) {
besetzt=1;
}
}
if(besetzt==0) {
slide(slideIDs[i]).style.left=l+'px';
slide(slideIDs[i]).style.top=t+'px';
}
}
}
}
}
}
function dragStart(evt,sid) {
var e=slideGetEvent(evt);
slideDragId=sid;
if(slideIsIE) {
document.onmousemove=dragMove;
document.onmouseup=dragEnd;
} else {
window.onmousemove=dragMove;
window.onmouseup=dragEnd;
}
slideDragX=e.clientX;
slideDragY=e.clientY;
slideCurrentZ++;
slide(sid).style.zIndex=slideCurrentZ;
for(i=0;i<document.forms[0].elements.length;i++) {
e2=document.forms[0].elements[i]
if(e2.type=='text') {
if((getAbsoluteLeft(slide(slideDragId))==getAbsoluteLeft(e2)) && (getAbsoluteTop(slide(slideDragId))==getAbsoluteTop(e2))) {
e2.value='';
}
}
}
return true;
}
function dragMove(evt) {
var e=slideGetEvent(evt)
if(slideDragId>'') {
slide(slideDragId).style.left=(parseInt(slide(slideDragId).style.left)+e.clientX-slideDragX)+'px';
slide(slideDragId).style.top=(parseInt(slide(slideDragId).style.top)+e.clientY-slideDragY)+'px';
slideDragX=e.clientX;
slideDragY=e.clientY;
}
}
function dragEnd(evt) {
var i;
var s;
var e;
var besetzt;
var sid2;
besetzt=0;
if(slideIsIE) {
document.onmousemove=null;
} else {
window.onmousemove=null;
}
if(slideDragId>'') {
s=slide(slideDragId);
sid2=slideDragId;
slideDragId=null;
for (i=0;i<document.forms[0].elements.length;i++) {
e=document.forms[0].elements[i]
if(e.type=='text') {
l=getAbsoluteLeft(e);
t=getAbsoluteTop(e)
if((parseInt(s.style.left)<l+parseInt(e.offsetWidth)) && (parseInt(s.style.left)+parseInt(e.offsetWidth)>l) && (parseInt(s.style.top)<t+parseInt(e.offsetHeight)) && (parseInt(s.style.top)+parseInt(e.offsetHeight)>t)) {
for (i2=0;i2<slideIDs.length;i2++) {
if((l==parseInt(slide(slideIDs[i2]).style.left)) && (t==parseInt(slide(slideIDs[i2]).style.top))) {
besetzt=1;
}
}
if(besetzt==0){
s.style.left=l+'px';
s.style.top=t+'px';
e.value=s.innerHTML;
return true;
}else{
s.style.left=getAbsoluteLeft(slideStart(sid2))+'px';
s.style.top=getAbsoluteTop(slideStart(sid2))+'px';
return true;
}
}
}
}
}
return true;
}
var cwX=new Array();
var cwY=new Array();
var cwD=new Array();
var cwL=new Array();
var cwT=new Array();
var cwNone = 0;
var cwHorizontal = 1;
var cwVertical = 2;
if (document.all)
var cwIsIE=true;
else
var cwIsIE=false;
function cwGetElementById(id) {
if (cwIsIE) {
return document.all(id);
} else {
return document.getElementById(id);
}
}
function cwSetEnd(xy) {
var e=cwGetElementById('td'+xy);
if (e) {
e.innerHTML='<img src="../pics/cw_none.gif" border="0" class="crosswordimage" alt="">';
}
}
function cwGetTD(id) {
return cwGetElementById('td'+cwX[id]+'_'+cwY[id]);
}
function cwGetLayer(id) {
return cwGetElementById('cwl'+id);
}
function cwGetInput(id) {
return cwGetElementById('cwli'+id);
}
function cwXY(id,pos) {
if (cwD[id]==cwHorizontal) {
return (cwX[id]+pos)+'_'+(cwY[id]);
} else {
return (cwX[id])+'_'+(cwY[id]+pos);
}
}
function cwAddEntry(x,y,dir,text,sol,highlight,check) {
var html;
var id=cwX.length;
var td;
var i;
if (dir==cwNone) {
cwSetEnd(x+'_'+y);
} else {
cwX[id]=x;
cwY[id]=y;
cwD[id]=dir;
cwL[id]=sol.length;
cwT[id]=text;
cwSetEnd(cwXY(id,cwL[id]+1));
if (highlight>0) {
document.forms[0].elements['f'+cwXY(id,highlight)].className+=' crosswordfieldhighlight';
}
if(check) {
for(i=1;i<=check.length;i++) {
document.forms[0].elements['r'+cwXY(id,i)].value=check[i];
}
} else {
for(i=1;i<=cwL[id];i++) {
document.forms[0].elements['r'+cwXY(id,i)].value=sol.charAt(i-1);
}
}
}
return true;
}
function cwInit() {
var imgsrc;
var id;
for(id=0;id<cwX.length;id++) {
if(cwD[id]==cwVertical){
imgsrc='../pics/cw_down.gif';
} else {
imgsrc='../pics/cw_right.gif';
}
cwGetTD(id).innerHTML='<img src="' + imgsrc + '" border="0" onclick="cwClick(this,'+id+')" class="crosswordimageborder" alt="">';
document.write('<div class="crosswordlayer" id="cwl'+id+'">'+cwT[id]+'<br /><input onkeypress="return onKeyPressEnterBlur(this);" id="cwli'+id+'" name="cwli'+id+'" value="" onBlur="cwBlur('+id+');"><img src="../pics/cw_submit.gif" alt=""></div>');
cwGetLayer(id).style.display='none';
}
}
function cwClick(obj,id) {
var l;
var td;
var left;
var top;
var i;
var s='';
// alert('test');
l=cwGetLayer(id);
l.style.top=(getAbsoluteTop(obj)+20)+'px';
l.style.left=(getAbsoluteLeft(obj)+20)+'px';
l.style.display='block';
for(i=1;i<=cwL[id];i++) {
s+=(document.forms[0].elements['f'+cwXY(id,i)].value+' ').charAt(0);
}
s=s.replace(/ +$/g,'');
cwGetInput(id).value=s
cwGetInput(id).focus();
form_blur=cwGetInput(id);
}
function cwBlur(id) {
var l;
var i;
var s;
s=cwGetInput(id).value.toUpperCase();
for(i=1;i<=cwL[id];i++) {
document.forms[0].elements['f'+cwXY(id,i)].value=s.charAt(i-1);
}
l=cwGetLayer(id);
l.style.display='';
l.style.display='none';
form_blur=null;
return true;
}
//
var swapcolor_color0='#ffffff';
var swapcolor_color1='#C6D1E0';
function swapcolor(feld_id) {
var feld = document.getElementById(feld_id);
var hiddeninput = document.getElementById("hi_" + feld_id);
var old_value = hiddeninput.value;
if(old_value == '1'){
feld.bgColor=swapcolor_color0;
hiddeninput.value='0';
} else {
feld.bgColor=swapcolor_color1;
hiddeninput.value='1';
}
return false;
}
//
function mark_this(feld_id){
var feld=document.getElementById(feld_id);
var hiddeninput=document.getElementById("hi_"+feld_id);
var old_value=parseInt(hiddeninput.value);
if(isNaN(old_value)){
old_value=0;
}
if (old_value == 0){
feld.bgColor=my_colors[memory_value];
hiddeninput.value=memory_value;
memory_value=memory_value + 1;
}else{
feld.bgColor='#E5EBEF';
memory_value=parseInt(hiddeninput.value);
hiddeninput.value=0;
for(var i=0;i<8;i++){
if(parseInt(document.getElementById("hi_marker"+i).value)>memory_value){
document.getElementById("marker" + i).bgColor='#E5EBEF';
document.getElementById("hi_marker"+i).value=0;
}
}
}
}
function init_memory(){
}
//
function image_click(obj,evt,name_input,id_move,move_offset_x,move_offset_y) {
if(document.all) {
evt=window.event;
}
abs_x=evt.clientX+getScrollLeft();
abs_y=evt.clientY+getScrollTop();
rel_x=abs_x-getAbsoluteLeft(obj);
rel_y=abs_y-getAbsoluteTop(obj);
if(move_offset_x) {
abs_x-=move_offset_x;
}
if(move_offset_y) {
abs_y-=move_offset_y;
}
if(name_input && (f=document.forms[0]) && f[name_input]) {
f[name_input].value=(rel_x + ',' + rel_y + ',' + abs_x + ',' + abs_y);
}
if(id_move && (o=document.getElementById(id_move))) {
o.style.left=abs_x+'px';
o.style.top=abs_y+'px';
o.style.display='block';
}
}
//
function open_all_feedbacks() {
var a;
for(var i in arr=document.getElementsByTagName('img')) {
img=arr[i];
if(img && img.src && img.src.match(/m_feed.gif$/)) {
a=img.parentNode;
if(a && a.click) {
a.click();
} else {
if(a && (s=a.getAttribute('onclick')+' ')) {
if(s=s.replace(/^return.*showHide.*'(answer[0-9]+)'.*$/,'$1')) {
showHide(s);
}
}
}
img.src='/0.gif';
}
}
}
var trIsVisible=false;
function trBlur() {
$('#trlay').fadeOut(function() {
$('#trlay iframe').attr('src','997.html');
});
trIsVisible=false;
return false;
}
function trInit() {
}
function trLay(obj,word) {
var l;
if(trIsVisible==word) {
trBlur();
} else {
if(!$('#trlay').length) {
$('<div style="display:none" class="trlay" id="trlay"><iframe src="'+word+'" id="triframe" name="iframe" frameborder="0" onclick="return trBlur();" allowtransparency="true"></iframe></div>').appendTo('#skeleton_main').on('click',trBlur);
} else {
$('#trlay iframe').attr('src',word);
}
var o=$(obj).offset();
var w=$('#trlay').width();
$('#trlay').fadeIn().offset({
left: Math.max(5,Math.min(o.left,$(window).width()-w-10)),
top: o.top+30
});
trIsVisible=word;
}
return false;
}
function trPopUpBlocked() {
if(!$('#div310113').length) {
$('body').append('<div style="position:absolute;left:10px;top:10px;z-index: 100000;display:none" id="div310113"></div>');
$.get('406225.php',function(data) {
table=$(data.replace(/^.*<body[^>]*>/,'<div>').replace(/<\/body[^>]*>.*$/,'</div>')).find('table');
$('#div310113').empty().append(table).fadeIn();
},'html');
}
};
$(function() {
if($('.function_files, .cms_container_function_files').length) {
if(($('#table_files tr.files_normal').length>1) && $('#sort_anker').length) {
$('#sort_by_date').show().click(function(evt) {
sort_table($('#sort_anker').get(0));
$('#sort_by_date').remove();
evt.preventDefault();
hide_tooltip();
});
}
if(($('#table_files tr.files_normal').length>1) && $('#sort_anker_date').length) {
var f=function(evt) {
evt.preventDefault();
hide_tooltip();
$('#sort_by_date, #sort_by_name').toggle();
}
$('#sort_by_date').show().on('click',function(evt) {
sort_table($('#sort_anker_date').get(0));
f(evt);
});
if($('#sort_anker_name').length) {
$('#sort_by_name').on('click',function(evt) {
sort_table($('#sort_anker_name').get(0),1);
f(evt);
});
}
}
}
});
//
var sort_table_column=-1;
var sort_table_last_column=-1;
var sort_table_ascending=-1;
function sort_table2(tr1,tr2) {
var td1=tr1.getElementsByTagName('td')[sort_table_column];
var td2=tr2.getElementsByTagName('td')[sort_table_column];
if(td1 && td1.hasChildNodes()) {
if(td2 && td2.hasChildNodes()) {
var td1val,td2val;
if(td1.getAttribute('sort')) {
td1val=td1.getAttribute('sort');
} else {
var tempNode=td1;
while(tempNode.hasChildNodes()) {
tempNode=tempNode.firstChild;
}
td1val=tempNode.nodeValue;
}
if(td2.getAttribute('sort')) {
td2val=td2.getAttribute('sort');
} else {
var tempNode=td2;
while(tempNode.hasChildNodes()) {
tempNode=tempNode.firstChild;
}
td2val=tempNode.nodeValue;
}
if(!isNaN(td1val)&&!isNaN(td2val)) {
td1val=parseFloat(td1val);
td2val=parseFloat(td2val);
} else {
if(td1val && (td1val!='&#160;')) {
td1val=td1val.toLowerCase();
} else {
td1val='';
}
if(td2val && (td2val!='&#160;')) {
td2val=td2val.toLowerCase();
} else {
td2val='';
}
}
if(td1val==td2val) {
return 0;
} else if(td1val>td2val) {
return 1;
} else {
return -1;
}
} else {
return 1;
}
} else if(td2 && td2.hasChildNodes()) {
return -1;
} else {
return 0;
}
}
function sort_table(a,ascending) {
var th=a.parentNode;
var tr_th=th.parentNode;
var thead=tr_th.parentNode;
var table=thead.parentNode;
if((a.nodeName=='A')&&((th.nodeName=='TH')||(th.nodeName=='TD'))&&(tr_th.nodeName=='TR')&&((thead.nodeName=='THEAD')||(thead.nodeName=='TBODY'))&&(table.nodeName=='TABLE')) {
sort_table_column=1;
var j=0;
for(var i=0;i<tr_th.childNodes.length;i++) {
if((tr_th.childNodes[i].nodeName=='TH')||(tr_th.childNodes[i].nodeName=='TD')) {
if(th==tr_th.childNodes[i]) {
sort_table_column=j;
}
j++;
}
}
var tbody=table.tBodies[0];
var arr_tr=Array();
var arr_tr_class=Array();
var tr_first;
var j=0;
for(var i=0;i<tbody.rows.length;i++) {
var node=tbody.rows[i];
if((node.nodeName=='TR') && node.hasChildNodes()) {
arr_tr[j]=node.cloneNode(true);
arr_tr_class[j]=node.className;
j++;
}
}
if(arr_tr.length && $(table).hasClass('sort_skip_first')) {
tr_first=arr_tr.shift();
arr_tr_class.shift();
}
if(sort_table_last_column==sort_table_column) {
sort_table_ascending=!sort_table_ascending;
arr_tr.reverse();
} else {
sort_table_ascending=ascending;
arr_tr.sort(sort_table2);
if(!sort_table_ascending) {
arr_tr.reverse();
}
sort_table_last_column=sort_table_column;
}
for(var i=0;i<arr_tr.length;i++) {
var part0='',part1='';
if(arr_tr_class[i]) {
part0=arr_tr_class[i].match(/^\S+/);
}
if(arr_tr[i].className && arr_tr[i].className.match(/\s+.+$/)) {
part1=' ' + arr_tr[i].className.match(/\s+.+$/);
}
arr_tr[i].className=part0 + part1;
}
while(tbody.hasChildNodes()) {
tbody.removeChild(tbody.firstChild);
}
if(tr_first) {
tbody.appendChild(tr_first);
}
for(var i=0;i<arr_tr.length;i++) {
tbody.appendChild(arr_tr[i]);
}
var src='/pics/s'+(sort_table_ascending?'0':'1')+'.svg';
$('#table_sort_arrow').remove();
$('<img src="'+src+'" alt="" id="table_sort_arrow">').appendTo(th);
} else {
alert('wrong call of sort_table(): ' + a.nodeName + ' - ' + th.nodeName + ' - ' + tr_th.nodeName + ' - ' + thead.nodeName + ' - ' + table.nodeName);
}
return false;
}
//
var table_drag_y;
var table_drag_tr;
var table_drag_uns;
function table_drag_get_event(evt) {
if(document.all) {
return window.event;
} else {
return evt;
}
}
function table_drag_start(evt,obj) {
if((obj)&&(obj.nodeName=='TD')&&(obj.parentNode)&&(obj.parentNode.nodeName=='TR')) {
var e=table_drag_get_event(evt);
if(document.all) {
document.onmousemove=table_drag_move;
document.onmouseup=table_drag_end;
} else {
window.onmousemove=table_drag_move;
window.onmouseup=table_drag_end;
}
table_drag_y=e.clientY;
table_drag_tr=obj.parentNode;
if(table_drag_uns=!$('body').hasClass('unselectable')) {
$('body').addClass('unselectable');
}
$(table_drag_tr).addClass('table_dragging');
} else {
alert('You cannot drag this.');
}
return true;
}
function table_drag_get_height(o) {
return o.clientHeight?o.clientHeight:o.offsetHeight;
}
function table_drag_move(evt) {
var e=table_drag_get_event(evt);
var y=e.clientY;
var d_y=(y-table_drag_y);
var height=table_drag_get_height(table_drag_tr);
if(Math.abs(d_y)>(height*2/3)) {
var o_t=table_drag_tr.parentNode;
var ns_tr=table_drag_tr.nextSibling;
var ps_tr=table_drag_tr.previousSibling;
if(d_y>0) {
if((ns_tr)&&(ns_tr.nodeName=='TR')) {
var nsc_tr=ns_tr.cloneNode(true);
o_t.insertBefore(nsc_tr,table_drag_tr);
o_t.removeChild(ns_tr);
table_drag_y+=table_drag_get_height(nsc_tr);
}
} else {
if((ps_tr)&&(ps_tr.nodeName=='TR')) {
var psc_tr=ps_tr.cloneNode(true);
if((ns_tr)&&(ns_tr.nodeName=='TR')) {
o_t.insertBefore(psc_tr,ns_tr);
} else {
o_t.appendChild(psc_tr,ns_tr);
}
o_t.removeChild(ps_tr);
table_drag_y-=table_drag_get_height(psc_tr);
}
}
if(document.getElementById('show_on_drag')) {
document.getElementById('show_on_drag').style.display='';
}
if(document.getElementById('set_value_on_drag')) {
document.getElementById('set_value_on_drag').value='1';
}
if(document.getElementById('hide_on_drag')) {
document.getElementById('hide_on_drag').style.display='none';
}
}
if(document.selection && document.selection.empty) {
document.selection.empty();
}
hide_tooltip();
return true;
}
function table_drag_end(evt) {
if(document.all) {
document.onmousemove=null;
document.onmouseup=null;
} else {
window.onmousemove=null;
window.onmouseup=null;
}
if(table_drag_uns) {
$('body').removeClass('unselectable');
}
$(table_drag_tr).removeClass('table_dragging');
return true;
}
function SCORM_API() {
// Properties
this.data_written=false;
this.properties=new Object();
// Methods
this.Initialize = SCORM_API_Initialize;
this.Terminate = SCORM_API_Terminate;
this.Commit = SCORM_API_Commit;
this.GetValue = SCORM_API_GetValue;
this.SetValue = SCORM_API_SetValue;
this.GetLastError = SCORM_API_GetLastError;
this.GetErrorString = SCORM_API_GetErrorString;
this.GetDiagnostis = SCORM_API_GetDiagnostic;
this.Debug = SCORM_API_Private_Debug;
}
function SCORM_API_Initialize() {
this.Debug('SCORM_API_Initialize');
return 'true';
}
function SCORM_API_Terminate() {
this.Debug('SCORM_API_Terminate');
this.Commit();
return 'true';
}
function SCORM_API_Commit() {
this.Debug('SCORM_API_Commit');
if((this.GetValue('cmi.completion_status')=='completed') && !this.data_written) {
switch(this.GetValue('cmi.success_status')) {
case 'passed':
send_passed();
this.data_written=true;
break;
case 'failed':
send_failed();
this.data_written=true;
break;
}
}
return 'true';
}
function SCORM_API_GetValue(property) {
this.Debug('SCORM_API_GetValue',property);
return ((this.properties[property] && (this.properties[property]!='undefined'))?this.properties[property]:'');
}
function SCORM_API_SetValue(property,value) {
this.Debug('SCORM_API_SetValue',property,value);
this.properties[property]=value;
return 'true';
}
function SCORM_API_GetLastError() {
this.Debug('SCORM_API_GetLastError');
return '0';
}
function SCORM_API_GetErrorString(error_no) {
this.Debug('SCORM_API_GetErrorString',error_no);
return 'No Error';
}
function SCORM_API_GetDiagnostic(property) {
this.Debug('SCORM_API_GetDiagnostic',property);
return 'true';
}
function SCORM_API_Private_Debug(message,property,value) {
if(p=document.getElementById('debug')) {
p.innerHTML+=message + '(';
if(property) {
p.innerHTML+=property;
}
if(value) {
p.innerHTML+=',' + value;
}
p.innerHTML+=');<br />';
}
}
var API_1484_11 = new SCORM_API();
$(function() {
if(enable_autoupload) {
var activeTimeout=null;
var test_i=0;
var drag_get_id=function(e) {
var id=null;
if(activeTimeout) {
window.clearTimeout(activeTimeout);
activeTimeout=null;
}
$('.autoupload_hover').removeClass('autoupload_hover');
if(e) {
var t=e.target;
while(t && (!t.className || !t.className.match(/autoupload/))) {
t=t.parentNode;
}
if(t) {
$(t).addClass('autoupload_hover');
activeTimeout=window.setTimeout(function() {
$('.autoupload_hover').removeClass('autoupload_hover');
},1000);
id=t.id?t.id:'default'
// $('#heading').html(id+' '+test_i++);
}
}
return id;
}
var drag_is_file=function(e) {
// $('#heading').html(json_encode(e.dataTransfer.types));
if(e && e.dataTransfer && e.dataTransfer.types) {
for(var i in e.dataTransfer.types) {
if((typeof(e.dataTransfer.types[i])=='string') && e.dataTransfer.types[i].match(/Files/)) {
return true;
}
}
}
return false;
}
var dragenter=function(e) {
if(drag_is_file(e)) {
e.stopPropagation();
e.preventDefault();
}
}
var dragover=function(e) {
if(drag_is_file(e)) {
e.stopPropagation();
e.preventDefault();
e.dataTransfer.dropEffect=drag_get_id(e)?'copy':'none';
}
}
var dragleave=function(e) {
if(drag_is_file(e)) {
e.stopPropagation();
e.preventDefault();
}
}
var drop=function(e) {
var files=e.dataTransfer.files;
if(drag_is_file(e) && files && files.length) {
e.stopPropagation();
e.preventDefault();
var dom_id=drag_get_id(e);
var size=0;
for(var i=0;i<files.length;i++) {
size+=files[i]['size'];
}
var ready=0;
var fd=new FormData();
// fd.append('dom_id',dom_id);
var $p=$('<div id="ww_layer_black" style="position:fixed;left:0px;top:0px;height:100%;width:100%;z-index:2000000;opacity:0.4;"></div><img src="../pics/processing.svg" style="position:fixed;left:50%;top:50%;margin:0;transform: translate(-50%,-50%);z-Index:2000001;" alt="">').appendTo('body');
$.each(files,function(index,value) {
var file=this;
fd.append('file'+index,file,file.name);
ready++;
if(ready>=files.length) {
$.ajax({
type: 'POST',
url: '765177.php?sid='+session_id,
data: fd,
processData: false,
contentType: false
}).done(function(data) {
if(data && (data.result==='success')) {
$('#upload_debug').text(JSON.stringify(data));
if(data.files && data.files.length) {
var ids='';
for(var i in data.files) {
oc_call({field:'autoupload_files',concat:data.files[i].file_id});
}
oc_call({field:'autoupload_dom_id',concat:dom_id});
oc_call({post:1});
}
} else {
alert(lg(206));
}
}).fail(function() {
alert(lg(206));
}).always(function() {
$p.remove();
});
}
});
}
}
try {
window.addEventListener('dragenter', dragenter, false);
window.addEventListener('dragleave', dragleave, false);
window.addEventListener('dragover' , dragover , false);
window.addEventListener('drop' , drop , false);
} catch(e) {
}
}
});
$(function() {
if($('.wiki_formatting_toolbar,.chat_formatting_toolbar,.function_files').length) {
try {
if(!window.matchMedia('(max-width: 390px)').matches) {
return;
}
} catch(e) {
return;
}
}
var init=null;
$(document).on('click','.ellipsis',function(evt) {
evt.preventDefault();
var $td=$(this).parent();
var x=evt.pageX-10;
var y=evt.pageY-10;
var kb=false;
if(!x && !y) {
var o=$(this).offset();
x=o.left-10;
y=o.top-10;
kb=true;
}
var l_destroy=function() {
$('#layer_icons_ellipsis_lightbox,#layer_icons_ellipsis').remove();
hide_tooltip();
};
var l_remove=function() {
hide_tooltip();
$('#layer_icons_ellipsis_lightbox').remove();
$('#layer_icons_ellipsis').fadeOut(400,function() {
l_destroy();
});
};
l_destroy();
$('<div id="layer_icons_ellipsis_lightbox" style="position:fixed;left:0px;top:0px;height:100%;width:100%;z-Index:61000"></div>').appendTo('main').on('click',l_destroy);
var $div=$('<div id="layer_icons_ellipsis" style="position:absolute;z-Index:61001"></div>').appendTo('main');
var div=$div.get(0);
$div.offset({left:x,top:y}).on('click',l_remove);
var t='';
$td.nextAll('td').find('*').addBack().contents().each(function() {
if(this.nodeType===3) {
if((t=this.nodeValue) && (t!==String.fromCharCode(160))) {
return false;
}
}
});
if(t) {
$('<h3 style="margin-top:0;margin-bottom:10px"></h3>').text(t).appendTo($div);
}
$td.children().not('.placeholder,.ellipsis').each(function() {
var $i=$(this).clone().show(); // Keine Events, Trigger nutzen Klassen und data-
var t=$i.attr('html_title');
t=t?t:$i.attr('title');
t=t?t:$i.find('[html_title]').attr('html_title');
t=t?t:$i.find('[title]').attr('title');
var $t=$('<span class="layer_icons_ellipsis_title"></span>').text(t);
$t.on('click',function() { // Klick auf Text
$i.get(0).click();
});
$i.attr({'html_title':'','title':''});
$('<div class="vam layer_icons_ellipsis_line"></div>').append($i).append($t).appendTo($div);
$i.on('click',function() {
var selector='';
if($(this).prop('tagName')==='A') {
selector='a';
} else {
var src=$(this).attr('src');
if(src) {
var m=src.match(/\/([ai]_[a-z0-9_]*?)(_over)?[.][a-z]+$/);
if(m && m[1]) {
selector='img[src*="'+m[1]+'"]';
}
}
}
if(top.last_clicked_icon_selector!=selector) {
top.last_clicked_icon_selector=selector;
console.log('last_clicked_icon_selector set to "'+selector+'".');
init();
}
});
});
var bsafe=32;
var tsafe=8;
var h=$(window).height();
var r=div.getBoundingClientRect();
var d=h-r.bottom-bsafe;
if(d<0) {
if((r.top+d)<tsafe) {
d=tsafe-r.top;
}
$div.offset({top:$div.offset().top+d});
}
var r=div.getBoundingClientRect();
var $ci=$('#content_inner');
var c=$ci.get(0).getBoundingClientRect();
if(r.bottom > c.bottom) {
$ci.css({'min-height':($ci.height()+r.bottom-c.bottom)+'px'});
}
if(kb) {
$('#layer_icons_ellipsis img').get(0).focus();
}
});
init=function() {
var a=$('table.table_list_admin').length;
var src=a?'../pics/a_ellipsis.svg':'../pics/i_ellipsis.svg';
var $icon=$('<img class="'+(a?'ia1':'i1')+' mo ellipsis" src="'+src+'" tabindex="0">').attr({'alt':lg(1016),'title':lg(1016)});
$('img.ellipsis').remove();
var selector=top.last_clicked_icon_selector;
$('td.icons').each(function() {
var $td=$(this);
var $tdc=$td.children();
if($tdc.length>2) {
var $tdcv=$tdc.first();
if(selector) {
var $m=$td.children(selector);
if($m && $m.length) {
$tdcv=$m.first();
}
}
$tdc.not($tdcv.show()).hide();
$td.append($icon.clone(true));
}
});
};
$('img.placeholder.i1, img.placeholder.ia1').remove();
init();
});
$( document ).ready(function() {
function kb_equal_height() {
var highest_element = 0;
var highest_link = 0;
// Loesche die Hoehe
$('.threeColumn .sameHeightElement').each(function() {
$(this).removeAttr('style');
});
$('.threeColumn .sameHeightLink').each(function() {
$(this).removeAttr('style');
});
// Pruefe, welches Element am hoechsten ist
$('.threeColumn .sameHeightElement').each(function() {
if ($(this).height() > highest_element) {
highest_element = $(this).height();
}
});
$('.threeColumn .sameHeightLink').each(function() {
if ($(this).height() > highest_link) {
highest_link = $(this).height();
}
});
// Weise diese Hoehe allen Elementen zu.
$('.threeColumn .sameHeightElement').each(function() {
$(this).height(highest_element);
});
$('.threeColumn .sameHeightLink').each(function() {
$(this).height(highest_link);
});
};
kb_equal_height();
if ($(window).width() >= 768) {
var resizeTimer;
$(window).resize(function() {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(kb_equal_height, 100);
});
}
});
$(function() {
$('td,th').each(function() {
if($(this).html()=='') {
$(this).html('&#160;');
}
});
set_min_height('div.content_inner,div.content_narrow_inner',400,'.menu_main',0,'#content_right',-30);
});
$(function() {
if(ww.browser.is_ios) {
$('.document').css({background:'none'});
}
});
$(function() {
var selector='main h2.accordion';
$(selector).click(function() {
$(this).toggleClass('expanded').nextUntil(selector).toggleClass('screen_hide');
hide_tooltip();
});
$(selector+':not([style])').nextUntil(selector).addClass('screen_hide');
$('.accordion_open').trigger('click');
});
$(function() {
if ($(window).width() <= 768) {
$(".trail_1281 .top_menu_3t").hide();
$(".trail_1281 .top_menu_3").hide();
$(".trail_1281 .top_menu_3b").hide();
$(".trail_1281 .top_menu_2_open").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1281 .top_menu_2_open_active").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1281 .top_menu_2t_open").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1281 .top_menu_2t_open_active").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1281 .top_menu_2b_open").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1281 .top_menu_2b_open_active").nextUntil(".trail_1281 .top_menu_2").show();
$(".trail_1278 .top_menu_3t").hide();
$(".trail_1278 .top_menu_3").hide();
$(".trail_1278 .top_menu_3b").hide();
$(".trail_1278 .top_menu_2_open").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1278 .top_menu_2_open_active").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1278 .top_menu_2t_open").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1278 .top_menu_2t_open_active").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1278 .top_menu_2b_open").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1278 .top_menu_2b_open_active").nextUntil(".trail_1278 .top_menu_2").show();
$(".trail_1286 .top_menu_3t").hide();
$(".trail_1286 .top_menu_3").hide();
$(".trail_1286 .top_menu_3b").hide();
$(".trail_1286 .top_menu_2_open").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1286 .top_menu_2_open_active").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1286 .top_menu_2t_open").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1286 .top_menu_2t_open_active").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1286 .top_menu_2b_open").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1286 .top_menu_2b_open_active").nextUntil(".trail_1286 .top_menu_2").show();
$(".trail_1288 .top_menu_3t").hide();
$(".trail_1288 .top_menu_3").hide();
$(".trail_1288 .top_menu_3b").hide();
$(".trail_1288 .top_menu_2_open").nextUntil(".trail_1288 .top_menu_2").show();
$(".trail_1288 .top_menu_2_open_active").nextUntil(".trail_1288 .top_menu_2").show();
$(".trail_1288 .top_menu_2t_open").nextUntil(".trail_1288 .top_menu_2").show();
$(".trail_1288 .top_menu_2t_open_active").nextUntil(".trail_1288 .top_menu_2").show();
$(".trail_1288 .top_menu_2b_open").nextUntil(".trail_1288 .top_menu_2").show();
$(".trail_1288 .top_menu_2b_open_active").nextUntil(".trail_1288 .top_menu_2").show();
}
});
window.overwrite_cms_data={"popups":[
{"n":"106484.php","w":"600","h":"700"},
{"n":"114064.php","w":"600","h":"700"},
{"n":"245881.php","w":"550","h":"400"},
{"n":"395177.php","w":"550","h":"400"},
{"n":"561513.php","w":"550","h":"400"},
{"n":"338777.php","w":"550","h":"400"},
{"n":"368561.php","w":"470","h":"520"},
{"n":"368401.php","w":"470","h":"520"},
{"n":"125212.php","w":"700","h":"550"},
{"n":"747025.php","w":"760","h":"800"},
{"n":"121388.php","w":"500","h":"600"},
{"n":"124596.php","w":"500","h":"700"}
]};
$(document).on('click','a:not(.oc)',function(event) {
if(ww && ww.is_iframe && ww.is_iframe()) {
if(!event.isDefaultPrevented()) {
var $t=$(this);
var href=$t.attr('href');
if(href && href.match(/^[0-9a-z_-]+\.php\?/)) {
if(!$t.attr('target')) {
if(!$t.attr('onclick')) {
event.stopImmediatePropagation();
event.preventDefault();
window.location.replace(href);
}
}
}
}
}
});

function collect(a) {
	Ajax.call("user.php?act=collect", "id=" + a, collectResponse, "GET", "JSON")
}

function collectResponse(a) {
	0 == a.error ? (document.getElementById("collect_count") && (document.getElementById("collect_count").innerHTML = a.count), jAlert("\u6536\u85cf\u6210\u529f")) : jAlert(a.message)
}

function classify(a, b) {
	$(a).click(function() {
		var a = $(this).next().css("display");
		"none" == a ? $(this).addClass(b).next().slideDown(300).parent().siblings().children("a").removeClass(b).next().slideUp(300) : $(this).removeClass(b).next().slideUp(300)
	})
}

function addToCart(a, b, c) {
	var d = new Object,
		e = new Array,
		g = (new Array, 1),
		h = document.forms.ECS_FORMBUY,
		i = 0;
	h && (e = getSelectedAttributes(h), h.elements.number && (g = h.elements.number.value), i = 1), d.quick = i, d.spec = e, d.goods_id = a, d.number = g, d.parent = "undefined" == typeof b ? 0 : parseInt(b), Ajax.call("flow.php?step=add_to_cart&one_buy=" + c, "goods=" + obj2str(d), addToCartResponse, "POST", "JSON")
}

function obj2str(a) {
	var b = [];
	if("string" == typeof a) return '"' + a.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + '"';
	if("undefined" == typeof a) return "undefined";
	if("object" == typeof a) {
		if(null === a) return "null";
		if(a.sort) {
			for(var c = 0; c < a.length; c++) b.push(obj2str(a[c]));
			b = "[" + b.join() + "]"
		} else {
			for(var c in a) "toJSONString" != c && b.push('"' + c + '":' + obj2str(a[c]));
			b = "{" + b.join() + "}"
		}
		return b
	}
	return a.toString()
}

function getSelectedAttributes(a) {
	var b = new Array,
		c = 0;
	for(i = 0; i < a.elements.length; i++) {
		var d = a.elements[i].name.substr(0, 5);
		"spec_" != d || ("radio" != a.elements[i].type && "checkbox" != a.elements[i].type || !a.elements[i].checked) && "SELECT" != a.elements[i].tagName || (b[c] = a.elements[i].value, c++)
	}
	return b
}

function addToCartResponse(a) {
	if(a.error > 0)
		if(2 == a.error) {
			var b = "user.php?act=add_booking&id=" + a.goods_id + "&spec=" + a.product_spec;
			jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
				a && (window.location.href = b)
			})
		} else 6 == a.error ? window.location.href = "goods.php?id=" + a.goods_id : jAlert(a.message);
	else {
		var c = document.getElementById("ECS_CARTINFO"),
			d = document.getElementById("ECS_CARTINFO2"),
			e = document.getElementById("mini_cart_number"),
			f = document.getElementById("mini_cart_number2");
		if(c && a.content && (c.innerHTML = a.content), d && a.content2 && (d.innerHTML = a.content2), e && a.cart_number && (e.innerHTML = a.cart_number), f && a.cart_number && (f.innerHTML = a.cart_number), 1 == a.one_buy) var g = "flow.php?step=checkout";
		else var g = "flow.php?step=cart";
		if("1" == a.one_step_buy) location.href = g;
		else switch(a.confirm_type) {
			case "1":
				jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
					a && (window.location.href = g)
				});
				break;
			case "2":
				jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
					a || (window.location.href = g)
				});
				break;
			case "3":
				location.href = g
		}
	}
}

function signInResponse(a) {
	toggleLoader(!1);
	var b = a.substr(0, 1),
		c = a.substr(2);
	1 == b ? document.getElementById("member-zone").innerHTML = c : jAlert(c)
}

function gotoPage(a, b, c) {
	Ajax.call("comment.php?act=gotopage", "page=" + a + "&id=" + b + "&type=" + c, gotoPageResponse, "GET", "JSON")
}

function gotoPageResponse(a) {
	document.getElementById("ECS_COMMENT").innerHTML = a.content
}

function gotoBuyPage(a, b) {
	Ajax.call("goods.php?act=gotopage", "page=" + a + "&id=" + b, gotoBuyPageResponse, "GET", "JSON")
}

function gotoBuyPageResponse(a) {
	document.getElementById("ECS_BOUGHT").innerHTML = a.result
}

function getFormatedPrice(a) {
	return currencyFormat.indexOf("%s") > -1 ? currencyFormat.replace("%s", advFormatNumber(a, 2)) : currencyFormat.indexOf("%d") > -1 ? currencyFormat.replace("%d", advFormatNumber(a, 0)) : a
}

function bid(a) {
	var b = "",
		c = "";
	if(-1 != a) {
		var d = document.forms.formBid;
		if(b = d.elements.price.value, id = d.elements.snatch_id.value, 0 == b.length) c += price_not_null + "\n";
		else {
			var e = /^[\.0-9]+/;
			e.test(b) || (c += price_not_number + "\n")
		}
	} else b = a;
	return c.length > 0 ? void jAlert(c) : void Ajax.call("snatch.php?act=bid&id=" + id, "price=" + b, bidResponse, "POST", "JSON")
}

function bidResponse(a) {
	0 == a.error ? (document.getElementById("ECS_SNATCH").innerHTML = a.content, document.forms.formBid && document.forms.formBid.elements.price.focus(), newPrice()) : jAlert(a.content)
}

function newPrice(a) {
	Ajax.call("snatch.php?act=new_price_list&id=" + a, "", newPriceResponse, "GET", "TEXT")
}

function newPriceResponse(a) {
	document.getElementById("ECS_PRICE_LIST").innerHTML = a
}

function getAttr(a) {
	var b = document.getElementsByTagName("tbody");
	for(i = 0; i < b.length; i++) "goods_type" == b[i].id.substr(0, 10) && (b[i].style.display = "none");
	var c = "goods_type_" + a;
	try {
		document.getElementById(c).style.display = ""
	} catch(d) {}
}

function advFormatNumber(a, b) {
	var c = formatNumber(a, b),
		d = parseFloat(c);
	if(a.toString().length > c.length) {
		var e = a.toString().substring(c.length, c.length + 1),
			f = parseFloat(e);
		if(5 > f) return c;
		var g, h;
		if(0 == b) h = 1;
		else {
			g = "0.";
			for(var i = 1; b > i; i++) g += "0";
			g += "1", h = parseFloat(g)
		}
		c = formatNumber(d + h, b)
	}
	return c
}

function formatNumber(a, b) {
	var c, d, e, f;
	if(c = a.toString(), d = c.indexOf("."), e = c.length, 0 == b) - 1 != d && (c = c.substring(0, d));
	else if(-1 == d)
		for(c += ".", f = 1; b >= f; f++) c += "0";
	else
		for(c = c.substring(0, d + b + 1), f = e; d + b >= f; f++) c += "0";
	return c
}

function set_insure_status() {
	var a = getRadioValue("shipping"),
		b = 0;
	a > 0 && (document.forms.theForm.elements["insure_" + a] && (b = document.forms.theForm.elements["insure_" + a].value), document.forms.theForm.elements.need_insure && (document.forms.theForm.elements.need_insure.checked = !1), document.getElementById("ecs_insure_cell") && (b > 0 ? (document.getElementById("ecs_insure_cell").style.display = "", setValue(document.getElementById("ecs_insure_fee_cell"), getFormatedPrice(b))) : (document.getElementById("ecs_insure_cell").style.display = "none", setValue(document.getElementById("ecs_insure_fee_cell"), ""))))
}

function changePayment(a) {
	calculateOrderFee()
}

function getCoordinate(a) {
	var b = {
		x: 0,
		y: 0
	};
	b.x = document.body.offsetLeft, b.y = document.body.offsetTop;
	do b.x += a.offsetLeft, b.y += a.offsetTop, a = a.offsetParent; while ("BODY" != a.tagName.toUpperCase());
	return b
}

function showCatalog(a) {
	var b = getCoordinate(a),
		c = document.getElementById("ECS_CATALOG");
	c && "block" != c.style.display && (c.style.display = "block", c.style.left = b.x + "px", c.style.top = b.y + a.offsetHeight - 1 + "px")
}

function hideCatalog(a) {
	var b = document.getElementById("ECS_CATALOG");
	b && "none" != b.style.display && (b.style.display = "none")
}

function sendHashMail() {
	Ajax.call("user.php?act=send_hash_mail", "", sendHashMailResponse, "GET", "JSON")
}

function sendHashMailResponse(a) {
	jAlert(a.message)
}

function orderQuery() {
	var a = document.forms.ecsOrderQuery.order_sn.value,
		b = /^[\.0-9]+/;
	return a.length < 10 || !b.test(a) ? void jAlert(invalid_order_sn) : void Ajax.call("user.php?act=order_query&order_sn=s" + a, "", orderQueryResponse, "GET", "JSON")
}

function orderQueryResponse(a) {
	if(a.message.length > 0 && jAlert(a.message), 0 == a.error) {
		var b = document.getElementById("ECS_ORDER_QUERY");
		b.innerHTML = a.content
	}
}

function display_mode(a) {
	function b() {
		document.forms.listform.submit()
	}
	document.getElementById("display").value = a, setTimeout(b, 0)
}

function display_mode_wholesale(a) {
	function b() {
		document.forms.wholesale_goods.action = "wholesale.php", document.forms.wholesale_goods.submit()
	}
	document.getElementById("display").value = a, setTimeout(b, 0)
}

function fixpng() {
	var a = navigator.appVersion.split("MSIE"),
		b = parseFloat(a[1]);
	if(b >= 5.5 && document.body.filters)
		for(var c = 0; c < document.images.length; c++) {
			var d = document.images[c],
				e = d.src.toUpperCase();
			if("PNG" == e.substring(e.length - 3, e.length)) {
				var f = d.id ? "id='" + d.id + "' " : "",
					g = d.className ? "class='" + d.className + "' " : "",
					h = d.title ? "title='" + d.title + "' " : "title='" + d.alt + "' ",
					i = "display:inline-block;" + d.style.cssText;
				"left" == d.align && (i = "float:left;" + i), "right" == d.align && (i = "float:right;" + i), d.parentElement.href && (i = "cursor:hand;" + i);
				var j = "<span " + f + g + h + ' style="width:' + d.width + "px; height:" + d.height + "px;" + i + ";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d.src + "', sizingMethod='scale');\"></span>";
				d.outerHTML = j, c -= 1
			}
		}
}

function hash(a, b) {
	var b = b ? b : 32,
		c = 0,
		d = 0,
		e = "";
	for(filllen = b - a.length % b, d = 0; d < filllen; d++) a += "0";
	for(; c < a.length;) e = stringxor(e, a.substr(c, b)), c += b;
	return e
}

function stringxor(a, b) {
	for(var c = "", d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", e = Math.max(a.length, b.length), f = 0; e > f; f++) {
		var g = a.charCodeAt(f) ^ b.charCodeAt(f);
		c += d.charAt(g % 52)
	}
	return c
}

function evalscript(a) {
	if(-1 == a.indexOf("<script")) return a;
	for(var b = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/gi, c = new Array; c = b.exec(a);) appendscript(c[1], "", c[2], c[3]);
	return a
}

function $$(a) {
	return document.getElementById(a)
}

function appendscript(a, b, c, d) {
	var e = hash(a + b);
	if(c || !in_array(e, evalscripts)) {
		c && $$(e) && $$(e).parentNode.removeChild($$(e)), evalscripts.push(e);
		var f = document.createElement("script");
		f.type = "text/javascript", f.id = e;
		try {
			a ? f.src = a : b && (f.text = b), $$("append_parent").appendChild(f)
		} catch(g) {}
	}
}

function in_array(a, b) {
	if("string" == typeof a || "number" == typeof a)
		for(var c in b)
			if(b[c] == a) return !0;
	return !1
}

function pmwin(a, b) {
	var c = document.getElementsByTagName("OBJECT");
	if("open" == a) {
		for(i = 0; i < c.length; i++) "hidden" != c[i].style.visibility && (c[i].setAttribute("oldvisibility", c[i].style.visibility), c[i].style.visibility = "hidden");
		var d = document.body.clientWidth,
			e = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight,
			f = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop,
			g = 800,
			h = .9 * e;
		$$("pmlayer") || (div = document.createElement("div"), div.id = "pmlayer", div.style.width = g + "px", div.style.height = h + "px", div.style.left = (d - g) / 2 + "px", div.style.position = "absolute", div.style.zIndex = "999", $$("append_parent").appendChild(div), $$("pmlayer").innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left"><div style="width: 800px; height: ' + h + 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px"><div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div><a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="\u5173\u95ed" /></a><iframe id="pmframe" name="pmframe" style="width:' + g + 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>'), $$("pmlayer").style.display = "", $$("pmlayer").style.top = (e - h) / 2 + f + "px", b ? pmframe.location = "pm.php?" + b : pmframe.location = "pm.php"
	} else if("close" == a) {
		for(i = 0; i < c.length; i++) c[i].attributes.oldvisibility && (c[i].style.visibility = c[i].attributes.oldvisibility.nodeValue, c[i].removeAttribute("oldvisibility"));
		hiddenobj = new Array, $$("pmlayer").style.display = "none"
	}
}

function pmwindrag(a, b) {
	if(1 == b) pmwindragstart = is_ie ? [event.clientX, event.clientY] : [a.clientX, a.clientY], pmwindragstart[2] = parseInt($$("pmlayer").style.left), pmwindragstart[3] = parseInt($$("pmlayer").style.top), doane(a);
	else if(2 == b && pmwindragstart[0]) {
		var c = is_ie ? [event.clientX, event.clientY] : [a.clientX, a.clientY];
		$$("pmlayer").style.left = pmwindragstart[2] + c[0] - pmwindragstart[0] + "px", $$("pmlayer").style.top = pmwindragstart[3] + c[1] - pmwindragstart[1] + "px", doane(a)
	} else 3 == b && (pmwindragstart = [], doane(a))
}

function doane(a) {
	e = a ? a : window.event, is_ie ? (e.returnValue = !1, e.cancelBubble = !0) : e && (e.stopPropagation(), e.preventDefault())
}

function addPackageToCart(a) {
	var b = new Object,
		c = 1;
	b.package_id = a, b.number = c, Ajax.call("flow.php?step=add_package_to_cart", "package_info=" + b.toJSONString(), addPackageToCartResponse, "POST", "JSON")
}

function addPackageToCartResponse(a) {
	if(a.error > 0)
		if(2 == a.error) {
			var b = "user.php?act=add_booking&id=" + a.goods_id;
			jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
				a && (window.location.href = b)
			})
		} else jAlert(a.message);
	else {
		var c = document.getElementById("ECS_CARTINFO"),
			d = "flow.php?step=cart";
		if(c && (c.innerHTML = a.content), "1" == a.one_step_buy) location.href = d;
		else switch(a.confirm_type) {
			case "1":
				jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
					a && (window.location.href = d)
				});
				break;
			case "2":
				jConfirm(a.message, "\u6e29\u99a8\u63d0\u793a", function(a) {
					a || (window.location.href = d)
				});
				break;
			case "3":
				location.href = d
		}
	}
}

function setSuitShow(a) {
	var b = document.getElementById("suit_" + a);
	null != b && ("none" == b.style.display ? b.style.display = "" : b.style.display = "none")
}

function docEle() {
	return document.getElementById(arguments[0]) || !1
}

function openSpeDiv(a, b, c) {
	var d = "speDiv",
		e = "mask";
	docEle(d) && document.removeChild(docEle(d)), docEle(e) && document.removeChild(docEle(e));
	var f;
	"undefined" != typeof window.pageYOffset ? f = window.pageYOffset : "undefined" != typeof document.compatMode && "BackCompat" != document.compatMode ? f = document.documentElement.scrollTop : "undefined" != typeof document.body && (f = document.body.scrollTop);
	for(var g = 0, h = document.getElementsByTagName("select"); h[g];) h[g].style.visibility = "hidden", g++;
	var i = document.createElement("div");
	i.id = d, i.style.position = "absolute", i.style.zIndex = "10000", i.style.width = "300px", i.style.height = "260px", i.style.top = parseInt(f + 200) + "px", i.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px", i.style.overflow = "auto", i.style.background = "#FFF", i.style.border = "3px solid #59B0FF", i.style.padding = "5px", i.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">\u8bf7\u9009\u62e9\u5546\u54c1\u5c5e\u6027</h4>';
	for(var j = 0; j < a.length; j++)
		if(i.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">' + a[j].name + "</h6>", 1 == a[j].attr_type) {
			for(var k = 0; k < a[j].values.length; k++) 0 == k ? i.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + a[j].attr_id + "' value='" + a[j].values[k].id + "' id='spec_value_" + a[j].values[k].id + "' checked /><font color=#555555>" + a[j].values[k].label + "</font> [" + a[j].values[k].format_price + "]</font><br />" : i.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + a[j].attr_id + "' value='" + a[j].values[k].id + "' id='spec_value_" + a[j].values[k].id + "' /><font color=#555555>" + a[j].values[k].label + "</font> [" + a[j].values[k].format_price + "]</font><br />";
			i.innerHTML += "<input type='hidden' name='spec_list' value='" + k + "' />"
		} else {
			for(var k = 0; k < a[j].values.length; k++) i.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_" + a[j].attr_id + "' value='" + a[j].values[k].id + "' id='spec_value_" + a[j].values[k].id + "' /><font color=#555555>" + a[j].values[k].label + " [" + a[j].values[k].format_price + "]</font><br />";
			i.innerHTML += "<input type='hidden' name='spec_list' value='" + k + "' />"
		}
	i.innerHTML += "<br /><center>[<a href='javascript:submit_div(" + b + "," + c + ")' class='f6' >\u8d2d\u4e70</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >\u53d6\u6d88</a>]</center>", document.body.appendChild(i);
	var l = document.createElement("div");
	l.id = e, l.style.position = "absolute", l.style.zIndex = "9999", l.style.width = document.body.scrollWidth + "px", l.style.height = document.body.scrollHeight + "px", l.style.top = "0px", l.style.left = "0px", l.style.background = "#FFF", l.style.filter = "alpha(opacity=30)", l.style.opacity = "0.40", document.body.appendChild(l)
}

function submit_div(a, b) {
	var c = new Object,
		d = new Array,
		f = (new Array, 1),
		g = document.getElementsByTagName("input"),
		h = 1,
		d = new Array,
		i = 0;
	for(k = 0; k < g.length; k++) {
		var j = g[k].name.substr(0, 5);
		"spec_" != j || "radio" != g[k].type && "checkbox" != g[k].type || !g[k].checked || (d[i] = g[k].value, i++)
	}
	c.quick = h, c.spec = d, c.goods_id = a, c.number = f, c.parent = "undefined" == typeof b ? 0 : parseInt(b), Ajax.call("flow.php?step=add_to_cart", "goods=" + c.toJSONString(), addToCartResponse, "POST", "JSON"), document.body.removeChild(docEle("speDiv")), document.body.removeChild(docEle("mask"));
	for(var k = 0, l = document.getElementsByTagName("select"); l[k];) l[k].style.visibility = "", k++
}

function cancel_div() {
	document.body.removeChild(docEle("speDiv")), document.body.removeChild(docEle("mask"));
	for(var a = 0, b = document.getElementsByTagName("select"); b[a];) b[a].style.visibility = "", a++
}

function AddFavorite2(a, b, c) {
	var e = (window.event || arguments.callee.caller.arguments[0], {
		IE: /MSIE/.test(window.navigator.userAgent) && !window.opera,
		FF: /Firefox/.test(window.navigator.userAgent),
		OP: !!window.opera
	});
	if(a.onmousedown = null, e.IE) a.attachEvent("onmouseup", function() {
		try {
			jAlert(0), window.external.AddFavorite(b, c), window.event.returnValue = !1
		} catch(a) {}
	});
	else if(e.FF || "a" == a.nodeName.toLowerCase()) a.setAttribute("rel", "sidebar"), a.title = c, a.href = b;
	else if(e.OP) {
		var f = document.createElement("a");
		f.rel = "sidebar", f.title = c, f.href = b, a.parentNode.insertBefore(f, a), f.appendChild(a), f = null
	}
}

function AddFavorite(a, b) {
	document.all ? window.external.AddFavorite(a, b) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b, a, "") : jAlert("\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd!\n\u8bf7\u60a8\u4f7f\u7528\u83dc\u5355\u680f\u6216Ctrl+D\u6536\u85cf\u672c\u7ad9\u3002")
}

function ajaxCheckLogin(a, b, c, d) {
	Ajax.call("ajaxAction.php?action=checkLogin", "", function(e) {
		e.success ? null != c ? a(c) : a() : null != d ? b(d) : b()
	}, "GET", "JSON")
}

function refreshHeaderUserInfo(a, b) {
	a ? (document.getElementById("top_leftsidebar_member_info").innerHTML = '<span id="append_parent"></span>\u6b22\u8fce\u56de\u6765\uff0c' + a, document.getElementById("top_rightsidebar_member_info_link").innerHTML = '<span id="append_parent"></span><a href="user.php?act=logout">\u9000\u51fa</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="user.php?act=register">\u6ce8\u518c</a>') : (document.getElementById("top_leftsidebar_member_info").innerHTML = '<span id="append_parent"></span> \u6b22\u8fce\u5149\u4e34' + b, document.getElementById("top_rightsidebar_member_info_link").innerHTML = '<span id="append_parent"></span> <a href="user.php?act=login">\u8bf7\u60a8\u767b\u5f55</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="user.php?act=register">\u6ce8\u518c</a>')
}

function doLogin(a, b, c, d, e) {
	Ajax.call("ajaxAction.php?action=doLogin", a, function(a) {
		a.success ? null != b && "function" == typeof b && (null != d ? b(a.username, d) : b(a.username)) : null != c && "function" == typeof c && (null != e ? c(a.msg, e) : c(a.msg))
	}, "POST", "JSON")
}

function doConfirm(a, b) {
	jConfirm(a, "\u6e29\u99a8\u63d0\u793a", function(a) {
		a && (window.location.href = b)
	})
}
if(!Ajax) {
	var Ajax = new Object;
	Ajax.call = function(a, b, c, d, e) {
		$.ajax({
			url: a,
			type: d,
			data: b,
			success: function(a) {
				c(a)
			},
			dataType: e
		})
	}
}
$(function() {
	$(".my_shop").mouseover(function() {
		$(".soutline").show(), $(".hoverdiv").show()
	}).mouseleave(function() {
		$(".soutline").hide(), $(".hoverdiv").hide()
	}), $(".form_text").focus(function() {
		$(this).css("color", "#333")
	}), $(".nav_list li a").click(function() {
		$(".nav_list li a").removeClass("hover"), $(this).addClass("hover")
	});
	$("#ECS_CARTINFO").mouseenter(function() {
		$("#ECS_CARTINFO .cart_content_null").show(), $("#ECS_CARTINFO .hd_shopping").addClass("hd_shopping_h")
	}), $("#ECS_CARTINFO").mouseleave(function() {
		$("#ECS_CARTINFO .cart_content_null").hide(), $("#ECS_CARTINFO .hd_shopping").removeClass("hd_shopping_h")
	}), $(".all_shop_type li").mouseover(function() {
		$(this).addClass("hover").siblings().removeClass("hover"), $(this).find("a:eq(0)").css("color", "#ca0200"), $(this).siblings().find("a:eq(0)").css("color", "#6d6d6d")
	}).mouseleave(function() {
		$(this).find("a:eq(0)").css("color", "#6d6d6d")
	}), $("#all_shop_type li").hover(function() {
		var a = $(this).find("a").attr("rel");
		$("#shop_type_list" + a).fadeIn(300)
	}, function() {
		var a = $(this).find("a").attr("rel");
		$("#shop_type_list" + a).fadeOut(300)
	})
});
var evalscripts = new Array,
	pmwinposition = new Array,
	userAgent = navigator.userAgent.toLowerCase(),
	is_opera = -1 != userAgent.indexOf("opera") && opera.version(),
	is_moz = "Gecko" == navigator.product && userAgent.substr(userAgent.indexOf("firefox") + 8, 3),
	is_ie = -1 != userAgent.indexOf("msie") && !is_opera && userAgent.substr(userAgent.indexOf("msie") + 5, 3),
	pmwindragstart = new Array;
! function(a) {
	a.alerts = {
		verticalOffset: -75,
		horizontalOffset: 0,
		repositionOnResize: !0,
		overlayOpacity: .01,
		overlayColor: "#FFF",
		draggable: !0,
		okButton: "&nbsp;\u786e\u5b9a&nbsp;",
		cancelButton: "&nbsp;\u53d6\u6d88&nbsp;",
		dialogClass: null,
		alert: function(b, c, d) {
			null == c && (c = "Alert"), a.alerts._show(c, b, null, "alert", function(a) {
				d && d(a)
			})
		},
		confirm: function(b, c, d) {
			null == c && (c = "Confirm"), a.alerts._show(c, b, null, "confirm", function(a) {
				d && d(a)
			})
		},
		prompt: function(b, c, d, e) {
			null == d && (d = "Prompt"), a.alerts._show(d, b, c, "prompt", function(a) {
				e && e(a)
			})
		},
		_show: function(b, c, d, e, f) {
			a.alerts._hide(), a.alerts._overlay("show"), a("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>'), a.alerts.dialogClass && a("#popup_container").addClass(a.alerts.dialogClass);
			try {
				var g = a.browser.msie && parseInt(a.browser.version) <= 6 ? "absolute" : "fixed"
			} catch(h) {
				var g = "fixed"
			}
			switch(a("#popup_container").css({
				position: g,
				zIndex: 9999999,
				padding: 0,
				margin: 0
			}), a("#popup_title").html(b + '<img id="confirmCloseButton" style="cursor:pointer;" src="images/alert09.png" title="Close" />'), a("#popup_content").addClass(e), a("#popup_message").text(c), a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")), a("#popup_container").css({
				minWidth: a("#popup_container").outerWidth(),
				maxWidth: a("#popup_container").outerWidth()
			}), a.alerts._reposition(), a.alerts._maintainPosition(!0), e) {
				case "alert":
					a("#popup_message").after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'), a("#popup_ok").click(function() {
						a.alerts._hide(), f(!0)
					}), a("#confirmCloseButton").click(function() {
						a.alerts._hide()
					}), a("#popup_ok").focus().keypress(function(b) {
						(13 == b.keyCode || 27 == b.keyCode) && a("#popup_ok").trigger("click")
					});
					break;
				case "confirm":
					a("#popup_message").after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /> <input  type="button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'), a("#popup_ok").click(function() {
						a.alerts._hide(), f && f(!0)
					}), a("#popup_cancel").click(function() {
						a.alerts._hide(), f && f(!1)
					}), a("#confirmCloseButton").click(function() {
						a.alerts._hide(), f && f(!1)
					}), a("#popup_ok").focus(), a("#popup_ok, #popup_cancel").keypress(function(b) {
						13 == b.keyCode && a("#popup_ok").trigger("click"), 27 == b.keyCode && a("#popup_cancel").trigger("click")
					});
					break;
				case "prompt":
					a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'), a("#popup_prompt").width(a("#popup_message").width()), a("#popup_ok").click(function() {
						var b = a("#popup_prompt").val();
						a.alerts._hide(), f && f(b)
					}), a("#popup_cancel").click(function() {
						a.alerts._hide(), f && f(null)
					}), a("#confirmCloseButton").click(function() {
						a.alerts._hide()
					}), a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(b) {
						13 == b.keyCode && a("#popup_ok").trigger("click"), 27 == b.keyCode && a("#popup_cancel").trigger("click")
					}), d && a("#popup_prompt").val(d), a("#popup_prompt").focus().select()
			}
			if(a.alerts.draggable) try {
				a("#popup_container").draggable({
					handle: a("#popup_title")
				}), a("#popup_title").css({
					cursor: "move"
				})
			} catch(h) {}
		},
		_hide: function() {
			a("#popup_container").remove(), a.alerts._overlay("hide"), a.alerts._maintainPosition(!1)
		},
		_overlay: function(b) {
			switch(b) {
				case "show":
					a.alerts._overlay("hide"), a("BODY").append('<div id="popup_overlay"></div>'), a("#popup_overlay").css({
						position: "absolute",
						zIndex: 9999998,
						top: "0px",
						left: "0px",
						width: "100%",
						height: a(document).height(),
						background: a.alerts.overlayColor,
						opacity: a.alerts.overlayOpacity
					});
					break;
				case "hide":
					a("#popup_overlay").remove()
			}
		},
		_reposition: function() {
			var b = a(window).height() / 2 - a("#popup_container").outerHeight() / 2 + a.alerts.verticalOffset,
				c = a(window).width() / 2 - a("#popup_container").outerWidth() / 2 + a.alerts.horizontalOffset;
			0 > b && (b = 0), 0 > c && (c = 0);
			try {
				a.browser.msie && parseInt(a.browser.version) <= 6 && (b += a(window).scrollTop())
			} catch(d) {}
			a("#popup_container").css({
				top: b + "px",
				left: c + "px"
			}), a("#popup_overlay").height(a(document).height())
		},
		_maintainPosition: function(b) {
			if(a.alerts.repositionOnResize) switch(b) {
				case !0:
					a(window).bind("resize", a.alerts._reposition);
					break;
				case !1:
					a(window).unbind("resize", a.alerts._reposition)
			}
		}
	}, jAlert = function(b, c, d) {
		null == c && (c = "\u6e29\u99a8\u63d0\u793a"), a.alerts.alert(b, c, d)
	}, jConfirm = function(b, c, d) {
		a.alerts.confirm(b, c, d)
	}, jPrompt = function(b, c, d, e) {
		a.alerts.prompt(b, c, d, e)
	}
}(jQuery);
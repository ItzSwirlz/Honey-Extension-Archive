(() => {
    "use strict";
    ! function() {
        ! function(e, n, t, o) {
            new(t || (t = Promise))((function(s, c) {
                function r(e) {
                    try {
                        a(o.next(e))
                    } catch (e) {
                        c(e)
                    }
                }

                function i(e) {
                    try {
                        a(o.throw(e))
                    } catch (e) {
                        c(e)
                    }
                }

                function a(e) {
                    var n;
                    e.done ? s(e.value) : (n = e.value, n instanceof t ? n : new t((function(e) {
                        e(n)
                    }))).then(r, i)
                }
                a((o = o.apply(e, n || [])).next())
            }))
        }(this, void 0, void 0, (function*() {
            console.log("init honeySPBContent");
            const e = yield function(e, n = {}, t = {}) {
                return function(e, n, t) {
                    const o = t && t.ignoreResponse;
                    return new Promise(((s, c) => {
                        const r = {
                            content: JSON.stringify(n),
                            dest: t,
                            service: "messages:cs",
                            type: e
                        };
                        o ? (window.chrome.runtime.sendMessage(r), s()) : window.chrome.runtime.sendMessage(r, null, (n => {
                            if (window.chrome.runtime.lastError) {
                                const e = new Error(`Honey Checkout Content: Chrome messaging error in content.send(): ${window.chrome.runtime.lastError.message}`);
                                e.sentMessage = r, c(e)
                            } else if (!n || n.noListeners) {
                                const n = new Error(`Honey Checkout Content: No listeners for message of type ${e} in content.send()`);
                                n.sentMessage = r, c(n)
                            } else if (n.success) s(n.data);
                            else {
                                const e = n && n.error,
                                    t = new Error(e && e.message);
                                t.sentMessage = r, e && (t.data = e.data, t.stack = `${t.stack||""}${e.stack||""}`), c(t)
                            }
                        }))
                    })).catch((e => {
                        if (!o) throw e
                    }))
                }("checkout:action:background", {
                    action: e,
                    data: n
                }, Object.assign(Object.assign({}, t), {
                    background: !0
                }))
            }("checkoutGetSetting", {
                checkoutSettingKey: "iFrameOriginUrl"
            }), n = document.createElement("script");
            n.src = window.chrome.runtime.getURL("/checkoutPaypal/honeySPBResponders.js"), n.setAttribute("data-iframeurl", e), (document.head || document.documentElement).appendChild(n)
        }))
    }()
})();
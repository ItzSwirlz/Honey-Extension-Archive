(() => {
    var e = {
            4654: function(e, t, r) {
                "use strict";
                var n, o, i, s, a, c, u, h, f, p, l = this && this.__awaiter || function(e, t, r, n) {
                        return new(r || (r = Promise))((function(o, i) {
                            function s(e) {
                                try {
                                    c(n.next(e))
                                } catch (e) {
                                    i(e)
                                }
                            }

                            function a(e) {
                                try {
                                    c(n.throw(e))
                                } catch (e) {
                                    i(e)
                                }
                            }

                            function c(e) {
                                var t;
                                e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
                                    e(t)
                                }))).then(s, a)
                            }
                            c((n = n.apply(e, t || [])).next())
                        }))
                    },
                    d = this && this.__classPrivateFieldSet || function(e, t, r, n, o) {
                        if ("m" === n) throw new TypeError("Private method is not writable");
                        if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
                        if ("function" == typeof t ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                        return "a" === n ? o.call(e, r) : o ? o.value = r : t.set(e, r), r
                    },
                    y = this && this.__classPrivateFieldGet || function(e, t, r, n) {
                        if ("a" === r && !n) throw new TypeError("Private accessor was defined without a getter");
                        if ("function" == typeof t ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                        return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
                    },
                    g = this && this.__importDefault || function(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.PostMessenger = void 0;
                const v = g(r(2081)),
                    m = r(1614),
                    w = r(3982),
                    b = r(6068),
                    x = "AES-CBC";
                t.PostMessenger = class {
                    constructor({
                        clientName: e = "unknown",
                        enableLogging: t = !1,
                        useEncryption: r = !0,
                        maxResponseTime: u = 1e4,
                        types: h
                    }) {
                        if (n.add(this), this.connection = null, o.set(this, void 0), i.set(this, {
                                algorithm: null,
                                iv: null,
                                requestKey: null
                            }), s.set(this, {}), this.targetWindow = null, this.targetOrigin = null, a.set(this, void 0), c.set(this, null), (0, v.default)(this), this.clientName = e, d(this, o, t, "f"), this.useEncryption = (e, t = !1) => {
                                const n = r && e !== w.InternalMessageTypes.postMessengerConnect;
                                if (n && !this.connection && t) {
                                    const r = new Error(this.prefix(`Cannot send message ${e}. Encryption is on but there is no connected client.`));
                                    if ("function" != typeof t) throw r;
                                    t(r)
                                }
                                return n
                            }, this.maxResponseTime = u, h.postMessengerConnect) throw new Error(this.prefix("postMessengerConnect is a reserved message type."));
                        d(this, a, Object.assign(Object.assign({}, h), w.InternalMessageTypes), "f")
                    }
                    prefix(e) {
                        return `postMessenger: ${this.clientName} ${e}`
                    }
                    logger(...e) {
                        y(this, o, "f") && ("string" == typeof e[0] ? console.log(this.prefix(e[0]), ...e.slice(1)) : console.log(...e))
                    }
                    getListeners() {
                        return y(this, s, "f")
                    }
                    addListener(e, t) {
                        return y(this, s, "f")[e] ? y(this, s, "f")[e].push(t) : y(this, s, "f")[e] = [t], () => this.removeListener(e, t)
                    }
                    removeListener(e, t) {
                        if (y(this, s, "f")[e]) {
                            const r = y(this, s, "f")[e].indexOf(t);
                            r > -1 && y(this, s, "f")[e].splice(r, r + 1)
                        }
                    }
                    onReceiveMessage(e) {
                        if (e.data && y(this, s, "f")[e.data.type]) {
                            if (y(this, c, "f") && !y(this, c, "f").call(this, e.origin)) return;
                            y(this, s, "f")[e.data.type].forEach((t => {
                                t(e.data, e)
                            }))
                        }
                    }
                    request(e, t = {}, r = {}) {
                        const o = y(this, a, "f")[e];
                        if (!o) throw new Error(this.prefix(`Unable to find messageType for ${e}`));
                        if (this.connection && !this.connection.types[String(e)]) throw new Error(this.prefix(`Connected client ${this.connection.clientName} does not have a matching message type for ${e} so this request will fail.`));
                        return y(this, n, "m", f).call(this, o, t, r)
                    }
                    bindResponders(e) {
                        if (e.postMessengerConnect) throw new Error(this.prefix("postMessengerConnect is a reserved message type."));
                        return y(this, n, "m", p).call(this, e)
                    }
                    connect({
                        targetWindow: e,
                        targetOrigin: t,
                        maxRetries: r = 10
                    }) {
                        return l(this, void 0, void 0, (function*() {
                            if (!e || !t) throw new Error(this.prefix("targetWindow and targetOrigin are required for connect"));
                            this.setTarget(e, t), this.beginListening((e => e === new URL(t).origin));
                            let o = null,
                                s = null;
                            const c = this.useEncryption();
                            c && (o = crypto.getRandomValues(new Uint8Array(16)), y(this, i, "f").requestKey = yield crypto.subtle.generateKey({
                                length: 256,
                                name: x
                            }, !0, ["encrypt", "decrypt"]), s = yield crypto.subtle.exportKey("jwk", y(this, i, "f").requestKey), y(this, i, "f").iv = o, y(this, i, "f").algorithm = {
                                iv: o,
                                name: x
                            });
                            const u = r || 1;
                            let h = null;
                            for (let e = 0; e < u; e += 1) {
                                try {
                                    h = yield y(this, n, "m", f).call(this, w.InternalMessageTypes.postMessengerConnect, {
                                        clientName: this.clientName,
                                        iv: o,
                                        jsonRequestKey: s,
                                        origin: window.location.origin,
                                        types: y(this, a, "f"),
                                        useEncryption: c
                                    }, {
                                        maxResponseTime: 500
                                    })
                                } catch (e) {}
                                if (h) {
                                    this.connection = h;
                                    break
                                }
                            }
                            if (!this.connection) throw new Error(this.prefix(`Connection failed after ${u} attempts over ${500*u/1e3} seconds.`));
                            return this.logger(`Connection established to ${this.connection.clientName}`, this.connection), !0
                        }))
                    }
                    acceptConnections({
                        allowAnyOrigin: e = !1,
                        fromClientName: t = null,
                        origin: r
                    }) {
                        if (!e && !r) throw new Error(this.prefix("allowAnyOrigin must be true if origin is not specified"));
                        const o = e => !t || t === e.clientName;
                        return this.beginListening((e => !r || e === r)), new Promise((e => {
                            const t = y(this, n, "m", p).call(this, {
                                postMessengerConnect: (r, n) => l(this, void 0, void 0, (function*() {
                                    if (!n.source) throw new Error(this.prefix("event.source is null"));
                                    if (this.setTarget(n.source, r.origin), this.connection = {
                                            clientName: r.clientName,
                                            types: r.types,
                                            useEncryption: !1
                                        }, this.useEncryption()) {
                                        if (!r.iv || !r.jsonRequestKey || !r.useEncryption) {
                                            const e = "encryption is required but iv or jsonRequestKey or useEncryption were not provided in connection message.";
                                            throw new Error(this.prefix(e))
                                        }
                                        this.connection.useEncryption = !0, y(this, i, "f").iv = new Uint8Array([...r.iv]), y(this, i, "f").algorithm = {
                                            iv: y(this, i, "f").iv,
                                            name: x
                                        }, y(this, i, "f").requestKey = yield crypto.subtle.importKey("jwk", r.jsonRequestKey, {
                                            name: x
                                        }, !1, ["encrypt", "decrypt"])
                                    }
                                    return t(), this.logger(`Accepted connection from ${this.connection.clientName}`, this.connection), e(this.connection), {
                                        clientName: this.clientName,
                                        types: r.types,
                                        useEncryption: this.useEncryption()
                                    }
                                }))
                            }, o)
                        }))
                    }
                    setTarget(e, t) {
                        if (!e || !t) throw new Error(this.prefix("targetWindow and targetWindow are required for setTarget"));
                        this.targetWindow = e;
                        const r = new URL(t);
                        this.targetOrigin = r.origin
                    }
                    beginListening(e) {
                        d(this, c, e, "f"), window.addEventListener("message", this.onReceiveMessage)
                    }
                    stopListening() {
                        window.removeEventListener("message", this.onReceiveMessage)
                    }
                    decrypt(e) {
                        return l(this, void 0, void 0, (function*() {
                            if (!y(this, i, "f").algorithm || !y(this, i, "f").requestKey) throw new Error(this.prefix("encryptionValues must be set before calling decrpyt"));
                            const t = (0, b.decodeBase64)(e),
                                r = (0, b.str2ab)(t),
                                n = yield crypto.subtle.decrypt(y(this, i, "f").algorithm, y(this, i, "f").requestKey, r);
                            if (0 === n.byteLength) return null;
                            const o = (new TextDecoder).decode(n);
                            return JSON.parse(o)
                        }))
                    }
                    encrypt(e) {
                        return l(this, void 0, void 0, (function*() {
                            if (!y(this, i, "f").algorithm || !y(this, i, "f").requestKey) throw new Error(this.prefix("encryptionValues must be set before calling encrypt"));
                            const t = (new TextEncoder).encode(JSON.stringify(e)),
                                r = yield crypto.subtle.encrypt(y(this, i, "f").algorithm, y(this, i, "f").requestKey, t), n = (0, b.ab2str)(r);
                            return (0, b.encodeBase64)(n)
                        }))
                    }
                }, o = new WeakMap, i = new WeakMap, s = new WeakMap, a = new WeakMap, c = new WeakMap, n = new WeakSet, u = function(e = {}) {
                    if (!this.targetWindow || !this.targetOrigin) {
                        const e = this.prefix("targetWindow has not been initialized, please ensure you call setTarget before calling beginListening");
                        throw new Error(e)
                    }
                    this.targetWindow.postMessage(e, this.targetOrigin)
                }, h = function(e, t, r = {}, o) {
                    return l(this, void 0, void 0, (function*() {
                        let i = r,
                            s = o || null;
                        this.useEncryption(e, !0) && (i = yield this.encrypt(r), s && (s = yield this.encrypt(s))), y(this, n, "m", u).call(this, {
                            data: i,
                            errorMessage: s,
                            isError: Boolean(s),
                            messageId: t,
                            type: e
                        })
                    }))
                }, f = function(e, t = {}, r = {}) {
                    return l(this, void 0, void 0, (function*() {
                        const o = (0, m.v4)();
                        return this.logger(`sending request type '${e}' to '${this.targetOrigin}':`, t), yield y(this, n, "m", h).call(this, e, o, t), new Promise(((t, n) => {
                            let i = !1;
                            const s = this.addListener(e, (r => l(this, void 0, void 0, (function*() {
                                if ((0, w.isRequestMessage)(r) && r.messageId === o)
                                    if (i = !0, s(), r.isError) {
                                        let t = r.errorMessage;
                                        this.useEncryption(e, !0) && r.errorMessage && (t = yield this.decrypt(r.errorMessage));
                                        const o = this.prefix(`Responder for request type '${e}' to target '${this.targetOrigin}' failed with message: "${t}"`);
                                        n(new Error(o))
                                    } else {
                                        let o = r.data;
                                        if (this.useEncryption(e, !0)) {
                                            if ("string" != typeof r.data) {
                                                const t = this.prefix(`encryption is required but request received a non string data response for message: ${e}`);
                                                return void n(new Error(t))
                                            }
                                            o = yield this.decrypt(r.data)
                                        }
                                        t(o)
                                    }
                            })))); - 1 !== r.maxResponseTime && setTimeout((() => {
                                if (!i) {
                                    const t = this.prefix(`Time out waiting for target '${this.targetOrigin}' to respond to request, type '${e}'`);
                                    n(new Error(t)), s()
                                }
                            }), r.maxResponseTime || this.maxResponseTime)
                        }))
                    }))
                }, p = function(e, t = null) {
                    const r = [];
                    return Object.entries(e).forEach((([e, o]) => {
                        const i = y(this, a, "f")[e],
                            s = this.addListener(i, ((e, r) => l(this, void 0, void 0, (function*() {
                                if (!(0, w.isRequestMessage)(e) || !o) return;
                                if (t && !t(e.data)) return;
                                let {
                                    data: s
                                } = e;
                                try {
                                    if (this.useEncryption(i, !0)) {
                                        if ("string" != typeof s) throw new Error(this.prefix("encryption is required but responder received a non string data response"));
                                        s = yield this.decrypt(s)
                                    }
                                    const t = yield o(s, r);
                                    this.logger(`responding to request type '${i}' from target '${this.targetOrigin}':`, t), y(this, n, "m", h).call(this, i, e.messageId, t)
                                } catch (t) {
                                    (0, w.isError)(t) ? y(this, n, "m", h).call(this, i, e.messageId, {}, t.message): y(this, n, "m", h).call(this, i, e.messageId, {}, this.prefix("responder threw a non Error object"))
                                }
                            }))));
                        r.push(s)
                    })), () => {
                        this.logger("removing responders:", e), r.forEach((e => e()))
                    }
                }
            },
            3982: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.InternalMessageTypes = t.isRequestMessage = t.isError = void 0, t.isError = e => Boolean(e.message), t.isRequestMessage = e => Boolean(e && "object" == typeof e && !Array.isArray(e) && "string" == typeof e.type && "string" == typeof e.messageId && "boolean" == typeof e.isError && void 0 !== e.errorMessage),
                    function(e) {
                        e.postMessengerConnect = "post-messenger-connect"
                    }(t.InternalMessageTypes || (t.InternalMessageTypes = {}))
            },
            6068: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.decodeBase64 = t.encodeBase64 = t.str2ab = t.ab2str = void 0, t.ab2str = function(e) {
                    const t = Array.from(new Uint16Array(e));
                    return String.fromCharCode.apply(null, t)
                }, t.str2ab = function(e) {
                    const t = new ArrayBuffer(2 * e.length),
                        r = new Uint16Array(t);
                    for (let t = 0, n = e.length; t < n; t += 1) r[t] = e.charCodeAt(t);
                    return t
                }, t.encodeBase64 = function(e) {
                    const t = new Uint16Array(e.length);
                    for (let r = 0; r < t.length; r++) t[r] = e.charCodeAt(r);
                    return btoa(String.fromCharCode(...new Uint8Array(t.buffer)))
                }, t.decodeBase64 = function(e) {
                    const t = atob(e),
                        r = new Uint8Array(t.length);
                    for (let e = 0; e < r.length; e++) r[e] = t.charCodeAt(e);
                    return String.fromCharCode(...new Uint16Array(r.buffer))
                }
            },
            1989: (e, t, r) => {
                var n = r(1789),
                    o = r(401),
                    i = r(7667),
                    s = r(1327),
                    a = r(1866);

                function c(e) {
                    var t = -1,
                        r = null == e ? 0 : e.length;
                    for (this.clear(); ++t < r;) {
                        var n = e[t];
                        this.set(n[0], n[1])
                    }
                }
                c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = s, c.prototype.set = a, e.exports = c
            },
            8407: (e, t, r) => {
                var n = r(7040),
                    o = r(4125),
                    i = r(2117),
                    s = r(7518),
                    a = r(4705);

                function c(e) {
                    var t = -1,
                        r = null == e ? 0 : e.length;
                    for (this.clear(); ++t < r;) {
                        var n = e[t];
                        this.set(n[0], n[1])
                    }
                }
                c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = s, c.prototype.set = a, e.exports = c
            },
            7071: (e, t, r) => {
                var n = r(852)(r(5639), "Map");
                e.exports = n
            },
            3369: (e, t, r) => {
                var n = r(4785),
                    o = r(1285),
                    i = r(6e3),
                    s = r(9916),
                    a = r(5265);

                function c(e) {
                    var t = -1,
                        r = null == e ? 0 : e.length;
                    for (this.clear(); ++t < r;) {
                        var n = e[t];
                        this.set(n[0], n[1])
                    }
                }
                c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = s, c.prototype.set = a, e.exports = c
            },
            2705: (e, t, r) => {
                var n = r(5639).Symbol;
                e.exports = n
            },
            9932: e => {
                e.exports = function(e, t) {
                    for (var r = -1, n = null == e ? 0 : e.length, o = Array(n); ++r < n;) o[r] = t(e[r], r, e);
                    return o
                }
            },
            8470: (e, t, r) => {
                var n = r(7813);
                e.exports = function(e, t) {
                    for (var r = e.length; r--;)
                        if (n(e[r][0], t)) return r;
                    return -1
                }
            },
            7786: (e, t, r) => {
                var n = r(1811),
                    o = r(327);
                e.exports = function(e, t) {
                    for (var r = 0, i = (t = n(t, e)).length; null != e && r < i;) e = e[o(t[r++])];
                    return r && r == i ? e : void 0
                }
            },
            4239: (e, t, r) => {
                var n = r(2705),
                    o = r(9607),
                    i = r(2333),
                    s = n ? n.toStringTag : void 0;
                e.exports = function(e) {
                    return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : s && s in Object(e) ? o(e) : i(e)
                }
            },
            8458: (e, t, r) => {
                var n = r(3560),
                    o = r(5346),
                    i = r(3218),
                    s = r(346),
                    a = /^\[object .+?Constructor\]$/,
                    c = Function.prototype,
                    u = Object.prototype,
                    h = c.toString,
                    f = u.hasOwnProperty,
                    p = RegExp("^" + h.call(f).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                e.exports = function(e) {
                    return !(!i(e) || o(e)) && (n(e) ? p : a).test(s(e))
                }
            },
            531: (e, t, r) => {
                var n = r(2705),
                    o = r(9932),
                    i = r(1469),
                    s = r(3448),
                    a = n ? n.prototype : void 0,
                    c = a ? a.toString : void 0;
                e.exports = function e(t) {
                    if ("string" == typeof t) return t;
                    if (i(t)) return o(t, e) + "";
                    if (s(t)) return c ? c.call(t) : "";
                    var r = t + "";
                    return "0" == r && 1 / t == -1 / 0 ? "-0" : r
                }
            },
            1811: (e, t, r) => {
                var n = r(1469),
                    o = r(5403),
                    i = r(5514),
                    s = r(9833);
                e.exports = function(e, t) {
                    return n(e) ? e : o(e, t) ? [e] : i(s(e))
                }
            },
            4429: (e, t, r) => {
                var n = r(5639)["__core-js_shared__"];
                e.exports = n
            },
            8450: (e, t, r) => {
                var n = "object" == typeof r.g && r.g && r.g.Object === Object && r.g;
                e.exports = n
            },
            5050: (e, t, r) => {
                var n = r(7019);
                e.exports = function(e, t) {
                    var r = e.__data__;
                    return n(t) ? r["string" == typeof t ? "string" : "hash"] : r.map
                }
            },
            852: (e, t, r) => {
                var n = r(8458),
                    o = r(7801);
                e.exports = function(e, t) {
                    var r = o(e, t);
                    return n(r) ? r : void 0
                }
            },
            9607: (e, t, r) => {
                var n = r(2705),
                    o = Object.prototype,
                    i = o.hasOwnProperty,
                    s = o.toString,
                    a = n ? n.toStringTag : void 0;
                e.exports = function(e) {
                    var t = i.call(e, a),
                        r = e[a];
                    try {
                        e[a] = void 0;
                        var n = !0
                    } catch (e) {}
                    var o = s.call(e);
                    return n && (t ? e[a] = r : delete e[a]), o
                }
            },
            7801: e => {
                e.exports = function(e, t) {
                    return null == e ? void 0 : e[t]
                }
            },
            1789: (e, t, r) => {
                var n = r(4536);
                e.exports = function() {
                    this.__data__ = n ? n(null) : {}, this.size = 0
                }
            },
            401: e => {
                e.exports = function(e) {
                    var t = this.has(e) && delete this.__data__[e];
                    return this.size -= t ? 1 : 0, t
                }
            },
            7667: (e, t, r) => {
                var n = r(4536),
                    o = Object.prototype.hasOwnProperty;
                e.exports = function(e) {
                    var t = this.__data__;
                    if (n) {
                        var r = t[e];
                        return "__lodash_hash_undefined__" === r ? void 0 : r
                    }
                    return o.call(t, e) ? t[e] : void 0
                }
            },
            1327: (e, t, r) => {
                var n = r(4536),
                    o = Object.prototype.hasOwnProperty;
                e.exports = function(e) {
                    var t = this.__data__;
                    return n ? void 0 !== t[e] : o.call(t, e)
                }
            },
            1866: (e, t, r) => {
                var n = r(4536);
                e.exports = function(e, t) {
                    var r = this.__data__;
                    return this.size += this.has(e) ? 0 : 1, r[e] = n && void 0 === t ? "__lodash_hash_undefined__" : t, this
                }
            },
            5403: (e, t, r) => {
                var n = r(1469),
                    o = r(3448),
                    i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                    s = /^\w*$/;
                e.exports = function(e, t) {
                    if (n(e)) return !1;
                    var r = typeof e;
                    return !("number" != r && "symbol" != r && "boolean" != r && null != e && !o(e)) || s.test(e) || !i.test(e) || null != t && e in Object(t)
                }
            },
            7019: e => {
                e.exports = function(e) {
                    var t = typeof e;
                    return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
                }
            },
            5346: (e, t, r) => {
                var n, o = r(4429),
                    i = (n = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "";
                e.exports = function(e) {
                    return !!i && i in e
                }
            },
            7040: e => {
                e.exports = function() {
                    this.__data__ = [], this.size = 0
                }
            },
            4125: (e, t, r) => {
                var n = r(8470),
                    o = Array.prototype.splice;
                e.exports = function(e) {
                    var t = this.__data__,
                        r = n(t, e);
                    return !(r < 0 || (r == t.length - 1 ? t.pop() : o.call(t, r, 1), --this.size, 0))
                }
            },
            2117: (e, t, r) => {
                var n = r(8470);
                e.exports = function(e) {
                    var t = this.__data__,
                        r = n(t, e);
                    return r < 0 ? void 0 : t[r][1]
                }
            },
            7518: (e, t, r) => {
                var n = r(8470);
                e.exports = function(e) {
                    return n(this.__data__, e) > -1
                }
            },
            4705: (e, t, r) => {
                var n = r(8470);
                e.exports = function(e, t) {
                    var r = this.__data__,
                        o = n(r, e);
                    return o < 0 ? (++this.size, r.push([e, t])) : r[o][1] = t, this
                }
            },
            4785: (e, t, r) => {
                var n = r(1989),
                    o = r(8407),
                    i = r(7071);
                e.exports = function() {
                    this.size = 0, this.__data__ = {
                        hash: new n,
                        map: new(i || o),
                        string: new n
                    }
                }
            },
            1285: (e, t, r) => {
                var n = r(5050);
                e.exports = function(e) {
                    var t = n(this, e).delete(e);
                    return this.size -= t ? 1 : 0, t
                }
            },
            6e3: (e, t, r) => {
                var n = r(5050);
                e.exports = function(e) {
                    return n(this, e).get(e)
                }
            },
            9916: (e, t, r) => {
                var n = r(5050);
                e.exports = function(e) {
                    return n(this, e).has(e)
                }
            },
            5265: (e, t, r) => {
                var n = r(5050);
                e.exports = function(e, t) {
                    var r = n(this, e),
                        o = r.size;
                    return r.set(e, t), this.size += r.size == o ? 0 : 1, this
                }
            },
            4523: (e, t, r) => {
                var n = r(8306);
                e.exports = function(e) {
                    var t = n(e, (function(e) {
                            return 500 === r.size && r.clear(), e
                        })),
                        r = t.cache;
                    return t
                }
            },
            4536: (e, t, r) => {
                var n = r(852)(Object, "create");
                e.exports = n
            },
            2333: e => {
                var t = Object.prototype.toString;
                e.exports = function(e) {
                    return t.call(e)
                }
            },
            5639: (e, t, r) => {
                var n = r(8450),
                    o = "object" == typeof self && self && self.Object === Object && self,
                    i = n || o || Function("return this")();
                e.exports = i
            },
            5514: (e, t, r) => {
                var n = r(4523),
                    o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                    i = /\\(\\)?/g,
                    s = n((function(e) {
                        var t = [];
                        return 46 === e.charCodeAt(0) && t.push(""), e.replace(o, (function(e, r, n, o) {
                            t.push(n ? o.replace(i, "$1") : r || e)
                        })), t
                    }));
                e.exports = s
            },
            327: (e, t, r) => {
                var n = r(3448);
                e.exports = function(e) {
                    if ("string" == typeof e || n(e)) return e;
                    var t = e + "";
                    return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                }
            },
            346: e => {
                var t = Function.prototype.toString;
                e.exports = function(e) {
                    if (null != e) {
                        try {
                            return t.call(e)
                        } catch (e) {}
                        try {
                            return e + ""
                        } catch (e) {}
                    }
                    return ""
                }
            },
            7813: e => {
                e.exports = function(e, t) {
                    return e === t || e != e && t != t
                }
            },
            7361: (e, t, r) => {
                var n = r(7786);
                e.exports = function(e, t, r) {
                    var o = null == e ? void 0 : n(e, t);
                    return void 0 === o ? r : o
                }
            },
            1469: e => {
                var t = Array.isArray;
                e.exports = t
            },
            3560: (e, t, r) => {
                var n = r(4239),
                    o = r(3218);
                e.exports = function(e) {
                    if (!o(e)) return !1;
                    var t = n(e);
                    return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t
                }
            },
            3218: e => {
                e.exports = function(e) {
                    var t = typeof e;
                    return null != e && ("object" == t || "function" == t)
                }
            },
            7005: e => {
                e.exports = function(e) {
                    return null != e && "object" == typeof e
                }
            },
            3448: (e, t, r) => {
                var n = r(4239),
                    o = r(7005);
                e.exports = function(e) {
                    return "symbol" == typeof e || o(e) && "[object Symbol]" == n(e)
                }
            },
            8306: (e, t, r) => {
                var n = r(3369);

                function o(e, t) {
                    if ("function" != typeof e || null != t && "function" != typeof t) throw new TypeError("Expected a function");
                    var r = function() {
                        var n = arguments,
                            o = t ? t.apply(this, n) : n[0],
                            i = r.cache;
                        if (i.has(o)) return i.get(o);
                        var s = e.apply(this, n);
                        return r.cache = i.set(o, s) || i, s
                    };
                    return r.cache = new(o.Cache || n), r
                }
                o.Cache = n, e.exports = o
            },
            9833: (e, t, r) => {
                var n = r(531);
                e.exports = function(e) {
                    return null == e ? "" : n(e)
                }
            },
            1614: (e, t, r) => {
                "use strict";
                var n;
                r.r(t), r.d(t, {
                    NIL: () => M,
                    parse: () => g,
                    stringify: () => h,
                    v1: () => y,
                    v3: () => P,
                    v4: () => S,
                    v5: () => C,
                    validate: () => a,
                    version: () => T
                });
                var o = new Uint8Array(16);

                function i() {
                    if (!n && !(n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return n(o)
                }
                const s = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
                    a = function(e) {
                        return "string" == typeof e && s.test(e)
                    };
                for (var c = [], u = 0; u < 256; ++u) c.push((u + 256).toString(16).substr(1));
                const h = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
                    if (!a(r)) throw TypeError("Stringified UUID is invalid");
                    return r
                };
                var f, p, l = 0,
                    d = 0;
                const y = function(e, t, r) {
                        var n = t && r || 0,
                            o = t || new Array(16),
                            s = (e = e || {}).node || f,
                            a = void 0 !== e.clockseq ? e.clockseq : p;
                        if (null == s || null == a) {
                            var c = e.random || (e.rng || i)();
                            null == s && (s = f = [1 | c[0], c[1], c[2], c[3], c[4], c[5]]), null == a && (a = p = 16383 & (c[6] << 8 | c[7]))
                        }
                        var u = void 0 !== e.msecs ? e.msecs : Date.now(),
                            y = void 0 !== e.nsecs ? e.nsecs : d + 1,
                            g = u - l + (y - d) / 1e4;
                        if (g < 0 && void 0 === e.clockseq && (a = a + 1 & 16383), (g < 0 || u > l) && void 0 === e.nsecs && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                        l = u, d = y, p = a;
                        var v = (1e4 * (268435455 & (u += 122192928e5)) + y) % 4294967296;
                        o[n++] = v >>> 24 & 255, o[n++] = v >>> 16 & 255, o[n++] = v >>> 8 & 255, o[n++] = 255 & v;
                        var m = u / 4294967296 * 1e4 & 268435455;
                        o[n++] = m >>> 8 & 255, o[n++] = 255 & m, o[n++] = m >>> 24 & 15 | 16, o[n++] = m >>> 16 & 255, o[n++] = a >>> 8 | 128, o[n++] = 255 & a;
                        for (var w = 0; w < 6; ++w) o[n + w] = s[w];
                        return t || h(o)
                    },
                    g = function(e) {
                        if (!a(e)) throw TypeError("Invalid UUID");
                        var t, r = new Uint8Array(16);
                        return r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, r[1] = t >>> 16 & 255, r[2] = t >>> 8 & 255, r[3] = 255 & t, r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, r[5] = 255 & t, r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, r[7] = 255 & t, r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, r[9] = 255 & t, r[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, r[11] = t / 4294967296 & 255, r[12] = t >>> 24 & 255, r[13] = t >>> 16 & 255, r[14] = t >>> 8 & 255, r[15] = 255 & t, r
                    };

                function v(e, t, r) {
                    function n(e, n, o, i) {
                        if ("string" == typeof e && (e = function(e) {
                                e = unescape(encodeURIComponent(e));
                                for (var t = [], r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
                                return t
                            }(e)), "string" == typeof n && (n = g(n)), 16 !== n.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                        var s = new Uint8Array(16 + e.length);
                        if (s.set(n), s.set(e, n.length), (s = r(s))[6] = 15 & s[6] | t, s[8] = 63 & s[8] | 128, o) {
                            i = i || 0;
                            for (var a = 0; a < 16; ++a) o[i + a] = s[a];
                            return o
                        }
                        return h(s)
                    }
                    try {
                        n.name = e
                    } catch (e) {}
                    return n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", n
                }

                function m(e) {
                    return 14 + (e + 64 >>> 9 << 4) + 1
                }

                function w(e, t) {
                    var r = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
                }

                function b(e, t, r, n, o, i) {
                    return w((s = w(w(t, e), w(n, i))) << (a = o) | s >>> 32 - a, r);
                    var s, a
                }

                function x(e, t, r, n, o, i, s) {
                    return b(t & r | ~t & n, e, t, o, i, s)
                }

                function _(e, t, r, n, o, i, s) {
                    return b(t & n | r & ~n, e, t, o, i, s)
                }

                function E(e, t, r, n, o, i, s) {
                    return b(t ^ r ^ n, e, t, o, i, s)
                }

                function O(e, t, r, n, o, i, s) {
                    return b(r ^ (t | ~n), e, t, o, i, s)
                }
                const P = v("v3", 48, (function(e) {
                        if ("string" == typeof e) {
                            var t = unescape(encodeURIComponent(e));
                            e = new Uint8Array(t.length);
                            for (var r = 0; r < t.length; ++r) e[r] = t.charCodeAt(r)
                        }
                        return function(e) {
                            for (var t = [], r = 32 * e.length, n = "0123456789abcdef", o = 0; o < r; o += 8) {
                                var i = e[o >> 5] >>> o % 32 & 255,
                                    s = parseInt(n.charAt(i >>> 4 & 15) + n.charAt(15 & i), 16);
                                t.push(s)
                            }
                            return t
                        }(function(e, t) {
                            e[t >> 5] |= 128 << t % 32, e[m(t) - 1] = t;
                            for (var r = 1732584193, n = -271733879, o = -1732584194, i = 271733878, s = 0; s < e.length; s += 16) {
                                var a = r,
                                    c = n,
                                    u = o,
                                    h = i;
                                r = x(r, n, o, i, e[s], 7, -680876936), i = x(i, r, n, o, e[s + 1], 12, -389564586), o = x(o, i, r, n, e[s + 2], 17, 606105819), n = x(n, o, i, r, e[s + 3], 22, -1044525330), r = x(r, n, o, i, e[s + 4], 7, -176418897), i = x(i, r, n, o, e[s + 5], 12, 1200080426), o = x(o, i, r, n, e[s + 6], 17, -1473231341), n = x(n, o, i, r, e[s + 7], 22, -45705983), r = x(r, n, o, i, e[s + 8], 7, 1770035416), i = x(i, r, n, o, e[s + 9], 12, -1958414417), o = x(o, i, r, n, e[s + 10], 17, -42063), n = x(n, o, i, r, e[s + 11], 22, -1990404162), r = x(r, n, o, i, e[s + 12], 7, 1804603682), i = x(i, r, n, o, e[s + 13], 12, -40341101), o = x(o, i, r, n, e[s + 14], 17, -1502002290), r = _(r, n = x(n, o, i, r, e[s + 15], 22, 1236535329), o, i, e[s + 1], 5, -165796510), i = _(i, r, n, o, e[s + 6], 9, -1069501632), o = _(o, i, r, n, e[s + 11], 14, 643717713), n = _(n, o, i, r, e[s], 20, -373897302), r = _(r, n, o, i, e[s + 5], 5, -701558691), i = _(i, r, n, o, e[s + 10], 9, 38016083), o = _(o, i, r, n, e[s + 15], 14, -660478335), n = _(n, o, i, r, e[s + 4], 20, -405537848), r = _(r, n, o, i, e[s + 9], 5, 568446438), i = _(i, r, n, o, e[s + 14], 9, -1019803690), o = _(o, i, r, n, e[s + 3], 14, -187363961), n = _(n, o, i, r, e[s + 8], 20, 1163531501), r = _(r, n, o, i, e[s + 13], 5, -1444681467), i = _(i, r, n, o, e[s + 2], 9, -51403784), o = _(o, i, r, n, e[s + 7], 14, 1735328473), r = E(r, n = _(n, o, i, r, e[s + 12], 20, -1926607734), o, i, e[s + 5], 4, -378558), i = E(i, r, n, o, e[s + 8], 11, -2022574463), o = E(o, i, r, n, e[s + 11], 16, 1839030562), n = E(n, o, i, r, e[s + 14], 23, -35309556), r = E(r, n, o, i, e[s + 1], 4, -1530992060), i = E(i, r, n, o, e[s + 4], 11, 1272893353), o = E(o, i, r, n, e[s + 7], 16, -155497632), n = E(n, o, i, r, e[s + 10], 23, -1094730640), r = E(r, n, o, i, e[s + 13], 4, 681279174), i = E(i, r, n, o, e[s], 11, -358537222), o = E(o, i, r, n, e[s + 3], 16, -722521979), n = E(n, o, i, r, e[s + 6], 23, 76029189), r = E(r, n, o, i, e[s + 9], 4, -640364487), i = E(i, r, n, o, e[s + 12], 11, -421815835), o = E(o, i, r, n, e[s + 15], 16, 530742520), r = O(r, n = E(n, o, i, r, e[s + 2], 23, -995338651), o, i, e[s], 6, -198630844), i = O(i, r, n, o, e[s + 7], 10, 1126891415), o = O(o, i, r, n, e[s + 14], 15, -1416354905), n = O(n, o, i, r, e[s + 5], 21, -57434055), r = O(r, n, o, i, e[s + 12], 6, 1700485571), i = O(i, r, n, o, e[s + 3], 10, -1894986606), o = O(o, i, r, n, e[s + 10], 15, -1051523), n = O(n, o, i, r, e[s + 1], 21, -2054922799), r = O(r, n, o, i, e[s + 8], 6, 1873313359), i = O(i, r, n, o, e[s + 15], 10, -30611744), o = O(o, i, r, n, e[s + 6], 15, -1560198380), n = O(n, o, i, r, e[s + 13], 21, 1309151649), r = O(r, n, o, i, e[s + 4], 6, -145523070), i = O(i, r, n, o, e[s + 11], 10, -1120210379), o = O(o, i, r, n, e[s + 2], 15, 718787259), n = O(n, o, i, r, e[s + 9], 21, -343485551), r = w(r, a), n = w(n, c), o = w(o, u), i = w(i, h)
                            }
                            return [r, n, o, i]
                        }(function(e) {
                            if (0 === e.length) return [];
                            for (var t = 8 * e.length, r = new Uint32Array(m(t)), n = 0; n < t; n += 8) r[n >> 5] |= (255 & e[n / 8]) << n % 32;
                            return r
                        }(e), 8 * e.length))
                    })),
                    S = function(e, t, r) {
                        var n = (e = e || {}).random || (e.rng || i)();
                        if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t) {
                            r = r || 0;
                            for (var o = 0; o < 16; ++o) t[r + o] = n[o];
                            return t
                        }
                        return h(n)
                    };

                function j(e, t, r, n) {
                    switch (e) {
                        case 0:
                            return t & r ^ ~t & n;
                        case 1:
                        case 3:
                            return t ^ r ^ n;
                        case 2:
                            return t & r ^ t & n ^ r & n
                    }
                }

                function A(e, t) {
                    return e << t | e >>> 32 - t
                }
                const C = v("v5", 80, (function(e) {
                        var t = [1518500249, 1859775393, 2400959708, 3395469782],
                            r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                        if ("string" == typeof e) {
                            var n = unescape(encodeURIComponent(e));
                            e = [];
                            for (var o = 0; o < n.length; ++o) e.push(n.charCodeAt(o))
                        } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
                        e.push(128);
                        for (var i = e.length / 4 + 2, s = Math.ceil(i / 16), a = new Array(s), c = 0; c < s; ++c) {
                            for (var u = new Uint32Array(16), h = 0; h < 16; ++h) u[h] = e[64 * c + 4 * h] << 24 | e[64 * c + 4 * h + 1] << 16 | e[64 * c + 4 * h + 2] << 8 | e[64 * c + 4 * h + 3];
                            a[c] = u
                        }
                        a[s - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32), a[s - 1][14] = Math.floor(a[s - 1][14]), a[s - 1][15] = 8 * (e.length - 1) & 4294967295;
                        for (var f = 0; f < s; ++f) {
                            for (var p = new Uint32Array(80), l = 0; l < 16; ++l) p[l] = a[f][l];
                            for (var d = 16; d < 80; ++d) p[d] = A(p[d - 3] ^ p[d - 8] ^ p[d - 14] ^ p[d - 16], 1);
                            for (var y = r[0], g = r[1], v = r[2], m = r[3], w = r[4], b = 0; b < 80; ++b) {
                                var x = Math.floor(b / 20),
                                    _ = A(y, 5) + j(x, g, v, m) + w + t[x] + p[b] >>> 0;
                                w = m, m = v, v = A(g, 30) >>> 0, g = y, y = _
                            }
                            r[0] = r[0] + y >>> 0, r[1] = r[1] + g >>> 0, r[2] = r[2] + v >>> 0, r[3] = r[3] + m >>> 0, r[4] = r[4] + w >>> 0
                        }
                        return [r[0] >> 24 & 255, r[0] >> 16 & 255, r[0] >> 8 & 255, 255 & r[0], r[1] >> 24 & 255, r[1] >> 16 & 255, r[1] >> 8 & 255, 255 & r[1], r[2] >> 24 & 255, r[2] >> 16 & 255, r[2] >> 8 & 255, 255 & r[2], r[3] >> 24 & 255, r[3] >> 16 & 255, r[3] >> 8 & 255, 255 & r[3], r[4] >> 24 & 255, r[4] >> 16 & 255, r[4] >> 8 & 255, 255 & r[4]]
                    })),
                    M = "00000000-0000-0000-0000-000000000000",
                    T = function(e) {
                        if (!a(e)) throw TypeError("Invalid UUID");
                        return parseInt(e.substr(14, 1), 16)
                    }
            },
            2081: (e, t, r) => {
                "use strict";
                r.r(t), r.d(t, {
                    default: () => o
                });
                const n = e => {
                    const t = new Set;
                    do {
                        for (const r of Reflect.ownKeys(e)) t.add([e, r])
                    } while ((e = Reflect.getPrototypeOf(e)) && e !== Object.prototype);
                    return t
                };

                function o(e, {
                    include: t,
                    exclude: r
                } = {}) {
                    const o = e => {
                        const n = t => "string" == typeof t ? e === t : t.test(e);
                        return t ? t.some(n) : !r || !r.some(n)
                    };
                    for (const [t, r] of n(e.constructor.prototype)) {
                        if ("constructor" === r || !o(r)) continue;
                        const n = Reflect.getOwnPropertyDescriptor(t, r);
                        n && "function" == typeof n.value && (e[r] = e[r].bind(e))
                    }
                    return e
                }
            }
        },
        t = {};

    function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.exports
    }
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e, t = r(4654),
            n = r(7361),
            o = r.n(n);
        ! function(e) {
            e.merchantSPBGetWindowPath = "merchantSPB:merchantSPBGetWindowPath", e.merchantSPBCreateOrder = "merchantSPB:merchantSPBCreateOrder", e.merchantSPBApproveOrder = "merchantSPB:merchantSPBApproveOrder", e.merchantSPBCancelOrder = "merchantSPB:merchantSPBCancelOrder", e.merchantSPBErrorOrder = "merchantSPB:merchantSPBErrorOrder", e.merchantSPBGuestEnabled = "merchantSPB:merchantSPBGuestEnabled", e.merchantSPBGetFacilitatorAccessToken = "merchantSPB:merchantSPBGetFacilitatorAccessToken"
        }(e || (e = {}));
        const i = function(e) {
            const t = {};
            return Object.keys(e).forEach((e => {
                t[e] = e
            })), t
        }(e);
        var s = function(e, t, r, n) {
            return new(r || (r = Promise))((function(o, i) {
                function s(e) {
                    try {
                        c(n.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function a(e) {
                    try {
                        c(n.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function(e) {
                        e(t)
                    }))).then(s, a)
                }
                c((n = n.apply(e, t || [])).next())
            }))
        };
        const a = new t.PostMessenger({
            clientName: "merchant-spb",
            enableLogging: !0,
            types: e,
            useEncryption: !1
        });
        ! function() {
            s(this, void 0, void 0, (function*() {
                const e = window.exports.paymentSession();
                window.top ? (a.bindResponders({
                    [i.merchantSPBGetWindowPath]: ({
                        path: e
                    }) => o()(window, e),
                    [i.merchantSPBCreateOrder]: () => s(this, void 0, void 0, (function*() {
                        return e.createOrder({
                            eventSource: "honey"
                        })
                    })),
                    [i.merchantSPBApproveOrder]: t => {
                        try {
                            e.onApprove(t)
                        } catch (e) {}
                    },
                    [i.merchantSPBCancelOrder]: t => e.onCancel(t),
                    [i.merchantSPBErrorOrder]: t => e.onError(t.error || "unknown error"),
                    [i.merchantSPBGuestEnabled]: ({
                        merchantId: e
                    }) => s(this, void 0, void 0, (function*() {
                        return yield window.exports.isGuestEnabled(e)
                    })),
                    [i.merchantSPBGetFacilitatorAccessToken]: () => s(this, void 0, void 0, (function*() {
                        return yield e.getFacilitatorAccessToken()
                    }))
                }), yield a.connect({
                    targetOrigin: document.referrer || window.location.ancestorOrigins[0],
                    targetWindow: window.top
                })) : console.error("window.top is null")
            }))
        }()
    })()
})();
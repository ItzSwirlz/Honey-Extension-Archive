(() => {
    "use strict";
    var e = {
            4654: function(e, t, n) {
                var r, i, o, s, a, c, u, f, l, h, d = this && this.__awaiter || function(e, t, n, r) {
                        return new(n || (n = Promise))((function(i, o) {
                            function s(e) {
                                try {
                                    c(r.next(e))
                                } catch (e) {
                                    o(e)
                                }
                            }

                            function a(e) {
                                try {
                                    c(r.throw(e))
                                } catch (e) {
                                    o(e)
                                }
                            }

                            function c(e) {
                                var t;
                                e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                                    e(t)
                                }))).then(s, a)
                            }
                            c((r = r.apply(e, t || [])).next())
                        }))
                    },
                    p = this && this.__classPrivateFieldSet || function(e, t, n, r, i) {
                        if ("m" === r) throw new TypeError("Private method is not writable");
                        if ("a" === r && !i) throw new TypeError("Private accessor was defined without a setter");
                        if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                        return "a" === r ? i.call(e, n) : i ? i.value = n : t.set(e, n), n
                    },
                    g = this && this.__classPrivateFieldGet || function(e, t, n, r) {
                        if ("a" === n && !r) throw new TypeError("Private accessor was defined without a getter");
                        if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                        return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e)
                    },
                    y = this && this.__importDefault || function(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.PostMessenger = void 0;
                const v = y(n(2081)),
                    w = n(1614),
                    m = n(3982),
                    b = n(6068),
                    E = "AES-CBC";
                t.PostMessenger = class {
                    constructor({
                        clientName: e = "unknown",
                        enableLogging: t = !1,
                        useEncryption: n = !0,
                        maxResponseTime: u = 1e4,
                        types: f
                    }) {
                        if (r.add(this), this.connection = null, i.set(this, void 0), o.set(this, {
                                algorithm: null,
                                iv: null,
                                requestKey: null
                            }), s.set(this, {}), this.targetWindow = null, this.targetOrigin = null, a.set(this, void 0), c.set(this, null), (0, v.default)(this), this.clientName = e, p(this, i, t, "f"), this.useEncryption = (e, t = !1) => {
                                const r = n && e !== m.InternalMessageTypes.postMessengerConnect;
                                if (r && !this.connection && t) {
                                    const n = new Error(this.prefix(`Cannot send message ${e}. Encryption is on but there is no connected client.`));
                                    if ("function" != typeof t) throw n;
                                    t(n)
                                }
                                return r
                            }, this.maxResponseTime = u, f.postMessengerConnect) throw new Error(this.prefix("postMessengerConnect is a reserved message type."));
                        p(this, a, Object.assign(Object.assign({}, f), m.InternalMessageTypes), "f")
                    }
                    prefix(e) {
                        return `postMessenger: ${this.clientName} ${e}`
                    }
                    logger(...e) {
                        g(this, i, "f") && ("string" == typeof e[0] ? console.log(this.prefix(e[0]), ...e.slice(1)) : console.log(...e))
                    }
                    getListeners() {
                        return g(this, s, "f")
                    }
                    addListener(e, t) {
                        return g(this, s, "f")[e] ? g(this, s, "f")[e].push(t) : g(this, s, "f")[e] = [t], () => this.removeListener(e, t)
                    }
                    removeListener(e, t) {
                        if (g(this, s, "f")[e]) {
                            const n = g(this, s, "f")[e].indexOf(t);
                            n > -1 && g(this, s, "f")[e].splice(n, n + 1)
                        }
                    }
                    onReceiveMessage(e) {
                        if (e.data && g(this, s, "f")[e.data.type]) {
                            if (g(this, c, "f") && !g(this, c, "f").call(this, e.origin)) return;
                            g(this, s, "f")[e.data.type].forEach((t => {
                                t(e.data, e)
                            }))
                        }
                    }
                    request(e, t = {}, n = {}) {
                        const i = g(this, a, "f")[e];
                        if (!i) throw new Error(this.prefix(`Unable to find messageType for ${e}`));
                        if (this.connection && !this.connection.types[String(e)]) throw new Error(this.prefix(`Connected client ${this.connection.clientName} does not have a matching message type for ${e} so this request will fail.`));
                        return g(this, r, "m", l).call(this, i, t, n)
                    }
                    bindResponders(e) {
                        if (e.postMessengerConnect) throw new Error(this.prefix("postMessengerConnect is a reserved message type."));
                        return g(this, r, "m", h).call(this, e)
                    }
                    connect({
                        targetWindow: e,
                        targetOrigin: t,
                        maxRetries: n = 10
                    }) {
                        return d(this, void 0, void 0, (function*() {
                            if (!e || !t) throw new Error(this.prefix("targetWindow and targetOrigin are required for connect"));
                            this.setTarget(e, t), this.beginListening((e => e === new URL(t).origin));
                            let i = null,
                                s = null;
                            const c = this.useEncryption();
                            c && (i = crypto.getRandomValues(new Uint8Array(16)), g(this, o, "f").requestKey = yield crypto.subtle.generateKey({
                                length: 256,
                                name: E
                            }, !0, ["encrypt", "decrypt"]), s = yield crypto.subtle.exportKey("jwk", g(this, o, "f").requestKey), g(this, o, "f").iv = i, g(this, o, "f").algorithm = {
                                iv: i,
                                name: E
                            });
                            const u = n || 1;
                            let f = null;
                            for (let e = 0; e < u; e += 1) {
                                try {
                                    f = yield g(this, r, "m", l).call(this, m.InternalMessageTypes.postMessengerConnect, {
                                        clientName: this.clientName,
                                        iv: i,
                                        jsonRequestKey: s,
                                        origin: window.location.origin,
                                        types: g(this, a, "f"),
                                        useEncryption: c
                                    }, {
                                        maxResponseTime: 500
                                    })
                                } catch (e) {}
                                if (f) {
                                    this.connection = f;
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
                        origin: n
                    }) {
                        if (!e && !n) throw new Error(this.prefix("allowAnyOrigin must be true if origin is not specified"));
                        const i = e => !t || t === e.clientName;
                        return this.beginListening((e => !n || e === n)), new Promise((e => {
                            const t = g(this, r, "m", h).call(this, {
                                postMessengerConnect: (n, r) => d(this, void 0, void 0, (function*() {
                                    if (!r.source) throw new Error(this.prefix("event.source is null"));
                                    if (this.setTarget(r.source, n.origin), this.connection = {
                                            clientName: n.clientName,
                                            types: n.types,
                                            useEncryption: !1
                                        }, this.useEncryption()) {
                                        if (!n.iv || !n.jsonRequestKey || !n.useEncryption) {
                                            const e = "encryption is required but iv or jsonRequestKey or useEncryption were not provided in connection message.";
                                            throw new Error(this.prefix(e))
                                        }
                                        this.connection.useEncryption = !0, g(this, o, "f").iv = new Uint8Array([...n.iv]), g(this, o, "f").algorithm = {
                                            iv: g(this, o, "f").iv,
                                            name: E
                                        }, g(this, o, "f").requestKey = yield crypto.subtle.importKey("jwk", n.jsonRequestKey, {
                                            name: E
                                        }, !1, ["encrypt", "decrypt"])
                                    }
                                    return t(), this.logger(`Accepted connection from ${this.connection.clientName}`, this.connection), e(this.connection), {
                                        clientName: this.clientName,
                                        types: n.types,
                                        useEncryption: this.useEncryption()
                                    }
                                }))
                            }, i)
                        }))
                    }
                    setTarget(e, t) {
                        if (!e || !t) throw new Error(this.prefix("targetWindow and targetWindow are required for setTarget"));
                        this.targetWindow = e;
                        const n = new URL(t);
                        this.targetOrigin = n.origin
                    }
                    beginListening(e) {
                        p(this, c, e, "f"), window.addEventListener("message", this.onReceiveMessage)
                    }
                    stopListening() {
                        window.removeEventListener("message", this.onReceiveMessage)
                    }
                    decrypt(e) {
                        return d(this, void 0, void 0, (function*() {
                            if (!g(this, o, "f").algorithm || !g(this, o, "f").requestKey) throw new Error(this.prefix("encryptionValues must be set before calling decrpyt"));
                            const t = (0, b.decodeBase64)(e),
                                n = (0, b.str2ab)(t),
                                r = yield crypto.subtle.decrypt(g(this, o, "f").algorithm, g(this, o, "f").requestKey, n);
                            if (0 === r.byteLength) return null;
                            const i = (new TextDecoder).decode(r);
                            return JSON.parse(i)
                        }))
                    }
                    encrypt(e) {
                        return d(this, void 0, void 0, (function*() {
                            if (!g(this, o, "f").algorithm || !g(this, o, "f").requestKey) throw new Error(this.prefix("encryptionValues must be set before calling encrypt"));
                            const t = (new TextEncoder).encode(JSON.stringify(e)),
                                n = yield crypto.subtle.encrypt(g(this, o, "f").algorithm, g(this, o, "f").requestKey, t), r = (0, b.ab2str)(n);
                            return (0, b.encodeBase64)(r)
                        }))
                    }
                }, i = new WeakMap, o = new WeakMap, s = new WeakMap, a = new WeakMap, c = new WeakMap, r = new WeakSet, u = function(e = {}) {
                    if (!this.targetWindow || !this.targetOrigin) {
                        const e = this.prefix("targetWindow has not been initialized, please ensure you call setTarget before calling beginListening");
                        throw new Error(e)
                    }
                    this.targetWindow.postMessage(e, this.targetOrigin)
                }, f = function(e, t, n = {}, i) {
                    return d(this, void 0, void 0, (function*() {
                        let o = n,
                            s = i || null;
                        this.useEncryption(e, !0) && (o = yield this.encrypt(n), s && (s = yield this.encrypt(s))), g(this, r, "m", u).call(this, {
                            data: o,
                            errorMessage: s,
                            isError: Boolean(s),
                            messageId: t,
                            type: e
                        })
                    }))
                }, l = function(e, t = {}, n = {}) {
                    return d(this, void 0, void 0, (function*() {
                        const i = (0, w.v4)();
                        return this.logger(`sending request type '${e}' to '${this.targetOrigin}':`, t), yield g(this, r, "m", f).call(this, e, i, t), new Promise(((t, r) => {
                            let o = !1;
                            const s = this.addListener(e, (n => d(this, void 0, void 0, (function*() {
                                if ((0, m.isRequestMessage)(n) && n.messageId === i)
                                    if (o = !0, s(), n.isError) {
                                        let t = n.errorMessage;
                                        this.useEncryption(e, !0) && n.errorMessage && (t = yield this.decrypt(n.errorMessage));
                                        const i = this.prefix(`Responder for request type '${e}' to target '${this.targetOrigin}' failed with message: "${t}"`);
                                        r(new Error(i))
                                    } else {
                                        let i = n.data;
                                        if (this.useEncryption(e, !0)) {
                                            if ("string" != typeof n.data) {
                                                const t = this.prefix(`encryption is required but request received a non string data response for message: ${e}`);
                                                return void r(new Error(t))
                                            }
                                            i = yield this.decrypt(n.data)
                                        }
                                        t(i)
                                    }
                            })))); - 1 !== n.maxResponseTime && setTimeout((() => {
                                if (!o) {
                                    const t = this.prefix(`Time out waiting for target '${this.targetOrigin}' to respond to request, type '${e}'`);
                                    r(new Error(t)), s()
                                }
                            }), n.maxResponseTime || this.maxResponseTime)
                        }))
                    }))
                }, h = function(e, t = null) {
                    const n = [];
                    return Object.entries(e).forEach((([e, i]) => {
                        const o = g(this, a, "f")[e],
                            s = this.addListener(o, ((e, n) => d(this, void 0, void 0, (function*() {
                                if (!(0, m.isRequestMessage)(e) || !i) return;
                                if (t && !t(e.data)) return;
                                let {
                                    data: s
                                } = e;
                                try {
                                    if (this.useEncryption(o, !0)) {
                                        if ("string" != typeof s) throw new Error(this.prefix("encryption is required but responder received a non string data response"));
                                        s = yield this.decrypt(s)
                                    }
                                    const t = yield i(s, n);
                                    this.logger(`responding to request type '${o}' from target '${this.targetOrigin}':`, t), g(this, r, "m", f).call(this, o, e.messageId, t)
                                } catch (t) {
                                    (0, m.isError)(t) ? g(this, r, "m", f).call(this, o, e.messageId, {}, t.message): g(this, r, "m", f).call(this, o, e.messageId, {}, this.prefix("responder threw a non Error object"))
                                }
                            }))));
                        n.push(s)
                    })), () => {
                        this.logger("removing responders:", e), n.forEach((e => e()))
                    }
                }
            },
            3982: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.InternalMessageTypes = t.isRequestMessage = t.isError = void 0, t.isError = e => Boolean(e.message), t.isRequestMessage = e => Boolean(e && "object" == typeof e && !Array.isArray(e) && "string" == typeof e.type && "string" == typeof e.messageId && "boolean" == typeof e.isError && void 0 !== e.errorMessage),
                    function(e) {
                        e.postMessengerConnect = "post-messenger-connect"
                    }(t.InternalMessageTypes || (t.InternalMessageTypes = {}))
            },
            6068: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.decodeBase64 = t.encodeBase64 = t.str2ab = t.ab2str = void 0, t.ab2str = function(e) {
                    const t = Array.from(new Uint16Array(e));
                    return String.fromCharCode.apply(null, t)
                }, t.str2ab = function(e) {
                    const t = new ArrayBuffer(2 * e.length),
                        n = new Uint16Array(t);
                    for (let t = 0, r = e.length; t < r; t += 1) n[t] = e.charCodeAt(t);
                    return t
                }, t.encodeBase64 = function(e) {
                    const t = new Uint16Array(e.length);
                    for (let n = 0; n < t.length; n++) t[n] = e.charCodeAt(n);
                    return btoa(String.fromCharCode(...new Uint8Array(t.buffer)))
                }, t.decodeBase64 = function(e) {
                    const t = atob(e),
                        n = new Uint8Array(t.length);
                    for (let e = 0; e < n.length; e++) n[e] = t.charCodeAt(e);
                    return String.fromCharCode(...new Uint16Array(n.buffer))
                }
            },
            1614: (e, t, n) => {
                var r;
                n.r(t), n.d(t, {
                    NIL: () => S,
                    parse: () => y,
                    stringify: () => f,
                    v1: () => g,
                    v3: () => x,
                    v4: () => R,
                    v5: () => I,
                    validate: () => a,
                    version: () => q
                });
                var i = new Uint8Array(16);

                function o() {
                    if (!r && !(r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return r(i)
                }
                const s = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
                    a = function(e) {
                        return "string" == typeof e && s.test(e)
                    };
                for (var c = [], u = 0; u < 256; ++u) c.push((u + 256).toString(16).substr(1));
                const f = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
                    if (!a(n)) throw TypeError("Stringified UUID is invalid");
                    return n
                };
                var l, h, d = 0,
                    p = 0;
                const g = function(e, t, n) {
                        var r = t && n || 0,
                            i = t || new Array(16),
                            s = (e = e || {}).node || l,
                            a = void 0 !== e.clockseq ? e.clockseq : h;
                        if (null == s || null == a) {
                            var c = e.random || (e.rng || o)();
                            null == s && (s = l = [1 | c[0], c[1], c[2], c[3], c[4], c[5]]), null == a && (a = h = 16383 & (c[6] << 8 | c[7]))
                        }
                        var u = void 0 !== e.msecs ? e.msecs : Date.now(),
                            g = void 0 !== e.nsecs ? e.nsecs : p + 1,
                            y = u - d + (g - p) / 1e4;
                        if (y < 0 && void 0 === e.clockseq && (a = a + 1 & 16383), (y < 0 || u > d) && void 0 === e.nsecs && (g = 0), g >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                        d = u, p = g, h = a;
                        var v = (1e4 * (268435455 & (u += 122192928e5)) + g) % 4294967296;
                        i[r++] = v >>> 24 & 255, i[r++] = v >>> 16 & 255, i[r++] = v >>> 8 & 255, i[r++] = 255 & v;
                        var w = u / 4294967296 * 1e4 & 268435455;
                        i[r++] = w >>> 8 & 255, i[r++] = 255 & w, i[r++] = w >>> 24 & 15 | 16, i[r++] = w >>> 16 & 255, i[r++] = a >>> 8 | 128, i[r++] = 255 & a;
                        for (var m = 0; m < 6; ++m) i[r + m] = s[m];
                        return t || f(i)
                    },
                    y = function(e) {
                        if (!a(e)) throw TypeError("Invalid UUID");
                        var t, n = new Uint8Array(16);
                        return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = 255 & t, n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, n[5] = 255 & t, n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, n[7] = 255 & t, n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, n[9] = 255 & t, n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = t / 4294967296 & 255, n[12] = t >>> 24 & 255, n[13] = t >>> 16 & 255, n[14] = t >>> 8 & 255, n[15] = 255 & t, n
                    };

                function v(e, t, n) {
                    function r(e, r, i, o) {
                        if ("string" == typeof e && (e = function(e) {
                                e = unescape(encodeURIComponent(e));
                                for (var t = [], n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
                                return t
                            }(e)), "string" == typeof r && (r = y(r)), 16 !== r.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                        var s = new Uint8Array(16 + e.length);
                        if (s.set(r), s.set(e, r.length), (s = n(s))[6] = 15 & s[6] | t, s[8] = 63 & s[8] | 128, i) {
                            o = o || 0;
                            for (var a = 0; a < 16; ++a) i[o + a] = s[a];
                            return i
                        }
                        return f(s)
                    }
                    try {
                        r.name = e
                    } catch (e) {}
                    return r.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", r.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", r
                }

                function w(e) {
                    return 14 + (e + 64 >>> 9 << 4) + 1
                }

                function m(e, t) {
                    var n = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                }

                function b(e, t, n, r, i, o) {
                    return m((s = m(m(t, e), m(r, o))) << (a = i) | s >>> 32 - a, n);
                    var s, a
                }

                function E(e, t, n, r, i, o, s) {
                    return b(t & n | ~t & r, e, t, i, o, s)
                }

                function A(e, t, n, r, i, o, s) {
                    return b(t & r | n & ~r, e, t, i, o, s)
                }

                function M(e, t, n, r, i, o, s) {
                    return b(t ^ n ^ r, e, t, i, o, s)
                }

                function T(e, t, n, r, i, o, s) {
                    return b(n ^ (t | ~r), e, t, i, o, s)
                }
                const x = v("v3", 48, (function(e) {
                        if ("string" == typeof e) {
                            var t = unescape(encodeURIComponent(e));
                            e = new Uint8Array(t.length);
                            for (var n = 0; n < t.length; ++n) e[n] = t.charCodeAt(n)
                        }
                        return function(e) {
                            for (var t = [], n = 32 * e.length, r = "0123456789abcdef", i = 0; i < n; i += 8) {
                                var o = e[i >> 5] >>> i % 32 & 255,
                                    s = parseInt(r.charAt(o >>> 4 & 15) + r.charAt(15 & o), 16);
                                t.push(s)
                            }
                            return t
                        }(function(e, t) {
                            e[t >> 5] |= 128 << t % 32, e[w(t) - 1] = t;
                            for (var n = 1732584193, r = -271733879, i = -1732584194, o = 271733878, s = 0; s < e.length; s += 16) {
                                var a = n,
                                    c = r,
                                    u = i,
                                    f = o;
                                n = E(n, r, i, o, e[s], 7, -680876936), o = E(o, n, r, i, e[s + 1], 12, -389564586), i = E(i, o, n, r, e[s + 2], 17, 606105819), r = E(r, i, o, n, e[s + 3], 22, -1044525330), n = E(n, r, i, o, e[s + 4], 7, -176418897), o = E(o, n, r, i, e[s + 5], 12, 1200080426), i = E(i, o, n, r, e[s + 6], 17, -1473231341), r = E(r, i, o, n, e[s + 7], 22, -45705983), n = E(n, r, i, o, e[s + 8], 7, 1770035416), o = E(o, n, r, i, e[s + 9], 12, -1958414417), i = E(i, o, n, r, e[s + 10], 17, -42063), r = E(r, i, o, n, e[s + 11], 22, -1990404162), n = E(n, r, i, o, e[s + 12], 7, 1804603682), o = E(o, n, r, i, e[s + 13], 12, -40341101), i = E(i, o, n, r, e[s + 14], 17, -1502002290), n = A(n, r = E(r, i, o, n, e[s + 15], 22, 1236535329), i, o, e[s + 1], 5, -165796510), o = A(o, n, r, i, e[s + 6], 9, -1069501632), i = A(i, o, n, r, e[s + 11], 14, 643717713), r = A(r, i, o, n, e[s], 20, -373897302), n = A(n, r, i, o, e[s + 5], 5, -701558691), o = A(o, n, r, i, e[s + 10], 9, 38016083), i = A(i, o, n, r, e[s + 15], 14, -660478335), r = A(r, i, o, n, e[s + 4], 20, -405537848), n = A(n, r, i, o, e[s + 9], 5, 568446438), o = A(o, n, r, i, e[s + 14], 9, -1019803690), i = A(i, o, n, r, e[s + 3], 14, -187363961), r = A(r, i, o, n, e[s + 8], 20, 1163531501), n = A(n, r, i, o, e[s + 13], 5, -1444681467), o = A(o, n, r, i, e[s + 2], 9, -51403784), i = A(i, o, n, r, e[s + 7], 14, 1735328473), n = M(n, r = A(r, i, o, n, e[s + 12], 20, -1926607734), i, o, e[s + 5], 4, -378558), o = M(o, n, r, i, e[s + 8], 11, -2022574463), i = M(i, o, n, r, e[s + 11], 16, 1839030562), r = M(r, i, o, n, e[s + 14], 23, -35309556), n = M(n, r, i, o, e[s + 1], 4, -1530992060), o = M(o, n, r, i, e[s + 4], 11, 1272893353), i = M(i, o, n, r, e[s + 7], 16, -155497632), r = M(r, i, o, n, e[s + 10], 23, -1094730640), n = M(n, r, i, o, e[s + 13], 4, 681279174), o = M(o, n, r, i, e[s], 11, -358537222), i = M(i, o, n, r, e[s + 3], 16, -722521979), r = M(r, i, o, n, e[s + 6], 23, 76029189), n = M(n, r, i, o, e[s + 9], 4, -640364487), o = M(o, n, r, i, e[s + 12], 11, -421815835), i = M(i, o, n, r, e[s + 15], 16, 530742520), n = T(n, r = M(r, i, o, n, e[s + 2], 23, -995338651), i, o, e[s], 6, -198630844), o = T(o, n, r, i, e[s + 7], 10, 1126891415), i = T(i, o, n, r, e[s + 14], 15, -1416354905), r = T(r, i, o, n, e[s + 5], 21, -57434055), n = T(n, r, i, o, e[s + 12], 6, 1700485571), o = T(o, n, r, i, e[s + 3], 10, -1894986606), i = T(i, o, n, r, e[s + 10], 15, -1051523), r = T(r, i, o, n, e[s + 1], 21, -2054922799), n = T(n, r, i, o, e[s + 8], 6, 1873313359), o = T(o, n, r, i, e[s + 15], 10, -30611744), i = T(i, o, n, r, e[s + 6], 15, -1560198380), r = T(r, i, o, n, e[s + 13], 21, 1309151649), n = T(n, r, i, o, e[s + 4], 6, -145523070), o = T(o, n, r, i, e[s + 11], 10, -1120210379), i = T(i, o, n, r, e[s + 2], 15, 718787259), r = T(r, i, o, n, e[s + 9], 21, -343485551), n = m(n, a), r = m(r, c), i = m(i, u), o = m(o, f)
                            }
                            return [n, r, i, o]
                        }(function(e) {
                            if (0 === e.length) return [];
                            for (var t = 8 * e.length, n = new Uint32Array(w(t)), r = 0; r < t; r += 8) n[r >> 5] |= (255 & e[r / 8]) << r % 32;
                            return n
                        }(e), 8 * e.length))
                    })),
                    R = function(e, t, n) {
                        var r = (e = e || {}).random || (e.rng || o)();
                        if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
                            n = n || 0;
                            for (var i = 0; i < 16; ++i) t[n + i] = r[i];
                            return t
                        }
                        return f(r)
                    };

                function C(e, t, n, r) {
                    switch (e) {
                        case 0:
                            return t & n ^ ~t & r;
                        case 1:
                        case 3:
                            return t ^ n ^ r;
                        case 2:
                            return t & n ^ t & r ^ n & r
                    }
                }

                function U(e, t) {
                    return e << t | e >>> 32 - t
                }
                const I = v("v5", 80, (function(e) {
                        var t = [1518500249, 1859775393, 2400959708, 3395469782],
                            n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                        if ("string" == typeof e) {
                            var r = unescape(encodeURIComponent(e));
                            e = [];
                            for (var i = 0; i < r.length; ++i) e.push(r.charCodeAt(i))
                        } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
                        e.push(128);
                        for (var o = e.length / 4 + 2, s = Math.ceil(o / 16), a = new Array(s), c = 0; c < s; ++c) {
                            for (var u = new Uint32Array(16), f = 0; f < 16; ++f) u[f] = e[64 * c + 4 * f] << 24 | e[64 * c + 4 * f + 1] << 16 | e[64 * c + 4 * f + 2] << 8 | e[64 * c + 4 * f + 3];
                            a[c] = u
                        }
                        a[s - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32), a[s - 1][14] = Math.floor(a[s - 1][14]), a[s - 1][15] = 8 * (e.length - 1) & 4294967295;
                        for (var l = 0; l < s; ++l) {
                            for (var h = new Uint32Array(80), d = 0; d < 16; ++d) h[d] = a[l][d];
                            for (var p = 16; p < 80; ++p) h[p] = U(h[p - 3] ^ h[p - 8] ^ h[p - 14] ^ h[p - 16], 1);
                            for (var g = n[0], y = n[1], v = n[2], w = n[3], m = n[4], b = 0; b < 80; ++b) {
                                var E = Math.floor(b / 20),
                                    A = U(g, 5) + C(E, y, v, w) + m + t[E] + h[b] >>> 0;
                                m = w, w = v, v = U(y, 30) >>> 0, y = g, g = A
                            }
                            n[0] = n[0] + g >>> 0, n[1] = n[1] + y >>> 0, n[2] = n[2] + v >>> 0, n[3] = n[3] + w >>> 0, n[4] = n[4] + m >>> 0
                        }
                        return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, 255 & n[0], n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, 255 & n[1], n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, 255 & n[2], n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, 255 & n[3], n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, 255 & n[4]]
                    })),
                    S = "00000000-0000-0000-0000-000000000000",
                    q = function(e) {
                        if (!a(e)) throw TypeError("Invalid UUID");
                        return parseInt(e.substr(14, 1), 16)
                    }
            },
            2081: (e, t, n) => {
                n.r(t), n.d(t, {
                    default: () => i
                });
                const r = e => {
                    const t = new Set;
                    do {
                        for (const n of Reflect.ownKeys(e)) t.add([e, n])
                    } while ((e = Reflect.getPrototypeOf(e)) && e !== Object.prototype);
                    return t
                };

                function i(e, {
                    include: t,
                    exclude: n
                } = {}) {
                    const i = e => {
                        const r = t => "string" == typeof t ? e === t : t.test(e);
                        return t ? t.some(r) : !n || !n.some(r)
                    };
                    for (const [t, n] of r(e.constructor.prototype)) {
                        if ("constructor" === n || !i(n)) continue;
                        const r = Reflect.getOwnPropertyDescriptor(t, n);
                        r && "function" == typeof r.value && (e[n] = e[n].bind(e))
                    }
                    return e
                }
            }
        },
        t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.exports
    }
    n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        var e, t = n(4654);

        function r(e) {
            return `spb-${e}`
        }! function(e) {
            e.SPBInit = "checkout:SPBInit", e.memberUpgradeFacilitatorAccessToken = "SPB:memberUpgradeFacilitatorAccessToken", e.payLaterUpgradeFacilitatorAccessToken = "SPB:payLaterUpgradeFacilitatorAccessToken", e.guestUpgradeFacilitatorAccessToken = "SPB:guestUpgradeFacilitatorAccessToken"
        }(e || (e = {})),
        function(e) {
            const t = {};
            Object.keys(e).forEach((e => {
                t[e] = e
            }))
        }(e);
        var i = function(e, t, n, r) {
            return new(n || (n = Promise))((function(i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            }))
        };
        const {
            currentScript: o
        } = document;
        ! function() {
            i(this, void 0, void 0, (function*() {
                console.log("init honeySPBResponders");
                const n = window.exports.paymentSession(),
                    s = n.getAvailableFundingSources()[0];
                if (!o) return void console.error("honeySPBResponders currentScript is null");
                if (!o.dataset.iframeurl) return void console.error("honeySPBResponders data-iframeurl was not set on script element by honeySPBContent");
                const a = new t.PostMessenger({
                    clientName: r(s),
                    enableLogging: !0,
                    types: e,
                    useEncryption: !1
                });
                let c = "memberUpgradeFacilitatorAccessToken";
                s === window.paypal.FUNDING.PAYLATER ? c = "payLaterUpgradeFacilitatorAccessToken" : s === window.paypal.FUNDING.CARD && (c = "guestUpgradeFacilitatorAccessToken"), a.bindResponders({
                    [c]: function(e) {
                        return i(this, void 0, void 0, (function*() {
                            return yield n.upgradeFacilitatorAccessToken(e)
                        }))
                    }
                });
                const u = new URL(o.dataset.iframeurl);
                yield a.connect({
                    targetOrigin: u.origin,
                    targetWindow: window.parent
                })
            }))
        }()
    })()
})();
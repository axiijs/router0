import { ManualCleanup as q, atom as V, RxSet as I } from "data0";
function C() {
  return C = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var a = arguments[e];
      for (var n in a) ({}).hasOwnProperty.call(a, n) && (r[n] = a[n]);
    }
    return r;
  }, C.apply(null, arguments);
}
var b;
(function(r) {
  r.Pop = "POP", r.Push = "PUSH", r.Replace = "REPLACE";
})(b || (b = {}));
var T = process.env.NODE_ENV !== "production" ? function(r) {
  return Object.freeze(r);
} : function(r) {
  return r;
};
function R(r, e) {
  if (!r) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
var B = "beforeunload", K = "hashchange", W = "popstate";
function F(r) {
  r === void 0 && (r = {});
  var e = r, a = e.window, n = a === void 0 ? document.defaultView : a, i = n.history;
  function o() {
    var c = n.location, t = c.pathname, s = c.search, d = c.hash, f = i.state || {};
    return [f.idx, T({
      pathname: t,
      search: s,
      hash: d,
      state: f.usr || null,
      key: f.key || "default"
    })];
  }
  var l = null;
  function E() {
    if (l)
      y.call(l), l = null;
    else {
      var c = b.Pop, t = o(), s = t[0], d = t[1];
      if (y.length)
        if (s != null) {
          var f = p - s;
          f && (l = {
            action: c,
            location: d,
            retry: function() {
              m(f * -1);
            }
          }, m(f));
        } else
          process.env.NODE_ENV !== "production" && R(
            !1,
            // TODO: Write up a doc that explains our blocking strategy in
            // detail and link to it here so people can understand better what
            // is going on and how to avoid it.
            "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation."
          );
      else
        _(c);
    }
  }
  n.addEventListener(W, E);
  var w = b.Pop, N = o(), p = N[0], v = N[1], x = M(), y = M();
  p == null && (p = 0, i.replaceState(C({}, i.state, {
    idx: p
  }), ""));
  function L(c) {
    return typeof c == "string" ? c : D(c);
  }
  function S(c, t) {
    return t === void 0 && (t = null), T(C({
      pathname: v.pathname,
      hash: "",
      search: ""
    }, typeof c == "string" ? j(c) : c, {
      state: t,
      key: U()
    }));
  }
  function $(c, t) {
    return [{
      usr: c.state,
      key: c.key,
      idx: t
    }, L(c)];
  }
  function O(c, t, s) {
    return !y.length || (y.call({
      action: c,
      location: t,
      retry: s
    }), !1);
  }
  function _(c) {
    w = c;
    var t = o();
    p = t[0], v = t[1], x.call({
      action: w,
      location: v
    });
  }
  function h(c, t) {
    var s = b.Push, d = S(c, t);
    function f() {
      h(c, t);
    }
    if (O(s, d, f)) {
      var P = $(d, p + 1), k = P[0], H = P[1];
      try {
        i.pushState(k, "", H);
      } catch {
        n.location.assign(H);
      }
      _(s);
    }
  }
  function u(c, t) {
    var s = b.Replace, d = S(c, t);
    function f() {
      u(c, t);
    }
    if (O(s, d, f)) {
      var P = $(d, p), k = P[0], H = P[1];
      i.replaceState(k, "", H), _(s);
    }
  }
  function m(c) {
    i.go(c);
  }
  var g = {
    get action() {
      return w;
    },
    get location() {
      return v;
    },
    createHref: L,
    push: h,
    replace: u,
    go: m,
    back: function() {
      m(-1);
    },
    forward: function() {
      m(1);
    },
    listen: function(t) {
      return x.push(t);
    },
    block: function(t) {
      var s = y.push(t);
      return y.length === 1 && n.addEventListener(B, J), function() {
        s(), y.length || n.removeEventListener(B, J);
      };
    }
  };
  return g;
}
function X(r) {
  r === void 0 && (r = {});
  var e = r, a = e.window, n = a === void 0 ? document.defaultView : a, i = n.history;
  function o() {
    var t = j(n.location.hash.substr(1)), s = t.pathname, d = s === void 0 ? "/" : s, f = t.search, P = f === void 0 ? "" : f, k = t.hash, H = k === void 0 ? "" : k, A = i.state || {};
    return [A.idx, T({
      pathname: d,
      search: P,
      hash: H,
      state: A.usr || null,
      key: A.key || "default"
    })];
  }
  var l = null;
  function E() {
    if (l)
      y.call(l), l = null;
    else {
      var t = b.Pop, s = o(), d = s[0], f = s[1];
      if (y.length)
        if (d != null) {
          var P = p - d;
          P && (l = {
            action: t,
            location: f,
            retry: function() {
              g(P * -1);
            }
          }, g(P));
        } else
          process.env.NODE_ENV !== "production" && R(
            !1,
            // TODO: Write up a doc that explains our blocking strategy in
            // detail and link to it here so people can understand better
            // what is going on and how to avoid it.
            "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation."
          );
      else
        h(t);
    }
  }
  n.addEventListener(W, E), n.addEventListener(K, function() {
    var t = o(), s = t[1];
    D(s) !== D(v) && E();
  });
  var w = b.Pop, N = o(), p = N[0], v = N[1], x = M(), y = M();
  p == null && (p = 0, i.replaceState(C({}, i.state, {
    idx: p
  }), ""));
  function L() {
    var t = document.querySelector("base"), s = "";
    if (t && t.getAttribute("href")) {
      var d = n.location.href, f = d.indexOf("#");
      s = f === -1 ? d : d.slice(0, f);
    }
    return s;
  }
  function S(t) {
    return L() + "#" + (typeof t == "string" ? t : D(t));
  }
  function $(t, s) {
    return s === void 0 && (s = null), T(C({
      pathname: v.pathname,
      hash: "",
      search: ""
    }, typeof t == "string" ? j(t) : t, {
      state: s,
      key: U()
    }));
  }
  function O(t, s) {
    return [{
      usr: t.state,
      key: t.key,
      idx: s
    }, S(t)];
  }
  function _(t, s, d) {
    return !y.length || (y.call({
      action: t,
      location: s,
      retry: d
    }), !1);
  }
  function h(t) {
    w = t;
    var s = o();
    p = s[0], v = s[1], x.call({
      action: w,
      location: v
    });
  }
  function u(t, s) {
    var d = b.Push, f = $(t, s);
    function P() {
      u(t, s);
    }
    if (process.env.NODE_ENV !== "production" && R(f.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.push(" + JSON.stringify(t) + ")"), _(d, f, P)) {
      var k = O(f, p + 1), H = k[0], A = k[1];
      try {
        i.pushState(H, "", A);
      } catch {
        n.location.assign(A);
      }
      h(d);
    }
  }
  function m(t, s) {
    var d = b.Replace, f = $(t, s);
    function P() {
      m(t, s);
    }
    if (process.env.NODE_ENV !== "production" && R(f.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(t) + ")"), _(d, f, P)) {
      var k = O(f, p), H = k[0], A = k[1];
      i.replaceState(H, "", A), h(d);
    }
  }
  function g(t) {
    i.go(t);
  }
  var c = {
    get action() {
      return w;
    },
    get location() {
      return v;
    },
    createHref: S,
    push: u,
    replace: m,
    go: g,
    back: function() {
      g(-1);
    },
    forward: function() {
      g(1);
    },
    listen: function(s) {
      return x.push(s);
    },
    block: function(s) {
      var d = y.push(s);
      return y.length === 1 && n.addEventListener(B, J), function() {
        d(), y.length || n.removeEventListener(B, J);
      };
    }
  };
  return c;
}
function Z(r) {
  r === void 0 && (r = {});
  var e = r, a = e.initialEntries, n = a === void 0 ? ["/"] : a, i = e.initialIndex, o = n.map(function(h) {
    var u = T(C({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: U()
    }, typeof h == "string" ? j(h) : h));
    return process.env.NODE_ENV !== "production" && R(u.pathname.charAt(0) === "/", "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(h) + ")"), u;
  }), l = z(i ?? o.length - 1, 0, o.length - 1), E = b.Pop, w = o[l], N = M(), p = M();
  function v(h) {
    return typeof h == "string" ? h : D(h);
  }
  function x(h, u) {
    return u === void 0 && (u = null), T(C({
      pathname: w.pathname,
      search: "",
      hash: ""
    }, typeof h == "string" ? j(h) : h, {
      state: u,
      key: U()
    }));
  }
  function y(h, u, m) {
    return !p.length || (p.call({
      action: h,
      location: u,
      retry: m
    }), !1);
  }
  function L(h, u) {
    E = h, w = u, N.call({
      action: E,
      location: w
    });
  }
  function S(h, u) {
    var m = b.Push, g = x(h, u);
    function c() {
      S(h, u);
    }
    process.env.NODE_ENV !== "production" && R(w.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.push(" + JSON.stringify(h) + ")"), y(m, g, c) && (l += 1, o.splice(l, o.length, g), L(m, g));
  }
  function $(h, u) {
    var m = b.Replace, g = x(h, u);
    function c() {
      $(h, u);
    }
    process.env.NODE_ENV !== "production" && R(w.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(h) + ")"), y(m, g, c) && (o[l] = g, L(m, g));
  }
  function O(h) {
    var u = z(l + h, 0, o.length - 1), m = b.Pop, g = o[u];
    function c() {
      O(h);
    }
    y(m, g, c) && (l = u, L(m, g));
  }
  var _ = {
    get index() {
      return l;
    },
    get action() {
      return E;
    },
    get location() {
      return w;
    },
    createHref: v,
    push: S,
    replace: $,
    go: O,
    back: function() {
      O(-1);
    },
    forward: function() {
      O(1);
    },
    listen: function(u) {
      return N.push(u);
    },
    block: function(u) {
      return p.push(u);
    }
  };
  return _;
}
function z(r, e, a) {
  return Math.min(Math.max(r, e), a);
}
function J(r) {
  r.preventDefault(), r.returnValue = "";
}
function M() {
  var r = [];
  return {
    get length() {
      return r.length;
    },
    push: function(a) {
      return r.push(a), function() {
        r = r.filter(function(n) {
          return n !== a;
        });
      };
    },
    call: function(a) {
      r.forEach(function(n) {
        return n && n(a);
      });
    }
  };
}
function U() {
  return Math.random().toString(36).substr(2, 8);
}
function D(r) {
  var e = r.pathname, a = e === void 0 ? "/" : e, n = r.search, i = n === void 0 ? "" : n, o = r.hash, l = o === void 0 ? "" : o;
  return i && i !== "?" && (a += i.charAt(0) === "?" ? i : "?" + i), l && l !== "#" && (a += l.charAt(0) === "#" ? l : "#" + l), a;
}
function j(r) {
  var e = {};
  if (r) {
    var a = r.indexOf("#");
    a >= 0 && (e.hash = r.substr(a), r = r.substr(0, a));
    var n = r.indexOf("?");
    n >= 0 && (e.search = r.substr(n), r = r.substr(0, n)), r && (e.pathname = r);
  }
  return e;
}
class Y extends q {
  constructor(e, a = F(), n = "", i) {
    super(), this.data = e, this.history = a, this.parentPath = n, this.parent = i, this.pathname = V(""), this.handler = V(void 0), this.params = V({}), this.searchParams = V({}), this.path = V(""), this.children = new I([]), this.map = {
      children: /* @__PURE__ */ new Map(),
      handler: void 0,
      redirect: void 0,
      strictHandler: void 0
    }, this.onHistoryChange = () => {
      this.pathname(this.history.location.pathname);
      const o = this.recognize(this.history.location.pathname);
      if (this.handler(o.handler), this.path(o.path), this.params(o.params), this.searchParams(o.searchParams), o.redirect && o.isExactMatch) {
        const [l, E] = Array.isArray(o.redirect) ? o.redirect : [o.redirect, !1];
        this.push(l, E);
      }
    }, e.forEach((o) => this.addOne(o)), this.unlisten = this.history.listen(this.onHistoryChange), this.onHistoryChange(), this.parent && this.parent.children.add(this);
  }
  destroy() {
    var e;
    this.unlisten(), (e = this.parent) == null || e.children.delete(this);
  }
  addOne(e) {
    const a = e.path.split("/").filter(Boolean);
    let n = this.map;
    a.forEach((i) => {
      if (i.startsWith(":")) {
        if (n.dynamicChildren)
          throw new Error("only one dynamic param is allowed");
        n.dynamicChildren = {
          paramName: i.slice(1),
          node: {
            children: /* @__PURE__ */ new Map(),
            handler: void 0,
            strictHandler: void 0
          }
        }, n = n.dynamicChildren.node;
      } else {
        const o = n.children;
        n = o.get(i), n || o.set(
          i,
          n = {
            children: /* @__PURE__ */ new Map(),
            handler: void 0,
            strictHandler: void 0
          }
        );
      }
    }), e.strict ? n.strictHandler = e.handler : n.handler = e.handler, n.redirect = e.redirect;
  }
  add(e) {
    e.forEach((a) => this.addOne(a)), this.onHistoryChange();
  }
  recognize(e) {
    const n = (e.startsWith(this.parentPath) ? e.slice(this.parentPath.length) : e).split("/").filter(Boolean);
    let i = this.map;
    const o = [], l = [], E = {}, w = {};
    let N = !0;
    for (let v of n) {
      const x = i.children.get(v);
      if (x)
        o.push(v), l.push(v), i = x;
      else if (i.dynamicChildren)
        E[i.dynamicChildren.paramName] = v, o.push(i.dynamicChildren.paramName), l.push(v), i = i.dynamicChildren.node;
      else {
        N = !1;
        break;
      }
    }
    const p = new URLSearchParams(this.history.location.search);
    for (const [v, x] of p)
      w[v] = x;
    return {
      handler: i.handler || i.strictHandler,
      redirect: i.redirect,
      params: E,
      searchParams: w,
      isExactMatch: N,
      path: `/${o.join("/")}`,
      matchPath: `/${l.join("/")}`
    };
  }
  redirect(e, a = !1) {
    a ? window.location.href = e : this.history.push(e);
  }
  push(e, a = !1) {
    if (e.startsWith("//"))
      return this.redirect(e.slice(1), a);
    a ? window.location.href = `${this.parentPath}${e}` : this.history.push(`${this.parentPath}${e}`);
  }
  updateSearchParams(e) {
    const a = new URL(window.location.href), n = { ...this.searchParams.raw };
    Object.entries(e).forEach(([i, o]) => {
      o === void 0 ? (a.searchParams.delete(i), delete n[i]) : (a.searchParams.set(i, o), n[i] = o);
    }), window.history.pushState({}, "", a), this.searchParams(n);
  }
  derive(e = this.path.raw) {
    const a = this, n = `${a.parentPath}${e}`;
    return class extends Y {
      constructor(o, l = "") {
        super(o, a.history, `${n}${l}`, a), this.data = o, this.subParentPath = l;
      }
    };
  }
}
export {
  Y as Router,
  F as createBrowserHistory,
  X as createHashHistory,
  Z as createMemoryHistory
};
//# sourceMappingURL=index.js.map

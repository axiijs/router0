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
  var e = r, a = e.window, n = a === void 0 ? document.defaultView : a, o = n.history;
  function s() {
    var c = n.location, t = c.pathname, i = c.search, d = c.hash, f = o.state || {};
    return [f.idx, T({
      pathname: t,
      search: i,
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
      var c = b.Pop, t = s(), i = t[0], d = t[1];
      if (y.length)
        if (i != null) {
          var f = p - i;
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
        $(c);
    }
  }
  n.addEventListener(W, E);
  var w = b.Pop, N = s(), p = N[0], v = N[1], x = M(), y = M();
  p == null && (p = 0, o.replaceState(C({}, o.state, {
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
  function _(c, t) {
    return [{
      usr: c.state,
      key: c.key,
      idx: t
    }, L(c)];
  }
  function O(c, t, i) {
    return !y.length || (y.call({
      action: c,
      location: t,
      retry: i
    }), !1);
  }
  function $(c) {
    w = c;
    var t = s();
    p = t[0], v = t[1], x.call({
      action: w,
      location: v
    });
  }
  function h(c, t) {
    var i = b.Push, d = S(c, t);
    function f() {
      h(c, t);
    }
    if (O(i, d, f)) {
      var P = _(d, p + 1), k = P[0], H = P[1];
      try {
        o.pushState(k, "", H);
      } catch {
        n.location.assign(H);
      }
      $(i);
    }
  }
  function u(c, t) {
    var i = b.Replace, d = S(c, t);
    function f() {
      u(c, t);
    }
    if (O(i, d, f)) {
      var P = _(d, p), k = P[0], H = P[1];
      o.replaceState(k, "", H), $(i);
    }
  }
  function m(c) {
    o.go(c);
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
      var i = y.push(t);
      return y.length === 1 && n.addEventListener(B, J), function() {
        i(), y.length || n.removeEventListener(B, J);
      };
    }
  };
  return g;
}
function X(r) {
  r === void 0 && (r = {});
  var e = r, a = e.window, n = a === void 0 ? document.defaultView : a, o = n.history;
  function s() {
    var t = j(n.location.hash.substr(1)), i = t.pathname, d = i === void 0 ? "/" : i, f = t.search, P = f === void 0 ? "" : f, k = t.hash, H = k === void 0 ? "" : k, A = o.state || {};
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
      var t = b.Pop, i = s(), d = i[0], f = i[1];
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
    var t = s(), i = t[1];
    D(i) !== D(v) && E();
  });
  var w = b.Pop, N = s(), p = N[0], v = N[1], x = M(), y = M();
  p == null && (p = 0, o.replaceState(C({}, o.state, {
    idx: p
  }), ""));
  function L() {
    var t = document.querySelector("base"), i = "";
    if (t && t.getAttribute("href")) {
      var d = n.location.href, f = d.indexOf("#");
      i = f === -1 ? d : d.slice(0, f);
    }
    return i;
  }
  function S(t) {
    return L() + "#" + (typeof t == "string" ? t : D(t));
  }
  function _(t, i) {
    return i === void 0 && (i = null), T(C({
      pathname: v.pathname,
      hash: "",
      search: ""
    }, typeof t == "string" ? j(t) : t, {
      state: i,
      key: U()
    }));
  }
  function O(t, i) {
    return [{
      usr: t.state,
      key: t.key,
      idx: i
    }, S(t)];
  }
  function $(t, i, d) {
    return !y.length || (y.call({
      action: t,
      location: i,
      retry: d
    }), !1);
  }
  function h(t) {
    w = t;
    var i = s();
    p = i[0], v = i[1], x.call({
      action: w,
      location: v
    });
  }
  function u(t, i) {
    var d = b.Push, f = _(t, i);
    function P() {
      u(t, i);
    }
    if (process.env.NODE_ENV !== "production" && R(f.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.push(" + JSON.stringify(t) + ")"), $(d, f, P)) {
      var k = O(f, p + 1), H = k[0], A = k[1];
      try {
        o.pushState(H, "", A);
      } catch {
        n.location.assign(A);
      }
      h(d);
    }
  }
  function m(t, i) {
    var d = b.Replace, f = _(t, i);
    function P() {
      m(t, i);
    }
    if (process.env.NODE_ENV !== "production" && R(f.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(t) + ")"), $(d, f, P)) {
      var k = O(f, p), H = k[0], A = k[1];
      o.replaceState(H, "", A), h(d);
    }
  }
  function g(t) {
    o.go(t);
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
    listen: function(i) {
      return x.push(i);
    },
    block: function(i) {
      var d = y.push(i);
      return y.length === 1 && n.addEventListener(B, J), function() {
        d(), y.length || n.removeEventListener(B, J);
      };
    }
  };
  return c;
}
function Z(r) {
  r === void 0 && (r = {});
  var e = r, a = e.initialEntries, n = a === void 0 ? ["/"] : a, o = e.initialIndex, s = n.map(function(h) {
    var u = T(C({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: U()
    }, typeof h == "string" ? j(h) : h));
    return process.env.NODE_ENV !== "production" && R(u.pathname.charAt(0) === "/", "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(h) + ")"), u;
  }), l = z(o ?? s.length - 1, 0, s.length - 1), E = b.Pop, w = s[l], N = M(), p = M();
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
    process.env.NODE_ENV !== "production" && R(w.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.push(" + JSON.stringify(h) + ")"), y(m, g, c) && (l += 1, s.splice(l, s.length, g), L(m, g));
  }
  function _(h, u) {
    var m = b.Replace, g = x(h, u);
    function c() {
      _(h, u);
    }
    process.env.NODE_ENV !== "production" && R(w.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(h) + ")"), y(m, g, c) && (s[l] = g, L(m, g));
  }
  function O(h) {
    var u = z(l + h, 0, s.length - 1), m = b.Pop, g = s[u];
    function c() {
      O(h);
    }
    y(m, g, c) && (l = u, L(m, g));
  }
  var $ = {
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
    replace: _,
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
  return $;
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
  var e = r.pathname, a = e === void 0 ? "/" : e, n = r.search, o = n === void 0 ? "" : n, s = r.hash, l = s === void 0 ? "" : s;
  return o && o !== "?" && (a += o.charAt(0) === "?" ? o : "?" + o), l && l !== "#" && (a += l.charAt(0) === "#" ? l : "#" + l), a;
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
  constructor(e, a = F(), n = "", o) {
    super(), this.data = e, this.history = a, this.parentPath = n, this.parent = o, this.pathname = V(""), this.handler = V(void 0), this.params = V({}), this.searchParams = V({}), this.path = V(""), this.children = new I([]), this.map = {
      children: /* @__PURE__ */ new Map(),
      handler: void 0,
      redirect: void 0,
      strictHandler: void 0
    }, this.onHistoryChange = () => {
      this.pathname(this.history.location.pathname);
      const s = this.recognize(this.history.location.pathname);
      if (this.handler(s.handler), this.path(s.path), this.params(s.params), this.searchParams(s.searchParams), s.redirect && s.isExactMatch) {
        const [l, E] = Array.isArray(s.redirect) ? s.redirect : [s.redirect, !1];
        this.push(l, E);
      }
    }, e.forEach((s) => this.addOne(s)), this.unlisten = this.history.listen(this.onHistoryChange), this.onHistoryChange(), this.parent && this.parent.children.add(this);
  }
  destroy() {
    var e;
    this.unlisten(), (e = this.parent) == null || e.children.delete(this);
  }
  addOne(e) {
    const a = e.path.split("/").filter(Boolean);
    let n = this.map;
    a.forEach((o) => {
      if (o.startsWith(":")) {
        if (n.dynamicChildren)
          throw new Error("only one dynamic param is allowed");
        n.dynamicChildren = {
          paramName: o.slice(1),
          node: {
            children: /* @__PURE__ */ new Map(),
            handler: void 0,
            strictHandler: void 0
          }
        }, n = n.dynamicChildren.node;
      } else {
        const s = n.children;
        n = s.get(o), n || s.set(
          o,
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
    let o = this.map;
    const s = [], l = [], E = {}, w = {};
    let N = !0;
    for (let v of n) {
      const x = o.children.get(v);
      if (x)
        s.push(v), l.push(v), o = x;
      else if (o.dynamicChildren)
        E[o.dynamicChildren.paramName] = v, s.push(o.dynamicChildren.paramName), l.push(v), o = o.dynamicChildren.node;
      else {
        N = !1;
        break;
      }
    }
    const p = new URLSearchParams(this.history.location.search);
    for (const [v, x] of p)
      w[v] = x;
    return {
      handler: o.handler || o.strictHandler,
      redirect: o.redirect,
      params: E,
      searchParams: w,
      isExactMatch: N,
      path: `/${s.join("/")}`,
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
    Object.entries(e).forEach(([o, s]) => {
      s === void 0 ? (a.searchParams.delete(o), delete n[o]) : (a.searchParams.set(o, s), n[o] = s);
    }), window.history.pushState({}, "", a), this.searchParams(n);
  }
  derive(e = this.path(), a = []) {
    return new Y(a, this.history, `${this.parentPath}${e}`, this);
  }
}
export {
  Y as Router,
  F as createBrowserHistory,
  X as createHashHistory,
  Z as createMemoryHistory
};
//# sourceMappingURL=index.js.map

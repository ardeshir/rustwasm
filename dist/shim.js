// build/worker/shim.mjs
import _wasm from "./9f7dfe9d2d4a29a1bb7ca804623d29ed201b72c0-index_bg.wasm";
var wasm;
var heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
function getObject(idx) {
  return heap[idx];
}
var heap_next = heap.length;
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var WASM_VECTOR_LEN = 0;
var cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
var lTextEncoder = typeof TextEncoder === "undefined" ? (0, module.require)("util").TextEncoder : TextEncoder;
var cachedTextEncoder = new lTextEncoder("utf-8");
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
var lTextDecoder = typeof TextDecoder === "undefined" ? (0, module.require)("util").TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = {
    a: arg0,
    b: arg1,
    cnt: 1,
    dtor
  };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  return real;
}
function __wbg_adapter_22(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h914ce87860cdd9e2(arg0, arg1, addHeapObject(arg2));
}
function fetch(req, env, ctx) {
  var ret = wasm.fetch(addHeapObject(req), addHeapObject(env), addHeapObject(ctx));
  return takeObject(ret);
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function __wbg_adapter_86(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h0630483987ff6d0a(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
var PolishConfig = Object.freeze({
  Off: 0,
  "0": "Off",
  Lossy: 1,
  "1": "Lossy",
  Lossless: 2,
  "2": "Lossless"
});
var RequestRedirect = Object.freeze({
  Error: 0,
  "0": "Error",
  Follow: 1,
  "1": "Follow",
  Manual: 2,
  "2": "Manual"
});
var MinifyConfig = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_minifyconfig_free(ptr);
  }
  get js() {
    var ret = wasm.__wbg_get_minifyconfig_js(this.ptr);
    return ret !== 0;
  }
  set js(arg0) {
    wasm.__wbg_set_minifyconfig_js(this.ptr, arg0);
  }
  get html() {
    var ret = wasm.__wbg_get_minifyconfig_html(this.ptr);
    return ret !== 0;
  }
  set html(arg0) {
    wasm.__wbg_set_minifyconfig_html(this.ptr, arg0);
  }
  get css() {
    var ret = wasm.__wbg_get_minifyconfig_css(this.ptr);
    return ret !== 0;
  }
  set css(arg0) {
    wasm.__wbg_set_minifyconfig_css(this.ptr, arg0);
  }
};
function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}
function __wbindgen_string_get(arg0, arg1) {
  const obj = getObject(arg1);
  var ret = typeof obj === "string" ? obj : void 0;
  var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_new_59cb74e423758ede() {
  var ret = new Error();
  return addHeapObject(ret);
}
function __wbg_stack_558ba5917b466edd(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(arg0, arg1);
  }
}
function __wbindgen_is_undefined(arg0) {
  var ret = getObject(arg0) === void 0;
  return ret;
}
function __wbindgen_cb_drop(arg0) {
  const obj = takeObject(arg0).original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  var ret = false;
  return ret;
}
function __wbindgen_string_new(arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
}
function __wbindgen_number_new(arg0) {
  var ret = arg0;
  return addHeapObject(ret);
}
function __wbindgen_object_clone_ref(arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
}
function __wbg_body_32bf396f33f6f315(arg0) {
  var ret = getObject(arg0).body;
  return isLikeNone(ret) ? 0 : addHeapObject(ret);
}
function __wbg_newwithoptu8arrayandinit_f6fa61fc3a0621f7() {
  return handleError(function(arg0, arg1) {
    var ret = new Response(takeObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_newwithoptstrandinit_7f5c3942adf7be33() {
  return handleError(function(arg0, arg1, arg2) {
    var ret = new Response(arg0 === 0 ? void 0 : getStringFromWasm0(arg0, arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_newwithoptstreamandinit_79d897054ab89929() {
  return handleError(function(arg0, arg1) {
    var ret = new Response(takeObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_latitude_487b645a452aa03c(arg0, arg1) {
  var ret = getObject(arg1).latitude;
  var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_longitude_02b5ebd3058e5fc6(arg0, arg1) {
  var ret = getObject(arg1).longitude;
  var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_region_24b2f8646c3851e6(arg0, arg1) {
  var ret = getObject(arg1).region;
  var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_method_9145864941f6052c(arg0, arg1) {
  var ret = getObject(arg1).method;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_url_cd4d648542769703(arg0, arg1) {
  var ret = getObject(arg1).url;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbg_headers_0e6e7dc7c9435be0(arg0) {
  var ret = getObject(arg0).headers;
  return addHeapObject(ret);
}
function __wbg_formData_4b67d55a0ac11d00() {
  return handleError(function(arg0) {
    var ret = getObject(arg0).formData();
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_cf_525e384aca3c98b3(arg0) {
  var ret = getObject(arg0).cf;
  return addHeapObject(ret);
}
function __wbg_new_3e530029a159ca02() {
  return handleError(function() {
    var ret = new Headers();
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_set_5c8272b869ae9cb2() {
  return handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
  }, arguments);
}
function __wbg_log_522bdc7197e67ae0(arg0, arg1) {
  console.log(getStringFromWasm0(arg0, arg1));
}
function __wbg_instanceof_File_ad24b18c59799a39(arg0) {
  var ret = getObject(arg0) instanceof File;
  return ret;
}
function __wbg_get_f3819122d64c04b7(arg0, arg1, arg2) {
  var ret = getObject(arg0).get(getStringFromWasm0(arg1, arg2));
  return addHeapObject(ret);
}
function __wbg_get_4d0f21c2f823742e() {
  return handleError(function(arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_new_0b83d3df67ecb33e() {
  var ret = new Object();
  return addHeapObject(ret);
}
function __wbg_instanceof_Error_561efcb1265706d8(arg0) {
  var ret = getObject(arg0) instanceof Error;
  return ret;
}
function __wbg_toString_0ef1ea57b966aed4(arg0) {
  var ret = getObject(arg0).toString();
  return addHeapObject(ret);
}
function __wbg_call_346669c262382ad7() {
  return handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_name_9a3ff1e21a0e3304(arg0) {
  var ret = getObject(arg0).name;
  return addHeapObject(ret);
}
function __wbg_new0_fd3a3a290b25cdac() {
  var ret = new Date();
  return addHeapObject(ret);
}
function __wbg_toString_646e437de608a0a1(arg0) {
  var ret = getObject(arg0).toString();
  return addHeapObject(ret);
}
function __wbg_constructor_9fe544cc0957fdd0(arg0) {
  var ret = getObject(arg0).constructor;
  return addHeapObject(ret);
}
function __wbg_new_b1d61b5687f5e73a(arg01, arg11) {
  try {
    var state0 = {
      a: arg01,
      b: arg11
    };
    var cb0 = (arg0, arg1) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_86(a, state0.b, arg0, arg1);
      } finally {
        state0.a = a;
      }
    };
    var ret = new Promise(cb0);
    return addHeapObject(ret);
  } finally {
    state0.a = state0.b = 0;
  }
}
function __wbg_resolve_d23068002f584f22(arg0) {
  var ret = Promise.resolve(getObject(arg0));
  return addHeapObject(ret);
}
function __wbg_then_2fcac196782070cc(arg0, arg1) {
  var ret = getObject(arg0).then(getObject(arg1));
  return addHeapObject(ret);
}
function __wbg_then_8c2d62e8ae5978f7(arg0, arg1, arg2) {
  var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
}
function __wbg_buffer_397eaa4d72ee94dd(arg0) {
  var ret = getObject(arg0).buffer;
  return addHeapObject(ret);
}
function __wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff(arg0, arg1, arg2) {
  var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
}
function __wbg_set_969ad0a60e51d320(arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}
function __wbg_length_1eb8fc608a0d4cdb(arg0) {
  var ret = getObject(arg0).length;
  return ret;
}
function __wbg_newwithlength_929232475839a482(arg0) {
  var ret = new Uint8Array(arg0 >>> 0);
  return addHeapObject(ret);
}
function __wbg_set_82a4e8a85e31ac42() {
  return handleError(function(arg0, arg1, arg2) {
    var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
  }, arguments);
}
function __wbindgen_debug_string(arg0, arg1) {
  var ret = debugString(getObject(arg1));
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}
function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
function __wbindgen_memory() {
  var ret = wasm.memory;
  return addHeapObject(ret);
}
function __wbindgen_closure_wrapper527(arg0, arg1, arg2) {
  var ret = makeMutClosure(arg0, arg1, 99, __wbg_adapter_22);
  return addHeapObject(ret);
}
var _wasm_memory = new WebAssembly.Memory({
  initial: 512
});
var importsObject = {
  env: {
    memory: _wasm_memory
  },
  "./index_bg.js": {
    fetch,
    PolishConfig,
    RequestRedirect,
    __wbindgen_object_drop_ref,
    __wbindgen_string_get,
    __wbg_new_59cb74e423758ede,
    __wbg_stack_558ba5917b466edd,
    __wbg_error_4bb6c2a97407129a,
    __wbindgen_is_undefined,
    __wbindgen_cb_drop,
    __wbindgen_string_new,
    __wbindgen_number_new,
    __wbindgen_object_clone_ref,
    __wbg_body_32bf396f33f6f315,
    __wbg_newwithoptu8arrayandinit_f6fa61fc3a0621f7,
    __wbg_newwithoptstrandinit_7f5c3942adf7be33,
    __wbg_newwithoptstreamandinit_79d897054ab89929,
    __wbg_latitude_487b645a452aa03c,
    __wbg_longitude_02b5ebd3058e5fc6,
    __wbg_region_24b2f8646c3851e6,
    __wbg_method_9145864941f6052c,
    __wbg_url_cd4d648542769703,
    __wbg_headers_0e6e7dc7c9435be0,
    __wbg_formData_4b67d55a0ac11d00,
    __wbg_cf_525e384aca3c98b3,
    __wbg_new_3e530029a159ca02,
    __wbg_set_5c8272b869ae9cb2,
    __wbg_log_522bdc7197e67ae0,
    __wbg_instanceof_File_ad24b18c59799a39,
    __wbg_get_f3819122d64c04b7,
    __wbg_get_4d0f21c2f823742e,
    __wbg_new_0b83d3df67ecb33e,
    __wbg_instanceof_Error_561efcb1265706d8,
    __wbg_toString_0ef1ea57b966aed4,
    __wbg_call_346669c262382ad7,
    __wbg_name_9a3ff1e21a0e3304,
    __wbg_new0_fd3a3a290b25cdac,
    __wbg_toString_646e437de608a0a1,
    __wbg_constructor_9fe544cc0957fdd0,
    __wbg_new_b1d61b5687f5e73a,
    __wbg_resolve_d23068002f584f22,
    __wbg_then_2fcac196782070cc,
    __wbg_then_8c2d62e8ae5978f7,
    __wbg_buffer_397eaa4d72ee94dd,
    __wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff,
    __wbg_set_969ad0a60e51d320,
    __wbg_length_1eb8fc608a0d4cdb,
    __wbg_newwithlength_929232475839a482,
    __wbg_set_82a4e8a85e31ac42,
    __wbindgen_debug_string,
    __wbindgen_throw,
    __wbindgen_memory,
    __wbindgen_closure_wrapper527
  }
};
wasm = new WebAssembly.Instance(_wasm, importsObject).exports;
wasm.__wbindgen_start?.();
var mod = {
  fetch,
  PolishConfig,
  RequestRedirect,
  MinifyConfig,
  __wbindgen_object_drop_ref,
  __wbindgen_string_get,
  __wbg_new_59cb74e423758ede,
  __wbg_stack_558ba5917b466edd,
  __wbg_error_4bb6c2a97407129a,
  __wbindgen_is_undefined,
  __wbindgen_cb_drop,
  __wbindgen_string_new,
  __wbindgen_number_new,
  __wbindgen_object_clone_ref,
  __wbg_body_32bf396f33f6f315,
  __wbg_newwithoptu8arrayandinit_f6fa61fc3a0621f7,
  __wbg_newwithoptstrandinit_7f5c3942adf7be33,
  __wbg_newwithoptstreamandinit_79d897054ab89929,
  __wbg_latitude_487b645a452aa03c,
  __wbg_longitude_02b5ebd3058e5fc6,
  __wbg_region_24b2f8646c3851e6,
  __wbg_method_9145864941f6052c,
  __wbg_url_cd4d648542769703,
  __wbg_headers_0e6e7dc7c9435be0,
  __wbg_formData_4b67d55a0ac11d00,
  __wbg_cf_525e384aca3c98b3,
  __wbg_new_3e530029a159ca02,
  __wbg_set_5c8272b869ae9cb2,
  __wbg_log_522bdc7197e67ae0,
  __wbg_instanceof_File_ad24b18c59799a39,
  __wbg_get_f3819122d64c04b7,
  __wbg_get_4d0f21c2f823742e,
  __wbg_new_0b83d3df67ecb33e,
  __wbg_instanceof_Error_561efcb1265706d8,
  __wbg_toString_0ef1ea57b966aed4,
  __wbg_call_346669c262382ad7,
  __wbg_name_9a3ff1e21a0e3304,
  __wbg_new0_fd3a3a290b25cdac,
  __wbg_toString_646e437de608a0a1,
  __wbg_constructor_9fe544cc0957fdd0,
  __wbg_new_b1d61b5687f5e73a,
  __wbg_resolve_d23068002f584f22,
  __wbg_then_2fcac196782070cc,
  __wbg_then_8c2d62e8ae5978f7,
  __wbg_buffer_397eaa4d72ee94dd,
  __wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff,
  __wbg_set_969ad0a60e51d320,
  __wbg_length_1eb8fc608a0d4cdb,
  __wbg_newwithlength_929232475839a482,
  __wbg_set_82a4e8a85e31ac42,
  __wbindgen_debug_string,
  __wbindgen_throw,
  __wbindgen_memory,
  __wbindgen_closure_wrapper527
};
var swcIsSneaky = {
  ...mod
};
var __default = {
  fetch: swcIsSneaky.fetch,
  scheduled: swcIsSneaky.scheduled
};
export {
  MinifyConfig,
  PolishConfig,
  RequestRedirect,
  __wbg_body_32bf396f33f6f315,
  __wbg_buffer_397eaa4d72ee94dd,
  __wbg_call_346669c262382ad7,
  __wbg_cf_525e384aca3c98b3,
  __wbg_constructor_9fe544cc0957fdd0,
  __wbg_error_4bb6c2a97407129a,
  __wbg_formData_4b67d55a0ac11d00,
  __wbg_get_4d0f21c2f823742e,
  __wbg_get_f3819122d64c04b7,
  __wbg_headers_0e6e7dc7c9435be0,
  __wbg_instanceof_Error_561efcb1265706d8,
  __wbg_instanceof_File_ad24b18c59799a39,
  __wbg_latitude_487b645a452aa03c,
  __wbg_length_1eb8fc608a0d4cdb,
  __wbg_log_522bdc7197e67ae0,
  __wbg_longitude_02b5ebd3058e5fc6,
  __wbg_method_9145864941f6052c,
  __wbg_name_9a3ff1e21a0e3304,
  __wbg_new0_fd3a3a290b25cdac,
  __wbg_new_0b83d3df67ecb33e,
  __wbg_new_3e530029a159ca02,
  __wbg_new_59cb74e423758ede,
  __wbg_new_b1d61b5687f5e73a,
  __wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff,
  __wbg_newwithlength_929232475839a482,
  __wbg_newwithoptstrandinit_7f5c3942adf7be33,
  __wbg_newwithoptstreamandinit_79d897054ab89929,
  __wbg_newwithoptu8arrayandinit_f6fa61fc3a0621f7,
  __wbg_region_24b2f8646c3851e6,
  __wbg_resolve_d23068002f584f22,
  __wbg_set_5c8272b869ae9cb2,
  __wbg_set_82a4e8a85e31ac42,
  __wbg_set_969ad0a60e51d320,
  __wbg_stack_558ba5917b466edd,
  __wbg_then_2fcac196782070cc,
  __wbg_then_8c2d62e8ae5978f7,
  __wbg_toString_0ef1ea57b966aed4,
  __wbg_toString_646e437de608a0a1,
  __wbg_url_cd4d648542769703,
  __wbindgen_cb_drop,
  __wbindgen_closure_wrapper527,
  __wbindgen_debug_string,
  __wbindgen_is_undefined,
  __wbindgen_memory,
  __wbindgen_number_new,
  __wbindgen_object_clone_ref,
  __wbindgen_object_drop_ref,
  __wbindgen_string_get,
  __wbindgen_string_new,
  __wbindgen_throw,
  __default as default,
  fetch
};
//# sourceMappingURL=shim.js.map

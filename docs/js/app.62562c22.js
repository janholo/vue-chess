(function(t){function e(e){for(var r,s,o=e[0],l=e[1],c=e[2],u=0,d=[];u<o.length;u++)s=o[u],n[s]&&d.push(n[s][0]),n[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);f&&f(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],r=!0,o=1;o<i.length;o++){var l=i[o];0!==n[l]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=i[0]))}return t}var r={},n={app:0},a=[];function s(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=r,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var f=l;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("cd49")},2120:function(t,e,i){"use strict";var r=i("4232"),n=i.n(r);n.a},"2c86":function(t,e,i){},"36f4":function(t,e,i){},4232:function(t,e,i){},"5c0b":function(t,e,i){"use strict";var r=i("5e27"),n=i.n(r);n.a},"5e27":function(t,e,i){},9757:function(t,e,i){"use strict";var r=i("2c86"),n=i.n(r);n.a},ae2f:function(t,e,i){"use strict";var r=i("36f4"),n=i.n(r);n.a},cd49:function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var r,n,a,s=i("2b0e"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("ChessBoard",{staticClass:"chess-board",attrs:{gameState:t.gameState}})],1)},l=[],c=i("d225"),f=i("308d"),u=i("6bb5"),d=i("4e2b"),h=i("9ab4"),p=i("60a3"),k=i("b0b4"),v=i("cd3f"),y=function(){function t(e){Object(c["a"])(this,t),this.fields=[],this.takenPieces=[],this.timerWhite=0,this.timerBlack=0,this.selectedPiece=-1,this.possibleMoves=[],this.turn=n.White,this.isThinking=!1,this.timerWhite=0,this.timerBlack=0,this.takenPieces=[],this.selectedPiece=-1,this.possibleMoves=[],this.fields=e,this.turn=n.White,this.isThinking=!1}return Object(k["a"])(t,[{key:"copy",value:function(){return v(this)}}]),t}();(function(t){t[t["King"]=0]="King",t[t["Queen"]=1]="Queen",t[t["Rook"]=2]="Rook",t[t["Bishop"]=3]="Bishop",t[t["Knight"]=4]="Knight",t[t["Pawn"]=5]="Pawn"})(r||(r={})),function(t){t[t["Black"]=0]="Black",t[t["White"]=1]="White"}(n||(n={})),function(t){t[t["Pending"]=0]="Pending",t[t["WhiteWin"]=1]="WhiteWin",t[t["BlackWin"]=2]="BlackWin",t[t["Draw"]=3]="Draw"}(a||(a={}));var C=i("768b");i("6762"),i("2fdb"),i("6b54"),i("ac4d"),i("8a81"),i("ac6a"),i("cd3f");function m(t,e){var i=e.fields.some(function(i,n){if(void 0==i.piece||i.piece.color!=t)return!1;var a=g(n,e);return a.some(function(i){var n=e.fields[i].piece;return void 0!=n&&n.color!=t&&n.kind===r.King})});return i}function b(t,e){for(var i=[],r=0;r<64;r++){var n=e.fields[r].piece;void 0!=n&&n.color===t&&i.push(r)}return i}function g(t,e){var i=e.fields[t].piece,n=(i.color,i.kind),a=[],s=[[1,0],[0,1],[-1,0],[0,-1]],o=[[1,1],[1,-1],[-1,1],[-1,-1]],l=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];return n===r.Pawn&&(a=a.concat(S(t,e))),n!==r.Bishop&&n!==r.Queen||(a=a.concat(M(t,e,o,8))),n!==r.Rook&&n!==r.Queen||(a=a.concat(M(t,e,s,8))),n===r.King&&(a=a.concat(M(t,e,s.concat(o),1))),n===r.Knight&&(a=a.concat(M(t,e,l,1))),a}function L(t,e){var i=g(t,e),r=e.fields[t].piece,a=r.color,s=[],o=!0,l=!1,c=void 0;try{for(var f,u=i[Symbol.iterator]();!(o=(f=u.next()).done);o=!0){var d=f.value,h=e.copy();B(t,d,h),m(a===n.White?n.Black:n.White,h)||s.push(d)}}catch(p){l=!0,c=p}finally{try{o||null==u.return||u.return()}finally{if(l)throw c}}return s}function M(t,e,i,r){var n=[],a=e.fields[t].piece,s=a.color,o=!0,l=!1,c=void 0;try{for(var f,u=i[Symbol.iterator]();!(o=(f=u.next()).done);o=!0){var d=f.value,h=d[0],p=d[1],k=1;while(k<=r){var v=j(t,h*k,p*k);if(void 0==v)break;var y=e.fields[v].piece;if(void 0!=y){if(w(v,s,e)){n.push(v);break}break}n.push(v),k++}}}catch(C){l=!0,c=C}finally{try{o||null==u.return||u.return()}finally{if(l)throw c}}return n}function S(t,e){var i=[],r=e.fields[t].piece,a=r.color,s=a===n.White?t-8:t+8;if(void 0==e.fields[s].piece&&(i.push(s),a===n.White&&t>=48||a===n.Black&&t<16)){var o=a===n.White?t-16:t+16;void 0==e.fields[o].piece&&i.push(o)}var l=a===n.White?-1:1,c=j(t,-1,l);w(c,a,e)&&i.push(c);var f=j(t,1,l);return w(f,a,e)&&i.push(f),i}function w(t,e,i){if(void 0!=t){var r=i.fields[t].piece;if(void 0!=r&&r.color!=e)return!0}return!1}function j(t,e,i){var r=t%8+e,n=Math.floor(t/8)+i;if(!(r<0||r>=8||n<0||n>=8))return 8*n+r}function B(t,e,i){var a=i.fields[t].piece;i.fields[t].piece=void 0;var s=a.color;i.fields[e].piece&&i.takenPieces.push(i.fields[e].piece),(0==Math.floor(e/8)&&s===n.White||7==Math.floor(e/8)&&s===n.Black)&&a.kind===r.Pawn&&(a.kind=r.Queen),i.fields[e].piece=a}function W(t,e){var i=["A","B","C","D","E","F","G","H"];return i[t]+(e+1).toString()}function I(t){return W(t%8,7-Math.floor(t/8))}function P(t,e){return e%2!=0?t%2===0?n.White:n.Black:t%2===0?n.Black:n.White}function O(t){var e=x(t),i=_(e);return console.log("Selected move: "+I(i[0])+" -> "+I(i[1])),[i[0],i[1]]}function _(t){return t[Math.floor(Math.random()*t.length)]}function x(t){var e=b(n.Black,t),i=e.flatMap(function(e){var i=L(e,t);return i.map(function(t){return[e,t]})});console.log("BlackMoves");var r=!0,a=!1,s=void 0;try{for(var o,l=i[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var c=o.value;console.log(I(c[0])+" -> "+I(c[1]))}}catch(f){a=!0,s=f}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return i}i("cd3f");var z=function(){function t(){Object(c["a"])(this,t),this.timerId=0}return Object(k["a"])(t,[{key:"getInitialBoard",value:function(){for(var t=[],e=7;e>=0;e--)for(var i=0;i<8;i++){var a=void 0;7!==e&&0!==e||(0!==i&&7!==i||(a={color:n.Black,kind:r.Rook}),1!==i&&6!==i||(a={color:n.Black,kind:r.Knight}),2!==i&&5!==i||(a={color:n.Black,kind:r.Bishop}),3===i&&(a={color:n.Black,kind:r.Queen}),4===i&&(a={color:n.Black,kind:r.King})),6!==e&&1!==e||(a={color:n.Black,kind:r.Pawn}),1!==e&&0!==e||void 0==a||(a.color=n.White),t.push({background:P(i,e),name:W(i,e),piece:a})}return t}},{key:"clickField",value:function(t,e){return e.turn==n.Black?a.Pending:this.clickFieldRaw(t,e)}},{key:"clickFieldRaw",value:function(t,e){if(e.selectedPiece===t)return e.selectedPiece=-1,e.possibleMoves=[],a.Pending;var i=e.fields[t].piece;return void 0!=i&&i.color===e.turn?(e.selectedPiece=t,e.possibleMoves=L(t,e),a.Pending):e.possibleMoves.includes(t)?this.doMove(t,e):a.Pending}},{key:"doMove",value:function(t,e){B(e.selectedPiece,t,e),e.selectedPiece=-1,e.possibleMoves=[],clearInterval(this.timerId);var i=m(e.turn,e),r=e.fields.some(function(t,i){if(void 0==t.piece||t.piece.color===e.turn)return!1;var r=L(i,e);return r.length>0});return r?(e.turn===n.White?(this.timerId=setInterval(function(){return e.timerBlack++},1e3),e.turn=n.Black):(this.timerId=setInterval(function(){return e.timerWhite++},1e3),e.turn=n.White),a.Pending):(e.turn=e.turn===n.White?n.Black:n.White,i?e.turn===n.White?a.BlackWin:a.WhiteWin:a.Draw)}},{key:"startBackgroundAi",value:function(t){var e=O(t),i=Object(C["a"])(e,2),r=i[0],n=i[1],s=this.clickFieldRaw(r,t);return s!=a.Pending&&alert("WTF"),this.clickFieldRaw(n,t)}}]),t}(),A=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"figure",class:{white:t.IsWhiteBackground(),"is-clickable":t.clickable}},[i("svg",{staticClass:"display-block",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("text",{staticClass:"unselectable",class:{"text-color-white":t.IsWhiteBackground(),"text-color-black":!t.IsWhiteBackground()},attrs:{x:"1",y:"10","font-size":"12"}},[t._v(t._s(t.field.name))])]),i("ChessPiece",{staticClass:"fixed-pos",attrs:{piece:t.field.piece,selected:t.selected}}),t.possible&&void 0===t.field.piece?i("svg",{staticClass:"fixed-pos",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("circle",{staticClass:"move-possible",attrs:{cx:"22.5",cy:"22.5",r:"7"}})]):t._e(),t.possible&&void 0!=t.field.piece?i("svg",{staticClass:"fixed-pos",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("rect",{staticClass:"move-possible-rect",staticStyle:{fill:"transparent","stroke-width":"11px"},attrs:{x:"1.8",y:"-30",width:"60",height:"60"}})]):t._e()],1)},R=[],T=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"fill-stroke-black",class:{selected:t.selected,selectable:!t.selected},attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[t.IsWhite()&&t.IsKing()?i("g",{staticStyle:{fill:"none","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 22.5,11.63 L 22.5,6"}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 20,8 L 25,8"}}),i("path",{staticStyle:{fill:"#ffffff","stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"}}),i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,30 C 17,27 27,27 32.5,30"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,37 C 17,34 27,34 32.5,37"}})]):t._e(),t.IsWhite()&&t.IsQueen()?i("g",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(-1,-1)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(15.5,-5.5)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(32,-1)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(7,-4.5)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(24,-4)"}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,30 C 15,29 30,29 33.5,30"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5"}})]):t._e(),t.IsWhite()&&t.IsBishop()?i("g",{staticStyle:{opacity:"1",fill:"none","fill-rule":"evenodd","fill-opacity":"1","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{fill:"#ffffff","stroke-linecap":"butt"}},[i("path",{attrs:{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}}),i("path",{attrs:{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}}),i("path",{attrs:{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}})]),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"}})]):t._e(),t.IsWhite()&&t.IsKnight()?i("g",{staticStyle:{opacity:"1",fill:"none","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"}}),i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"}}),i("path",{attrs:{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"}}),i("path",{attrs:{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"}})]):t._e(),t.IsWhite()&&t.IsRook()?i("g",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"}}),i("path",{attrs:{d:"M 34,14 L 31,17 L 14,17 L 11,14"}}),i("path",{staticStyle:{"stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 31,17 L 31,29.5 L 14,29.5 L 14,17"}}),i("path",{attrs:{d:"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 11,14 L 34,14"}})]):t._e(),t.IsWhite()&&t.IsPawn()?i("g",[i("path",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"nonzero","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"},attrs:{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "}})]):t._e(),t.IsBlack()&&t.IsKing()?i("g",{staticStyle:{"fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 22.5,11.63 L 22.5,6"}}),i("path",{staticStyle:{"fill-opacity":"1","stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"}}),i("path",{attrs:{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 20,8 L 25,8"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"}})]):t._e(),t.IsBlack()&&t.IsQueen()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{stroke:"none"}},[i("circle",{attrs:{cx:"6",cy:"12",r:"2.75"}}),i("circle",{attrs:{cx:"14",cy:"9",r:"2.75"}}),i("circle",{attrs:{cx:"22.5",cy:"8",r:"2.75"}}),i("circle",{attrs:{cx:"31",cy:"9",r:"2.75"}}),i("circle",{attrs:{cx:"39",cy:"12",r:"2.75"}})]),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"}}),i("path",{staticStyle:{fill:"none","stroke-linecap":"butt"},attrs:{d:"M 11,38.5 A 35,35 1 0 0 34,38.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11,29 A 35,35 1 0 1 34,29"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 12.5,31.5 L 32.5,31.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"}})]):t._e(),t.IsBlack()&&t.IsBishop()?i("g",{staticStyle:{opacity:"1","fill-rule":"evenodd","fill-opacity":"1","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{"stroke-linecap":"butt"}},[i("path",{attrs:{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}}),i("path",{attrs:{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}}),i("path",{attrs:{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}})]),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-linejoin":"miter"},attrs:{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"}})]):t._e(),t.IsBlack()&&t.IsKnight()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{attrs:{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"}}),i("path",{attrs:{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"#ffffff"},attrs:{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"#ffffff"},attrs:{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"none"},attrs:{d:"M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "}})]):t._e(),t.IsBlack()&&t.IsRook()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 12,35.5 L 33,35.5 L 33,35.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 13,31.5 L 32,31.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 14,29.5 L 31,29.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 14,16.5 L 31,16.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 11,14 L 34,14"}})]):t._e(),t.IsBlack()&&t.IsPawn()?i("g",[i("path",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"nonzero","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"},attrs:{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "}})]):t._e()])},K=[],D=function(t){function e(){return Object(c["a"])(this,e),Object(f["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),Object(k["a"])(e,[{key:"IsBlack",value:function(){return void 0!=this.piece&&this.piece.color==n.Black}},{key:"IsWhite",value:function(){return void 0!=this.piece&&this.piece.color==n.White}},{key:"IsKing",value:function(){return void 0!=this.piece&&this.piece.kind==r.King}},{key:"IsQueen",value:function(){return void 0!=this.piece&&this.piece.kind==r.Queen}},{key:"IsBishop",value:function(){return void 0!=this.piece&&this.piece.kind==r.Bishop}},{key:"IsRook",value:function(){return void 0!=this.piece&&this.piece.kind==r.Rook}},{key:"IsPawn",value:function(){return void 0!=this.piece&&this.piece.kind==r.Pawn}},{key:"IsKnight",value:function(){return void 0!=this.piece&&this.piece.kind==r.Knight}}]),e}(p["c"]);h["a"]([Object(p["b"])()],D.prototype,"piece",void 0),h["a"]([Object(p["b"])()],D.prototype,"selected",void 0),D=h["a"]([p["a"]],D);var F=D,Q=F,H=(i("9757"),i("2877")),E=Object(H["a"])(Q,T,K,!1,null,"382d0a19",null),$=E.exports,G=function(t){function e(){return Object(c["a"])(this,e),Object(f["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),Object(k["a"])(e,[{key:"IsWhiteBackground",value:function(){return this.field.background==n.White}},{key:"IsWhitePiece",value:function(){return void 0!=this.field.piece&&this.field.piece.color===n.White}}]),e}(p["c"]);h["a"]([Object(p["b"])()],G.prototype,"field",void 0),h["a"]([Object(p["b"])()],G.prototype,"selected",void 0),h["a"]([Object(p["b"])()],G.prototype,"possible",void 0),h["a"]([Object(p["b"])()],G.prototype,"clickable",void 0),G=h["a"]([Object(p["a"])({components:{ChessPiece:$}})],G);var J=G,N=J,q=(i("ae2f"),Object(H["a"])(N,A,R,!1,null,"5004158d",null)),U=q.exports,V=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"border"},[i("div",{staticClass:"info-grid"},[i("button",{staticClass:"move-button shadow",attrs:{disabled:!t.isBlackTurn()||t.isThinking()},on:{click:function(e){return t.onClickMove()}}},[t._v(t._s(t.isThinking()?"Thinking":"Move"))]),t._l(t.whiteTakenPieces(),function(t,e){return i("ChessPiece",{key:e,style:{gridColumn:t.column,gridRow:1},attrs:{piece:t.piece}})})],2)]),i("div",{staticClass:"border"},[i("div",{staticClass:"board shadow"},t._l(t.gameState.fields,function(e,r){return i("ChessField",{key:r,attrs:{field:e,possible:t.gameState.possibleMoves.includes(r),selected:r===t.gameState.selectedPiece,clickable:t.isClickable(r)},nativeOn:{click:function(e){return t.onClick(r)}}})}),1)]),i("div",{staticClass:"border"},[i("div",{staticClass:"info-grid"},[i("div",{staticClass:"info-text shadow"},[t._v(t._s(t.whiteTime()))]),t._l(t.blackTakenPieces(),function(t,e){return i("ChessPiece",{key:e,style:{gridColumn:t.column,gridRow:1},attrs:{piece:t.piece}})})],2)]),t.IsDraw()||t.IsWhiteWin()||t.IsBlackWin()?i("div",{staticClass:"modal"},[i("div",{staticClass:"modal-content"},[i("span",{staticClass:"close",on:{click:function(e){return t.CloseModal()}}},[t._v("×")]),t.IsDraw()?i("p",[t._v("Game ended in a DRAW.")]):t._e(),t.IsWhiteWin()?i("p",[t._v("White WIN")]):t._e(),t.IsBlackWin()?i("p",[t._v("Black WIN")]):t._e(),i("p",[t._v("Reload the site to start a new game")])])]):t._e()])},X=[],Y=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(f["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.chessHelper=new z,t.gameResult=a.Pending,t}return Object(d["a"])(e,t),Object(k["a"])(e,[{key:"IsDraw",value:function(){return this.gameResult==a.Draw}},{key:"isBlackTurn",value:function(){return this.gameState.turn===n.Black}},{key:"isThinking",value:function(){return this.gameState.isThinking}},{key:"IsWhiteWin",value:function(){return this.gameResult==a.WhiteWin}},{key:"IsBlackWin",value:function(){return this.gameResult==a.BlackWin}},{key:"CloseModal",value:function(){this.gameResult=a.Pending}},{key:"whiteTakenPieces",value:function(){var t=this.gameState.takenPieces.filter(function(t){return t.color==n.White});return t.map(function(t,e){return{column:18-e,piece:t}})}},{key:"blackTakenPieces",value:function(){var t=this.gameState.takenPieces.filter(function(t){return t.color==n.Black});return t.map(function(t,e){return{column:18-e,piece:t}})}},{key:"whiteTime",value:function(){return this.timeDisplay(this.gameState.timerWhite)}},{key:"blackTime",value:function(){return this.timeDisplay(this.gameState.timerBlack)}},{key:"timeDisplay",value:function(t){var e=t%60,i=Math.round(t/60);return("0"+i).slice(-2)+":"+("0"+e).slice(-2)}},{key:"onClick",value:function(t){this.gameResult=this.chessHelper.clickField(t,this.gameState)}},{key:"onClickMove",value:function(){this.gameState.isThinking=!0,this.gameResult=this.chessHelper.startBackgroundAi(this.gameState),this.gameState.isThinking=!1}},{key:"isClickable",value:function(t){return t===this.gameState.selectedPiece||(!(-1==this.gameState.selectedPiece||!this.gameState.possibleMoves.includes(t))||!!this.gameState.fields[t].piece&&this.gameState.fields[t].piece.color==this.gameState.turn)}}]),e}(p["c"]);h["a"]([Object(p["b"])()],Y.prototype,"gameState",void 0),Y=h["a"]([Object(p["a"])({components:{ChessField:U,ChessPiece:$}})],Y);var Z=Y,tt=Z,et=(i("2120"),Object(H["a"])(tt,V,X,!1,null,"c5b28a4a",null)),it=et.exports,rt=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(f["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.chessHelper=new z,t.gameState=new y(t.chessHelper.getInitialBoard()),t}return Object(d["a"])(e,t),e}(p["c"]);rt=h["a"]([Object(p["a"])({components:{ChessBoard:it,ChessField:U,ChessPiece:$}})],rt);var nt=rt,at=nt,st=(i("5c0b"),Object(H["a"])(at,o,l,!1,null,null,null)),ot=st.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(ot)}}).$mount("#app")}});
//# sourceMappingURL=app.62562c22.js.map
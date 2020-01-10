(function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],u=0,h=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&h.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);f&&f(e);while(h.length)h.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,o=1;o<i.length;o++){var l=i[o];0!==r[l]&&(n=!1)}n&&(a.splice(e--,1),t=s(s.s=i[0]))}return t}var n={},r={app:0},a=[];function s(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var f=l;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("cd49")},"5c0b":function(t,e,i){"use strict";var n=i("9c0c"),r=i.n(n);r.a},8912:function(t,e,i){},"899a":function(t,e,i){"use strict";var n=i("c3ef"),r=i.n(n);r.a},9344:function(t,e,i){"use strict";var n=i("d9ef"),r=i.n(n);r.a},"9c0c":function(t,e,i){},c3ef:function(t,e,i){},cd49:function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("ChessBoard",{staticClass:"chess-board",attrs:{gameState:t.gameState}})],1)},a=[],s=i("d4ec"),o=i("99de"),l=i("7e84"),c=i("262e"),f=i("9ab4"),u=i("60a3"),h=(i("b0c0"),i("bee2"));i("a4d3"),i("e01a"),i("d28b"),i("99af"),i("45fc"),i("2af1"),i("d3b7"),i("25f0"),i("3ca3"),i("ddb0"),i("cd3f");function d(t){return(t+1)%2}function p(t,e){return t>0&&e===Q.Black||t<0&&e===Q.White}function k(t,e){return t>0&&e===Q.White||t<0&&e===Q.Black}function y(t,e){return t>=0&&e===Q.Black||t<=0&&e===Q.White}function v(t,e){return t>=0&&e===Q.White||t<=0&&e===Q.Black}function C(t,e){return t===Q.White?-e:e}function b(t){if(t>0)return Q.Black;if(t<0)return Q.White;throw new RangeError("Piece has no color")}function m(t){return Math.abs(t)}function g(t,e){var i=e.fields.some((function(i,n){if(v(i,t))return!1;var r=j(n,e),a=C(d(t),F.King);return r.some((function(t){var i=e.fields[t];return i===a}))}));return i}function L(t,e){for(var i=[],n=0;n<64;n++){var r=e.fields[n];p(r,t)&&i.push(n)}return i}var w=[[1,0],[0,1],[-1,0],[0,-1]],S=[[1,1],[1,-1],[-1,1],[-1,-1]],M=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];function j(t,e){var i=e.fields[t],n=m(i),r=[];return n===F.Pawn&&(r=r.concat(P(t,e))),n!==F.Bishop&&n!==F.Queen||(r=r.concat(W(t,e,S,8))),n!==F.Rook&&n!==F.Queen||(r=r.concat(W(t,e,w,8))),n===F.King&&(r=r.concat(W(t,e,w.concat(S),1))),n===F.Knight&&(r=r.concat(W(t,e,M,1))),r}function B(t,e){var i=j(t,e),n=e.fields[t],r=b(n),a=[],s=!0,o=!1,l=void 0;try{for(var c,f=i[Symbol.iterator]();!(s=(c=f.next()).done);s=!0){var u=c.value,h=e.copy();_(t,u,h),g(d(r),h)||a.push(u)}}catch(p){o=!0,l=p}finally{try{s||null==f.return||f.return()}finally{if(o)throw l}}return a}function W(t,e,i,n){var r=[],a=e.fields[t],s=b(a),o=!0,l=!1,c=void 0;try{for(var f,u=i[Symbol.iterator]();!(o=(f=u.next()).done);o=!0){var h=f.value,d=h[0],p=h[1],k=1;while(k<=n){var y=I(t,d*k,p*k);if(void 0==y)break;var v=e.fields[y];if(v!==E.Empty){if(O(y,s,e)){r.push(y);break}break}r.push(y),k++}}}catch(C){l=!0,c=C}finally{try{o||null==u.return||u.return()}finally{if(l)throw c}}return r}function P(t,e){var i=[],n=e.fields[t],r=b(n),a=t+8*Math.sign(n);if(e.fields[a]===E.Empty&&(i.push(a),n===E.WhitePawn&&t>=48||n===E.BlackPawn&&t<16)){var s=t+16*Math.sign(n);e.fields[s]===E.Empty&&i.push(s)}var o=n===E.WhitePawn?-1:1,l=I(t,-1,o);O(l,r,e)&&i.push(l);var c=I(t,1,o);return O(c,r,e)&&i.push(c),i}function O(t,e,i){if(void 0!=t){var n=i.fields[t];if(k(n,e))return!0}return!1}function I(t,e,i){var n=t%8+e,r=Math.floor(t/8)+i;if(!(n<0||n>=8||r<0||r>=8))return 8*r+n}function _(t,e,i){var n=i.fields[t];i.fields[t]=E.Empty;var r=i.fields[e];r!==E.Empty&&i.takenPieces.push(r),(0==Math.floor(e/8)&&n===E.WhitePawn||7==Math.floor(e/8)&&n===E.BlackPawn)&&(n/=3),i.fields[e]=n}function x(t,e){var i=["A","B","C","D","E","F","G","H"];return i[t]+(e+1).toString()}function z(t){return x(t%8,7-Math.floor(t/8))}function A(t,e){return e%2!=0?t%2===0?Q.White:Q.Black:t%2===0?Q.Black:Q.White}function R(){for(var t=[],e=7;e>=0;e--)for(var i=0;i<8;i++)t.push({background:A(i,e),name:x(i,e)});return t}function K(t,e){var i=g(e,t),n=t.fields.some((function(i,n){if(y(i,e))return!1;var r=B(n,t);return r.length>0}));return n?D.Pending:(e=d(e),i?e===Q.White?D.BlackWin:D.WhiteWin:D.Draw)}function T(){for(var t=[],e=7;e>=0;e--)for(var i=0;i<8;i++){var n=E.Empty;7!==e&&0!==e||(0!==i&&7!==i||(n=E.BlackRook),1!==i&&6!==i||(n=E.BlackKnight),2!==i&&5!==i||(n=E.BlackBishop),3===i&&(n=E.BlackQueen),4===i&&(n=E.BlackKing)),6!==e&&1!==e||(n=E.BlackPawn),1!==e&&0!==e||void 0==n||(n=-n),t.push(n)}return t}var E,F,Q,D,H=i("cd3f"),$=function(){function t(e){Object(s["a"])(this,t),this.fields=[],this.takenPieces=[],this.fields=e,this.takenPieces=[]}return Object(h["a"])(t,[{key:"copy",value:function(){return H(this)}}]),t}(),N=function(){function t(){Object(s["a"])(this,t),this.fieldInfos=[],this.boardState=new $([]),this.timerWhite=0,this.timerBlack=0,this.selectedPiece=-1,this.possibleMoves=[],this.turn=Q.White,this.isThinking=!1,this.timerWhite=0,this.timerBlack=0,this.selectedPiece=-1,this.possibleMoves=[],this.fieldInfos=R(),this.turn=Q.White,this.isThinking=!1,this.boardState=new $(T())}return Object(h["a"])(t,[{key:"copy",value:function(){return H(this)}}]),t}();(function(t){t[t["WhiteKing"]=-1]="WhiteKing",t[t["WhiteQueen"]=-2]="WhiteQueen",t[t["WhiteRook"]=-3]="WhiteRook",t[t["WhiteBishop"]=-4]="WhiteBishop",t[t["WhiteKnight"]=-5]="WhiteKnight",t[t["WhitePawn"]=-6]="WhitePawn",t[t["Empty"]=0]="Empty",t[t["BlackKing"]=1]="BlackKing",t[t["BlackQueen"]=2]="BlackQueen",t[t["BlackRook"]=3]="BlackRook",t[t["BlackBishop"]=4]="BlackBishop",t[t["BlackKnight"]=5]="BlackKnight",t[t["BlackPawn"]=6]="BlackPawn"})(E||(E={})),function(t){t[t["None"]=0]="None",t[t["King"]=1]="King",t[t["Queen"]=2]="Queen",t[t["Rook"]=3]="Rook",t[t["Bishop"]=4]="Bishop",t[t["Knight"]=5]="Knight",t[t["Pawn"]=6]="Pawn"}(F||(F={})),function(t){t[t["Black"]=0]="Black",t[t["White"]=1]="White"}(Q||(Q={})),function(t){t[t["Pending"]=0]="Pending",t[t["WhiteWin"]=1]="WhiteWin",t[t["BlackWin"]=2]="BlackWin",t[t["Draw"]=3]="Draw"}(D||(D={}));var G=function t(e,i){Object(s["a"])(this,t),this.source=0,this.target=0,this.source=e,this.target=i},J=(i("caad"),i("2532"),i("5db7"),i("d81d"),i("4e82"),i("73d9"),0);function U(t,e){var i=t.map((function(t){return[t,Z(e.fields[t.target])-Z(e.fields[t.source])]})),n=i.sort((function(t,e){return e[1]-t[1]}));return n.map((function(t){return t[0]}))}function q(t,e,i,n,r){var a=Y(e,t),s=U(a,e),o=[s[0],t===Q.Black?-9999:9999],l=!0,c=!1,f=void 0;try{for(var u,h=a[Symbol.iterator]();!(l=(u=h.next()).done);l=!0){var p=u.value,k=e.copy(),y=X(p.source,p.target,k,t);if(J+=1,y===D.WhiteWin){if(t===Q.Black)continue;return[p,-9999]}if(y!==D.BlackWin){var v=void 0;if(y===D.Draw)v=0;else if(i>1){var C=q(d(t),k,i-1,n,r);v=C[1]}else v=tt(k);if(t===Q.Black?(v>o[1]&&(o=[p,v]),n=Math.max(n,o[1])):(v<o[1]&&(o=[p,v]),r=Math.min(r,o[1])),n>=r)break}else if(t===Q.Black)return[p,9999]}}catch(b){c=!0,f=b}finally{try{l||null==h.return||h.return()}finally{if(c)throw f}}return o}function V(t){var e=performance.now();J=0;var i=q(Q.Black,t.boardState,4,-9999,9999),n=performance.now();return console.log("Selected move: "+z(i[0].source)+" -> "+z(i[0].target)),console.log("Time: "+(n-e)+" ms"),console.log("Move Count: "+J),i}function X(t,e,i,n){_(t,e,i);var r=K(i,n);return r!==D.Pending?r:D.Pending}function Y(t,e){var i=L(e,t),n=i.flatMap((function(e){var i=B(e,t);return i.map((function(t){return new G(e,t)}))}));return n}function Z(t){if(t===E.Empty)return 0;var e=m(t);if(e===F.Pawn)return 10;if(e===F.Bishop||e===F.Knight)return 30;if(e===F.Rook)return 50;if(e===F.Queen)return 90;if(e===F.King)return 0;throw new RangeError("Unknown Kind: "+e)}function tt(t){var e=0,i=!0,n=!1,r=void 0;try{for(var a,s=t.fields[Symbol.iterator]();!(i=(a=s.next()).done);i=!0){var o=a.value,l=Z(o);e+=Math.sign(o)*l}}catch(c){n=!0,r=c}finally{try{i||null==s.return||s.return()}finally{if(n)throw r}}return e}i("cd3f");var et=function(){function t(){Object(s["a"])(this,t),this.timerId=0}return Object(h["a"])(t,[{key:"clickField",value:function(t,e){return e.turn==Q.Black?D.Pending:this.clickFieldRaw(t,e)}},{key:"clickFieldRaw",value:function(t,e){if(e.selectedPiece===t)return e.selectedPiece=-1,e.possibleMoves=[],D.Pending;var i=e.boardState.fields[t];return p(i,e.turn)?(e.selectedPiece=t,e.possibleMoves=B(t,e.boardState),D.Pending):e.possibleMoves.includes(t)?this.doMove(t,e):D.Pending}},{key:"doMove",value:function(t,e){_(e.selectedPiece,t,e.boardState),e.selectedPiece=-1,e.possibleMoves=[],clearInterval(this.timerId);var i=K(e.boardState,e.turn);return i!==D.Pending?(e.turn=d(e.turn),i):(e.turn===Q.White?(this.timerId=setInterval((function(){return e.timerBlack++}),1e3),e.turn=Q.Black):(this.timerId=setInterval((function(){return e.timerWhite++}),1e3),e.turn=Q.White),D.Pending)}},{key:"startBackgroundAi",value:function(t){var e=V(t),i=e[0],n=this.clickFieldRaw(i.source,t);return n!=D.Pending&&alert("WTF"),this.clickFieldRaw(i.target,t)}}]),t}(),it=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"figure",class:{white:t.IsWhiteBackground(),"is-clickable":t.clickable}},[i("svg",{staticClass:"display-block",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("text",{staticClass:"unselectable",class:{"text-color-white":t.IsWhiteBackground(),"text-color-black":!t.IsWhiteBackground()},attrs:{x:"1",y:"10","font-size":"12"}},[t._v(t._s(t.fieldInfo.name))])]),i("ChessPiece",{staticClass:"fixed-pos",attrs:{piece:t.field,selected:t.selected}}),t.possible&&0==t.field?i("svg",{staticClass:"fixed-pos",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("circle",{staticClass:"move-possible",attrs:{cx:"22.5",cy:"22.5",r:"7"}})]):t._e(),t.possible&&0!=t.field?i("svg",{staticClass:"fixed-pos",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[i("rect",{staticClass:"move-possible-rect",staticStyle:{fill:"transparent","stroke-width":"11px"},attrs:{x:"1.8",y:"-30",width:"60",height:"60"}})]):t._e()],1)},nt=[],rt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"fill-stroke-black",class:{selected:t.selected,selectable:!t.selected},attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 45 45"}},[t.IsWhite()&&t.IsKing()?i("g",{staticStyle:{fill:"none","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 22.5,11.63 L 22.5,6"}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 20,8 L 25,8"}}),i("path",{staticStyle:{fill:"#ffffff","stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"}}),i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,30 C 17,27 27,27 32.5,30"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,37 C 17,34 27,34 32.5,37"}})]):t._e(),t.IsWhite()&&t.IsQueen()?i("g",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(-1,-1)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(15.5,-5.5)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(32,-1)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(7,-4.5)"}}),i("path",{attrs:{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(24,-4)"}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 11.5,30 C 15,29 30,29 33.5,30"}}),i("path",{staticStyle:{fill:"none"},attrs:{d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5"}})]):t._e(),t.IsWhite()&&t.IsBishop()?i("g",{staticStyle:{opacity:"1",fill:"none","fill-rule":"evenodd","fill-opacity":"1","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{fill:"#ffffff","stroke-linecap":"butt"}},[i("path",{attrs:{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}}),i("path",{attrs:{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}}),i("path",{attrs:{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}})]),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"}})]):t._e(),t.IsWhite()&&t.IsKnight()?i("g",{staticStyle:{opacity:"1",fill:"none","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"}}),i("path",{staticStyle:{fill:"#ffffff"},attrs:{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"}}),i("path",{attrs:{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"}}),i("path",{attrs:{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"}})]):t._e(),t.IsWhite()&&t.IsRook()?i("g",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"}}),i("path",{attrs:{d:"M 34,14 L 31,17 L 14,17 L 11,14"}}),i("path",{staticStyle:{"stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 31,17 L 31,29.5 L 14,29.5 L 14,17"}}),i("path",{attrs:{d:"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 11,14 L 34,14"}})]):t._e(),t.IsWhite()&&t.IsPawn()?i("g",[i("path",{staticStyle:{opacity:"1",fill:"#ffffff","fill-opacity":"1","fill-rule":"nonzero","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"},attrs:{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "}})]):t._e(),t.IsBlack()&&t.IsKing()?i("g",{staticStyle:{"fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 22.5,11.63 L 22.5,6"}}),i("path",{staticStyle:{"fill-opacity":"1","stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"}}),i("path",{attrs:{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "}}),i("path",{staticStyle:{fill:"none","stroke-linejoin":"miter"},attrs:{d:"M 20,8 L 25,8"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"}})]):t._e(),t.IsBlack()&&t.IsQueen()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{stroke:"none"}},[i("circle",{attrs:{cx:"6",cy:"12",r:"2.75"}}),i("circle",{attrs:{cx:"14",cy:"9",r:"2.75"}}),i("circle",{attrs:{cx:"22.5",cy:"8",r:"2.75"}}),i("circle",{attrs:{cx:"31",cy:"9",r:"2.75"}}),i("circle",{attrs:{cx:"39",cy:"12",r:"2.75"}})]),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"}}),i("path",{staticStyle:{fill:"none","stroke-linecap":"butt"},attrs:{d:"M 11,38.5 A 35,35 1 0 0 34,38.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11,29 A 35,35 1 0 1 34,29"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 12.5,31.5 L 32.5,31.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff"},attrs:{d:"M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"}})]):t._e(),t.IsBlack()&&t.IsBishop()?i("g",{staticStyle:{opacity:"1","fill-rule":"evenodd","fill-opacity":"1","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("g",{staticStyle:{"stroke-linecap":"butt"}},[i("path",{attrs:{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}}),i("path",{attrs:{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}}),i("path",{attrs:{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}})]),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-linejoin":"miter"},attrs:{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"}})]):t._e(),t.IsBlack()&&t.IsKnight()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{attrs:{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"}}),i("path",{attrs:{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"#ffffff"},attrs:{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"#ffffff"},attrs:{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"}}),i("path",{staticStyle:{fill:"#ffffff",stroke:"none"},attrs:{d:"M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "}})]):t._e(),t.IsBlack()&&t.IsRook()?i("g",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}},[i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt","stroke-linejoin":"miter"},attrs:{d:"M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "}}),i("path",{staticStyle:{"stroke-linecap":"butt"},attrs:{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 12,35.5 L 33,35.5 L 33,35.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 13,31.5 L 32,31.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 14,29.5 L 31,29.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 14,16.5 L 31,16.5"}}),i("path",{staticStyle:{fill:"none",stroke:"#ffffff","stroke-width":"1","stroke-linejoin":"miter"},attrs:{d:"M 11,14 L 34,14"}})]):t._e(),t.IsBlack()&&t.IsPawn()?i("g",[i("path",{staticStyle:{opacity:"1","fill-opacity":"1","fill-rule":"nonzero","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"},attrs:{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "}})]):t._e()])},at=[],st=function(t){function e(){return Object(s["a"])(this,e),Object(o["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(c["a"])(e,t),Object(h["a"])(e,[{key:"IsBlack",value:function(){return p(this.piece,Q.Black)}},{key:"IsWhite",value:function(){return p(this.piece,Q.White)}},{key:"IsKing",value:function(){return m(this.piece)===F.King}},{key:"IsQueen",value:function(){return m(this.piece)===F.Queen}},{key:"IsBishop",value:function(){return m(this.piece)===F.Bishop}},{key:"IsRook",value:function(){return m(this.piece)===F.Rook}},{key:"IsPawn",value:function(){return m(this.piece)===F.Pawn}},{key:"IsKnight",value:function(){return m(this.piece)===F.Knight}}]),e}(u["c"]);Object(f["a"])([Object(u["b"])()],st.prototype,"piece",void 0),Object(f["a"])([Object(u["b"])()],st.prototype,"selected",void 0),st=Object(f["a"])([u["a"]],st);var ot=st,lt=ot,ct=(i("899a"),i("2877")),ft=Object(ct["a"])(lt,rt,at,!1,null,"20be2b0c",null),ut=ft.exports,ht=function(t){function e(){return Object(s["a"])(this,e),Object(o["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(c["a"])(e,t),Object(h["a"])(e,[{key:"IsWhiteBackground",value:function(){return this.fieldInfo.background==Q.White}},{key:"IsWhitePiece",value:function(){return p(this.field,Q.White)}}]),e}(u["c"]);Object(f["a"])([Object(u["b"])()],ht.prototype,"fieldInfo",void 0),Object(f["a"])([Object(u["b"])()],ht.prototype,"field",void 0),Object(f["a"])([Object(u["b"])()],ht.prototype,"selected",void 0),Object(f["a"])([Object(u["b"])()],ht.prototype,"possible",void 0),Object(f["a"])([Object(u["b"])()],ht.prototype,"clickable",void 0),ht=Object(f["a"])([Object(u["a"])({components:{ChessPiece:ut}})],ht);var dt=ht,pt=dt,kt=(i("e7f6"),Object(ct["a"])(pt,it,nt,!1,null,"4f8bca4c",null)),yt=kt.exports,vt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"border"},[i("div",{staticClass:"info-grid"},[i("button",{staticClass:"move-button shadow",attrs:{disabled:!t.isBlackTurn()||t.isThinking()},on:{click:function(e){return t.onClickMove()}}},[t._v(t._s(t.isThinking()?"Thinking":"Move"))]),t._l(t.whiteTakenPieces(),(function(t,e){return i("ChessPiece",{key:e,style:{gridColumn:t.column,gridRow:1},attrs:{piece:t.piece}})}))],2)]),i("div",{staticClass:"border"},[i("div",{staticClass:"board shadow"},t._l(t.getFieldAndFieldInfo(),(function(e,n){return i("ChessField",{key:n,attrs:{field:e[0],fieldInfo:e[1],possible:t.gameState.possibleMoves.includes(n),selected:n===t.gameState.selectedPiece,clickable:t.isClickable(n)},nativeOn:{click:function(e){return t.onClick(n)}}})})),1)]),i("div",{staticClass:"border"},[i("div",{staticClass:"info-grid"},[i("div",{staticClass:"info-text shadow"},[t._v(t._s(t.whiteTime()))]),t._l(t.blackTakenPieces(),(function(t,e){return i("ChessPiece",{key:e,style:{gridColumn:t.column,gridRow:1},attrs:{piece:t.piece}})}))],2)]),t.IsDraw()||t.IsWhiteWin()||t.IsBlackWin()?i("div",{staticClass:"modal"},[i("div",{staticClass:"modal-content"},[i("span",{staticClass:"close",on:{click:function(e){return t.CloseModal()}}},[t._v("×")]),t.IsDraw()?i("p",[t._v("Game ended in a DRAW.")]):t._e(),t.IsWhiteWin()?i("p",[t._v("White WIN")]):t._e(),t.IsBlackWin()?i("p",[t._v("Black WIN")]):t._e(),i("p",[t._v("Reload the site to start a new game")])])]):t._e()])},Ct=[],bt=(i("4de4"),i("fb6a"),function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(o["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.chessHelper=new et,t.gameResult=D.Pending,t}return Object(c["a"])(e,t),Object(h["a"])(e,[{key:"getFieldAndFieldInfo",value:function(){var t=this,e=this.gameState.boardState.fields.map((function(e,i){return[e,t.gameState.fieldInfos[i]]}));return e}},{key:"IsDraw",value:function(){return this.gameResult==D.Draw}},{key:"isBlackTurn",value:function(){return this.gameState.turn===Q.Black}},{key:"isThinking",value:function(){return this.gameState.isThinking}},{key:"IsWhiteWin",value:function(){return this.gameResult==D.WhiteWin}},{key:"IsBlackWin",value:function(){return this.gameResult==D.BlackWin}},{key:"CloseModal",value:function(){this.gameResult=D.Pending}},{key:"whiteTakenPieces",value:function(){var t=this.gameState.boardState.takenPieces.filter((function(t){return t<0}));return t.map((function(t,e){return{column:18-e,piece:t}}))}},{key:"blackTakenPieces",value:function(){var t=this.gameState.boardState.takenPieces.filter((function(t){return t>0}));return t.map((function(t,e){return{column:18-e,piece:t}}))}},{key:"whiteTime",value:function(){return this.timeDisplay(this.gameState.timerWhite)}},{key:"blackTime",value:function(){return this.timeDisplay(this.gameState.timerBlack)}},{key:"timeDisplay",value:function(t){var e=t%60,i=Math.round(t/60);return("0"+i).slice(-2)+":"+("0"+e).slice(-2)}},{key:"onClick",value:function(t){this.gameResult=this.chessHelper.clickField(t,this.gameState)}},{key:"onClickMove",value:function(){this.gameState.isThinking=!0,this.gameResult=this.chessHelper.startBackgroundAi(this.gameState),this.gameState.isThinking=!1}},{key:"isClickable",value:function(t){return t===this.gameState.selectedPiece||(!(-1==this.gameState.selectedPiece||!this.gameState.possibleMoves.includes(t))||p(this.gameState.boardState.fields[t],this.gameState.turn))}}]),e}(u["c"]));Object(f["a"])([Object(u["b"])()],bt.prototype,"gameState",void 0),bt=Object(f["a"])([Object(u["a"])({components:{ChessField:yt,ChessPiece:ut}})],bt);var mt=bt,gt=mt,Lt=(i("9344"),Object(ct["a"])(gt,vt,Ct,!1,null,"80130346",null)),wt=Lt.exports,St=function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(o["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.chessHelper=new et,t.gameState=new N,t}return Object(c["a"])(e,t),e}(u["c"]);St=Object(f["a"])([Object(u["a"])({components:{ChessBoard:wt,ChessField:yt,ChessPiece:ut}})],St);var Mt=St,jt=Mt,Bt=(i("5c0b"),Object(ct["a"])(jt,r,a,!1,null,null,null)),Wt=Bt.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(Wt)}}).$mount("#app")},d9ef:function(t,e,i){},e7f6:function(t,e,i){"use strict";var n=i("8912"),r=i.n(n);r.a}});
//# sourceMappingURL=app.0c4251de.js.map
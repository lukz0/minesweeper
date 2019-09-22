!function(e){var t={};function o(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(s,r,function(t){return e[t]}.bind(null,r));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const s="□",r="■",l="💣",i="🚩";class n{constructor(e,t,o){this.mainHTMLElement=document.createElement("div"),this.rows=e,this.cols=t,n.setStyleProps(this.mainHTMLElement,n.mainElemProps);for(let e=0;e<this.rows;e++){let t=document.createElement("div");n.setStyleProps(t,n.rowElemProps);for(let s=0;s<this.cols;s++){let l=document.createElement("div");n.setStyleProps(l,n.colElemProps),l.setAttribute("ri",String(e)),l.setAttribute("ci",String(s));let i=document.createElement("p");i.style.fontWeight="bolder",i.style.fontFamily="sans-serif",i.style.webkitTextStroke="0.3px black",i.innerText=r,n.setStyleProps(i,n.pColElemProps),["click","contextmenu"].forEach(e=>l.addEventListener(e,o)),l.appendChild(i),t.appendChild(l)}this.mainHTMLElement.appendChild(t)}document.body.appendChild(this.mainHTMLElement)}getTileAtIndex(e){return this.mainHTMLElement.children[e.row].children[e.col]}setAtCoords(e,t){let o,n=this.getTileAtIndex(e);switch(t){case-1:o=l;break;case-2:n.style.removeProperty("background"),o=r;break;case-3:n.style.removeProperty("background"),o=i;break;case 0:o=s;break;default:o=t.toString()}if(-2!==t&&-3!==t&&n.style.setProperty("background","#999"),t>0)switch(t){case 1:n.children[0].style.color="blue",n.children[0].style.webkitTextStroke="0.3px black";break;case 2:n.children[0].style.color="green",n.children[0].style.webkitTextStroke="0.3px black";break;case 3:n.children[0].style.color="red",n.children[0].style.webkitTextStroke="0.3px black";break;case 4:n.children[0].style.color="purple",n.children[0].style.webkitTextStroke="0.3px black";break;case 5:n.children[0].style.color="maroon",n.children[0].style.webkitTextStroke="0.3px #400000";break;case 6:n.children[0].style.color="turquoise",n.children[0].style.webkitTextStroke="0.3px #207068";break;case 7:n.children[0].style.color="darkslategray",n.children[0].style.webkitTextStroke="0.3px #181818";break;case 8:n.children[0].style.color="gray",n.children[0].style.webkitTextStroke="0.3px #404040"}else n.children[0].style.webkitTextStroke="0.3px black";this.getTileAtIndex(e).children[0].innerText=o}static setStyleProps(e,t){t.forEach(t=>e.style.setProperty(...t))}}n.mainElemProps=[["display","flex"],["flex-direction","column"],["background","#333"],["height","100%"],["width","100%"]],n.rowElemProps=[["display","flex"],["flex","1 1 0px"]],n.colElemProps=[["flex","1 0 0px"],["display","flex"],["justify-content","center"],["align-items","center"],["border","solid 1px"]],n.pColElemProps=[["margin","0"],["font-size","2vh"],["color","#ddd"]];var c=n;class h{constructor(e,t){this.row=e,this.col=t}neighbours(e){let t=[],o=0!==this.row,s=this.row!==e.rows-1,r=0!==this.col,l=this.col!==e.cols-1;return o&&(r&&t.push(new h(this.row-1,this.col-1)),t.push(new h(this.row-1,this.col)),l&&t.push(new h(this.row-1,this.col+1))),r&&t.push(new h(this.row,this.col-1)),l&&t.push(new h(this.row,this.col+1)),s&&(r&&t.push(new h(this.row+1,this.col-1)),t.push(new h(this.row+1,this.col)),l&&t.push(new h(this.row+1,this.col+1))),t}static isInCoordList(e,t,o){for(let s of o)if(s.row===e&&s.col===t)return!0;return!1}}var a=h;var d=class{constructor(e,t,o){this.rows=e,this.cols=t,this.bombAmount=o,this.board=new c(this.rows,this.cols,this.handleColClick.bind(this))}handleColClick(e){let t=new a(parseInt(e.currentTarget.getAttribute("ri")),parseInt(e.currentTarget.getAttribute("ci")));switch(e.button){case 0:e.preventDefault(),void 0===this.bombLocations&&this.plantBombs(t),this.openTile(t)?(console.log("lost the game"),this.looseGame()):this.testIfWin()?(console.log("won the game"),this.winGame()):console.log("didn't win or loose");break;case 2:e.preventDefault(),this.flagTile(t)}}plantBombs(e){let t=[e,...e.neighbours(this)],o=this.rows*this.cols-t.length,s=this.bombAmount;this.bombLocations=[],this.openedTiles=Array(this.rows).fill(null).map(()=>Array(this.cols).fill(!1)),this.flaggedTiles=Array(this.rows).fill(null).map(()=>Array(this.cols).fill(!1));for(let e=0;e<this.rows;e++){let r=[];for(let l=0;l<this.cols;l++)a.isInCoordList(e,l,t)?r.push(!1):(Math.random()<s/o?(r.push(!0),s--):r.push(!1),o--);this.bombLocations.push(r)}}openTile(e){if(this.openedTiles[e.row][e.col]||this.flaggedTiles[e.row][e.col])return!1;if(this.bombLocations[e.row][e.col])return this.openedTiles[e.row][e.col]=!0,this.board.setAtCoords(e,-1),!0;{let t=[e];for(;0!==t.length;){let e=t.pop();if(!this.openedTiles[e.row][e.col]){this.openedTiles[e.row][e.col]=!0;let o=e.neighbours(this),s=o.reduce((e,t)=>this.bombLocations[t.row][t.col]?e+1:e,0);this.board.setAtCoords(e,s),0===s&&(t=t.concat(o))}}}}flagTile(e){this.openedTiles[e.row][e.col]||(this.flaggedTiles[e.row][e.col]?(this.flaggedTiles[e.row][e.col]=!1,this.board.setAtCoords(e,-2)):(this.flaggedTiles[e.row][e.col]=!0,this.board.setAtCoords(e,-3)))}looseGame(){this.showBombs(),alert("You lost")}winGame(){this.showBombs(),alert("You won")}showBombs(){this.bombLocations.forEach((e,t)=>e.forEach((e,o)=>this.bombLocations[t][o]?this.board.setAtCoords(new a(t,o),-1):void 0))}testIfWin(){for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++)if(!this.bombLocations[e][t]&&!this.openedTiles[e][t])return!1;return!0}};globalThis.g=new d(20,20,80)}]);
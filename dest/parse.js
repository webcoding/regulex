if("function"!=typeof define)var define=require("amdefine")(module);define(["./NFA","./Kit"],function(e,a){function t(){var e=Object.keys(u).map(function(e){return e+"="+JSON.stringify(u[e])}).join(";"),a=function(){return this}();a.eval(e)}function r(e){this.raw=e.raw,this.tree=e.tree,this.groupCount=e.groupCount}function n(e,a){E=a;var t,n,c,u=s();t=u.input(e),n=t.stack,n=f.endChoice(n),c=t.lastState;var l=t.acceptable&&t.lastIndex===e.length-1;if(!l){var g;switch(c){case"charsetRangeEndWithNullChar":g={type:"CharsetRangeEndWithNullChar",message:"Charset range end with NUL char does not make sense!\nBecause [a-\\0] is not a valid range.\nAnd [\\0-\\0] should be rewritten into [\\0]."};break;case"repeatErrorFinal":g={type:"NothingRepeat",message:"Nothing to repeat!"};break;case"digitFollowNullError":g={type:"DigitFollowNullError",message:"The '\\0' represents the <NUL> char and cannot be followed by a decimal digit!"};break;case"charsetRangeEndClass":g={type:"CharsetRangeEndClass",message:'Charset range ends with class such as "\\w\\W\\d\\D\\s\\S" is invalid!'};break;case"charsetOctEscape":g={type:"DecimalEscape",message:"Decimal escape appears in charset is invalid.Because it can't be explained as  backreference.And octal escape is deprecated!"};break;default:0===c.indexOf("charset")?g={type:"UnclosedCharset",message:"Unterminated character class!"}:")"===e[t.lastIndex]?g={type:"UnmatchedParen",message:"Unmatched end parenthesis!"}:(g={type:"UnexpectedChar",message:"Unexpected char!"},t.lastIndex++)}if(g)throw g.lastIndex=t.lastIndex,g.astStack=t.stack,g.lastState=c,new d(g)}if(n._parentGroup)throw new d({type:"UnterminatedGroup",message:"Unterminated group!",lastIndex:n._parentGroup.indices[0],lastState:c,astStack:n});if(l){var C=n.groupCounter?n.groupCounter.i:0;delete n.groupCounter;var x=new r({raw:e,groupCount:C,tree:n});return p(n,e,e.length),x.traverse(h,CHARSET_NODE),x.traverse(i,ASSERT_NODE),o(n),E=!1,x}}function s(){return l||(l=e(w,E)),l}function c(e,a,t){Object.defineProperty(e,a,{value:t,enumerable:E,writable:!0,configurable:!0})}function o(e){for(var a,t=e[0],r=1,n=1,s=e.length;s>r;r++){if(a=e[r],a.type===EXACT_NODE){if(t.type===EXACT_NODE&&!t.repeat&&!a.repeat){t.indices[1]=a.indices[1],t.raw+=a.raw,t.chars+=a.chars;continue}}else a.sub?o(a.sub):a.branches&&a.branches.map(o);e[n++]=a,t=a}t&&(e.length=n)}function p(e,a,t){return e.length?(e.reduce(function(e,t){return t.indices.push(e),t.raw=a.slice(t.indices[0],e),t.type===GROUP_NODE||t.type===ASSERT_NODE&&t.sub?p(t.sub,a,t.endParenIndex):t.type===CHOICE_NODE?(t.branches.reduce(function(e,t){p(t,a,e);var r=t[0];return(r?r.indices[0]:e)-1},e),t.branches.reverse()):t.type===EXACT_NODE&&(t.chars=t.chars||t.raw),t.indices[0]},t),void e.reverse()):void e.push({type:EMPTY_NODE,indices:[t,t]})}function i(e){if(e.repeat)throw new d({type:"NothingRepeat",lastIndex:e.indices[1],message:"Nothing to repeat!Repeat after assertion doesn't make sense!"})}function h(e){e.ranges=a.sortUnique(e.ranges.map(function(e){if(e[0]>e[1])throw new d({type:"OutOfOrder",lastIndex:e.lastIndex,message:"Range ["+e.join("-")+"] out of order in character class!"});return e.join("")}))}function d(e){this.name="RegexSyntaxError",this.type=e.type,this.lastIndex=e.lastIndex,this.lastState=e.lastState,this.astStack=e.astStack,this.message=e.message,Object.defineProperty(this,"stack",{value:new Error(e.message).stack,enumerable:!1})}var u={EXACT_NODE:"exact",CHARSET_NODE:"charset",CHOICE_NODE:"choice",GROUP_NODE:"group",ASSERT_NODE:"assert",DOT_NODE:"dot",BACKREF_NODE:"backref",EMPTY_NODE:"empty",AssertLookahead:"AssertLookahead",AssertNegativeLookahead:"AssertNegativeLookahead",AssertNonWordBoundary:"AssertNonWordBoundary",AssertWordBoundary:"AssertWordBoundary",AssertEnd:"AssertEnd",AssertBegin:"AssertBegin"};t(),r.prototype.traverse=function(e,a){function t(e,r){e.forEach(function(e){a&&e.type!==a||r(e),e.sub?t(e.sub,r):e.branches&&e.branches.forEach(function(e){t(e,r)})})}t(this.tree,e)};var E;n.Constants=u,n.exportConstants=t,n.RegexSyntaxError=d,n.getNFAParser=s;var l;d.prototype.toString=function(){return this.name+" "+this.type+":"+this.message};var g={n:"\n",r:"\r",t:"	",v:"",f:"\f"},f=function(){function e(e,a,t){var r=e[0];(!r||r.type!=EXACT_NODE||r.repeat||r.chars)&&e.unshift({type:EXACT_NODE,indices:[t]})}function a(e,a,t){e.unshift({type:DOT_NODE,indices:[t]})}function t(a,t,r){t="\x00",e(a,t,r)}function r(e,a,t){e.unshift({type:ASSERT_NODE,indices:[t],assertionType:AssertBegin})}function n(e,a,t){e.unshift({type:ASSERT_NODE,indices:[t],assertionType:AssertEnd})}function s(e,a,t){e.unshift({type:ASSERT_NODE,indices:[t-1],assertionType:"b"==a?AssertWordBoundary:AssertNonWordBoundary})}function o(e,a,t){var r=e[0];r.type!==EXACT_NODE&&e.unshift({type:EXACT_NODE,indices:[t]})}function p(e,a,t){var r=e[0];c(r,"_commaIndex",t)}function i(e,a,t,r,n){var s,c=e[0],o=n.lastIndexOf("{",t),p=parseInt(n.slice(o+1,c._commaIndex||t),10);if(c._commaIndex){if(s=c._commaIndex+1==t?1/0:parseInt(n.slice(c._commaIndex+1,t),10),p>s)throw new d({type:"OutOfOrder",lastState:r,lastIndex:t,astStack:e,message:"Numbers out of order in {} quantifier!"});delete c._commaIndex}else s=p;c.indices[0]>=o&&e.shift(),l(e,p,s,o,n)}function h(e,a,t,r,n){l(e,0,1/0,t,n)}function u(e,a,t,r,n){l(e,0,1,t,n)}function E(e,a,t,r,n){l(e,1,1/0,t,n)}function l(e,a,t,r,n){var s=e[0],o={min:a,max:t,nonGreedy:!1},p=r-1;if(s.chars&&1===s.chars.length&&(p=s.indices[0]),s.type===EXACT_NODE){var i={type:EXACT_NODE,repeat:o,chars:s.chars?s.chars:n[p],indices:[p]};s.indices[0]===p&&e.shift(),e.unshift(i)}else s.repeat=o;c(o,"beginIndex",r-e[0].indices[0])}function f(e){e[0].repeat.nonGreedy=!0}function C(e,a,t){g.hasOwnProperty(a)&&(a=g[a]),e.unshift({type:EXACT_NODE,chars:a,indices:[t-1]})}function x(e,a,t){e.unshift({type:CHARSET_NODE,indices:[t-1],chars:"",ranges:[],classes:[a],exclude:!1})}function S(e,a,t,r,n){a=String.fromCharCode(parseInt(n[t-1]+a,16)),e.unshift({type:EXACT_NODE,chars:a,indices:[t-3]})}function _(e,a,t,r,n){a=String.fromCharCode(parseInt(n.slice(t-3,t+1),16)),e.unshift({type:EXACT_NODE,chars:a,indices:[t-5]})}function y(e,a,t){var r=e.groupCounter=e.groupCounter||{i:0};r.i++;var n={type:GROUP_NODE,num:r.i,sub:[],indices:[t],_parentStack:e};return e=n.sub,c(e,"_parentGroup",n),e.groupCounter=r,e}function N(e){var a=e._parentGroup;a.nonCapture=!0,a.num=void 0,e.groupCounter.i--}function m(e,a){var t=e._parentGroup;t.type=ASSERT_NODE,t.assertionType="="==a?AssertLookahead:AssertNegativeLookahead,t.num=void 0,e.groupCounter.i--}function R(e,a,t,r){e=b(e);var n=e._parentGroup;if(!n)throw new d({type:"UnexpectedChar",lastIndex:t,lastState:r,astStack:e,message:"Unexpected end parenthesis!"});return delete e._parentGroup,delete e.groupCounter,e=n._parentStack,delete n._parentStack,e.unshift(n),n.endParenIndex=t,e}function O(e,a,t){var r,n=[];if(e._parentChoice)r=e._parentChoice,r.branches.unshift(n),c(n,"_parentChoice",r),c(n,"_parentGroup",r),n.groupCounter=e.groupCounter,delete e._parentChoice,delete e.groupCounter;else{var s=e[e.length-1];r={type:CHOICE_NODE,indices:[s?s.indices[0]:t-1],branches:[]},c(r,"_parentStack",e),r.branches.unshift(e.slice()),e.length=0,e.unshift(r),n.groupCounter=e.groupCounter,c(n,"_parentChoice",r),c(n,"_parentGroup",r),r.branches.unshift(n)}return n}function b(e){if(e._parentChoice){var a=e._parentChoice;delete e._parentChoice,delete e._parentGroup,delete e.groupCounter;var t=a._parentStack;return delete a._parentStack,t}return e}function k(e,a,t){e.unshift({type:CHARSET_NODE,indices:[t],classes:[],ranges:[],chars:""})}function v(e){e[0].exclude=!0}function A(e,a){e[0].chars+=a}function U(e,a){g.hasOwnProperty(a)&&(a=g[a]),e[0].chars+=a}function D(e){e[0].chars+="\x00"}function I(e,a){e[0].classes.push(a)}function w(e,a){var t=e[0];a=String.fromCharCode(parseInt(t.chars.slice(-1)+a,16)),t.chars=t.chars.slice(0,-2),t.chars+=a}function B(e,a){var t=e[0];a=String.fromCharCode(parseInt(t.chars.slice(-3)+a,16)),t.chars=t.chars.slice(0,-4),t.chars+=a}function T(e,a,t){var r=e[0],n=r.chars.slice(-2);n=[n[0],a],n.lastIndex=t,r.ranges.push(n),r.chars=r.chars.slice(0,-2)}function G(e,a){g.hasOwnProperty(a)&&(a=g[a]),T.apply(this,arguments)}function H(e,a,t){var r=e[0],n=r.chars.slice(-3)+a;r.chars=r.chars.slice(0,-3);var s=r.ranges.pop();a=String.fromCharCode(parseInt(n,16)),s=[s[0],a],s.lastIndex=t,r.ranges.push(s)}function Q(e,a,t){var r=e[0],n=r.chars.slice(-1)+a;r.chars=r.chars.slice(0,-1);var s=r.ranges.pop();a=String.fromCharCode(parseInt(n,16)),s=[s[0],a],s.lastIndex=t,r.ranges.push(s)}function P(e,a,t,r){function n(e,a){return a._parentGroup?a._parentGroup.num==e?e:n(e,a._parentGroup._parentStack):!1}var s=e[0],c=parseInt(a,10),o="escape"===r,p=e.groupCounter,i=p&&p.i||0;if(o?(s={type:BACKREF_NODE,indices:[t-1]},e.unshift(s)):c=parseInt(s.num+""+c,10),c>i)throw new d({type:"InvalidBackReference",lastIndex:t,astStack:e,lastState:r,message:"Back reference number("+c+") greater than current groups count("+i+")."});if(n(c,e))throw new d({type:"InvalidBackReference",lastIndex:t,astStack:e,lastState:r,message:"Recursive back reference in group ("+c+") itself."});s.num=c}return{exact:e,dot:a,nullChar:t,assertBegin:r,assertEnd:n,assertWordBoundary:s,repeatnStart:o,repeatnComma:p,repeatNonGreedy:f,repeatnEnd:i,repeat1:E,repeat01:u,repeat0:h,charClassEscape:x,normalEscape:C,unicodeEscape:_,hexEscape:S,charClassEscape:x,groupStart:y,groupNonCapture:N,backref:P,groupToAssertion:m,groupEnd:R,choice:O,endChoice:b,charsetStart:k,charsetExclude:v,charsetContent:A,charsetNullChar:D,charsetClassEscape:I,charsetHexEscape:w,charsetUnicodeEscape:B,charsetRangeEnd:T,charsetNormalEscape:U,charsetRangeEndNormalEscape:G,charsetRangeEndUnicodeEscape:H,charsetRangeEndHexEscape:Q}}(),C="0-9",x="0-9a-fA-F",S="^+*?^$.|(){[\\",_="dDwWsS",y="u",N="x",m="^"+_+y+N+"0-9",R=m+"bB1-9",O="repeatnStart,repeatn_1,repeatn_2,repeatnErrorStart,repeatnError_1,repeatnError_2",b="hexEscape1,hexEscape2",k="unicodeEscape1,unicodeEscape2,unicodeEscape3,unicodeEscape4",v=b+","+k,A="charsetUnicodeEscape1,charsetUnicodeEscape2,charsetUnicodeEscape3,charsetUnicodeEscape4,charsetHexEscape1,charsetHexEscape2",U="charsetRangeEndUnicodeEscape1,charsetRangeEndHexEscape1",D="charsetRangeEndUnicodeEscape2,charsetRangeEndUnicodeEscape3,charsetRangeEndUnicodeEscape4,charsetRangeEndHexEscape2",I=U+","+D,w={compact:!0,accepts:"start,begin,end,repeat0,repeat1,exact,repeatn,repeat01,repeatNonGreedy,choice,"+(O+",nullChar,digitBackref,"+k+","+b),trans:[["start,begin,end,exact,repeatNonGreedy,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,choice,repeatn>exact",S,f.exact],[v+">exact",S+x,f.exact],["nullChar>exact",S+C,f.exact],[O+",nullChar,digitBackref,"+k+","+b+",start,begin,end,exact,repeatNonGreedy,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,choice,repeatn>exact",".",f.dot],["start,groupStart,groupQualifiedStart,end,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,"+O+",nullChar,digitBackref,"+k+","+b+">begin","^",f.assertBegin],[O+",nullChar,digitBackref,"+k+","+b+",exact>repeatnStart","{",f.repeatnStart],["start,begin,end,groupQualifiedStart,groupStart,repeat0,repeat1,repeatn,repeat01,repeatNonGreedy,choice>repeatnErrorStart","{",f.exact],["repeatnStart>repeatn_1",C,f.exact],["repeatn_1>repeatn_1",C,f.exact],["repeatn_1>repeatn_2",",",f.repeatnComma],["repeatn_2>repeatn_2",C,f.exact],["repeatn_1,repeatn_2>repeatn","}",f.repeatnEnd],["repeatnStart,repeatnErrorStart>exact","}",f.exact],["repeatnStart,repeatnErrorStart>exact",S+"0-9}",f.exact],["repeatnErrorStart>repeatnError_1",C,f.exact],["repeatnError_1>repeatnError_1",C,f.exact],["repeatnError_1>repeatnError_2",",",f.exact],["repeatnError_2>repeatnError_2",C,f.exact],["repeatnError_2,repeatnError_1>repeatErrorFinal","}"],["repeatn_1,repeatnError_1>exact",S+C+",}",f.exact],["repeatn_2,repeatnError_2>exact",S+C+"}",f.exact],["exact,"+(O+",nullChar,digitBackref,"+k+","+b)+">repeat0","*",f.repeat0],["exact,"+(O+",nullChar,digitBackref,"+k+","+b)+">repeat1","+",f.repeat1],["exact,"+(O+",nullChar,digitBackref,"+k+","+b)+">repeat01","?",f.repeat01],["choice>repeatErrorFinal","*+?"],["repeat0,repeat1,repeat01,repeatn>repeatNonGreedy","?",f.repeatNonGreedy],["repeat0,repeat1,repeat01,repeatn>repeatErrorFinal","+*"],["start,begin,end,groupStart,groupQualifiedStart,exact,repeatNonGreedy,repeat0,repeat1,repeat01,repeatn,choice,"+(O+",nullChar,digitBackref,"+k+","+b)+">escape","\\"],["escape>nullChar","0",f.nullChar],["nullChar>digitFollowNullError","0-9"],["escape>exact",R,f.normalEscape],["escape>exact","bB",f.assertWordBoundary],["escape>exact",_,f.charClassEscape],["escape>unicodeEscape1",y,f.exact],["unicodeEscape1>unicodeEscape2",x,f.exact],["unicodeEscape2>unicodeEscape3",x,f.exact],["unicodeEscape3>unicodeEscape4",x,f.exact],["unicodeEscape4>exact",x,f.unicodeEscape],["escape>hexEscape1",N,f.exact],["hexEscape1>hexEscape2",x,f.exact],["hexEscape2>exact",x,f.hexEscape],["escape>digitBackref","1-9",f.backref],["digitBackref>digitBackref",C,f.backref],["digitBackref>exact",S+C,f.exact],["exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,start,groupStart,groupQualifiedStart,choice,"+(O+",nullChar,digitBackref,"+k+","+b)+">groupStart","(",f.groupStart],["groupStart>groupQualify","?"],["groupQualify>groupQualifiedStart",":",f.groupNonCapture],["groupQualify>groupQualifiedStart","=",f.groupToAssertion],["groupQualify>groupQualifiedStart","!",f.groupToAssertion],[O+",nullChar,digitBackref,"+k+","+b+"groupStart,groupQualifiedStart,begin,end,exact,repeat1,repeat0,repeat01,repeatn,repeatNonGreedy,choice>exact",")",f.groupEnd],["start,begin,end,groupStart,groupQualifiedStart,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,"+(O+",nullChar,digitBackref,"+k+","+b)+">choice","|",f.choice],["start,groupStart,groupQualifiedStart,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,"+(O+",nullChar,digitBackref,"+k+","+b)+">end","$",f.assertEnd],["exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,groupQualifiedStart,groupStart,start,choice,"+(O+",nullChar,digitBackref,"+k+","+b)+">charsetStart","[",f.charsetStart],["charsetStart>charsetExclude","^",f.charsetExclude],["charsetStart>charsetContent","^\\]^",f.charsetContent],["charsetExclude>charsetContent","^\\]",f.charsetContent],["charsetContent,charsetClass>charsetContent","^\\]-",f.charsetContent],["charsetClass>charsetContent","-",f.charsetContent],[A+",charsetStart,charsetContent,charsetClass,charsetExclude,charsetRangeEnd>charsetEscape","\\"],["charsetEscape>charsetContent",m,f.charsetNormalEscape],["charsetEscape>charsetNullChar","0",f.charsetNullChar],["charsetEscape>charsetOctEscape","1-9"],["charsetRangeEndEscape>charsetOctEscape","1-9"],["charsetNullChar>digitFollowNullError",C],["charsetNullChar>charsetContent","^0-9\\]-",f.charsetContent],["charsetEscape>charsetClass",_,f.charsetClassEscape],["charsetEscape>charsetUnicodeEscape1",y,f.charsetContent],["charsetUnicodeEscape1>charsetUnicodeEscape2",x,f.charsetContent],["charsetUnicodeEscape2>charsetUnicodeEscape3",x,f.charsetContent],["charsetUnicodeEscape3>charsetUnicodeEscape4",x,f.charsetContent],["charsetUnicodeEscape4>charsetContent",x,f.charsetUnicodeEscape],["charsetEscape>charsetHexEscape1",N,f.charsetContent],["charsetHexEscape1>charsetHexEscape2",x,f.charsetContent],["charsetHexEscape2>charsetContent",x,f.charsetHexEscape],[A+">charsetContent","^\\]"+x+"-",f.charsetContent],[A+",charsetNullChar,charsetContent>charsetRangeStart","-",f.charsetContent],["charsetRangeStart>charsetRangeEnd","^\\]",f.charsetRangeEnd],["charsetRangeEnd>charsetContent","^\\]",f.charsetContent],["charsetRangeStart>charsetRangeEndEscape","\\"],["charsetRangeEndEscape>charsetRangeEnd",R,f.charsetRangeEndNormalEscape],["charsetRangeEndEscape>charsetRangeEndWithNullChar","0"],["charsetRangeEndEscape>charsetRangeEndUnicodeEscape1",y,f.charsetRangeEnd],["charsetRangeEndUnicodeEscape1>charsetRangeEndUnicodeEscape2",x,f.charsetContent],["charsetRangeEndUnicodeEscape2>charsetRangeEndUnicodeEscape3",x,f.charsetContent],["charsetRangeEndUnicodeEscape3>charsetRangeEndUnicodeEscape4",x,f.charsetContent],["charsetRangeEndUnicodeEscape4>charsetRangeEnd",x,f.charsetRangeEndUnicodeEscape],["charsetRangeEndEscape>charsetRangeEndHexEscape1",N,f.charsetRangeEnd],["charsetRangeEndHexEscape1>charsetRangeEndHexEscape2",x,f.charsetContent],["charsetRangeEndHexEscape2>charsetRangeEnd",x,f.charsetRangeEndHexEscape],["charsetRangeEndEscape>charsetRangeEndClass",_],[U+">charsetContent","^\\]"+x,f.charsetContent],[D+">charsetRangeStart","-",f.charsetContent],[A+","+I+",charsetNullChar,charsetRangeStart,charsetContent,charsetClass,charsetExclude,charsetRangeEnd>exact","]"]]};return n});
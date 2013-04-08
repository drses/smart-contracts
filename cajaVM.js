// Copyright (C) 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

// Minimal SES shim needed for contract code run insecurely.

var MAX_NAT = Math.pow(2, 53);
function Nat(allegedNum) {
  if (typeof allegedNum !== 'number') {
    throw new RangeError('not a number');
  }
  if (allegedNum !== allegedNum) { throw new RangeError('NaN not natural'); }
  if (allegedNum < 0)            { throw new RangeError('negative'); }
  if (allegedNum % 1 !== 0)      { throw new RangeError('not integral'); }
  if (allegedNum > MAX_NAT)      { throw new RangeError('too big'); }
  return allegedNum;
}
exports.Nat = Nat;

exports.def = Object.freeze;

function confine(exprSrc, imports) {
  var f = (1,eval)(
      '(function() { with(this) {' +
        'return function() { "use strict";' +
          'return (' + exprSrc + '); }; } })');
  return f.call(imports)();
}

exports.confine = confine;

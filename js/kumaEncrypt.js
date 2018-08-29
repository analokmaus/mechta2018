primeNum = [31, 37, 41, 47, 53, 59, 61, 67];//p ,q

function generateKey(){
  var secretKey = [];
  var publicKey = [];
  // generate p,q
  var keySet = [];
  var tmp = [];
  var l =  primeNum.length;
  var n = 2 < l ? 2 : l;
  while (n-- > 0){
    var i = Math.random() * l | 0;
    keySet[n] = tmp[i] || primeNum[i];
    l--;
    tmp[i] = tmp[l] || primeNum[l];
  }
  // generate e
  var pqL= (keySet[0] - 1)*(keySet[1] - 1);
  var e;
  for(var i = 2; i <= Math.sqrt(pqL); i++){
    if(gcd(i,pqL) == 1){
      e = i;
      break;
    }
  }
  // generate d
  d = euGcd(e, pqL)[0];
  if(d < 0){
    d += pqL;
  }
  // generate keyset
  secretKey = [d, keySet[0] * keySet[1]];
  publicKey = [e, keySet[0] * keySet[1]];
  console.log('SecretKey :' + secretKey);
  console.log('PublicKey :' + publicKey);
}

function encode(publicKey){
  $('.epochta').each(function(){
    var dataAry = $(this).text().split('');
    var cypher = [];
    for (var i=0; i<dataAry.length; i++){
      cypher[i] = modPow(dataAry[i].charCodeAt(0), publicKey[0], publicKey[1]);
    }
    cypher = cypher.join(',');
    $(this).text(cypher);
  });
}

function decode(secretKey){
  $('.epochta').each(function(){
    //var dataAry = $(this).text().split(',');
    var email = "16,1438,16,1294,1063,1538,597,16,572,130,1244,572,16,1438,1547,1428,108,395,631,1615";
    var dataAry = email.split(',');
    var plain = [];
    for (var i=0; i<dataAry.length; i++){
      plain[i] = String.fromCharCode(modPow(dataAry[i], secretKey[0], secretKey[1]));
    }
    plain = plain.join('');
    //$(this).text(plain);
    //$(this).fadeIn();
    $(this).attr('href', 'mailto:' + plain);
  });
  $('.encrypt').remove();
}

function singleEncrypt(text, publicKey){
  var dataAry = text.split('');
  var cypher = [];
  for (var i=0; i<dataAry.length; i++){
    cypher[i] = modPow(dataAry[i].charCodeAt(0), publicKey[0], publicKey[1]);
  }
  cypher = cypher.join(',');
  console.log('Cypher is :' + cypher);
}

function gcd(x, y){
	if (y == 0) {
		return x;
	}
	else {
		return gcd(y, x % y);
	}
}

function lcd(x, y){
  return x * y / gcd(x*y);
}

function euGcd(x, y){
  var u,v,q,r,s,t;
  if( y == 0){
    u = 1;
    v = 0;
  } else {
    q = Math.floor(x / y);
    r = x % y;
    s = euGcd(y, r)[0];
    t = euGcd(y, r)[1];
    u = t;
    v = s - q * t;
  }
  return [u, v];
}

function modPow(x ,y , m){
  var n = x;
  for(var i=0; i<y-1; i++){
    n = n * x % m;
  }
  return n;
}

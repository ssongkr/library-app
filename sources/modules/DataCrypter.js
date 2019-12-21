import CryptoJS from 'crypto-js';
import xml2js from 'react-native-xml2js';

let _key = CryptoJS.enc.Utf8.parse('com.google.security.android.v4.x');
let _iv = CryptoJS.enc.Hex.parse('0000000000000000');

export function makeEncryptedRealID(realId){
	let src = realId;

	for(let i = 0; i < 14; i++)
		src += (Math.floor(Math.random() * 10)).toString();

	var chipher = CryptoJS.AES.encrypt(src, _key, { 
        mode: CryptoJS.mode.CBC, 
        iv: _iv,
        padding: CryptoJS.pad.Pkcs7
	});
	
	return chipher.ciphertext.toString(CryptoJS.enc.Base64).replace(" ", "");
}

export function deCrypted(data, usercode){
    var dechipher = CryptoJS.AES.decrypt(data, _key, {
        mode: CryptoJS.mode.CBC,
        iv: _iv,
        padding: CryptoJS.pad.Pkcs7
    });
	
	if(usercode.lenght == 6 )
		var dechipherCutHex = dechipher.toString().substring(0,102);
	else
		var dechipherCutHex = dechipher.toString().substring(0,116);
	
	return CryptoJS.enc.Hex.parse(dechipherCutHex).toString(CryptoJS.enc.Utf8);
}

export function parseXml(data, callback){
	var parser = new xml2js.Parser();
	
	parser.parseString(data, function(err,result){
		callback(result);
	});
}


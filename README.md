UAO-js
======

An UAO encoder/decoder.

Features
--------

* Encode/decode string with UAO table.

Install
-------

	npm install --save uao-js
	
Usage
-----

	var uao = require("uao-js");
	
	uao.encode(unicodeString).then(binaryString => {
		// ...
	});
	uao.decode(binaryString).then(unicodeString => {
		// ...
	});
	
	// Sync
	binaryString = uao.encodeSync(unicodeString);
	unicodeString = uao.decodeSync(binaryString);
	
`.encode`, `.encodeSync` will raise an error for unencodable characters. To suppress the error, feed a replacement character:

	uao.encode(unicodeString, "?");
	
For undecodable characters, `.decode` leaves them as-is.

API
---
### encode(text, createTable): Promise
### encodeSync(text, createTable): binaryString
### decode(binaryString, errorReplacement, createTable): Promise
### decodeSync(binaryString, errorReplacement, createTable): text

`createTable` is a function that should return a unicode-to-big5/big5-to-unicode table. You may want to implement your own table loader in some environment which can't use require to load json.

UAO table
---------

You can find the original UAO table from:

* https://moztw.org/docs/big5/table/uao250-b2u.txt
* https://moztw.org/docs/big5/table/uao250-u2b.txt

Changelog
---------

* 1.0.0 (Jan 20, 2017)

	- API changed. Use async.
	- Be able to inject your own table loader.

* 0.1.1 (Apr 27, 2016)

	- Fix a bug that result string contains `undefined`.

* 0.1.0 (Apr 27, 2016)

    - First release.

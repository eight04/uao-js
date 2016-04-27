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
	
	binaryString = uao.encode(unicodeString);
	unicodeString = uao.decode(binaryString);
	
`.encode` will raise an error for unencodable characters. To suppress the error, feed a replacement character:

	uao.encode(unicodeString, "?");
	
For undecodable characters, `.decode` leaves them as-is.

UAO table
---------

You can find the original UAO table from:

* https://moztw.org/docs/big5/table/uao250-b2u.txt
* https://moztw.org/docs/big5/table/uao250-u2b.txt

Changelog
---------

* 0.1.1 (Apr 27, 2016)

	- Fix a bug that result string contains `undefined`.

* 0.1.0 (Apr 27, 2016)

    - First release.

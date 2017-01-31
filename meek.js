"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "meek",
			"path": "meek/meek.js",
			"file": "meek.js",
			"module": "meek",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/meek.git",
			"test": "meek-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Returns a status-data JSON object.

		Supplementary @code:send; method is applied to the construct enabling better
			readability of the code. This will accept response object.

		Response are not cached.

		Use reply for better flexibility.
	@end-module-documentation

	@include:
		{
			"asea": "asea",
			"called": "called",
			"clazof": "clazof",
			"harden": "harden",
			"http": "http",
			"offcache": "offcache",
			"protype": "protype"
		}
	@end-include
*/

const asea = require( "asea" );
const called = require( "called" );
const clazof = require( "clazof" );
const harden = require( "harden" );
const protype = require( "protype" );

//: @server:
const http = require( "http" );
const offcache = require( "offcache" );
//: @end-server

//: These are default statuses you can use globally.
harden( "FATAL", "fatal" );
harden( "ISSUE", "issue" );
harden( "FAILED", "failed" );
harden( "PROMPT", "prompt" );
harden( "SUCCESS", "success" );

const meek = function meek( status, data ){
	/*;
		@meta-configuration:
			{
				"status": [
					"string",
					PROMPT
				],
				"data": "*"
			}
		@end-meta-configuration
	*/

	status = status || PROMPT;

	if( !protype( status, STRING ) ){
		throw new Error( "invalid status" );
	}

	let construct = { "status": status };

	if( arguments.length == 2 ){
		construct.data = data;
	}

	harden( "toJSON", function toJSON( ){
		let structure = { "status": status };

		if( construct.data ){
			structure.data = data;
		}

		return structure;
	}, construct );

	if( asea.server ){
		harden( "reply", function reply( response, option ){
			if( !response || !( clazof( response, http.ServerResponse ) ) ){
				throw new Error( "invalid response" );
			}

			response.statusCode = response.statusCode || option.code || 200;

			if( protype( response.setHeader, FUNCTION ) ){
				response.setHeader( "Content-Type", "text/json" );
			}

			if( protype( response.setHeader, FUNCTION ) &&
				protype( option.header, OBJECT ) )
			{
				for( let header in option.header ){
					response.setHeader( header, option.header[ header ] );
				}
			}

			if( protype( response.end, FUNCTION ) ){
				response.end( JSON.stringify( construct ) );
			}

			return construct;
		}, construct );

		harden( "send", function send( response, code ){
			offcache( response );

			return construct
				.reply( response, {
					"code": code
				} );
		}, construct );

	}else if( asea.client ){
		harden( "send", function send( procedure ){
			procedure = called( procedure );

			procedure( construct );

			return construct;
		}, construct );

	}else{
		throw new Error( "cannot determine platform" );
	}

	return construct;
};

module.exports = meek;

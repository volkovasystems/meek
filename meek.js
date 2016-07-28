"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"harden": "harden",
			"http": "http",
			"offcache": "offcache"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var asea = require( "asea" );
	var called = require( "called" );
	var harden = require( "harden" );
	var http = require( "http" );
	var offcache = require( "offcache" );
}

if( typeof window != "undefined" &&
	!( "asea" in window ) )
{
	throw new Error( "asea is not defined" );
}

if( asea.client &&
	!( "called" in window ) )
{
	throw new Error( "called is not defined" );
}

if( asea.client &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

//: These are default statuses you can use globally.
harden( "FATAL", "fatal" );
harden( "ISSUE", "issue" );
harden( "FAILED", "failed" );
harden( "PROMPT", "prompt" );
harden( "SUCCESS", "success" );

var meek = function meek( status, data ){
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

	if( typeof status != "string" ){
		throw new Error( "invalid status" );
	}

	var construct = {
		"status": status
	};

	if( arguments.length == 2 ){
		construct.data = data;
	}

	harden( "toJSON", function toJSON( ){
		var _construct = {
			"status": status
		};

		if( construct.data ){
			_construct.data = data;
		}

		return _construct;
	},  construct );

	if( asea.server ){
		harden( "reply", function reply( response, option ){
			if( !response ||
				!( response instanceof http.ServerResponse ) )
			{
				throw new Error( "invalid response" );
			}

			response.statusCode = response.statusCode || option.code || 200;

			if( typeof response.setHeader == "function" ){
				response.setHeader( "Content-Type", "application/json" );
			}

			if( typeof response.setHeader == "function" &&
				typeof option.header == "object" )
			{
				for( var header in option.header ){
					response.setHeader( header, option.header[ header ] );
				}
			}

			if( typeof response.end == "function" ){
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

	}else{
		harden( "send", function send( procedure ){
			procedure = called( procedure );

			procedure( construct );

			return construct;
		}, construct );
	}

	return construct;
};

if( asea.server ){
	module.exports = meek;
}

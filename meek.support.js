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

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asea = require("asea");
var called = require("called");
var clazof = require("clazof");
var harden = require("harden");
var protype = require("protype");

//: These are default statuses you can use globally.
harden("FATAL", "fatal");
harden("ISSUE", "issue");
harden("FAILED", "failed");
harden("PROMPT", "prompt");
harden("SUCCESS", "success");

var meek = function meek(status, data) {
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

	if (!protype(status, STRING)) {
		throw new Error("invalid status");
	}

	var construct = { "status": status };

	if (arguments.length == 2) {
		construct.data = data;
	}

	harden("toJSON", function toJSON() {
		var structure = { "status": status };

		if (construct.data) {
			structure.data = data;
		}

		return structure;
	}, construct);

	if (asea.server) {
		harden("reply", function reply(response, option) {
			if (!response || !clazof(response, http.ServerResponse)) {
				throw new Error("invalid response");
			}

			response.statusCode = response.statusCode || option.code || 200;

			if (protype(response.setHeader, FUNCTION)) {
				response.setHeader("Content-Type", "text/json");
			}

			if (protype(response.setHeader, FUNCTION) && protype(option.header, OBJECT)) {
				for (var header in option.header) {
					response.setHeader(header, option.header[header]);
				}
			}

			if (protype(response.end, FUNCTION)) {
				response.end((0, _stringify2.default)(construct));
			}

			return construct;
		}, construct);

		harden("send", function send(response, code) {
			offcache(response);

			return construct.reply(response, {
				"code": code
			});
		}, construct);
	} else if (asea.client) {
		harden("send", function send(procedure) {
			procedure = called(procedure);

			procedure(construct);

			return construct;
		}, construct);
	} else {
		throw new Error("cannot determine platform");
	}

	return construct;
};

module.exports = meek;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZWsuc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJhc2VhIiwicmVxdWlyZSIsImNhbGxlZCIsImNsYXpvZiIsImhhcmRlbiIsInByb3R5cGUiLCJtZWVrIiwic3RhdHVzIiwiZGF0YSIsIlBST01QVCIsIlNUUklORyIsIkVycm9yIiwiY29uc3RydWN0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidG9KU09OIiwic3RydWN0dXJlIiwic2VydmVyIiwicmVwbHkiLCJyZXNwb25zZSIsIm9wdGlvbiIsImh0dHAiLCJTZXJ2ZXJSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJjb2RlIiwic2V0SGVhZGVyIiwiRlVOQ1RJT04iLCJoZWFkZXIiLCJPQkpFQ1QiLCJlbmQiLCJzZW5kIiwib2ZmY2FjaGUiLCJjbGllbnQiLCJwcm9jZWR1cmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvRUEsSUFBTUEsT0FBT0MsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFNBQVNGLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUcsU0FBU0gsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNSSxVQUFVSixRQUFTLFNBQVQsQ0FBaEI7O0FBSUE7QUFDQUcsT0FBUSxPQUFSLEVBQWlCLE9BQWpCO0FBQ0FBLE9BQVEsT0FBUixFQUFpQixPQUFqQjtBQUNBQSxPQUFRLFFBQVIsRUFBa0IsUUFBbEI7QUFDQUEsT0FBUSxRQUFSLEVBQWtCLFFBQWxCO0FBQ0FBLE9BQVEsU0FBUixFQUFtQixTQUFuQjs7QUFFQSxJQUFNRSxPQUFPLFNBQVNBLElBQVQsQ0FBZUMsTUFBZixFQUF1QkMsSUFBdkIsRUFBNkI7QUFDekM7Ozs7Ozs7Ozs7OztBQVlBRCxVQUFTQSxVQUFVRSxNQUFuQjs7QUFFQSxLQUFJLENBQUNKLFFBQVNFLE1BQVQsRUFBaUJHLE1BQWpCLENBQUwsRUFBZ0M7QUFDL0IsUUFBTSxJQUFJQyxLQUFKLENBQVcsZ0JBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlDLFlBQVksRUFBRSxVQUFVTCxNQUFaLEVBQWhCOztBQUVBLEtBQUlNLFVBQVVDLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDMUJGLFlBQVVKLElBQVYsR0FBaUJBLElBQWpCO0FBQ0E7O0FBRURKLFFBQVEsUUFBUixFQUFrQixTQUFTVyxNQUFULEdBQWtCO0FBQ25DLE1BQUlDLFlBQVksRUFBRSxVQUFVVCxNQUFaLEVBQWhCOztBQUVBLE1BQUlLLFVBQVVKLElBQWQsRUFBb0I7QUFDbkJRLGFBQVVSLElBQVYsR0FBaUJBLElBQWpCO0FBQ0E7O0FBRUQsU0FBT1EsU0FBUDtBQUNBLEVBUkQsRUFRR0osU0FSSDs7QUFVQSxLQUFJWixLQUFLaUIsTUFBVCxFQUFpQjtBQUNoQmIsU0FBUSxPQUFSLEVBQWlCLFNBQVNjLEtBQVQsQ0FBZ0JDLFFBQWhCLEVBQTBCQyxNQUExQixFQUFrQztBQUNsRCxPQUFJLENBQUNELFFBQUQsSUFBYSxDQUFHaEIsT0FBUWdCLFFBQVIsRUFBa0JFLEtBQUtDLGNBQXZCLENBQXBCLEVBQStEO0FBQzlELFVBQU0sSUFBSVgsS0FBSixDQUFXLGtCQUFYLENBQU47QUFDQTs7QUFFRFEsWUFBU0ksVUFBVCxHQUFzQkosU0FBU0ksVUFBVCxJQUF1QkgsT0FBT0ksSUFBOUIsSUFBc0MsR0FBNUQ7O0FBRUEsT0FBSW5CLFFBQVNjLFNBQVNNLFNBQWxCLEVBQTZCQyxRQUE3QixDQUFKLEVBQTZDO0FBQzVDUCxhQUFTTSxTQUFULENBQW9CLGNBQXBCLEVBQW9DLFdBQXBDO0FBQ0E7O0FBRUQsT0FBSXBCLFFBQVNjLFNBQVNNLFNBQWxCLEVBQTZCQyxRQUE3QixLQUNIckIsUUFBU2UsT0FBT08sTUFBaEIsRUFBd0JDLE1BQXhCLENBREQsRUFFQTtBQUNDLFNBQUssSUFBSUQsTUFBVCxJQUFtQlAsT0FBT08sTUFBMUIsRUFBa0M7QUFDakNSLGNBQVNNLFNBQVQsQ0FBb0JFLE1BQXBCLEVBQTRCUCxPQUFPTyxNQUFQLENBQWVBLE1BQWYsQ0FBNUI7QUFDQTtBQUNEOztBQUVELE9BQUl0QixRQUFTYyxTQUFTVSxHQUFsQixFQUF1QkgsUUFBdkIsQ0FBSixFQUF1QztBQUN0Q1AsYUFBU1UsR0FBVCxDQUFjLHlCQUFnQmpCLFNBQWhCLENBQWQ7QUFDQTs7QUFFRCxVQUFPQSxTQUFQO0FBQ0EsR0F4QkQsRUF3QkdBLFNBeEJIOztBQTBCQVIsU0FBUSxNQUFSLEVBQWdCLFNBQVMwQixJQUFULENBQWVYLFFBQWYsRUFBeUJLLElBQXpCLEVBQStCO0FBQzlDTyxZQUFVWixRQUFWOztBQUVBLFVBQU9QLFVBQ0xNLEtBREssQ0FDRUMsUUFERixFQUNZO0FBQ2pCLFlBQVFLO0FBRFMsSUFEWixDQUFQO0FBSUEsR0FQRCxFQU9HWixTQVBIO0FBU0EsRUFwQ0QsTUFvQ00sSUFBSVosS0FBS2dDLE1BQVQsRUFBaUI7QUFDdEI1QixTQUFRLE1BQVIsRUFBZ0IsU0FBUzBCLElBQVQsQ0FBZUcsU0FBZixFQUEwQjtBQUN6Q0EsZUFBWS9CLE9BQVErQixTQUFSLENBQVo7O0FBRUFBLGFBQVdyQixTQUFYOztBQUVBLFVBQU9BLFNBQVA7QUFDQSxHQU5ELEVBTUdBLFNBTkg7QUFRQSxFQVRLLE1BU0Q7QUFDSixRQUFNLElBQUlELEtBQUosQ0FBVywyQkFBWCxDQUFOO0FBQ0E7O0FBRUQsUUFBT0MsU0FBUDtBQUNBLENBckZEOztBQXVGQXNCLE9BQU9DLE9BQVAsR0FBaUI3QixJQUFqQiIsImZpbGUiOiJtZWVrLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcIm1lZWtcIixcblx0XHRcdFwicGF0aFwiOiBcIm1lZWsvbWVlay5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwibWVlay5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJtZWVrXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvbWVlay5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcIm1lZWstdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRSZXR1cm5zIGEgc3RhdHVzLWRhdGEgSlNPTiBvYmplY3QuXG5cblx0XHRTdXBwbGVtZW50YXJ5IEBjb2RlOnNlbmQ7IG1ldGhvZCBpcyBhcHBsaWVkIHRvIHRoZSBjb25zdHJ1Y3QgZW5hYmxpbmcgYmV0dGVyXG5cdFx0XHRyZWFkYWJpbGl0eSBvZiB0aGUgY29kZS4gVGhpcyB3aWxsIGFjY2VwdCByZXNwb25zZSBvYmplY3QuXG5cblx0XHRSZXNwb25zZSBhcmUgbm90IGNhY2hlZC5cblxuXHRcdFVzZSByZXBseSBmb3IgYmV0dGVyIGZsZXhpYmlsaXR5LlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc2VhXCI6IFwiYXNlYVwiLFxuXHRcdFx0XCJjYWxsZWRcIjogXCJjYWxsZWRcIixcblx0XHRcdFwiY2xhem9mXCI6IFwiY2xhem9mXCIsXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxuXHRcdFx0XCJodHRwXCI6IFwiaHR0cFwiLFxuXHRcdFx0XCJvZmZjYWNoZVwiOiBcIm9mZmNhY2hlXCIsXG5cdFx0XHRcInByb3R5cGVcIjogXCJwcm90eXBlXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgYXNlYSA9IHJlcXVpcmUoIFwiYXNlYVwiICk7XG5jb25zdCBjYWxsZWQgPSByZXF1aXJlKCBcImNhbGxlZFwiICk7XG5jb25zdCBjbGF6b2YgPSByZXF1aXJlKCBcImNsYXpvZlwiICk7XG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcblxuXG5cbi8vOiBUaGVzZSBhcmUgZGVmYXVsdCBzdGF0dXNlcyB5b3UgY2FuIHVzZSBnbG9iYWxseS5cbmhhcmRlbiggXCJGQVRBTFwiLCBcImZhdGFsXCIgKTtcbmhhcmRlbiggXCJJU1NVRVwiLCBcImlzc3VlXCIgKTtcbmhhcmRlbiggXCJGQUlMRURcIiwgXCJmYWlsZWRcIiApO1xuaGFyZGVuKCBcIlBST01QVFwiLCBcInByb21wdFwiICk7XG5oYXJkZW4oIFwiU1VDQ0VTU1wiLCBcInN1Y2Nlc3NcIiApO1xuXG5jb25zdCBtZWVrID0gZnVuY3Rpb24gbWVlayggc3RhdHVzLCBkYXRhICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RhdHVzXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFBST01QVFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRcImRhdGFcIjogXCIqXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdHN0YXR1cyA9IHN0YXR1cyB8fCBQUk9NUFQ7XG5cblx0aWYoICFwcm90eXBlKCBzdGF0dXMsIFNUUklORyApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgc3RhdHVzXCIgKTtcblx0fVxuXG5cdGxldCBjb25zdHJ1Y3QgPSB7IFwic3RhdHVzXCI6IHN0YXR1cyB9O1xuXG5cdGlmKCBhcmd1bWVudHMubGVuZ3RoID09IDIgKXtcblx0XHRjb25zdHJ1Y3QuZGF0YSA9IGRhdGE7XG5cdH1cblxuXHRoYXJkZW4oIFwidG9KU09OXCIsIGZ1bmN0aW9uIHRvSlNPTiggKXtcblx0XHRsZXQgc3RydWN0dXJlID0geyBcInN0YXR1c1wiOiBzdGF0dXMgfTtcblxuXHRcdGlmKCBjb25zdHJ1Y3QuZGF0YSApe1xuXHRcdFx0c3RydWN0dXJlLmRhdGEgPSBkYXRhO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHJ1Y3R1cmU7XG5cdH0sIGNvbnN0cnVjdCApO1xuXG5cdGlmKCBhc2VhLnNlcnZlciApe1xuXHRcdGhhcmRlbiggXCJyZXBseVwiLCBmdW5jdGlvbiByZXBseSggcmVzcG9uc2UsIG9wdGlvbiApe1xuXHRcdFx0aWYoICFyZXNwb25zZSB8fCAhKCBjbGF6b2YoIHJlc3BvbnNlLCBodHRwLlNlcnZlclJlc3BvbnNlICkgKSApe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCByZXNwb25zZVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlIHx8IG9wdGlvbi5jb2RlIHx8IDIwMDtcblxuXHRcdFx0aWYoIHByb3R5cGUoIHJlc3BvbnNlLnNldEhlYWRlciwgRlVOQ1RJT04gKSApe1xuXHRcdFx0XHRyZXNwb25zZS5zZXRIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9qc29uXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoIHByb3R5cGUoIHJlc3BvbnNlLnNldEhlYWRlciwgRlVOQ1RJT04gKSAmJlxuXHRcdFx0XHRwcm90eXBlKCBvcHRpb24uaGVhZGVyLCBPQkpFQ1QgKSApXG5cdFx0XHR7XG5cdFx0XHRcdGZvciggbGV0IGhlYWRlciBpbiBvcHRpb24uaGVhZGVyICl7XG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0SGVhZGVyKCBoZWFkZXIsIG9wdGlvbi5oZWFkZXJbIGhlYWRlciBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIHByb3R5cGUoIHJlc3BvbnNlLmVuZCwgRlVOQ1RJT04gKSApe1xuXHRcdFx0XHRyZXNwb25zZS5lbmQoIEpTT04uc3RyaW5naWZ5KCBjb25zdHJ1Y3QgKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY29uc3RydWN0O1xuXHRcdH0sIGNvbnN0cnVjdCApO1xuXG5cdFx0aGFyZGVuKCBcInNlbmRcIiwgZnVuY3Rpb24gc2VuZCggcmVzcG9uc2UsIGNvZGUgKXtcblx0XHRcdG9mZmNhY2hlKCByZXNwb25zZSApO1xuXG5cdFx0XHRyZXR1cm4gY29uc3RydWN0XG5cdFx0XHRcdC5yZXBseSggcmVzcG9uc2UsIHtcblx0XHRcdFx0XHRcImNvZGVcIjogY29kZVxuXHRcdFx0XHR9ICk7XG5cdFx0fSwgY29uc3RydWN0ICk7XG5cblx0fWVsc2UgaWYoIGFzZWEuY2xpZW50ICl7XG5cdFx0aGFyZGVuKCBcInNlbmRcIiwgZnVuY3Rpb24gc2VuZCggcHJvY2VkdXJlICl7XG5cdFx0XHRwcm9jZWR1cmUgPSBjYWxsZWQoIHByb2NlZHVyZSApO1xuXG5cdFx0XHRwcm9jZWR1cmUoIGNvbnN0cnVjdCApO1xuXG5cdFx0XHRyZXR1cm4gY29uc3RydWN0O1xuXHRcdH0sIGNvbnN0cnVjdCApO1xuXG5cdH1lbHNle1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJjYW5ub3QgZGV0ZXJtaW5lIHBsYXRmb3JtXCIgKTtcblx0fVxuXG5cdHJldHVybiBjb25zdHJ1Y3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lZWs7XG4iXX0=


const assert = require( "assert" );
const meek = require( "./meek.js" );

assert.deepEqual( meek( SUCCESS, { "name": "simple" } ), { "status": "success", "data": { "name": "simple" } },
					"should be deeply equal" );

assert.deepEqual( meek( PROMPT, { "name": "simple" } ), { "status": "prompt", "data": { "name": "simple" } },
					"should be deeply equal" );

assert.deepEqual( meek( ISSUE, { "name": "simple" } ), { "status": "issue", "data": { "name": "simple" } },
					"should be deeply equal" );

assert.deepEqual( meek( FATAL, { "name": "simple" } ), { "status": "fatal", "data": { "name": "simple" } },
					"should be deeply equal" );

console.log( "ok" );

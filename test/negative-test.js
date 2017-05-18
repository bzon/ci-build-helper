'use strict';

const assert = require('assert');
const build = require('../index.js');

describe('Negative Properties Test', function () {

    it('1.0.0.0-SNAPSHOT should be an invalid snapshot version', function() {
        assert.equal(build.isValidSnapshotVersion('1.0.0.0-SNAPSHOT'), false);
    });

    it('1.0.0.0-SNAPSHOT should not return a maven repo', function() {
        assert.equal(build.setMavenRepo('1.0.0.0-SNAPSHOT'), undefined);
    });

    it('1.0.0.1 should not return a maven repo', function() {
        assert.equal(build.setMavenRepo('1.0.0.1'), undefined);
    });

});

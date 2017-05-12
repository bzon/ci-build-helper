'use strict';

const assert = require('assert');
let build = require('../index.js');
let pkgProperties = require('../package.json');

describe('Positive Properties Test', function () {

    it('1.0.0-SNAPSHOT should be a valid snapshot version', function() {
        assert.equal(build.isValidSnapshotVersion('1.0.0-SNAPSHOT'), true);
    });

    it('2.1.0 version should return the release maven repository', function() {
        const repo = build.setMavenRepo('2.1.0');
        assert.equal(repo.id, 'releases');
    });

    it('1.1.0-SNAPSHOT version should return the release maven repository', function() {
        const repo = build.setMavenRepo('1.1.0-SNAPSHOT');
        assert.equal(repo.id, 'snapshots');
    });

    it('package.json version property should be the same with artifactVersion', function() {
        assert.equal(pkgProperties.version, build.artifactVersion);
    });

    it('package.json name property should be the same with artifactName', function() {
        assert.equal(pkgProperties.name, build.artifactName);
    });

    it('package.json mavenGroup property should be the same with group', function() {
        assert.equal(pkgProperties.mavenGroup, build.group);
    });

});

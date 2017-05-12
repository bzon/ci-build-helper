'use strict';

const argv = require('yargs').argv;
const pkgProperties = require(process.cwd() + '/package.json');

module.exports = {

    /**
     * We use this mostly for gulp builds and Nexus packaging
     */
    artifactName: pkgProperties.name,
    artifactVersion: pkgProperties.version,
    group: argv.mavenGroupId || pkgProperties.mavenGroup,
    packaging: argv.packaging || 'war',

    /**
     * SonarQube properties
     */
    sonar: {
        host: {
            url: argv.sonarHostUrl || process.env.SONAR_HOST || 'http://localhost:9000'
        },
        analysis: {
            mode: argv.sonarAnalysisMode || process.env.SONAR_ANALYSIS_MODE || 'preview'
        },
        login: argv.sonarLoginToken || process.env.SONAR_LOGIN,
        projectKey: argv.sonarProjectKey || pkgProperties.name + ':' + pkgProperties.mavenGroup,
        projectName: argv.sonarProjectName || pkgProperties.name,
        projectVersion: process.env.BUILD_NUMBER || argv.sonarProjectVersion || pkgProperties.version,
        sources: argv.sonarSources || 'src',
        sourceEncoding: argv.sonarSourceEncoding || 'UTF-8',
        javascript: {
            lcov: {
                reportPath: argv.javascriptLcovReportPath || 'coverage/lcov.info'
            }
        },
        exec: {
            maxBuffer : 1024*1024
        },
        report: {
            export: {
                path: argv.sonarReportExportPath || 'sonar-report.json'
            }
        },
        exclusions: argv.sonarExclusions || '**/jquery**.*,**/bootstrap**.*,**/**.min.*'
    },

    /**
     * Nexus Maven properties
     */
    isRelease: function(version = pkgProperties.version) {
        if (/^[0-9].[0-9].[0-9]$/.test(version)) {
            return true;
        }
        return false;
    },

    isSnapshot: function(version = pkgProperties.version) {
        if (/^[0-9].[0-9].[0-9]-SNAPSHOT$/.test(version)) {
            return true;
        }
        return false;
    },

    setMavenRepo: function(version = pkgProperties.version) {
        const nexusUsername = argv.nexusUsername || process.env.NEXUS_USER || 'deployment'
        const nexusPassword = argv.nexusPassword || process.env.NEXUS_PASSWORD || 'deployment123'
        const nexusHost = argv.nexusHost || 'localhost:8081/nexus'
        const nexusUrl = 'http://' + nexusUsername + ':' + nexusPassword + '@' + nexusHost
        const snapshotRepo = {
            id: 'snapshots',
            url: nexusUrl + '/content/repositories/snapshots'
        }
        const releaseRepo = {
            id: 'releases',
            url: nexusUrl + '/content/repositories/releases'
        }

        if (this.isSnapshot(version)) {
            return snapshotRepo;
        }
        else if (this.isRelease(version)){
            return releaseRepo;
        }
        else {
            return;
        }
    },

    /**
     * A valid version is always a snapshot version for CI builds.
     */
    isValidSnapshotVersion: function(version = pkgProperties.version) {
        if (this.isSnapshot(version)) {
            return true;
        }
        return false;
    }

};
const {readJsonFile, getPropertyValue, compareNodeVersions} = require('../compareVersions');
const fs = require('fs');
const semver = require('semver');
const path = require('path')
const json = require('../__mocks__/mock.json')

describe('@compareVersions', () => {
  describe('readJsonFile()', () => {
    test('should read a json file', () => {
      const jsonPath = path.join(process.env.PWD, '/lib/__mocks__/mock.json')
      expect(readJsonFile(fs, jsonPath)).toEqual(json)
    })

    test('should fail and return undefined', () => {
      const jsonPath = path.join(process.env.PWD, 'mock.json')
      expect(readJsonFile(fs, jsonPath)).toBeUndefined()
    })
  })

  describe('getPropertyValue()', () => {
    test('should return a node version number', () => {
      expect(getPropertyValue(json, ['engines', 'node'])).toEqual('1.1.0')
    })

    test('should return undefined if properties path is incorrect', () => {
      expect(getPropertyValue(json, ['script', 'node'])).toBeUndefined()
    })
  })

  describe('compareNodeVersions()', () => {
    // [major, minor, patch]
    test('range is less than and equal too', () => {
        expect(compareNodeVersions(semver, '15.0.0')('<=16.0.1')).toEqual(true)
        expect(compareNodeVersions(semver, '16.0.1')('<=16.0.1')).toEqual(true)
        expect(compareNodeVersions(semver, '17.0.0')('<=16.0.1')).toEqual('16.0.1')
    })

    test('range is greater than and equal too', () => {
      expect(compareNodeVersions(semver, '17.0.0')('>=16.0.1')).toEqual(true)
      expect(compareNodeVersions(semver, '16.0.1')('>=16.0.1')).toEqual(true)
      expect(compareNodeVersions(semver, '16.0.0')('>=16.0.1')).toEqual('16.0.1')
    })

    test('range x', () => {
      expect(compareNodeVersions(semver, '16.9.9')('16.x')).toEqual(true)
      expect(compareNodeVersions(semver, '16.0.0')('16.x')).toEqual(true)
      expect(compareNodeVersions(semver, '17.0.0')('16.x')).toEqual('16.0')
    })

    test('range ^', () => {
      // [major, minor, patch]
      // Allows minor and patch version changes
      expect(compareNodeVersions(semver, '16.9.9')('^16.1.0')).toEqual(true)
      expect(compareNodeVersions(semver, '16.1.0')('^16.1.0')).toEqual(true)
      expect(compareNodeVersions(semver, '17.0.0')('^16.1.0')).toEqual('16.1.0')
    })

    test('range ~', () => {
      // Allows patch-level changes if a minor version is specified on the comparator.
      expect(compareNodeVersions(semver, '16.5.10')('~16.5.0')).toEqual(true)
      expect(compareNodeVersions(semver, '16.5.0')('~16.5.0')).toEqual(true)
      expect(compareNodeVersions(semver, '17.0.0')('~16.1.0')).toEqual('16.1.0')
    })
  })
})
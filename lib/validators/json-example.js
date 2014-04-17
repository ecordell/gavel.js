// Generated by CoffeeScript 1.7.1
var JsonExample, JsonSchema, SchemaGenerator, SchemaProperties, errors, jsonPointer, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

errors = require('../errors');

JsonSchema = require('./json-schema').JsonSchema;

jsonPointer = require('json-pointer');

_ref = require('../utils/schema-generator'), SchemaGenerator = _ref.SchemaGenerator, SchemaProperties = _ref.SchemaProperties;

JsonExample = (function(_super) {
  __extends(JsonExample, _super);

  function JsonExample(real, expected) {
    var error, outError, validatorType;
    this.real = real;
    this.expected = expected;
    if (typeof this.real !== 'string') {
      outError = new errors.MalformedDataError('JsonExample validator: provided real data is not string');
      outError['data'] = this.real;
      throw outError;
    }
    if (typeof this.expected !== 'string') {
      outError = new errors.MalformedDataError('JsonExample validator: provided expected data is not string');
      outError['data'] = this.expected;
      throw outError;
    }
    this.expected = JSON.parse(this.expected);
    this.schema = this.getSchema(this.expected);
    try {
      this.real = JSON.parse(real);
    } catch (_error) {
      error = _error;
      validatorType = 'string';
    }
    JsonExample.__super__.constructor.call(this, this.real, this.schema);
  }

  JsonExample.prototype.getSchema = function(data) {
    var properties, schemaGenerator;
    properties = new SchemaProperties({});
    properties.set({
      keysStrict: false,
      valuesStrict: false,
      typesStrict: false
    });
    schemaGenerator = new SchemaGenerator({
      json: data,
      properties: properties
    });
    return schemaGenerator.generate();
  };

  return JsonExample;

})(JsonSchema);

module.exports = {
  JsonExample: JsonExample
};
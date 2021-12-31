#! /usr/bin/env node

require('dotenv').config();
const tsj = require('ts-json-schema-generator');
const fs = require('fs');

const mainType = 'IPluginData';

const config = {
	schemaId: process.env.REACT_APP_NINJA_PLUGIN_TYPE || 'app',
	path: './src/components/plugin/plugin.types.ts',
	tsconfig: './tsconfig.json',
	expose: 'export',
	type: mainType,
};

function removeRequired(obj, parentKey) {
	for (const prop in obj) {
		if (prop === 'required' && parentKey !== mainType) {
			delete obj[prop];
		} else if (typeof obj[prop] === 'object') {
			removeRequired(obj[prop], prop);
		}
	}
	return obj;
}

class MyFunctionTypeFormatter {
	supportsType(type) {
		return type.name === 'React.CSSProperties' || type.name === 'CSSProperties';
	}

	getDefinition(type) {
		return {
			type: 'object',
		};
	}

	// If this type does NOT HAVE children, generally all you need is:
	getChildren(type) {
		return [];
	}
}

// We configure the formatter an add our custom formatter to it.
const formatter = tsj.createFormatter(config, (fmt) => {
	fmt.addTypeFormatter(new MyFunctionTypeFormatter());
});

const program = tsj.createProgram(config);
const parser = tsj.createParser(program, config);
const generator = new tsj.SchemaGenerator(program, parser, formatter, config);
const schema = removeRequired(generator.createSchema(config.type));

// const schema = tsj.createGenerator(config).createSchema(config.type);
let schemaString = JSON.stringify(schema, null, 2);

const pluginDataRef = `"$ref": "#/definitions/IPluginData"`;

schemaString = schemaString.replace(
	pluginDataRef,
	`"allOf": [{ "$ref": "plugin" }],
  "properties": {
    "data": {
      "$ref": "#/definitions/IPluginData"
    }
  }`
);

const output_path = './build/schema.json';
fs.writeFile(output_path, schemaString, (err) => {
	if (err) throw err;
});

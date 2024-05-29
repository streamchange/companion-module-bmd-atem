export class MyOptionsHelperImpl {
    #options;
    #context;
    #fields;
    constructor(options, context, fields) {
        this.#options = options;
        this.#context = context;
        this.#fields = fields;
    }
    getJson() {
        return { ...this.#options };
    }
    getRaw(fieldName) {
        // TODO - should this populate defaults?
        return this.#options[fieldName];
    }
    getPlainString(fieldName) {
        const fieldSpec = this.#fields[fieldName];
        const defaultValue = fieldSpec && 'default' in fieldSpec ? fieldSpec.default : undefined;
        const rawValue = this.#options[fieldName];
        if (defaultValue !== undefined && rawValue === undefined)
            return String(defaultValue);
        return String(rawValue);
    }
    getPlainNumber(fieldName) {
        const fieldSpec = this.#fields[fieldName];
        const defaultValue = fieldSpec && 'default' in fieldSpec ? fieldSpec.default : undefined;
        const rawValue = this.#options[fieldName];
        if (defaultValue !== undefined && rawValue === undefined)
            return Number(defaultValue);
        const value = Number(rawValue);
        if (isNaN(value)) {
            throw new Error(`Invalid option '${String(fieldName)}'`);
        }
        return value;
    }
    getPlainBoolean(fieldName) {
        const fieldSpec = this.#fields[fieldName];
        const defaultValue = fieldSpec && 'default' in fieldSpec ? fieldSpec.default : undefined;
        const rawValue = this.#options[fieldName];
        if (defaultValue !== undefined && rawValue === undefined)
            return Boolean(defaultValue);
        return Boolean(rawValue);
    }
    async getParsedString(fieldName) {
        const rawValue = this.#options[fieldName];
        return this.#context.parseVariablesInString(rawValue);
    }
    async getParsedNumber(fieldName) {
        const str = await this.getParsedString(fieldName);
        return Number(str);
    }
}
//# sourceMappingURL=common.js.map
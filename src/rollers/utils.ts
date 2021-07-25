import { sample } from 'lodash';

export function bodgeString(template: string, dict: Object) {
    // The template string will look like "The [FOO] [BAR]"
    // and we will replace "FOO" and "BAR" with options in dict
    // like dict.foo and dict.bar
    const tagMatcher = /\[([A-Z]+)\]/g;

    return String(template).replace(tagMatcher, (match, key) => {
        key = String(key).toLocaleLowerCase();
        let replacement = dict.hasOwnProperty(key) && Array.isArray(dict[key]) ? sample(dict[key]) : match;
        return replacement;
    });
}
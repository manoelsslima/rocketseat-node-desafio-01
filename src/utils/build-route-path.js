
// /user/:id
export function buildRoutePath(path) {

    const routerParametersRegex = /:([a-zA-Z]+)/g;

    // ?<id> => give name to the group
    const pathWithParams = path.replaceAll(routerParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    // ^ => starts with
    // ? => after ? is optional
    // $ => must end with the regex
    // (.*) => everything after ?
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex;
}
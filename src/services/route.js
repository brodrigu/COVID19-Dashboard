
const baseUrl = window.location.origin + window.location.pathname;

export function getLinkUrl(route = '') {
    let hash = route;
    if (hash.charAt(0) === '/') {
        hash = hash.slice(1, hash.length);
    }
    return `${baseUrl}#/${hash}`;
}

/**
 * redirect to another site/link.
 */
export function redirectTo(link) {
    window.location.href = link;
}

/**
 * redirect/access internal routes
 * @param {string} route
 */
export function access(route) {
    const link = getLinkUrl(route);
    redirectTo(link);
}

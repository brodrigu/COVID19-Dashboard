import 'whatwg-fetch';

const baseUrl = 'https://covidtracking.com';

/**
 * buildUrl
 * builds a url from a base and an object of query parameters
 *
 * @param  {string} base        base url to add query parameters to
 *                              it should not have any query parameters
 * @param  {object} queryParams object containing key-value pairs for query parameters
 * @return {string}             a string with the query parameters appended to the base url.
 */
const buildUrl = (route, queryParams) => {
    const generatedUrl = `${baseUrl}${route}`;

    if (Object.keys(queryParams).length === 0) return generatedUrl;

    const flatQueryParams = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');

    return `${generatedUrl}?${flatQueryParams}`;
};

/**
 * executeRequest
 * takes a object representation of a request executes it and returns
 * a promise to be fulfilled based on request success or failure.
 *
 * @param  {object} request     object representation of a fetch request
 * @return {Promise}            a promise to be fulfilled on request completion
 */
const executeRequest = request => new Promise((resolve, reject) => {
    request.queryParams = request.queryParams || {};
    request.mode = 'cors';
    request.redirect = 'follow';
    request.url = buildUrl(request.url, request.queryParams);
    if (!request.headers) {
        request.headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
    }

    fetch(request.url, request).then((response) => {
        if (response.status >= 400) {
            // intercept if it is a 401 error
            if (response.status === 401) {
                // should proceed to login here
                window.location.href = '#/logout';
            }

            reject(response);
        } else {
            resolve(response);
        }
    }).catch((error) => {
        reject(error);
    });
});

/**
 * uploadImage
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with image url.
 */
export function getDailyUSNumbers() {
    const requestTemplate = {
        // change this to empty headers to automatically set for upload headers
        headers: {},
        method: 'GET',
        url: '/api/us/daily',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

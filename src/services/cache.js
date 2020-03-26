/**
 * Cache Handling in the system.
 */
import store from 'store2';

export function storeCache(key, value) {
    store.session(key, value);
}

export function getCache(key) {
    return store.session(key);
}

export function removeCache(key) {
    store.session.remove(key);
}

/**
 * Get and remove the cache in storage
 * @param {string} key
 */
export function pullCache(key) {
    const data = getCache(key);
    removeCache(key);
    return data;
}

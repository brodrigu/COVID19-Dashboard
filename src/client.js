import 'whatwg-fetch';

import conf from '~app/conf';
import { getAuthToken } from '~services/auth';
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
    const generatedUrl = `${conf.apiBaseUrl}${route}`;

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


    const authToken = getAuthToken();

    if (authToken) {
        request.headers.Authorization = `Bearer ${authToken}`;
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
export function uploadImage({ type, data }) {
    const requestTemplate = {
        body: data,
        // change this to empty headers to automatically set for upload headers
        headers: {},
        method: 'POST',
        url: `/api/v1/upload/image/${type}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getInfluencerScheduleList
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with list of influencer schedule objects
 */
export function getInfluencerScheduleList(queryParams) {
    const requestTemplate = {
        method: 'GET',
        queryParams,
        url: '/api/v1/schedules/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getInfluencerScheduleData
 *
 * @returns {Promise} a promise that resolves on success or failure with influencer schedule object
 */
export function getInfluencerScheduleData(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/schedule/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * saveInfluencerScheduleData
 *
 * @returns {Promise} a promise that resolves on success or failure with influencer schedule object
 */
export function saveInfluencerScheduleData(payload) {
    const requestTemplate = {
        body: JSON.stringify(payload),
        method: 'POST',
        url: '/api/v1/schedule',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateInfluencerScheduleData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function updateInfluencerScheduleData(payload) {
    const requestTemplate = {
        body: JSON.stringify(payload),
        method: 'PUT',
        url: `/api/v1/schedule/${payload.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeInfluencerScheduleData
 */
export function removeInfluencerScheduleData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/schedule/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * saveTrackedData
 *
 * @returns {Promise} a promise that resolves on success or failure with creator object
 */
export function saveTrackedData(params) {
    window.open(buildUrl('/api/v1/track', {
        ...params,
        authorization: getAuthToken(),
    }), '_blank');
    return true;
}

/**
 * getOfferingList
 *
 * @returns {Promise} a promise that resolves on success or failure with list of offering objects
 */
export function getOfferingList(queryParams) {
    const requestTemplate = {
        method: 'GET',
        queryParams,
        url: '/api/v1/offerings/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function getOfferingSlots(offeringId, startDate, endDate) {
    const requestTemplate = {
        method: 'GET',
        queryParams: {
            endDate,
            offeringId,
            startDate,
        },
        url: '/api/v1/booking/slots',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function requestBooking(data) {
    const requestTemplate = {
        body: JSON.stringify(data),
        method: 'POST',
        url: '/api/v1/booking/request',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function confirmBooking(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/booking/${id}/confirm`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getOfferingDiscovery
 *
 * @returns {Promise} a promise that resolves on success or failure with list of offering objects
 */
export function getOfferingDiscovery() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/offerings/discover',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getOfferingPredefinedList
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with list of predefined offering objects
 */
export function getOfferingPredefinedList(queryParams) {
    const requestTemplate = {
        method: 'GET',
        queryParams,
        url: '/api/v1/offerings/default',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getOfferingData
 *
 * @returns {Promise} a promise that resolves on success or failure with offering object
 */
export function getOfferingData(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/offering/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * saveOfferingData
 *
 * @returns {Promise} a promise that resolves on success or failure with offering object
 */
export function saveOfferingData(data) {
    const requestTemplate = {
        body: JSON.stringify(data),
        method: 'POST',
        url: '/api/v1/offering',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateOfferingData
 *
 * @returns {Promise} a promise that resolves on success or failure with offering object
 */
export function updateOfferingData(data) {
    const requestTemplate = {
        body: JSON.stringify(data),
        method: 'PUT',
        url: `/api/v1/offering/${data.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeOfferingData
 *
 * @returns {Promise} a promise that resolves on success or failure with offering object
 */
export function removeOfferingData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/offering/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getInviteGeneration
 *
 * @returns {Promise} a promise that resolves on success or failure with list of invite objects
 */
export function getInviteCodeList(queryParams) {
    const requestTemplate = {
        method: 'GET',
        queryParams,
        url: '/api/v1/invites/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getInviteGeneration
 *
 * @returns {Promise} a promise that resolves on success or failure with list of invite objects
 */
export function getInviteCode(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/invite/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newInviteGeneration
 *
 * @returns {Promise} a promise that resolves on success or failure with list of invite objects
 */
export function newInviteCode({ comment }) {
    const requestTemplate = {
        body: JSON.stringify({ comment }),
        method: 'POST',
        url: '/api/v1/invite',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * validateInviteGeneration
 *
 * @returns {Promise} a promise that resolves on success or failure with return of boolean
 */
export function validateInviteCode({ code }) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/invite/validate/${code}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * reviewInformationSignup
 *
 * @returns {Promise} a promise that resolves on success or failure with user object
 */
export function reviewInformationSignup() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/user/me',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateUserInformation
 *
 * @returns {Promise} a promise that resolves on success or failure with user objects
 */
export function updateUserInformation(user) {
    const requestTemplate = {
        body: JSON.stringify(user),
        method: 'PUT',
        url: `/api/v1/user/${user.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateUserInformation
 *
 * @returns {Promise} a promise that resolves on success or failure with user objects
 */
export function getUserContent() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/user/content/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getCreatorById
 *
 * @returns {Promise} a promise that resolves on success or failure with creator object
 */
export function getCreator(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/creator/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getContentById
 *
 * @returns {Promise} a promise that resolves on success or failure with content object
 */
export function getContent(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/content/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getProductById
 *
 * @returns {Promise} a promise that resolves on success or failure with product object
 */
export function getProduct(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/product/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * searchForKeyword
 *
 * @returns {Promise} a promise that resolves on success or failure with results object
 */
export function searchForKeyword(keyword) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/search/${keyword}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getAllCreators
 *
 * @returns {Promise} a promise that resolves on success or failure with creator list
 */
export function getCreatorList({ pageNum, pageSize }) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/creators/?pageNum=${pageNum}&pageSize=${pageSize}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeCreatorData
 */
export function removeCreatorData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/creator/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * update creator
 *
 * @returns {Promise} a promise that resolves on success or failure with new creator
 */
export function updateCreator(creator) {
    const requestTemplate = {
        body: JSON.stringify(creator),
        method: 'PUT',
        url: `/api/v1/creator/${creator.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getCreatorContentById
 *
 * @returns {Promise} a promise that resolves on success or failure with list of content objects
 */
export function getCreatorContentList(id) {
    const requestTemplate = {
        method: 'GET',
        queryParams: {
            creatorId: id,
        },
        url: '/api/v1/content/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getCreatorProductById
 *
 * @returns {Promise} a promise that resolves on success or failure with list of product objects
 */
export function getCreatorProductList(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/ui/creator-products/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getHairColors
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function getHairColorList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/meta/hair-colors/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getHairColor
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function getHairColor(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meta/hair-color/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newHairColor
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function newHairColorData({ name }) {
    const requestTemplate = {
        body: JSON.stringify({ name }),
        method: 'POST',
        url: '/api/v1/meta/hair-color',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateHairColorData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function updateHairColorData({ id, name }) {
    const requestTemplate = {
        body: JSON.stringify({ id, name }),
        method: 'PUT',
        url: `/api/v1/meta/hair-color/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeHairColorData
 */
export function removeHairColorData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/meta/hair-color/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getEyeColors
 *
 * @returns {Promise} a promise that resolves on success or failure with list of eye color objects
 */
export function getEyeColorList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/meta/eye-colors/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getEyeColor
 *
 * @returns {Promise} a promise that resolves on success or failure with list of eye color objects
 */
export function getEyeColor(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meta/eye-color/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newEyeColor
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function newEyeColorData({ name }) {
    const requestTemplate = {
        body: JSON.stringify({ name }),
        method: 'POST',
        url: '/api/v1/meta/eye-color',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateEyeColorData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function updateEyeColorData({ id, name }) {
    const requestTemplate = {
        body: JSON.stringify({ id, name }),
        method: 'PUT',
        url: `/api/v1/meta/eye-color/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeEyeColorData
 */
export function removeEyeColorData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/meta/eye-color/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getHairTypes
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair type objects
 */
export function getHairTypeList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/meta/hair-types/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getHairType
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair type objects
 */
export function getHairType(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meta/hair-type/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newHairTypeData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function newHairTypeData({ name }) {
    const requestTemplate = {
        body: JSON.stringify({ name }),
        method: 'POST',
        url: '/api/v1/meta/hair-type',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateHairTypeData
 *
 * @returns {Promise} a promise that resolves on success or failure with an updated content object
 */
export function updateHairTypeData({ id, name }) {
    const requestTemplate = {
        body: JSON.stringify({ id, name }),
        method: 'PUT',
        url: `/api/v1/meta/hair-type/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeHairTypeData
 */
export function removeHairTypeData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/meta/hair-type/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getSkinTypes
 *
 * @returns {Promise} a promise that resolves on success or failure with list of skin type objects
 */
export function getSkinTypeList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/meta/skin-types/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getSkinType
 *
 * @returns {Promise} a promise that resolves on success or failure with list of skin type objects
 */
export function getSkinType(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meta/skin-type/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}


/**
 * newSkinType
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function newSkinTypeData({ name }) {
    const requestTemplate = {
        body: JSON.stringify({ name }),
        method: 'POST',
        url: '/api/v1/meta/skin-type',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateSkinTypeData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function updateSkinTypeData({ id, name }) {
    const requestTemplate = {
        body: JSON.stringify({ id, name }),
        method: 'PUT',
        url: `/api/v1/meta/skin-type/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeSkinTypeData
 */
export function removeSkinTypeData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/meta/skin-type/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getEthnicities
 *
 * @returns {Promise} a promise that resolves on success or failure with list of skin type objects
 */
export function getEthnicityList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/meta/ethnicities/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getEthnicities
 *
 * @returns {Promise} a promise that resolves on success or failure with list of skin type objects
 */
export function getEthnicity(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meta/ethnicity/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newEthnicity
 *
 * @returns {Promise} a promise that resolves on success or failure with list of hair color objects
 */
export function newEthnicityData({ name }) {
    const requestTemplate = {
        body: JSON.stringify({ name }),
        method: 'POST',
        url: '/api/v1/meta/ethnicity',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateEthnicityData
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created object
 */
export function updateEthnicityData({ id, name }) {
    const requestTemplate = {
        body: JSON.stringify({ id, name }),
        method: 'PUT',
        url: `/api/v1/meta/ethnicity/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeEthnicityData
 */
export function removeEthnicityData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/meta/ethnicity/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * newCreator
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created created object
 */
export function newCreator(creator) {
    const requestTemplate = {
        body: JSON.stringify(creator),
        method: 'POST',
        url: '/api/v1/creator/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function newCreatorWithCode(creator, code) {
    const requestTemplate = {
        body: JSON.stringify(creator),
        method: 'POST',
        queryParams: {
            code,
        },
        url: '/api/v1/creator/redeem-invite',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * getContentList
 *
 * @returns {Promise} a promise that resolves on success or failure with an array of content objects
 */
export function getContentList({ pageNum, pageSize, filtered }) {
    // temporary
    // this should be post method instead to utilize the datatable.
    const queryParams = filtered.reduce((previousParams, { id, value }) => {
        // fix no param reassign
        const params = previousParams;
        // add it to query params
        params[id] = value;

        return params;
    }, { pageNum, pageSize });

    const requestTemplate = {
        method: 'GET',
        queryParams,
        url: '/api/v1/content/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateContent
 *
 * @returns {Promise} a promise that resolves on success or failure with an updated content object
 */
export function updateContent(content) {
    const requestTemplate = {
        body: JSON.stringify(content),
        method: 'PUT',
        url: `/api/v1/content/${content.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newContent
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created content object
 */
export function newContent(content) {
    const requestTemplate = {
        body: JSON.stringify(content),
        method: 'POST',
        url: '/api/v1/content/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeContentData
 */
export function removeContentData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/content/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getProductList
 *
 * @returns {Promise} a promise that resolves on success or failure with an array of product objects
 */
export function getProductList({ pageNum, pageSize }) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/products/?pageNum=${pageNum}&pageSize=${pageSize}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateProduct
 *
 * @returns {Promise} a promise that resolves on success or failure with an updated product object
 */
export function updateProduct(product) {
    const requestTemplate = {
        body: JSON.stringify(product),
        method: 'PUT',
        url: `/api/v1/product/${product.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newProduct
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created product object
 */
export function newProduct(product) {
    const requestTemplate = {
        body: JSON.stringify(product),
        method: 'POST',
        url: '/api/v1/product/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeProductData
 */
export function removeProductData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/product/${id}`,
    };
    return executeRequest(requestTemplate);
}

/**
 * getBrandList
 *
 * @returns {Promise} a promise that resolves on success or failure with an array of brand objects
 */
export function getBrandList({ pageNum, pageSize }) {
    const requestTemplate = {
        method: 'GET',
        queryParams: {
            pageNum,
            pageSize,
        },
        url: '/api/v1/brands/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * updateBrand
 *
 * @returns {Promise} a promise that resolves on success or failure with an updated brand object
 */
export function updateBrand(brand) {
    const requestTemplate = {
        body: JSON.stringify(brand),
        method: 'PUT',
        url: `/api/v1/brand/${brand.id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * newBrand
 *
 * @returns {Promise} a promise that resolves on success or failure with newly
 * created brand object
 */
export function newBrand({ imageUrl, name }) {
    const requestTemplate = {
        body: JSON.stringify({ imageUrl, name }),
        method: 'POST',
        url: '/api/v1/brand/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * removeBrandData
 */
export function removeBrandData(id) {
    const requestTemplate = {
        method: 'DELETE',
        url: `/api/v1/brand/${id}`,
    };
    return executeRequest(requestTemplate);
}
/**
 * getBrand
 *
 * @returns {Promise} a promise that resolves on success or failure with a brand object
 */
export function getBrand(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/brand/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * findProductVariant
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an array of product variant object
 */
export function findProductVariant(keyword) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/search/product-variants/${keyword}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function updateProductMentions(contentId, productMentions) {
    const requestTemplate = {
        body: JSON.stringify(productMentions),
        method: 'PUT',
        url: `/api/v1/content/${contentId}/product-mentions/`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

export function getProductMentionsForContent(contentId) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/ui/content-product-mentions/${contentId}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * findBrand
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an array of brand objects
 */
export function findBrand(keyword) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/search/brands/${keyword}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * findProduct
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an array of brand objects
 */
export function findProduct(keyword, brandId) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/search/products/${keyword}?brandId=${brandId}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * submit unkown product
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an unknown product
 */
export function submitMissingProduct(data) {
    const requestTemplate = {
        body: JSON.stringify(data),
        method: 'POST',
        url: '/api/v1/missing-products/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * get youtube profile info
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an youtube profile object
 */
export function fetchYoutubeProfile() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/user/youtube-profile',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * get list of pending bookings
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with a booking object
 */
export function getPendingBookingList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/booking/pending',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * accept a booking
 *
 * @returns {Promise} a promise that resolves on success or failure
 */
export function acceptBooking(id) {
    const requestTemplate = {
        method: 'POST',
        url: `/api/v1/booking/${id}/accept`,
    };
    return executeRequest(requestTemplate).then(() => (true));
}

/**
 * reject a booking
 *
 * @returns {Promise} a promise that resolves on success or failure
 */
export function rejectBooking(id) {
    const requestTemplate = {
        method: 'POST',
        url: `/api/v1/booking/${id}/reject`,
    };
    return executeRequest(requestTemplate).then(() => (true));
}

/**
 * get list of scheduled bookings
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with a booking object
 */
export function getScheduledBookingList() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/booking/scheduled',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * request an influencer invite
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with an invite request object
 */
export function requestInvite(data) {
    const requestTemplate = {
        body: JSON.stringify(data),
        method: 'POST',
        url: '/api/v1/ui/request-invite',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * get a meeting
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with a booking object
 */
export function getMeeting(id) {
    const requestTemplate = {
        method: 'GET',
        url: `/api/v1/meeting/${id}`,
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

/**
 * get platform stats
 *
 * @returns {Promise} a promise that resolves on success or failure
 * with a booking object
 */
export function getPlatformStats() {
    const requestTemplate = {
        method: 'GET',
        url: '/api/v1/ui/stats/',
    };
    return executeRequest(requestTemplate).then(response => response.json());
}

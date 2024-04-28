const axios = require('axios');

/**
 * Fetches data from the specified URL using axios.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} headers - The headers to include in the request.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 * @throws {Error} - If an error occurs during the fetch request.
 */
const fetchData = async (url, headers) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = { fetchData };
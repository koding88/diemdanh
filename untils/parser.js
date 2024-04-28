const cheerio = require('cheerio');

/**
 * Parses the student information from the provided data.
 * @param {string} data - The data to parse.
 * @returns {Object} - An object containing the parsed student information.
 * @property {string} studentName - The name of the student.
 * @property {string} dateOfBirth - The date of birth of the student.
 * @property {string} rollNumber - The roll number of the student.
 */
const getStudentInfo = (data) => {
    const $ = cheerio.load(data);
    const studentName = $('#ctl00_mainContent_lblStudentName').text().trim();
    const dateOfBirth = $('#ctl00_mainContent_lblDateOfBirth').text().trim();
    const rollNumber = $('#ctl00_mainContent_lblRollNumber').text().trim();

    return {
        "studentName": studentName,
        "dateOfBirth": dateOfBirth,
        "rollNumber": rollNumber
    };
}

const getScheduleInfo = (data) => {
    const $ = cheerio.load(data);
    const table = $('table').html();
    return table;
}

module.exports = { getStudentInfo, getScheduleInfo };
const puppeteer = require('puppeteer');

/**
 * Launches a browser, navigates to a specific URL, fills in login information, and retrieves cookies.
 * @param {Object} obj - The object containing login information and campus selection.
 * @param {string} obj.campus - The campus selection value.
 * @param {string} obj.username - The username for login.
 * @param {string} obj.password - The password for login.
 * @returns {Object} - An object containing the RequestVerificationToken and ASPNET_SessionId cookies.
 */

// Define an asynchronous function to automate browser actions
const browser = async (obj) => {
    // Launch a new browser instance
    const browserInstance = await puppeteer.launch();
    // Create a new page within the browser
    const page = await browserInstance.newPage();

    // Navigate to the login page
    await page.goto('https://ap.greenwich.edu.vn/Phuhuynh/Login.aspx');

    // Wait for the dropdown to appear
    await page.waitForSelector('#ctl00_mainContent_dllCampus');

    // Select the desired campus from the dropdown
    await page.select('#ctl00_mainContent_dllCampus', obj.campus);

    // Wait for the page navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Get the selected value from the dropdown
    const selectedValue = await page.$eval('#ctl00_mainContent_dllCampus', (element) => element.value);
    console.log("Selected value:", selectedValue);

    // Fill in the login information
    console.log("Filling in login information...");
    const username = obj.username.replace('@fpt.edu.vn', '+');
    await page.type('#ctl00_mainContent_txtUser', username);
    await page.type('#ctl00_mainContent_txtPass', obj.password);

    // Get the typed username and password values
    const typeUserValue = await page.$eval('#ctl00_mainContent_txtUser', (element) => element.value);
    const typePassValue = await page.$eval('#ctl00_mainContent_txtPass', (element) => element.value);
    console.log("Type user value:", typeUserValue);
    console.log("Type pass value:", typePassValue);

    // Click the login button
    page.click('#ctl00_mainContent_btLogin');
    // Wait for the navigation to complete after clicking the login button
    page.waitForNavigation()
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Get the cookies from the page
    const cookies = await page.cookies();
    console.log('Cookies:', cookies);

    // Initialize variables to store the RequestVerificationToken and ASPNET_SessionId
    let RequestVerificationToken;
    let ASPNET_SessionId;

    // Loop through the cookies to find the required tokens
    for (const cookie of cookies) {
        if (cookie.name === '__RequestVerificationToken') {
            RequestVerificationToken = cookie.value;
        } else if (cookie.name === 'ASP.NET_SessionId') {
            ASPNET_SessionId = cookie.value;
        }
    }

    // Return an object containing the RequestVerificationToken and ASPNET_SessionId
    return { RequestVerificationToken, ASPNET_SessionId, browserInstance };
}

// Export the browser function for use in other modules
module.exports = { browser };

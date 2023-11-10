  
/*
POST - We will look into three different ways to do a POST call.

Create a booking by providing static data.
Create a booking by providing data from the JSON file.
Create a booking by creating data at run time that looks realistic and unique. To achieve this, we will use the faker-js npm package, which will give you test data.
Response Validation - Assert the response by either comparing it with JSON data or matching it with data stored in the variable.

GET - Get the booking details by using some of the techniques of query param, without query param and path param. And assert the response for each type.

PUT - Update booking attributes for an existing resource and assert the response.

PATCH - Partially update an existing resource (not all attributes required) and assert the response.

DELETE - Finally, we will delete the booking and assert the response code.

Configuration
With little changes in the playwright.config.js file, you can start creating API tests.

Step 1:
Update baseURL in the playwright.config.js file so you can use it in each endpoint testing without specifying them.
baseURL: 'https://restful-booker.herokuapp.com'
 
Playwright API Testing configuration file
POST Example
Below are three different ways to pass the data in the body while making a POST request. Let’s dive deep into it in this Playwright API testing tutorial section.

POST - Booking with static data
Sends HTTP(s) POST request and returns its response. In this Playwright API testing tutorial section, you will see how a POST call can be made by passing the static data in the body.

Implementation

To create a new booking, we will send a POST request to the /booking endpoint, and you need to provide the request body or payload in the request. Print the JSON response in the console to ensure you have received the entire response. As the endpoint will return a status code of 200 and ok as a status message, you should confirm this using an expect condition.
Also, you can verify if the response body has certain data:

firstname
lastname
totalprice
depositpaid
*/
// @ts-check
const { test, expect } = require('@playwright/test');


test('should be able to create a booking - with static data', async ({ request }) => {
    const response = await request.post("/booking", {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-01",
                "checkout": "2023-06-15"
            },
            "additionalneeds": "Breakfast"
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", "Jim");
    expect(responseBody.booking).toHaveProperty("lastname", "Brown");
    expect(responseBody.booking).toHaveProperty("totalprice", 111);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
});
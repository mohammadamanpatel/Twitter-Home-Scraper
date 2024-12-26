import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { Trend } from "../models/Trends.model.js"; // Import your Trend model
import fs from "fs";
import { config } from "dotenv";
import * as cheerio from "cheerio"; // Corrected import

config();
const { TWITTER_USERNAME, TWITTER_PASSWORD, SCRAPER_PROXY_URL } = process.env;

console.log(
  "TWITTER_USERNAME, TWITTER_PASSWORD, SCRAPER_PROXY_URL",
  TWITTER_USERNAME,
  TWITTER_PASSWORD,
  SCRAPER_PROXY_URL
);

export const runScraper = async (req, res) => {
  let driver;
  const proxyUrl = SCRAPER_PROXY_URL;

  try {
    console.log("Starting the scraper...");

    // Configure Chrome options
    const options = new chrome.Options();
    if (proxyUrl) {
      options.addArguments(`--proxy-server=${proxyUrl}`);
    }
    options.addArguments("--disable-autofill");
    options.addArguments("--disable-features=Autofill");

    // Initialize Selenium WebDriver
    driver = await new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    console.log("Navigating to Twitter login page...");
    await driver.get("https://twitter.com/login");

    // Wait for the username field to appear
    if (!TWITTER_USERNAME || !TWITTER_PASSWORD) {
      throw new Error("TWITTER_USERNAME or TWITTER_PASSWORD is not defined.");
    }

    const usernameField = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.name("text")),
      90000
    );
    await usernameField.sendKeys(TWITTER_USERNAME);

    console.log("Clicking 'Next' button...");
    const loginButton = await driver.wait(
      webdriver.until.elementLocated(
        webdriver.By.xpath('//button[.//span[text()="Log in"]]') // Adjust login button selector if needed
      ),
      60000
    );

    await driver.wait(webdriver.until.elementIsVisible(loginButton), 60000);
    await loginButton.click();

    const passwordField = await driver.wait(
      webdriver.until.elementLocated(webdriver.By.name("password")),
      60000
    );
    await passwordField.sendKeys(TWITTER_PASSWORD, webdriver.Key.RETURN);

    // Wait for a unique element to ensure login is successful
    console.log("Waiting for home page to load...");
    const homePageElement = await driver.wait(
      webdriver.until.elementLocated(
        webdriver.By.css('div[aria-label="Timeline: Your Home Timeline"]')
      ),
      60000 // Adjust the timeout if needed
    );

    console.log("Successfully logged in!");

    // Wait for the page to load completely
    console.log("Waiting for the page to load fully...");
    await driver.sleep(5000); // Wait for a few seconds to ensure the page is loaded

    // Get the page source
    const pageSource = await driver.getPageSource();
    const $ = cheerio.load(pageSource);

    console.log("Parsing the page source...");

    // Parse the page to extract the trending topics under "What's happening"
    const trends = [];
    $('div[data-testid="trend"] span').each((index, element) => {
      if (index < 5) {
        // Limit to the top 5 trends
        console.log("element",element)
        trends.push($(element).text());
      }
    });

    // Handle case where no trends are found
    if (trends.length === 0) {
      console.log("No trends found under 'What's happening'");
    }

    console.log("Trends fetched:", trends);

    // Save the trends to MongoDB
    const record = new Trend({
      uniqueId: Date.now().toString(),
      trends: trends,
      date: new Date(),
      ipAddress: proxyUrl,
    });

    console.log("Saving trends to MongoDB...", record);
    await record.save();
    console.log("Trends saved successfully!");

    return res.status(200).json({
      record,
      message: "Trends fetched",
    });
  } catch (error) {
    console.error("Error during scraping:", error.message);

    // Log full error stack for debugging
    console.error("Error stack:", error.stack);

    // Capture and log the current page source
    if (driver) {
      const pageSource = await driver.getPageSource();
      console.log("Page source for debugging:", pageSource);

      // Optional: Save a screenshot for further debugging
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync("screenshot.png", screenshot, "base64");
      console.log("Screenshot saved as screenshot.png");
    }

    throw error; // Re-throw error for higher-level handling
  } finally {
    if (driver) {
      console.log("Closing the browser...");
      await driver.quit();
    }
  }
};

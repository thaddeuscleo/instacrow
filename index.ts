import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { Browser, Page } from "puppeteer"
import { exit } from "process";
import 'dotenv/config'

// Constant
const username = process.env.USERNAME || ""
const password = process.env.PASSWORD || ""
const url = 'https://www.instagram.com/';
const userUrl = 'https://www.instagram.com/johnmayer'

const userPost = 'https://www.instagram.com/johnmayer/p/Cxvw4tludHE'
const desiredPostCount = 12;

puppeteer.use(stealthPlugin())

const main = async () => {
    const browser: Browser = await puppeteer.launch({
        headless: false,
        executablePath: "/snap/bin/chromium",
    });

    // Create Page
    const page = await browser.newPage();

    // Login
    console.log("[INFO] Open Login Page");
    await loginToUserPage(page);
    const tag = "rezarahadian"

    await getTagPost(tag, page);


    // // Go to User Page
    // let postUrls: string[] = [];
    // console.log("[INFO] Open User Page");
    // postUrls = await getUserPosts(page, postUrls);


    // // Get The User Post ID
    // console.log("[INFO] Open User Post");
    // let postInfoUrl = await getPostIdUri(page);

    // if (typeof postInfoUrl == 'string') {
    //     console.log(`[INFO] Retrieving JSON data: ${postInfoUrl}`);
    //     const uri: string = postInfoUrl;
    //     const result: any[] = [];

    //     page.on('response', async (response) => {
    //         if (response.request().url().includes(uri)) {
    //             const responseObj = await response.json();
    //             result.push(responseObj);
    //         }
    //     })
    //     await page.goto(userPost, {
    //         waitUntil: 'networkidle2',
    //     });
    //     await page.setRequestInterception(false);
    //     if (!existsSync('./outputs')) {
    //         mkdirSync('./outputs');
    //     }
    //     writeFileSync("outputs/data.json", JSON.stringify(result[0]))
    // }

    await browser.close();
}

main()
    .then(() => {
        console.log("App Exit...");
        exit(0)
    })
    .catch((e) => {
        console.log("\n⚠️  Stopped! Error Found!\n");
        console.log(`Error Type: \n${e}\n`);
        console.log(`Error Message: \n${e.message}\n`);
        console.log(`Stack Trace:\n${e.stack}\n`);
    })

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const scrollPageToBottom = async (page: Page) => {
    console.log("[INFO] Scrolling down...");
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await delay(2000)
}

async function getTagPost(tag: string, page: Page) {
    let { tagUri, tagInfoApiUri } = getSearchTagUri(tag);
    page.on('response', async (response) => {
        if (response.request().url().includes(tagInfoApiUri)) {
            const responseObj = await response.json();
            writeToFile(responseObj, './outputs');
        }
    });
    console.log("[INFO] Open Tag Search:", tagInfoApiUri);
    await page.goto(tagUri, {
        waitUntil: "networkidle0",
    });
    try {
        await page.waitForResponse(tagInfoApiUri, {
            timeout: 5000
        });
    } catch (error) {
        console.log("[INFO] TimeOut.");
    }
}

function writeToFile(responseObj: any, location: string) {
    if (!existsSync(location)) {
        mkdirSync(location);
    }
    writeFileSync(location, JSON.stringify(responseObj));
}

async function getPostIdUri(page: Page) {
    await delay(1000);
    await page.goto(userPost, {
        waitUntil: "networkidle2"
    });
    const idUrl = await page.evaluate(() => {
        const metaTag = document.querySelector('meta[property="al:ios:url"]');
        if (metaTag) {
            return metaTag.getAttribute('content');
        }
        return null;
    });


    if (idUrl) {
        const idMatch = idUrl.match(/id=(\d+)/);
        if (idMatch) {
            const postId = idMatch[1];
            return `https://www.instagram.com/api/v1/media/${postId}/info/`;
        }
    }
}

async function getUserPosts(page: Page, postUrls: string[]) {
    await delay(1000);
    await page.goto(userUrl);
    await page.waitForSelector('div._ac7v');
    while (postUrls.length < desiredPostCount) {
        scrollPageToBottom(page)

        const currentPostUrls = await page.evaluate(() => {
            const anchorElements = document.querySelectorAll('a[href*="/p/"]');
            const urls: string[] = [];
            anchorElements.forEach((element) => {
                const href = element.getAttribute('href');
                if (href != null && href.includes('/p/')) {
                    urls.push(href);
                }
            });
            return urls;
        });
        postUrls = Array.from(new Set([...postUrls, ...currentPostUrls]));
    }
    return postUrls;
}

async function loginToUserPage(page: Page) {
    await page.goto(url);
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await delay(2000);
    await page.waitForNavigation();
}

const getSearchTagUri = (tagName: string) => {
    const tagUri = `https://www.instagram.com/explore/tags/${tagName}/`
    const tagInfoApiUri = `https://www.instagram.com/api/v1/tags/web_info/?tag_name=${tagName}`

    return {
        tagUri,
        tagInfoApiUri
    }
}

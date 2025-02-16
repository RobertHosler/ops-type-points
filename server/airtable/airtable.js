/*jshint esversion: 6 */

const https = require("https");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const sharp = require('sharp'); // resizing images
const logger = require("../logger")
const API_TOKEN = process.env.OP_DATABASE_TOKEN || require("../local-api").token;
const MAX_RECORD = 10000;
const AIRTABLE_BASE = "https://api.airtable.com/v0/";

/*
 * getAllData -> return promise
 * getAllData -> invokes getDataSafe
 * getDataSafe -> invokes getData (at a safe interval)
 * getData -> invokes get request to airtable to retrieve json response
 * getData -> invokes callback with json response (callback is defined in getAllData)
 * callback -> parses json or throws an exception if no json returned
 */

function buildUrl(dbKey, table, view, fields) {
  const url = new URL(AIRTABLE_BASE + dbKey + "/" + table);
  url.searchParams.append("maxRecords", MAX_RECORD);
  url.searchParams.append("view", view);
  fields.forEach((field) => {
    url.searchParams.append("fields", field);
  });
  return url;
}

/**
 * Wrap getData call to ensure we aren't calling it too often.
 */
let requests = 0;
let totalRequests = 0;
const maxRequests = 5; // max per second
function getDataSafe(input, offset, callback) {
  if (requests < maxRequests) {
    logger.trace("safe request", input.name, requests);
    getData(input, offset, callback);
  } else {
    logger.trace("safety pause", input.name, requests);
    setTimeout(() => {
      getDataSafe(input, offset, callback);
    }, 200);
  }
}

/**
 * Retrieve data from the provided airtable url
 *
 * @param {*} url
 * @param {*} callback
 * @param {*} offset
 */
function getData(input, offset, callback) {
  requests++;
  let host = input.url.host;
  let path = input.url.pathname + input.url.search + (offset ? "&offset=" + offset : "");
  const timerName = offset ? input.name + "|" + offset : input.name;
  console.time(timerName);
  logger.trace(host, path);
  const req = https
    .request(
      {
        hostname: host,
        path: path,
        headers: {
          Authorization: ('Bearer ' + API_TOKEN)
        }
      },
      (response) => {
        var str = "";

        //another chunk of data has been received, so append it to `str`
        response.on("data", (chunk) => {
          str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on("end", () => {
          callback(str);
          console.timeEnd(timerName);
          totalRequests++;
          console.log("Total Requests", totalRequests)
          setTimeout(() => {
            requests--;
            logger.trace("safe request", input.name, "COMPLETE", requests);
            if (requests === 0) {
              logger.trace("safe requests queue empty");
            }
          }, 1000);
        });
      }
    );
  req.on("error", (e) => {
    console.error("HttpRequest -", input.name, e);
    callback();
  });
  req.end();
}

/**
 * Creates a promise which resolves once all datasets have been retrieved.
 */
function getAllData(input) {
  logger.debug("getAllData", input.name);
  const myPromise = new Promise((resolve, reject) => {
    const allRecords = [];
    const getter = (offset) => {
      // Invoke Get
      getDataSafe(input, offset, (json) => {
        // Handle Get
        if (!json) {
          const reason = "data unavailable -" + input.name;
          console.error(reason);
          reject(reason);
        } else {
          logger.debug("data available -", input.name);
          const result = JSON.parse(json);
          const records = result.records ? result.records : [];
          records.forEach((record) => {
            allRecords.push(record); // combine records
          });
          const offset = result.offset;
          if (offset) {
            // Reinvoke Get
            logger.trace("getAllData", input.name, allRecords.length);
            getter(offset);
          } else {
            // Handle End
            logger.debug("getAllData", input.name, allRecords.length, "COMPLETE");
            resolve(allRecords);
          }
        }
      });
    };
    getter();
  });
  return myPromise;
}

// Example input for getAll
const modelInput = {
  name: "modelName",
  url: new URL("https://api.airtable.com/"),
};

exports.getAll = getAllData;
exports.buildUrl = buildUrl;

exports.getRecordPicture = (pictureField) => {
  let picture = '';
  if (pictureField && pictureField.length > 0) {
    let modifier = '';
    if (pictureField[0].thumbnails) {
      modifier = 'thumbnail';
      picture = pictureField[0].thumbnails.large.url; // small, full, large
    } else if (pictureField[0].url) {
      modifier = 'full';
      picture = pictureField[0].url; // backup method for some data which doesn't have thumbnails?
    }
    picture = storePicture(picture, modifier);
  }
  return picture;
};

/**
 * Stores the picture on the local server and returns its new location
 */
function storePicture(picture, modifier) {
  // Example usage
  var fileName = modifier + '-' + generateUID() + ".jpg";
  downloadImage(picture, fileName)
    .then(imagePath => {
      // console.log('Image path:', imagePath)
    })
    .catch(error => console.error(error));

  return "/images/temp/" + fileName;
}

function generateUID() {
  return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
}

const tempPath = '../../public/images/temp';
const imagesPath = path.join(__dirname, tempPath);
const imageCachePath = path.join(__dirname, tempPath, "cache");


const downloadImage = async (url, fileName) => {
  try {
    // Make an HTTPS request to get the image
    const imageUrl = new URL(url);
    if (imageUrl.protocol !== 'https:') {
      throw new Error('The URL must be an HTTPS URL.');
    }

    // Define the path to save the image on your server
    const tempImagePath = path.join(imageCachePath, fileName);
    const imagePath = path.join(imagesPath, fileName);

    // Return a Promise that resolves when the image has been saved
    const saveImage = new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error('Failed to fetch image, status code: ' + response.statusCode));
        }

        const chunks = [];

        response.on('data', (chunk) => {
          chunks.push(chunk);
        });

        response.on('end', async () => {
          try {
            const buffer = Buffer.concat(chunks);
            await writeFile(tempImagePath, buffer);

            await resizeImage(tempImagePath, imagePath, 300, 300);

            // console.log('Image saved successfully:', imagePath);
            resolve(imagePath); // Return the saved image path
          } catch (err) {
            reject('Error saving image: ' + err.message);
          }
        });

        response.on('error', (err) => {
          reject('Error downloading image: ' + err.message);
        });
      });
    });

    return await saveImage;

  } catch (error) {
    console.error('Error:', error);
  }
};

const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    // console.trace(`Resizing file: ${inputPath}`);
    await sharp(inputPath)
      .resize(width, height, {
        fit: sharp.fit.inside, // Ensures the image fits within the max dimensions
        withoutEnlargement: true, // Prevents enlarging images that are already smaller than the max size
      })
      .toFile(outputPath);

    rename(inputPath, outputPath);

    // console.log(`Resized file: ${outputPath}`);
    // setTimeout(() => {
    //   deleteFile(inputPath);
    // }, 2000);
  } catch (err) {
    console.error('Error resizing image:', err);
  }
};

const rename = (inputPath, outputPath, counter) => {
  try {
    if (counter) {
      counter++;
    } else {
      counter = 1;
    }
    fs.renameSync(inputPath, outputPath); // Overwrite the original file with the resized image
  } catch (err) {
    console.log('retrying rename', counter, inputPath, outputPath);
    setTimeout(() => {
      if (counter < 20) { // max twenty tries
        rename(inputPath, outputPath, counter);
      }
    }, 100);
  }
}

// Function to delete all files in a directory
const deleteAllFilesInDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Iterate over each file in the directory
    files.forEach(file => {
      if (file === ".gitignore" || file === "cache") {
        return;
      }

      const filePath = path.join(dir, file);

      // Delete each file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          // console.log(`Deleted file: ${file}`);
        }
      });
    });
  });
};

exports.refreshImages = () => {
  console.log('deleting images');
  deleteAllFilesInDirectory(imageCachePath);
  deleteAllFilesInDirectory(imagesPath);
};

exports.resetImageCache = () => {
  console.log('clearing image cache');
  deleteAllFilesInDirectory(imageCachePath);
};

exports.buildKey = (name) => {
  return name ? name.toLowerCase().replace(/[.\s-,]/g, '') : '';
};

exports.compareModifiedDates = (a, b) => {
  if (!a && !b) {
    return 0;
  }
  if (a && !b) {
    return 1;
  }
  if (b && !a) {
    return -1;
  }
  return Date.parse(b) - Date.parse(a);
};

exports.getLastModified = (record) => {
  let lastModified = record.fields["Last Modified"];
  if (!lastModified) {
    lastModified = record.fields["Created Date"];
  }
  return lastModified;
}

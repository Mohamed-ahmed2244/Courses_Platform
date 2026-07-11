const fs = require("fs").promises;
const path = require("path");

async function deleteUploadedFile(folderName, fileName) {
  const filePath = path.join( __dirname, "..","uploads", folderName,fileName);

  try {
    await fs.unlink(filePath);
  } 
  catch (error) {
    console.log("Error deleting file:", error.message);
  }
}

module.exports = deleteUploadedFile;


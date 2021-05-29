const Sequelize = require("sequelize");
const express = require("express");
const { Op } = require("sequelize");
const vision = require("@google-cloud/vision");
const router = express.Router();
const _ = require("lodash");
const { createWorker } = require("tesseract.js");
const { billupload } = require("../middleware/imageuploadconfig");
const ENV = require("../env");

router.post("/upload", billupload, async (request, response, next) => {
  try {
    let upload = request.body;
    if (request.file) {
      var image = ENV.siteaddress() + "/images/" + request.file.filename;
      console.log(image);
      const worker = await createWorker({
        logger: (m) => console.log(m),
      });
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(image);
      console.log(text);
      await worker.terminate();

      // Creates a client
      /*  const client = new vision.ImageAnnotatorClient();
      const [result] = await client.textDetection(image);
      const detections = result.textAnnotations;
      console.log("Text:");
      detections.forEach((text) => console.log(text));*/
    } else {
      image = upload.billimage;
    }
    const billimage = image;
    var res = '<a href="/">Home</a><br>';
    res += "Files uploaded successfully.<br>";
    res += `<img src="${billimage}" /><br>`;
    return response.send(res);
    // return response.status(200).json({ message: "File uploaded" });
  } catch (e1) {
    console.log(e1);
    return response
      .status(400)
      .json({ message: "Error while uploading image" });
  }
});

module.exports = router;

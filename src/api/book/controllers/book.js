"use strict";
const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios");
const { Readable } = require("stream");
const { faker } = require("@faker-js/faker");
/**
 * book controller
 */

async function getImageStream(url) {
  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "arraybuffer",
    });
    return response;
  } catch (error) {
    console.error("Error retrieving image:", error.message);
    throw error;
  }
}

module.exports = createCoreController("api::book.book", ({ strapi }) => ({
  async find(ctx) {
    const config = strapi.config.get("plugin.upload");
    const file = await getImageStream(
      "https://images.pexels.com/photos/941456/pexels-photo-941456.jpeg?cs=srgb&dl=pexels-henrik-pfitzenmaier-941456.jpg&fm=jpg&w=4422&h=2948&_gl=1*1pxdm9s*_ga*MTIyMDgwOTEyMy4xNjk3MTk5NDA4*_ga_8JE65Q40S6*MTY5NzE5OTQwOC4xLjEuMTY5NzE5OTQxMC4wLjAuMA.."
    );

    for (let i = 0; i < 100; i++) {
      const photo = {
        name: faker.word.noun(),
      };
      const entity = {
        name: `${photo.name}`,
        hash: `${photo.name}`,
        ext: ".jpg",
        mime: file.headers["content-type"],
        size: file.headers["content-length"],
        provider: config.provider,
        tmpWorkingDirectory: "./public/uploads",
        getStream: () => Readable.from(file.data),
        folderPath: "/",
      };
      await strapi.plugin("upload").service("upload").uploadImage(entity);
      const media = await strapi
        .query("plugin::upload.file")
        .create({ data: entity });
      console.log("Done", photo.name, i);

      try {
        await strapi.entityService.create("api::book.book", {
          data: {
            Title: faker.word.noun(),
            Sinopsis: faker.lorem.paragraph(),
            publicationState: "Published",
            publishedAt: "2023-01-23T17:10:46.984Z",
            cover: media,
          },
        });
      } catch (e) {
        console.log("EEEEEEERRRRRRROR", e.details);
      }
    }

    return ctx.ok;
  },
}));

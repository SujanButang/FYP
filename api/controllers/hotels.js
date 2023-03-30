const { Hotels } = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const addHotel = async (req, res) => {
  try {
    await Hotels.create({
      name: req.body.name,
      distance: req.body.distance,
      score: req.body.score,
      average: req.body.average,
      reviews: req.body.reviews,
      image: req.body.image,
      price_for_x_night: req.body.priceForXNights,
      price: req.body.price,
      discounted_price: req.body.discountedPrice,
      url: req.body.url,
    });
    return res.status(200).json("Added");
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotels.findAll();
    if (!hotels) return res.status(404).json("No any Hotels");
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const searchHotels = async (req, res) => {
  try {
    const hotels = [];
    const urlResponse = await axios.get(
      `https://www.booking.com/searchresults.en-gb.html?ss=${req.query.destination}&checkin=2023-04-28&checkout=2023-04-29&group_adults=1&no_rooms=1&group_children=0&sb_travel_purpose=leisure`
    );
    const $ = cheerio.load(urlResponse.data);
    await Promise.all(
      $('[data-testid="property-card"]').map(async (i, element) => {
        const name = $(element).find('[data-testid="title"]').text();
        const distance = $(element).find('[data-testid="distance"]').text();
        const score = $(element)
          .find('[data-testid="review-score"]>.b5cd09854e ')
          .text();
        const average = $(element)
          .find('[data-testid="review-score"]>.b1e6dd8416 > .b5cd09854e')
          .text();
        const reviews = $(element)
          .find('[data-testid="review-score"]>.b1e6dd8416 >.d8eab2cf7f ')
          .text();
        const image = $(element).find('[data-testid="image"]').attr("src");
        const priceForXNights = $(element)
          .find('[data-testid="price-for-x-nights"]')
          .text();
        const price = $(element)
          .find(
            '[data-testid="availability-rate-information"]>span>div>.c5888af24f e729ed5ab6'
          )
          .text();

        const discounted_price = $(element)
          .find('[data-testid="price-and-discounted-price"]')
          .text();

        const url = $(element)
          .find(".d20f4628d0>.f9d4f2568d>.c90a25d457>a")
          .attr("href");

        hotels.push({
          id: i + 1,
          name,
          distance,
          score,
          average,
          reviews,
          image,
          priceForXNights,
          price,
          discounted_price,
          url,
        });
      })
    );
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getHotels, addHotel, searchHotels };

import axios from "axios";
import { load } from "cheerio";

const hotel = async (destination) => {
  const urlResponse = async () => {
    const res = await axios.get(
      `https://www.booking.com/searchresults.en-gb.html?ss=${destination}`
    );
    return res.data;
  };

  const data = await urlResponse();

  const $ = load(data);
  const hotels = [];
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
      const images = $(element).find('[data-testid="image"]').attr("src");
      const priceForXNights = $(element)
        .find('[data-testid="price-for-x-nights"]')
        .text();
      const price = $(element)
        .find(
          '[data-testid="availability-rate-information"]>.cb5ebe3ffb>div>.c5888af24f'
        )
        .text();

      const discountedPrice = $(element)
        .find('[data-testid="price-and-discounted-price"]')
        .text();

      const url = $(element)
        .find(".d20f4628d0>.f9d4f2568d>.c90a25d457>a")
        .attr("href");

      hotels.push({
        name,
        distance,
        score,
        average,
        reviews,
        images,
        priceForXNights,
        price,
        discountedPrice,
        url,
      });
    })
  );
  return hotels;
};

export default hotel;

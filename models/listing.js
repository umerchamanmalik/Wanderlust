const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://www.bing.com/images/search?view=detailV2&ccid=BAlW8o2Q&id=2D6665515F8E7302B54260F3B2FAF95AAE88C9D9&thid=OIP.BAlW8o2QK3Ayy08tihHX6wHaE7&mediaurl=https%3a%2f%2fcdn-images-1.medium.com%2fmax%2f2000%2f1*YRINRZFr0E1FRJ4JpizEMw.jpeg&exph=1333&expw=2000&q=unsplash&simid=608044890561141208&FORM=IRPRST&ck=B1592702BD49FA5FE065322A62E0A5F1&selectedIndex=12&itb=0&ajaxhist=0&ajaxserp=0",
    set: (v) =>
      v === ""
        ? "https://www.bing.com/images/search?view=detailV2&ccid=BAlW8o2Q&id=2D6665515F8E7302B54260F3B2FAF95AAE88C9D9&thid=OIP.BAlW8o2QK3Ayy08tihHX6wHaE7&mediaurl=https%3a%2f%2fcdn-images-1.medium.com%2fmax%2f2000%2f1*YRINRZFr0E1FRJ4JpizEMw.jpeg&exph=1333&expw=2000&q=unsplash&simid=608044890561141208&FORM=IRPRST&ck=B1592702BD49FA5FE065322A62E0A5F1&selectedIndex=12&itb=0&ajaxhist=0&ajaxserp=0"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

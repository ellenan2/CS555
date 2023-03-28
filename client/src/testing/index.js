import { CurrentOffers } from "./currentOffersTesting.js";
import { offerTesting } from "./offersTesting.js";
import { UserProfile } from "./userProfileTesting.js";
if (CurrentOffers && offerTesting && UserProfile) {
  console.log("Testing successful!");
} else {
  console.log("Testing failure...");
}

export { CurrentOffers, offerTesting, UserProfile };

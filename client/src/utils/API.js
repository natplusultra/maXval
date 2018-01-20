import axios from "axios";

export default {

  // **ITEMS**/
  // gets all products
  getAllItems: function() {
    return axios.get("/api/item");
  },
  // saves a new product to MongoDB
  saveItem: function(productData) {
    return axios.post("/api/item", productData);
  },
  // gets a product by id
  getItem: function(id) {
    return axios.get("/api/item/" + id);
  },
  // updates a product by id
  updateItem: function(id) {
    return axios.put("/api/item/" + id);
  },
  // deletes a product by id
  deleteItem: function(id) {
    return axios.delete("/api/item/" + id);
  },
  // gets all products that belongs to a user by user id
  getItemByOwner: function(id) {
    return axios.get("/api/item/owner/" + id);
  },

  //**REVIEWS**/
  // gets all reviews for a particular product by owner id
  getOwnerReviews: function(id) {
    return axios.get("/api/item/owner/" + id);
  },
  // updates a review for a particular product by owner id
  updateOwnerReview: function(id) {
    return axios.put("/api/item/owner/" + id);
  },
  // deletes a review for a particular product by owner id
  deleteOwnerReview: function(id) {
    return axios.delete("api/item/owner/" + id);
  },
  // gets all reviews
  getAllReviews: function() {
    return axios.get("/api/review");
  },
  // saves a new review to MongoDB
  saveReview: function(reviewData) {
    return axios.post("/api/review", reviewData);
  },
  // gets a review by review id
  getReview: function(id) {
    return axios.get("/api/review/" + id);
  },
  // update a review by review id
  updateReview: function(id) {
    return axios.put("/api/review/" + id);
  },
  // deletes a review by review id
  deleteReview: function(id) {
    return axios.delete("/api/review/" + id);
  },
  // gets a review by item id
  getItemReview: function(id) {
    return axios.get("/api/review/item/" + id);
  },
  // updates a review by item id
  updateItemReview: function(id) {
    return axios.put("/api/review/item/" + id);
  },
  // deletes a review by item id
  deleteItemReview: function(id) {
    return axios.delete("/api/review/item/" + id);
  },

  // **USERS** //
  // gets all users
  getAllUsers: function(){
    return axios.get("/api/user");
  },
  //creates a user in the database
  saveUser: function(userData){
    return axios.post("/api/user", userData);
  },
  //get user by id
  getUser: function(id){
    return axios.get("/api/user" + id);
  },
  updateUser: function(id, userData){
    return axios.put("/api/user" + id, userData)
  },
  deleteUser: function(id){
    return axios.delete("/api/user" + id)
  }


  // saves images to MongoDB 
  // uploadImage: function(imageData) {
  //   return axios.post("/api/upload", imageData);
  // },
  // // retrieves image from MongoDB
  // getSavedImage: function() {
  //   return axios.get("/api/upload");
  // },
  // // deletes images from MongoDB via ID.
  // deleteImage: function(id) {
  //   return axios.delete("/api/upload/" + id);
  // }
};

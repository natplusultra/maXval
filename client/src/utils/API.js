import axios from "axios";


export default {
  // Saves articles to MongoDB 
  uploadImage: function(imageData) {
    return axios.post("/api/upload", imageData);
  },

  // Retrieve articles from MongoDB
  getSavedImage: function() {
    return axios.get("/api/upload");
  },

  // Delete article from MongoDB via ID.
  deleteImage: function(id) {
    return axios.delete("/api/upload/" + id);
  },
};

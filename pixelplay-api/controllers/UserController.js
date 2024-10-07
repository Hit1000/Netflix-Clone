const { response, request } = require("express");
const User = require("../models/UserModels");

module.exports.addToLikedMovies = async (request, response) => {
  try {
    const { email, data } = request.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return response.json({ msg: "Movie already present in Liked list." });
      }
    }
    else{
        await User.create({ email, likedMovies: [data] })
    }
    return response.json({ msg: "Added Movie Successfully" });
  } catch (error) {
    return response.json({ msg: "Error adding movie" });
  }
};


module.exports.getLikedMovies = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await User.findOne({ email })
    if(user){
      response.json({msg: "sucess", movies: user.likedMovies });
    }
    else {
      return response.json({msg: "User not found"});
    }
  } catch (error) {
    return response.json({ msg: "Error fetching movie" });
  }
}
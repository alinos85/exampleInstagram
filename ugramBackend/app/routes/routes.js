module.exports = app => {
    const controller = require("../controllers/controller.js");
    const awsController = require("../controllers/aws.controller.js");
    var router = require("express").Router();
  
    //Create a new user
    router.post("/users", controller.createUser);

    //Find all users, optionnal condition
    router.get("/users", controller.findAllUsers);

    //Find a user by its id
    router.get("/users/:id", controller.getUserByUserName);

    //Modify a user
    router.put("/users/:id", controller.editUser);

    //Create a new image
    router.post("/images", controller.createImage);

    //Find all images, optionnal condition
    router.get("/images", controller.findAllImages);

    //Find an image by its id
    router.get("/images/:id", controller.getImageById);

    //Modify an image
    router.put("/images/:id", controller.editImage);

    //Delete an image
    router.delete("/images/:id", controller.deleteImage);

    //Create a new hashtag
    router.post("/hashtags", controller.createHashtag);

    //Find all hashtags, optionnal condition
    router.get("/hashtags", controller.findAllHashtags);

    //Find an hashtags by its id
    router.get("/hashtags/:id", controller.getHashtagById);

    //Modify an hashtag
    router.put("/hashtags/:id", controller.editHashtag);

    //Delete an hashtags
    router.delete("/hashtags/:id", controller.deleteHashtag);

    //Create a new mention
    router.post("/mentions", controller.createMention);

    //Find all mentions, optionnal condition
    router.get("/mentions", controller.findAllMentions);

    //Find a mention by its id
    router.get("/mentions/:id", controller.getMentionById);

    //Modify a mention
    router.put("/mentions/:id", controller.editMention);

    //Delete a mention
    router.delete("/mentions/:id", controller.deleteMention);

    //Obtain a user with all its images, with associated mentions and hashtags
    router.get("/profile/:id", controller.getProfile);

    //Obtain a user with all its images, with associated mentions and hashtags, with username in body 
    router.get("/profile", controller.getProfileByUserName);

    //Create an image and add hashtags and mentions in one call
    router.post("/posts", controller.createPost);

    //Obtain all images with associated mentions and hashtags, optionnal filtering by userName
    router.get("/posts", controller.getPosts);

    //Obtain an image with associated mentions and hashtags
    router.get("/posts/:id", controller.getPost);

    router.post("/postAWS", awsController.sign_s3)

    app.use('/ugram', router);
  };
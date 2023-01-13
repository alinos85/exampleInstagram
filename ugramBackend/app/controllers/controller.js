const db = require("../models");
const models = db.models
const Op = db.Sequelize.Op;
const awsController = require('./aws.controller.js');

//Créer et sauvegarder un utilisateur
exports.createUser = (req,res) => {
  // Validation
  if (!req.body.userName || !req.body.email || !req.body.lastName || !req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Créer le user puis sauvegarder dans la database
  models.User.create({
    userName: req.body.userName,
    email: req.body.email,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    phone: req.body.phone || null,
    profilePicURL: req.body.profilePicURL || null
  },
  {
    fields: ['userName', 'email', 'lastName', 'firstName', 'phone', 'profilePicURL']
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

//obtenir tous les utilisateurs
exports.findAllUsers = (req,res) => {
  const userName = req.body.userName;
  var condition = userName ? { userName: { [Op.like]: `%${userName}%` } } : null;

  models.User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

//obtenir un utilisateur par son id
exports.getUserByUserName  = (req,res) => {
  const id = req.params.id;

  models.User.findAll({
    where: { userId: id }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting user ${id}.`
    });
  });
};

//modifier un utilisateur dans la bd
exports.editUser  = (req,res) => {
  const id = req.params.id;

  models.User.update(req.body, {
    where: { userId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while updating user ${id}.`
      });
    });
};

//Créer une nouvelle image en BD
exports.createImage = (req,res) => {
  // Validation
  if (!req.body.userId || !req.body.imageUrl) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const imageURL = awsController.sign_s3(req,res);

  // Créer l'image puis sauvegarder dans la database
  models.Image.create({
    userId: req.body.userId,
    imageUrl: imageURL,
    desript: req.body.description || null
  },
  {
    fields: ['userId', 'imageUrl', 'descript']
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the image to the database."
      });
    });
};

//Trouver toutes les images en bd, accepte les conditions
exports.findAllImages = (req,res) => {
  const id = req.body.userName;
  var condition = id ? {userName: id} : null;

  models.Image.findAll({
    where: condition,
    order: [['updatedAt', 'DESC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    });
};

//Trouver une image spécifique par son id
exports.getImageById = (req,res) => {
  const id = req.params.id;

  models.Image.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting image with id=${id}.`
    });
  });
};

//Modifier la description d'une image
exports.editImage = (req,res) => {
  const id = req.params.id;

  models.Image.update(req.body, {
    where: { imageId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Image was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Image with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while updating Image with id=${id}.`
      });
    });
};

//Supprimer une image par son id
exports.deleteImage = (req,res) => {
  const id = req.params.id;

  models.Image.destroy({
    where: { imageId: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Image ${id} was deleted successfully.`
      });
    } else {
      res.send({
        message: `Cannot delete Image with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while deleting image with id=${id}.`
    });
  });
};

//Creer un hashtag
exports.createHashtag = (req,res) => {
  // Validation
  if (!req.body.imageId || !req.body.tag) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Créer le hashtag puis sauvegarder dans la database
  models.Hashtag.create({
    imageId: req.body.imageId,
    tag: req.body.tag
  },
  {
    fields: ['imageId', 'tag']
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the hashtag to the database."
      });
    });
};

//Trouver tous les hashtags
exports.findAllHashtags = (req,res) => {
  const id = req.body.imageId;
  var condition = id ? {imageId: id} : null;

  models.Hashtag.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hashtags."
      });
    });
};

//Trouver un hashtag par son id
exports.getHashtagById = (req,res) => {
  const id = req.params.id;

  models.Hashtag.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting hashtag with id=${id}.`
    });
  });
};

//Modifier un hashtag
exports.editHashtag = (req,res) => {
  const id = req.params.id;

  models.Hashtag.update(req.body, {
    where: { hashtagId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Hashtag was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Hashtag with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while updating Hashtag with id=${id}.`
      });
    });
};

//Supprimer un hashtag
exports.deleteHashtag = (req,res) => {
  const id = req.params.id;

  models.Hashtag.destroy({
    where: {hashtagId: id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Hashtag ${id} was deleted successfully.`
      });
    } else {
      res.send({
        message: `Cannot delete Hashtag with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while deleting Hashtag with id=${id}.`
    });
  });
};

//Creer une mention
exports.createMention = (req,res) => {
  // Validation
  if (!req.body.imageId || !req.body.userName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Créer la mention puis sauvegarder dans la database
  models.Mention.create({
    imageId: req.body.imageId,
    userName: req.body.userName
  },
  {
    fields: ['userId', 'imageId', 'userName']
  })
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the mention to the database."
      });
    });
};

//Trouver toutes les mentions
exports.findAllMentions = (req,res) => {
  const id = req.body.imageId;
  var condition = id ? {imageId: id} : null;

  models.Mention.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mentions."
      });
    });
};

//Trouver une mention par son id
exports.getMentionById = (req,res) => {
  const id = req.params.id;

  models.Mention.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting mention with id=${id}.`
    });
  });
};

//Modifier une mention
exports.editMention = (req,res) => {
  const id = req.params.id;

  models.Mention.update(req.body, {
    where: { mentionId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Mention was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Mention with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while updating Mention with id=${id}.`
      });
    });
};

//Supprimer une mention
exports.deleteMention = (req,res) => {
  const id = req.params.id;

  models.Mention.destroy({
    where: {mentionId: id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Mention ${id} was deleted successfully.`
      });
    } else {
      res.send({
        message: `Cannot delete Mention with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while deleting Hashtag with id=${id}.`
    });
  });
};

addTagsAndMentions = (images, hashtags, mentions) => {
  let hLen = hashtags.length;
  let mLen = mentions.length;

  const len = (hLen > mLen) ? hLen : mLen;
  let ids = images.map(a => a.imageId);
  let i = 0;

  let result = [];

  for (let image of images){
    result.push({
      imageId: image.imageId,
      userId: image.userId,
      imageUrl: image.imageUrl,
      descript: image.descript,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt,
      hashtags: [],
      mentions: []
    });
  }

  for (let n = 0; n < len; n++){
    if (n < hLen){
      const hash = hashtags[n];
      i = ids.indexOf(hash.imageId);
      result[i].hashtags.push(hash);
    }
    if (n < mLen){
      const mention = mentions[n];
      i = ids.indexOf(mention.imageId);
      result[i].mentions.push(mention);
    }
  }
  return result;
}

//Obtenir tous les profiles, filtrer par userName
exports.getProfileByUserName = (req,res) => {
  const userName = req.body.userName;
  var condition = userName ? {userName: userName} : null;
  var profile = {};

  models.User.findAll({
    where: condition
  })
  .then(user => {
    profile.user = user[0];
    const userId = profile.user.userId;

    models.Image.findAll({
      where: {userId: userId},
      order: [['updatedAt', 'DESC']]
    })
    .then(images => {
      let ids = [];
      for (let image of images){
        ids.push(image.imageId);
      }

      if (ids.length != 0){
        Promise.all([
        (models.Hashtag.findAll({
          where: { imageId: { [Op.or]: ids }}
      })),
        (models.Mention.findAll({
          where: { imageId: { [Op.or]: ids }}
      }))])
      .then(data => {
        profile.images = addTagsAndMentions(images, data[0], data[1]);
        res.send(profile);
      })
      }
      else{
        profile.images = [];
        res.send(profile);
      }
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting profile with user id=${id}.`
    });
  });
};

//Obtenir toutes les images d'un usager
exports.getProfile = (req,res) => {
  const id = req.params.id;
  var profile = {};

  models.User.findAll({
    where: { userId: id }
  })
  .then(user => {
    profile.user = user[0];
    const userId = profile.user.userId;

    models.Image.findAll({
      where: {userId: userId},
      order: [['updatedAt', 'DESC']]
    })
    .then(images => {
      let ids = [];
      for (let image of images){
        ids.push(image.imageId);
      }

      if (ids.length != 0){
        Promise.all([
        (models.Hashtag.findAll({
          where: { imageId: { [Op.or]: ids }}
      })),
        (models.Mention.findAll({
          where: { imageId: { [Op.or]: ids }}
      }))])
      .then(data => {
        profile.images = addTagsAndMentions(images, data[0], data[1]);
        res.send(profile);
      })
      }
      else{
        profile.images = [];
        res.send(profile);
      }
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting profile with user id=${id}.`
    });
  });
};

//Creer une image et des hashtags et mentions associes
exports.createPost = (req,res) => {
   // Validation 
   if (!req.body.userId || !req.body.mentions || !req.body.hashtags) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Créer l'image puis sauvegarder dans la database
  models.Image.create({
  userId: req.body.userId,
  imageUrl: req.body.imageUrl,
  desript: req.body.description || null                   
}, 
{ 
  fields: ['userId', 'imageUrl', 'descript'] 
})
.then(image => {
  const id = image.imageId;
  let hashtags = req.body.hashtags;
  let mentions = req.body.mentions;

  for (let i = 0; i < hashtags.length; i++){
    hashtags[i].imageId = id;
  }
  for (let i = 0; i < mentions.length; i++){
    mentions[i].imageId = id;
  }

    Promise.all([
      models.Hashtag.bulkCreate(hashtags),
      models.Mention.bulkCreate(mentions)
    ]).then(data => {
      res.send( {
        image,
        data
      });
    })
    .catch(err => {
      console.log("error while creating mentions and tags");
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while adding the image to the database."
    });
  });
};

//Obtenir tous les posts, ajouter userId dans le body pour obtenir tous les posts de cet user
exports.getPosts = (req,res) => {
  const id = req.body.userId;
  var condition = id ? {userId: id} : null;

  models.Image.findAll({
    where: condition,
    order: [['updatedAt', 'DESC']]
  })
    .then(images => {
      let ids = [];

      for (let image of images){
        ids.push(image.imageId);
      }

      if (ids.length != 0){
        Promise.all([
        models.Hashtag.findAll({
          where: { imageId: { [Op.or]: ids } }
        }),
        models.Mention.findAll({
          where: { imageId: { [Op.or]: ids } }
        })
        ])
        .then(data => {
          posts = addTagsAndMentions(images, data[0], data[1]);
          res.send(posts);
        })
      }
      else {
        posts = [];
        res.send(posts);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

//Obtenir un post par id
exports.getPost = (req,res) => {
  const id = req.params.id;

  Promise.all([
    models.Image.findByPk(id),
    models.Hashtag.findAll({
      where: { imageId: id }
    }),
    models.Mention.findAll({
      where: { imageId: id }
    })
  ])
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
          err.message || `Some error occurred while getting post with id=${id}.`
    });
  });
};

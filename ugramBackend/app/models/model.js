module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false 
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false 
        },
        lastName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phone:{
            type: Sequelize.STRING(20)
        },
        profilePicURL:{
            type: Sequelize.STRING
        }
    });

    const Image = sequelize.define("image", {
        imageId:{
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: Sequelize.SMALLINT,
            references:{
                model: User,
                key: "userId"
            },
            allowNull: false
        },
        imageUrl:{
            type: Sequelize.STRING,
            allowNull: false
        },
        descript:{
            type: Sequelize.TEXT
        }
    });

    const Hashtag = sequelize.define("hashtag", {
        hashtagId: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        imageId: {
            type: Sequelize.SMALLINT,
            references:{
                model: Image,
                key: "imageId"
            },
            allowNull: false
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    const Mention = sequelize.define("mention", {
        mentionId: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        imageId: {
            type: Sequelize.SMALLINT,
            references:{
                model: Image,
                key: "imageId"
            },
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return {
        User,
        Image,
        Hashtag,
        Mention
    }
}
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

//AWS S3 bucket configurations

aws.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = 'amplify-amplifye3181494e37d4-staging-182450-deployment';
const S3_REGION = 'us-east-2';

exports.sign_s3 = (req,res) => {
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  var randomURL = uuidv4();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: randomURL,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err,data) => {
    if(err) {
      console.log("getsignedurl didnt work");
      res.json({success: false, error:err})
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${randomURL}`
    };

  res.json({success:true, data:{returnData}});
  });
};
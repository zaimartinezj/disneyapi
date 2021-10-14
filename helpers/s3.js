const S3 = require('aws-sdk/clients/s3');
require('dotenv').config()

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = async (file, filename, bucketName) => {
    const bucketParams = {
        Bucket: bucketName,
        Key: filename,
        Body: file
      };
      try {

        const {Location} = await s3.upload(bucketParams).promise();
        console.log(Location)
        //file.resume()
        return Location;
      } catch (err) {
        console.log("Error", err);

        }
}
// const signeurl = ({ bucket, key, expires }) => {
//   const signedUrl = s3.getSignedUrl("getObject", {
//     Key: key,
//     Bucket: bucket,
//     Expires: expires || 900, // S3 default is 900 seconds (15 minutes)
//   });

//   return signedUrl;

// }

// console.log(signeurl({bucket:"s3-disney-genres", key: "probando.jpeg"}))

module.exports = {uploadFile}
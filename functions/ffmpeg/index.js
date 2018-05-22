'use strict';

const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  apiVersion: '2012-09-25'
});

/*  */
process.env.PATH += ':/var/task/bin';
const execSync = require('child_process').execSync;

/* ffmepg */
const gifStartTime = '0';
const gifDuration = '3';
const gifScale = 'scale=320:-1';
const gifFps = '5';

exports.handle = async (event, context, callback) => {
  const bucket = event.Records[0].s3.bucket.name;
  const file = event.Records[0].s3.object.key;

  const videoPath = `https://${bucket}.s3.amazonaws.com/${file}`;
  const gifPath = `/tmp/hoge.gif`;

  execSync(`ffmpeg -y -ss ${gifStartTime} -t ${gifDuration} -i ${videoPath} -vf ${gifScale} -r ${gifFps} ${gifPath} >& /dev/null`).toString();

  /* upload */
  const putParams = {
    Bucket: bucket,
    Key: `gif/hoge.gif`,
    Body: new Buffer(fs.readFileSync(gifPath))
  };
  await s3.putObject(putParams).promise()

  callback(null, 'Success');
};
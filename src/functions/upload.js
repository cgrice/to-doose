const crypto = require('crypto')
const AWS = require('aws-sdk')

exports.handler = function(event, context, callback) {
    const s3 = new AWS.S3({
        region : process.env.ENV_AWS_REGION,
        accessKeyId : process.env.ENV_AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.ENV_AWS_SECRET_ACCESS_KEY,
    })

    console.log('buffering')
    const buffer = Buffer.from(event.body, 'base64')
    console.log('getting hash')
    const fileHash = getHash(event)
    console.log('uploading to s3')

    s3.putObject({
        Bucket: 'to-doose-images',
        Key: `${fileHash}.png`,
        Body: buffer,
        ContentType: 'image/png'
    }, (error, data) => {
        console.log('done')
        if (error) {
            callback(null, {
                statusCode: 500,
                body: error.message
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    uploadedFile: `/.netlify/functions/image/${fileHash}`,
                    filename: `${fileHash}.png`,
                }),
                contentType: 'application/json'
            })
        }
    })
}


const getHash = (event) => {
    return Date.now()
}
const crypto = require('crypto')
const AWS = require('aws-sdk')

exports.handler = function(event, context, callback) {
    const s3 = new AWS.S3({
        region : process.env.ENV_AWS_REGION,
        accessKeyId : process.env.ENV_AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.ENV_AWS_SECRET_ACCESS_KEY,
    })

    const buffer = Buffer.from(event.body, 'base64')
    const fileHash = getHash(event)

    s3.putObject({
        Bucket: 'to-doose-images',
        Key: `${fileHash}.png`,
        Body: buffer,
        ContentType: 'image/png'
    }, (error, data) => {
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
    const shasum = crypto.createHash('sha1')
    shasum.update(JSON.stringify(event))
    return shasum.digest('hex')
}
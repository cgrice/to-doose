process.env.AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID
process.env.AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY
process.env.AWS_REGION = env.AWS_REGION

const crypto = require('crypto')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const lambda = new AWS.Lambda()

exports.handler = function(event, context, callback) {
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
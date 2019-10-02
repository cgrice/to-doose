console.log(process.env.ENV_AWS_REGION)

process.env.AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID
process.env.AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY
process.env.AWS_REGION = env.AWS_REGION

const AWS = require('aws-sdk')
const path = require('path')
const s3 = new AWS.S3()

exports.handler = function(event, context, callback) {
    const key = path.basename(event.path)
    
    s3.getObject({
        Bucket: 'to-doose-images-nope',
        Key: `${key}.png`,
    }, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, {
                statusCode: 200,
                headers: {
                  'Content-type': 'image/png'
                },
                body: data.Body.toString('base64'),
                isBase64Encoded: true
            })
        }
        
    })
}

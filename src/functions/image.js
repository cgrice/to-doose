require('dotenv').config()

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

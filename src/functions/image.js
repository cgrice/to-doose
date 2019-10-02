const AWS = require('aws-sdk')
const path = require('path')

exports.handler = function(event, context, callback) {
    
    const s3 = new AWS.S3({
        region : process.env.ENV_AWS_REGION,
        accessKeyId : process.env.ENV_AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.ENV_AWS_SECRET_ACCESS_KEY,
    })

    const key = path.basename(event.path)
    
    s3.getObject({
        Bucket: 'to-doose-images',
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

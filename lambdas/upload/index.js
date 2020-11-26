const multipart = require('aws-lambda-multipart-parser')

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = async (event, context, callback) => {
    const fileData = multipart.parse(event)

    s3.putObject({
        Bucket: 'to-doose-images',
        Key: 'test.png',
        Body: new Buffer(fileData.image.content),
        ContentType: 'image/png'
    }, (error, data) => {
        console.log(data)
        console.log(error)

        
    })

    const response = {
        statusCode: 200,
        body: 'Done!'
    }

    callback(null, response)
}

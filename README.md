#todo-api-sls

Simple API for Todo's, using the
[Serverless framework](https://github.com/serverless/serverless) with
[AWS API Gateway](https://aws.amazon.com/api-gateway/),
[AWS Lambda](https://aws.amazon.com/lambda/),
[AWS Cloudformation](https://aws.amazon.com/cloudformation/) and
[AWS DynamoDB](https://aws.amazon.com/dynamodb/).

Project uses Serverless version 0.5.1 with plugins
* [Optimizer](https://github.com/serverless/serverless-optimizer-plugin)
* [Offline](https://github.com/dherault/serverless-offline)

### Usage
See [Serverless Documentation](http://docs.serverless.com/v0.5.0/docs) for full usage doc.

```bash
# To start local server, emulating the API gateway
$ sls offline start
```

```bash
# To deploy to AWS
$ sls dash deploy
```

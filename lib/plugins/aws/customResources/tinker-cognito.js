'use strict';

const { handler } = require('./resources/cognitoUserPool/handler');

function main() {
  const event = {
    RequestType: 'Delete',
    ResourceProperties: {
      FunctionName: 'philipp-test-dev-test',
      UserPoolName: 'ExistingUserPool',
      UserPoolConfig: {
        // Trigger: 'PreSignUp',
        Trigger: 'CustomMessage',
      },
    },
  };

  const context = {
    invokedFunctionArn: 'arn:aws:lambda:us-east-1:377024778620:function:philipp-test-dev-test',
  };

  return handler(event, context);
}

main();

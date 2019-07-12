'use strict';

const AWS = require('aws-sdk');

function findRuleByName(config) {
  const { eventBusName, ruleName, region } = config;
  const eventBridge = new AWS.EventBridge({ region });

  const params = {
    EventBusName: eventBusName,
    Limit: 500,
  };

  function recursiveFind(nextToken) {
    if (nextToken) params.NextToken = nextToken;
    return eventBridge
      .listRules(params)
      .promise()
      .then(result => {
        const matches = result.Rules.filter(rule => rule.Name === ruleName);
        if (matches.length) {
          return matches.shift();
        }
        if (result.NextToken) return recursiveFind(false, result.NextToken);
        return null;
      });
  }

  return recursiveFind();
}

function getRuleConfiguration(config) {
  const { eventBusName, region } = config;
  const eventBridge = new AWS.EventBridge({ region });

  return findRuleByName(config).then(rule =>
    eventBridge
      .describeRule({
        Name: rule.Name,
        EventBusName: eventBusName,
      })
      .promise()
      .then(data => data)
  );
}

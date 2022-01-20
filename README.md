![image](https://user-images.githubusercontent.com/24211410/150356800-541ea46b-7019-4b25-bde2-98dbb18836fa.png)

# sqs-request
A docker image to build a SQS queue listener. Written in TypeScript, made to use with docker.
SQS queue processor with node, ts-squiss, which processes each message as a request.

![GitHub package.json version](https://img.shields.io/github/package-json/v/marcusyoda/sqs-request)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/sqs-request) ![npm](https://img.shields.io/npm/dy/sqs-request)
[![](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/marcusyoda/sqs-request)
[![](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/marcusyoda/sqs-request)
![GitHub Repo stars](https://img.shields.io/github/stars/marcusyoda/sqs-request)
![GitHub issues](https://img.shields.io/github/issues/marcusyoda/sqs-request)

## TECHNOLOGY:

![LINUX](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)
![WINDOWS](https://img.shields.io/badge/Windows-navy?style=flat-square&logo=windows&logoColor=white)
![DOCKER](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![TYPESCRIPT](https://img.shields.io/badge/TypeScript-2d79c7?style=flat-square&logo=typescript&logoColor=white)
![JAVASCRIPT](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript&logoColor=yellow)
![NODE](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=white)

## WHO SHOULD USE:
Any developer who needs to process a queue at SQS, very well configurable.

## READY TO USE:
https://hub.docker.com/r/marcusyoda/sqs-request

## GETTING STARTED:
To use you need to build with docker...
```bash
docker build -t marcusyoda/sqs-request .
```  
  
...and then configure as your preference:  

It's a docker image, so you're expected to run on your infrastructure consuming an Amazon SQS queue.  
The settings are made via environment:  

|ENV-VAR              | DEFAULT | REQUIRED | DESCRIPTION                                                                                                                                                                                                                                                                            |
|----------------------|--------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|AWS_ACCESS_KEY_ID     |                  |   **YES**   | Amazon login KEY data.
|AWS_SECRET_ACCESS_KEY |                  |   **YES**   | Amazon login SECRET data.
|SQS_REGION            |                  |   **YES**   | The queue region in SQS.
|SQS_QUEUE_NAME        |                  |   **YES**   | The name of the queue in SQS.
|MAX_IN_FLIGHT         |       100        |   **NO**   | The number of messages to keep "in-flight", or processing simultaneously. When this cap is reached, no more messages will be polled until currently in-flight messages are marked as deleted or handled. Setting this option to 0 will uncap your inFlight messages, pulling and delivering messages as long as there are messages to pull. |
|BATCH_SIZE            |       10         |   **NO**   | The number of messages to receive at one time. Maximum 10 or maxInFlight, whichever is lower.                                                                                                                                                                                                                                               |
|POOL_INTERVAL_MS      |       0          |   **NO**   | The number of milliseconds to wait between requesting batches of messages when the queue is not empty, and the maxInFlight cap has not been hit. For most use cases, it's better to leave this at 0 and let Squiss manage the active polling frequency according to maxInFlight.                                                            |
|DELAY_SECS            |       0          |   **NO**   | The number of milliseconds by which to delay the delivery of new messages into the queue by default.                                                                                                                                                                                                                                        |
|DELETE_BATCH_SIZE     |       10         |   **NO**   | The number of messages to delete at one time. Squiss will trigger a batch delete when this limit is reached, or when deleteWaitMs milliseconds have passed since the first queued delete in the batch; whichever comes first. Set to 1 to make all deletes immediate. Maximum 10.                                                           |
|DELETE_WAIT_MS        |       2000       |   **NO**   | The number of milliseconds to wait after the first queued message deletion before deleting the message(s) from SQS.                                                                                                                                                                                                                         |
|IDLE_POLL_INTERVAL_MS |       0          |   **NO**   | The number of milliseconds to wait before requesting a batch of messages when the queue was empty on the prior request.                                                                                                                                                                                                                     |
|AWS_ENDPOINT          |                  |   **NO**   |


## AUTHOR
**Marcus Yoda
[@marcusyoda](https://github.com/marcusyoda)**  
*Prototype development, final version and testing.*    

## VERSIONING
Versioning [SemVer](http://semver.org/).  
To view the available versions, look at: [tags on this repository](https://github.com/marcusyoda/sqs-request/tags).  

## DEPENDENDENCIES:
- Proudly, running with no dependencies.  

## LICENSE:
Developed by Marcus Yoda, during javascript research and study.  
- [MIT License](https://github.com/marcusyoda/sqs-request/blob/master/LICENSE)

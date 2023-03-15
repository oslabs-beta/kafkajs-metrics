<p align="center"><img src="website/assets/logos/KJSM.png" width='200' style="margin-top: 10px; margin-bottom: -10px;"></p>

# **KafkaJSMetrics**

A lightweight KafkaJS library that provides simple access to key metrics within your code. KafkaJSMetrics enables custom breakpoint alerts and logging of key metrics, allowing for client health to be monitored within applications. The optional visualizer feature introduces a real-time, web browser display of the metrics associated with your KafkaJS client.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Visualization](#visualization)
- [Contributing](#contributing)
- [Contributers](#contributors)
- [Other](#other)

# **Introduction**

Problem we are addressing

Solution we have implemented

Apache Kafka is a distributed event streaming platform that is designed to handle high performance data pipelines in real-time. KafkaJS is a lightweight and user friendly Apache Kafka client library that runs on Node.js that provides a simple and reliable way to produce and consume messages from Kafka clusters. Instrumentation events are event eimitters built into KafkaJS that provide information about the performance and behavior of a user's Kafka producers and consumers. These events are designed to help developers monitor and troubleshoot thier Kafka applications but incorporating instrumentation events into code can be tedious and boilerplate heavy.

KafkaJSMetrics is a continuously growing open source product that is designed to simplify and shorten the metric exposing processes. By being 100% javascript and working along side KafkaJS, the library leverages the already built-in instrumentation events without relying on other third-party applications or requiring any additional installations. The library gives developers access to multiple important metrics required to monitor the health of a Kafka instance without the cumbersome boilerplate heavy proccesses.

## **Features**

Below are highlighted key features from KafkaJSMetrics. For full explanation of library functionality, visit our [docs](http://kafkajsmetrics.com/docs)

**Key features include**

- Access to key consumer/producer/admin metrics, including
  - offset lag
  - messages consumed
  - total number of consumer/producer/admins currently connected
  - heartbeat
  - partition assignment
  - and many others!
- Custom Breakpoint Alerts and On/Off metrics logging options, including
  - heartbeat monitor
  - request queue size monitor
  - request pending duration monitor
  - offset lag monitor
  - and many others
- Web-browser visualizer that displays consumer metrics in real-time
  - Secure token access and developer-friendly interface

---

# **Getting Started**

KafkaJSMetrics works with your KafkaJS client. For information on setting up your KafkaJS client, visit [KafkaJS](kafka.js.org).

- [Installation](#installation) and [Usage](#usage) walk through setting up the KafkaJSMetrics library for use within your KafkaJS Client code

- [Visualization](#visualization) takes you through the optional feature set-up for web browser visual display of your KafkaJS Client metrics

## **Installation**

---

Install the [kafkametricsjs-visualizer](npmlink.com) package from npm

```bash
npm install kafkajsmetrics-visualizer
```

---

## **Usage**

KafkaJSMetrics works with your existing KafkaJS client. More information about KafkaJS at [kafka.js.org](kafka.js.org).

1. Require in kafkaJSMetrics

<p align="center"><img src="assets/kafkaClientInstanceWithMetricize.png" width='400' style="margin-top: 10px; margin-bottom: -10px;"></p>
- run code (bash)
- Turn on any logging methods (screen shot of turning on and log)
- create breakpoint alerts (screen shot of creating breakpoint alert and log)
- link to docs for full list of logging and breakpoint alert options

demo of setting logs and breakpoint alerts within code
link to docs for full list of functionality and metrics avilable
show example console logs for logging and breakpoint alerts?

---

## **Visualization**

walk through everything relating to visualizer set up
generate token
add token to metricize function
run client file
click authenticate
view charts
highlight cookie session

---

# **Contributing**

instructions on running application in dev mode
instructions on running tests
contribution guidelines (preferred workflow for contributions, forking, feature branch, pull request)
List of planned/desired features (nice formatting available on miro link)

---

# **Contributors**

---

# **Other**

Important links:

- [Full Documentation](http://kafkajsmetrics.com/docs)
- [Website and Visualizer](http://kafkajsmetrics.com)
- Check out our latest [Medium article](mediumArticle.com)

_KafkaJSMetrics and KafkaJSMetrics Visualizer are licensed under the Mozilla Public License version 2.0 and are available for free. We have no affiliation with and are not endorsed by either The Apache Software Foundation or the developers of KafkaJS._

---

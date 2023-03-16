<p align="center"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/KJSM.png" width='200' style="margin-top: 10px; margin-bottom: 10px;"></p>

# **KafkaJSMetrics**

A lightweight KafkaJS library that provides simple access to key metrics within your code. KafkaJSMetrics enables custom breakpoint alerts and logging of key metrics, allowing for client health to be monitored within applications.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Community](#Community)
- [Contributors](#contributors)
- [Other](#other)

# **Introduction**

Apache Kafka is a distributed event streaming platform that is designed to handle high performance data pipelines in real-time. KafkaJS is a lightweight, user-friendly Apache Kafka client library that runs on Node.js, providing a simple and reliable way to produce and consume messages from Kafka clusters. Event emitters called instrumentation events are built into KafkaJS and provide information about the performance and behavior of a user's Kafka producers and consumers. These events are designed to help developers monitor and troubleshoot their Kafka applications. However, incorporating instrumentation events into code can be tedious and repetitive.

KafkaJSMetrics is a continuously-growing open source product that is designed to simplify and shorten the metric exposing processes. By committing to 100% Javascript alongside KafkaJS, the library leverages already built-in instrumentation events without relying on other third-party applications or requiring any additional installations. The library gives developers simple access to key metrics required to monitor the health of a Kafka instance.

## **Features**

Below are some of the key features from KafkaJSMetrics. For a full explanation of library functionality, visit our [docs](https://www.kafkajsmetrics.com/docs/index.html).

**Key features:**

- Access to key consumer/producer/admin metrics, including
  - offset lag
  - messages consumed
  - total number of consumer/producer/admin currently connected
  - heartbeat
  - partition assignment
  - see [docs](https://www.kafkajsmetrics.com/docs/index.html) for complete metrics
- Custom Breakpoint Alerts and On/Off metrics logging options, including

  - heartbeat monitor
  - request queue size monitor
  - request pending duration monitor
  - offset lag monitor
  - see [docs](https://www.kafkajsmetrics.com/docs/index.html) for complete Breakpoint Alert and metrics logging options

  ***

_For information about the web browser visualizer display feature that pairs with the kafkaJSMetrics library, visit our [main visualizer branch](https://github.com/oslabs-beta/kafkajs-metrics/blob/main/README.md)_

---

# **Getting Started**

KafkaJSMetrics works with your KafkaJS client. For information on setting up your KafkaJS client, visit [KafkaJS](https://kafka.js.org/).

- [Installation](#installation) and [Usage](#usage) walk through setting up the KafkaJSMetrics library for use within your KafkaJS Client code

## **Installation**

---

Install the kafkajs-metrics package from [npm](https://www.npmjs.com/)

```bash
npm install kafkajs-metrics
```

---

## **Usage**

KafkaJSMetrics works with your existing KafkaJS client. More information about KafkaJS at [kafka.js.org](https://kafka.js.org/).

1. Require KafkaJSMetrics in your KafkaJS Client file to access metricize function
<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/requireInKafkaJSMetrics.png" width='400' style="margin-top: 10px; margin-bottom: 10px;"></p>

2. Pass your KafkaJS Client instance into the metricize function (sample KafkaJS Client provided)

   - All consumer, producer, and admin instances created from this client will now have metrics and metrics-associated functionality

<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/kafkaClientInstanceWithMetricize.png" width='400' style="margin-top: 10px; margin-bottom: 10px;"></p>

3. Run your KafkaJS Client file

```bash
node client.js
```

### **Turn on logging methods**

Visit the [docs](https://www.kafkajsmetrics.com/docs/index.html) for a full list of available logging methods

Example:

<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/heartbeatLogOn.png" height='35' style="margin-top: 10px; margin-bottom: 10px;"></p>

Prints to console:

<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/heartbeatConsolelog.png" height='30' style="margin-top: 10px; margin-bottom: 10px;"></p>

### **Turn on breakpoint alerts**

Visit the [docs](https://www.kafkajsmetrics.com/docs/index.html) for a full list of available breakpoint alert methods

Example:

<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/heartbeatSetBreakpoint.png" height='35' style="margin-top: 10px; margin-bottom: 10px;"></p>

Prints to console:

<p align="left"><img src="https://raw.githubusercontent.com/oslabs-beta/kafkajs-metrics/library/assets/heartbeatConsoleBreakpointAlert.png" height='30' style="margin-top: 10px; margin-bottom: 10px;"></p>

---

# **Community**

As KafkaJSMetrics continues to grow, we welcome and encourage feedback! We are also always trying to improve our code so we actively welcome all contributions! If you would like to be a part of this product, please follow the steps below.

1. Fork this repo of KafkaJSMetrics and then clone it to your machine
2. Check out into the branch that you want to make contributions in

   1. Contributions to the library:

      ```bash
      git checkout library
      ```

3. Create a feature branch

```bash
git checkout -b [feature/AmazingFeature]
```

4. Add all your changes with the add command

```bash
git add [all your changes]
```

5. Commit all your changes

```bash
git commit -m '<your comment>'
```

6. Make sure the library branch is up to date

   1. Check back out to the library branch

   ```bash
   git checkout library
   ```

   2. Pull down the latest version

   ```bash
   git pull origin library
   ```

   3. Check back out to your feature branch

   ```bash
   git checkout [feature/AmazingFeature]
   ```

7. Merge your branch with library

```bash
git merge library
```

8. Resolve any merge conflicts
9. Run unit tests and make sure all tests pass

```bash
npm test
```

10. Push up your branch with the command

```bash
git push origin [feature/AmazingFeature]
```

11. Finally, open a pull request for us to review!

---

# **Contributors**

- Rebecca Anderson - [GitHub](https://github.com/Randers9) | [LinkedIn](https://www.linkedin.com/in/rebecca--anderson/)
- Paul Davey - [GitHub](https://github.com/pauldavey1) | [LinkedIn](https://www.linkedin.com/in/paulcdavey/)
- Ranan Hui - [GitHub](https://github.com/rananhui) | [LinkedIn](https://www.linkedin.com/in/rananhui/)
- Amanda Smith - [GitHub](https://github.com/amsmithf) | [LinkedIn](https://www.linkedin.com/in/amanda-margaret-smith/)
- Josh Tesoro - [GitHub](https://github.com/jshwatsoro) | [LinkedIn](https://www.linkedin.com/in/joshwa-tesoro/)

---

# **Other**

Important links:

- [Full Documentation](https://www.kafkajsmetrics.com/docs/index.html)
- [Website](https://www.kafkajsmetrics.com/)
- Check out our latest [Medium article](https://medium.com/@ranan.n.hui/introducing-kafkajsmetrics-a-revolutionary-way-to-expose-metrics-in-kafkajs-ae62678bd3b0)

_KafkaJSMetrics is licensed under the Mozilla Public License version 2.0 and are available for free. We have no affiliation with and are not endorsed by either The Apache Software Foundation or the developers of KafkaJS._

---

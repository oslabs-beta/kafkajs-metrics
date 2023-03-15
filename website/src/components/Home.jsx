/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import ImageCard from './ImageCard.jsx';
import Footer from './Footer.jsx';
import CodeCard from './CodeCard.jsx';
import code01 from '../../assets/code-snippets/code01.jpeg';
import code02 from '../../assets/code-snippets/code02.jpeg';
import code03 from '../../assets/code-snippets/code03.jpeg';
import chartsImg from '../../assets/code-snippets/charts.png';
import snapImg from '../../assets/code-snippets/snap.png';
import jsImg from '../../assets/code-snippets/js.png';

// HomePage includes 4 main sections:
// Intro introduces the product
// Key Features demonstrates features with ImageCard components
// Get Started tells developers how to use the library with CodeCard components
// Footer includes legal disclaimer and links (same links as navbar)
export default function HomePage() {
  return (
    <>
      <div className="intro">
        <h2>
          KafkaJSMetrics is a lightweight JavaScript library providing
          easy-to-use metrics and live alerts to help monitor the health of your
          KafkaJS consumers, producers, and admins. It integrates seamlessly
          with your existing KafkaJS client and is activated with just one line
          of code.
        </h2>
        <div className="codebox">
          <code className="greyout">
            const kafka = new Kafka();<br></br>
            <br></br>
          </code>
          <code>
            <code className="salmon">metricize</code>
            (kafka);<br></br>
            <br></br>
          </code>
          <code className="greyout">
            const producer = kafka.producer();<br></br>
            const consumer = kafka.consumer();
            <br></br>
            ...
          </code>
        </div>
      </div>
      <div className="homepage-section">
        <h1>Key Features</h1>
        <div className="card-grid">
          <ImageCard
            img={code01}
            name="Event-Based Metrics"
            desc="Harness the power of KafkaJS's instrumentation events without lifting a finger—KJSM provides a full suite of live-updating metrics as soon as it's run"
          />
          <ImageCard
            img={code02}
            name="Breakpoint Alerts"
            desc="Monitor your KafkaJS client on your own terms with KJSM's customizable breakpoint alerts"
          />
          <ImageCard
            img={code03}
            name="Console Logs"
            desc="Keep an eye on your client's health the easy way with optional preconfigured console logs"
          />
          <ImageCard
            img={chartsImg}
            name="Visualization"
            desc="Watch your consumer metrics in real time with the KJSM visualizer—just plug in a unique ID and spin up your client"
          />
          <ImageCard
            img={snapImg}
            name="Easy To Use"
            desc="No need to rewrite your KafkaJS client! Just add one line of code, and KJSM generates metrics for all your consumers, producers, and admins"
          />
          <ImageCard
            img={jsImg}
            name="Lean and Clean"
            desc="Just like KafkaJS, KJSM is lightweight, dependency-free, and 100% JavaScript. Choose between a streamlined library or add optional visualizer connectivity"
          />
        </div>
      </div>
      <div className="homepage-section">
        <h1>Get Started</h1>
        <div className="card-area">
          <CodeCard
            name="Easy as 1-2-3"
            code={[
              <>
                <code className="greyout">
                  // install from the command line<br></br>
                </code>
                <code>
                  npm install kafkajs-metrics<br></br>
                  <br></br>
                </code>
                <code className="greyout">
                  // require metricize function<br></br>
                </code>
                <code>
                  const &#123; metricize &#125; =
                  require(&apos;kafkajs-metrics&apos;);
                  <br></br>
                  <br></br>
                </code>
                <code className="greyout">
                  // metricize your client<br></br>
                </code>
                <code>metricize(clientName);</code>
              </>,
            ]}
            desc={[
              'You can turn your KafkaJS client into a metrics-rich environment in just 3 steps:',
              <ol key="list">
                <li key="1">npm install</li>
                <li key="2">require</li> <li key="3">metricize</li>
              </ol>,
              'For more detailed instructions on getting started, ',
              <a
                key="readme"
                href="https://github.com/oslabs-beta/kafkaMetrics/blob/main/README.md"
              >
                check out the readme
              </a>,
              '. For a full list of metrics and how to use them, ',
              <a key="docs" href="/docs/index.html">
                see our documentation
              </a>,
              '.',
            ]}
          />
          <CodeCard
            code={[
              <>
                <code className="greyout">
                  // install from the command line<br></br>
                </code>
                <code>
                  npm install kafkajs-metrics-visualize<br></br>
                  <br></br>
                </code>
                <code className="greyout">
                  // require metricize function<br></br>
                </code>
                <code>
                  const &#123; metricize &#125; =
                  require(&apos;kafkajs-metrics-visualize&apos;);
                  <br></br>
                  <br></br>
                </code>
                <code className="greyout">
                  // metricize your client<br></br>
                </code>
                <code>metricize(clientName, true, UNIQUE_ID_HERE);</code>
              </>,
            ]}
            name="Add Visualization"
            desc={[
              'The ',
              <a key="link" href="/#/visualizer">
                KafkaJSMetrics visualizer
              </a>,
              ' monitors the health of your consumers with a variety of charts. To use the visualizer, install the visualization-enabled version of the library and pass your secret key into the metricize function. More information on using the visualizer is available in ',
              <a
                key="readme"
                href="https://github.com/oslabs-beta/kafkaMetrics/blob/main/README.md"
              >
                our readme
              </a>,
              '.',
            ]}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

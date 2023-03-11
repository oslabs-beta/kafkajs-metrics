/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import ImageCard from './ImageCard.jsx';
import Footer from './footer.jsx';
import CodeCard from './CodeCard.jsx';

export default function Home() {
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
      <div className="homepageSection">
        <h1>Key Features</h1>
        <div className="cardArea">
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Event-Based Metrics"
            desc="Harness the power of KafkaJS's instrumentation events without lifting a finger—KJSM provides a full suite of live-updating metrics as soon as it's run"
          />
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Breakpoint Alerts"
            desc="Monitor your KafkaJS client on your own terms with KJSM's customizable breakpoint alerts"
          />
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Console Logs"
            desc="Keep an eye on your client's health the easy way with optional preconfigured console logs"
          />
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Visualization"
            desc="Watch your consumer metrics in real time with the KJSM visualizer—just plug in a unique ID and spin up your client"
          />
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Easy To Use"
            desc="No need to rewrite your KafkaJS client! Just add one line of code, and KJSM generates metrics for all your consumers, producers, and admins"
          />
          <ImageCard
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Lean and Clean"
            desc="Just like KafkaJS, KJSM is lightweight, dependency-free, and 100% JavaScript. Choose between a streamlined library or add optional visualizer connectivity"
          />
        </div>
      </div>
      <div className="homepageSection">
        <h1>Get Started</h1>
        <div className="cardArea">
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
              'The KafkaJSMetrics visualizer monitors the health of your consumers ',
              <a key="link" href="/#/visualizer">
                here
              </a>,
              '. To use the online visualizer, install the visualizer-enabled version of the library and pass your secret key into the metricize function',
            ]}
          />
          {/* <CodeCard
            img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
            name="Logs"
            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
          /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

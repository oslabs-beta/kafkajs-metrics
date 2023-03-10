import React from 'react';
import KeyFeatureComponent from './keyFeatureComponent.jsx';
import howToComponents from './howToComponents.jsx';
import Footer from './footer.jsx';

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
      <div className="keyFeatures">
        <h1>Key Features</h1>
        <div className="keyFeatureCardArea">
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Event-Based Metrics"
            desc="Harness the power of KafkaJS's instrumentation events without lifting a finger—KJSM provides a full suite of live-updating metrics as soon as it's run"
          />
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Breakpoint Alerts"
            desc="Monitor your KafkaJS client on your own terms with KJSM's customizable breakpoint alerts"
          />
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Console Logs"
            desc="Keep an eye on your client's health the easy way with optional preconfigured console logs"
          />
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Visualization"
            desc="Watch your consumer metrics in real time with the KJSM visualizer—just plug in a unique ID and spin up your client"
          />
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Easy To Use"
            desc="No need to rewrite your KafkaJS client—just npm install, write one line of code, and KJSM adds metrics for all your consumers, producers, and admins"
          />
          <KeyFeatureComponent
            img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
            name="Lean and Clean"
            desc="Just like KafkaJS, KJSM is lightweight, dependency-free, and 100% JavaScript"
          />
        </div>
      </div>
      <div className="howToContainer">
        <div className="howToContainerContents">
          <div className="contents">
            <h1>How to download</h1>
            <div className="howToContent">
              <KeyFeatureComponent
                name="Instrumentation Events"
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                desc="Lorem Ipsu is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
              />
              <KeyFeatureComponent
                img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
                name="Breakpoint Alerts"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
              />
              <KeyFeatureComponent
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                name="Logs"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

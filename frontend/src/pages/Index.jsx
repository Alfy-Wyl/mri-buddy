import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import Layout from "../components/shared/Layout";
import { BACKEND_URL } from "../constants/config";

const Index = () => {
  const [safetyInfos, setSafetyInfo] = useState([]);
  const [mriInfos, setMriInfos] = useState([]);

  const fetchHomePageData = async () => {
    const request = await fetch(BACKEND_URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (request.ok) {
      const response = await request.json();

      setSafetyInfo(response.safetyInfos);
      setMriInfos(response.mriInfos);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  return (
    <Layout>
      <main>
        <section className="hero">
          <h1>Welcome to MRI-Buddy</h1>
          <p>
            The best place to learn everything about what your MRI scan entails.
          </p>
          <button onclick="showDropdown()">Get Started</button>
          <div id="dropdown" style={{ display: "none" }}>
            <ul>
              <li>
                <a href="#topic1">Topic 1</a>
              </li>
              <li>
                <a href="#topic2">Topic 2</a>
              </li>
              <li>
                <a href="#topic3">Topic 3</a>
              </li>
              <li>
                <a href="#topic4">Topic 4</a>
              </li>
              <li>
                <a href="#topic5">Topic 5</a>
              </li>
              <li>
                <a href="#topic6">Topic 6</a>
              </li>
            </ul>
          </div>
        </section>

        <section className="featured">
          <div className="wrapper">
            <Form />
          </div>

          <h2>MRI Overview</h2>
          <div className="grid">
            {mriInfos.map((info) => (
              <Card
                key={info.id}
                title={info.title}
                description={info.description}
                image={info.imageUrl}
                alt={info.alt}
                hasContent={info.hasContent}
                id={info.id}
              />
            ))}

            {/* <Card
              title={"How MRI Works"}
              description={
                "The Magnetic Resonance Imaging (MRI) machine contains a powerful magnet that generates a strong magnetic field around the patient's body to produce detailed images of internal structures of the body."
              }
              image="/images/neck image.png"
              alt="MRI image"
            />

            <Card
              title={"Preparing For Your Scan"}
              description={
                "If you have an MRI appointment, there are a few things you can do to prepare for the procedure. MRI scans typically take between 30 and 60 minutes, depending on the area of the body being scanned."
              }
              image="/images/pt prep.png"
              alt="Patient Preparation"
            /> */}
          </div>
        </section>

        <section className="featured">
          <h2>MRI Safety, Contrast & Claustrophobia </h2>
          <div className="grid">
            {safetyInfos.map((info) => (
              <Card
                key={info.id}
                title={info.title}
                description={info.description}
                image={info.imageUrl}
                alt={info.alt}
                hasContent={info.hasContent}
                id={info.id}
              />
            ))}
            {/* <Card
              title={"MRI Contrast Injection"}
              description={
                "Magnetic Resonance Imaging (MRI) contrast injection involves the use of a contrast agent to enhance the visibility of certain tissues and blood vessels during an MRI scan."
              }
              image="/images/contrast.png"
              alt="MRI Contrast"
            />

            <Card
              title={"Patient Safety"}
              description={
                " MRI is generally considered a safe and non-invasive imaging technique. However, there are some safety concerns associated with the use of MRI, particularly for patients with implants or devices in their bodies."
              }
              image="/images/warning sign.png"
              alt="Warning Sign"
            />

            <Card
              title={"Claustrophobia & Anxiety"}
              description={
                "MRI can be a stressful experience for some people, particularly those who suffer from claustrophobia or anxiety. Claustrophobia is the fear of enclosed or tight spaces, and some patients may feel anxious or uncomfortable in the narrow,enclosed space of an MRI scanner."
              }
              image={"/images/claustrophobia.png"}
              alt="claustrophobia"
            /> */}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;

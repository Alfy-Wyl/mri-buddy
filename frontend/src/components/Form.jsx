import React, { useState } from "react";
import Slider from "react-slick";
import { questions } from "../constants/question";
import { v4 as uuid } from "uuid";
import { BACKEND_URL } from "../constants/config";

const Form = () => {
  const sliderRef = React.useRef();
  const [responseType, setResponseType] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const request = await fetch(BACKEND_URL + "validate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    try {
      const response = await request.json();

      if (request.status == 200) {
        setResponseType(response.status);
        setResponseMsg(response.message);
      } else if (request.status == 400) {
        setResponseType(response.status);
        setResponseMsg(response.message);
      }
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      <div>
        <div id="start-screen" className="start">
          <h2>MRI Questions Prior to Scan</h2>
          <p>
            <strong>Scheduled for an MRI scan?</strong>
          </p>
          <p>
            <strong>
              Answer the questions with <span>YES/NO</span> to assess your
              suitability.
            </strong>
          </p>
          <button
            onClick={() => {
              sliderRef?.current?.slickNext();
            }}
            id="start"
          >
            Start
          </button>
        </div>
      </div>
      {questions.map((question) => (
        <div key={uuid()}>
          <div id="questions" className="hide">
            <h2 id="question-title">{question.title}</h2>
            <div id="options" className="options">
              {question.choices.map((answer) => (
                <button
                  onClick={async () => {
                    setAnswers((answers) => [...answers, answer.toLowerCase()]);
                    if (question.isSubmit) {
                      await handleSubmit();
                    }
                    sliderRef?.current?.slickNext();
                  }}
                  className={answer.toLowerCase()}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div key={uuid()}>
        <div id="questions" className="hide">
          {responseType == "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}

          {responseType == "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          <h2 id="question-title">{responseMsg}</h2>
          <div id="options" className="options">
            <button
              onClick={() => {
                sliderRef?.current?.slickNext();
              }}
              className={"yes"}
            >
              Check Again
            </button>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Form;

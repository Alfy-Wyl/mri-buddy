import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/shared/Layout";
import "./detail.css";
import { BACKEND_URL } from "../constants/config";

const Detail = () => {
  const params = useParams();
  const id = params.detail_id;
  const [pageDetail, setPageDetail] = useState({});

  const fetchPageDetail = async () => {
    const request = await fetch(`${BACKEND_URL}detail/${id}`);

    if (request.ok) {
      const response = await request.json();
      setPageDetail(response.item);
    }
  };

  useEffect(() => {
    fetchPageDetail();
  }, [id]);
  return (
    <Layout>
      <section>
        <article>
          <h2>{pageDetail.title}</h2>
          <div class="container">
            <img
              class="picture"
              src={pageDetail.imageUrl}
              alt={pageDetail.alt}
            />
            <article class="info">
              {pageDetail?.content?.map((item, key) => (
                <p key={key}>{item}</p>
              ))}
            </article>
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default Detail;

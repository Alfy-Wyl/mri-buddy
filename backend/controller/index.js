class AppController {
  // Since no database is being used, all the data is being stored directly in this class. it can be optimize to use a database
  safetyInfo = [
    {
      id: "1",
      imageUrl: "/images/contrast.png",
      alt: "MRI Contrast",
      description:
        "Magnetic Resonance Imaging (MRI) contrast injection involves the use of a contrast agent to enhance the visibility of certain tissues and blood vessels during an MRI scan.",
      title: "MRI Contrast Injection",
      content: [
        "Magnetic Resonance Imaging - MRI contrast injection involves the use of a contrast agent to enhance the visibility of certain tissues and blood vessels during an MRI scan.",
        "The most commonly used contrast agents for MRI scans contain a substance called Gadolinium. Gadolinium contrast agents are generally safe and well-tolerated by patients, but there are some risks associated with their use, particularly in people with kidney problems.",
        "During the MRI scan, the contrast agent travels through the bloodstream and into the tissues being imaged. This helps to create a clearer and more detailed image of the area being examined. The contrast agent is eventually eliminated from the body through the kidneys.",
        "The decision to use contrast injection during an MRI scan is usually made by a radiologist or a referring physician based on the patient's medical history and the specific imaging needs.",
      ],
    },

    {
      id: "2",
      imageUrl: "/images/warning sign.png",
      alt: "Warning Sign",
      description:
        "MRI is generally considered a safe and non-invasive imaging technique. However, there are some safety concerns associated with the use of MRI, particularly for patients with implants or devices in their bodies.",
      title: "Patient Safety",
    },
    {
      id: "3",
      imageUrl: "/images/claustrophobia.png",
      alt: "claustrophobia",
      description:
        "MRI can be a stressful experience for some people, particularly those who suffer from claustrophobia or anxiety. Claustrophobia is the fear of enclosed or tight spaces, and some patients may feel anxious or uncomfortable in the narrow,enclosed space of an MRI scanner.",
      title: "Claustrophobia & Anxiety",
      content: [
        "MRI can be a stressful experience for some people, particularly those who suffer from claustrophobia or anxiety. Claustrophobia is the fear of enclosed or tight spaces, and some patients may feel anxious or uncomfortable in the narrow, enclosed space of an MRI scanner.",
        "There are several strategies that can help alleviate anxiety and claustrophobia during an MRI scan. Many MRI facilities offer open MRI scanners, which are less enclosed and may be a more comfortable option for patients with claustrophobia.",
        "Another strategy is to distract patients during the scan, such as by providing music,or audiobooks.",
        "It is important for patients to communicate with their healthcare providers about any concerns they may have about the MRI scan. Healthcare providers can provide support and guidance to help patients manage anxiety and claustrophobia during the procedure.",
      ],
    },
  ];

  mriOverview = [
    {
      id: "4",
      imageUrl: "/images/mri scanner.png",
      alt: "MRI Scanner",
      description:
        "MRI stands for Magnetic Resonance Imaging. It is a medical imaging technique that uses a strong magnetic field and radio waves to generate detailed images of the inside of the body.",
      title: "What is MRI",
      content: [
        " MRI stands for Magnetic Resonance Imaging. It is a medical imaging technique that uses a strong magnetic field and radio waves to generate detailed images of the inside of the body. This makes the MRI different from ionizing radiation based modalities such as X-Ray and Computed Tomography (CT)",
        " MRI machines create high-resolution images of the body's internal structures, including organs, tissues, and bones, without the use of X-rays.",
        " MRI is a non-invasive diagnostic tool and is often used to diagnose a wide range of medical conditions, including neurological disorders, joint and muscle problems, and cancer. It is also used to monitor the progress of treatment and to guide surgical procedures.",
        " This can help your physician make a diagnosis and recommend the best treatment options for your condition.",
        " MRI is a safe and painless procedure, although patients with metal implants or devices may not be able to undergo the test due to safety concerns.",
        " If you have any metal implant or medical device implanted in your body, be sure to communicate it to your healthcare provider before proceeding to have your scan.",
      ],
    },
    {
      id: "5",
      imageUrl: "/images/neck image.png",
      alt: "MRI image",
      description:
        "The Magnetic Resonance Imaging (MRI) machine contains a powerful magnet that generates a strong magnetic field around the patient's body to produce detailed images of internal structures of the body.",
      title: "How MRI Works",
    },
    {
      id: "6",
      imageUrl: "/images/pt prep.png",
      alt: "Patient Preparation",
      description:
        "If you have an MRI appointment, there are a few things you can do to prepare for the procedure. MRI scans typically take between 30 and 60 minutes, depending on the area of the body being scanned.",
      title: "Preparing For Your Scan",
      content: [
        "Avoid wearing jewelry and metal objects: Metal objects can interfere with the MRI and cause inaccurate results. Remove all metal objects before your MRI, including jewelry, piercings, and hair accessories.",
        "Wear comfortable clothing: Wear comfortable, loose-fitting clothing without any metal zippers, buttons, or snaps. You may also be given a hospital gown to wear during the scan.",
        "Discuss any concerns with your doctor: If you have any concerns about the MRI, such as claustrophobia, anxiety, or discomfort lying still for an extended period, talk to your healthcare. They may be able to offer solutions to make you more comfortable or offer alternative imaging methods.",
        "Be sure to arrive on time for your appointment, as being late may cause unnecessary stress and delay the scan.",
      ],
    },
  ];

  // using this controller to return the data needed for the home page
  getHomePageData = (req, res) => {
    // fetch and map all mri safety info for serialization purposes
    const safetyInfos = this.safetyInfo.map((item) => ({
      imageUrl: item.imageUrl,
      alt: item.alt,
      description: item.description,
      title: item.title,
      hasContent: item.content?.length ? true : false,
      id: item.id,
    }));

    // fetch and map all mri overview info for serialization purposes
    const mriInfos = this.mriOverview.map((item) => ({
      imageUrl: item.imageUrl,
      alt: item.alt,
      description: item.description,
      title: item.title,
      hasContent: item.content?.length ? true : false,
      id: item.id,
    }));

    // return data
    res.status(200).json({ safetyInfos, mriInfos });
    return;
  };

  // using this controller to get the detail of a particular information that will be shown on the detail page
  getDetailInfo = (req, res) => {
    const param = req.params;
    // get the id of the detail intended to be fetched
    const id = param.detail_id;
    // merge all the infos
    const allInfo = [...this.safetyInfo, ...this.mriOverview];

    // fetch the info
    const infoItem = allInfo.find((item) => item.id == id);

    // check if the info does not exist and return an error response
    if (!infoItem) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    // serialize data
    const infoRes = {
      title: infoItem.title,
      imageUrl: infoItem.imageUrl,
      alt: infoItem.alt,
      content: infoItem.content,
    };

    // return data
    res.status(200).json({ item: infoRes });
    return;
  };

  // using this controller to validate if a patient is safe for an mri examination
  validatePatientValidity = (req, res) => {
    const body = req.body;
    // obtaining the answer from the body that was submitted
    const answers = body.answers;

    // checking if there is any yes in the form questions
    const isNotEligible = answers.some((val) => val == "yes");

    if (isNotEligible) {
      // if not eligible, a response that say the exams can not be done is sent to user
      res.status(400).json({
        message:
          "Please it is NOT advisable to have your MRI scan done. This is because you answered YES to one or more of the above questionnaire. Contact your healthcare as soon as possible.",
        status: "error",
      });
      return;
    } else {
      // return valid response if patient is eligible
      res.status(200).json({
        message: "It is perfectly safe to have your MRI scan done.",
        status: "success",
      });
    }

    return;
  };
}

export default new AppController();

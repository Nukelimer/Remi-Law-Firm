export const GenderOptions = ["male", "female", "trans"];

export const ClientsFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  d_o_b: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  family_member_contact_number: "",
  family_member_contact_name: "",
  primary_counsel_or_lawyer: "",
  past_criminal_record: false,
  past_criminal_record_details: "",
  identification_type: "NIN",
  identification_number: "",
  privacy_and_consent: false,
  identification_document_url: "",
  identification_document: []
  
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "National Identity Card",
  "Passport",
  "Student ID Card",
  "Voter ID Card",
];

export const Lawyers = [
  {
    image: "/assets/images/barr-green.jpg",
    name: "John Green",
    area: "Corporate Law",
  },
  {
    image: "/assets/images/barr-cameron.jpg",
    name: "Leila Cameron",
    area: "Family Law",
  },
  {
    image: "/assets/images/barr-livingston.jpg",
    name: "David Livingston",
    area: "Criminal Defense",
  },
  {
    image: "/assets/images/barr-peter.jpg",
    name: "Evan Peter",
    area: "Immigration Law",
  },
  {
    image: "/assets/images/barr-powell.jpg",
    name: "Jane Powell",
    area: "Intellectual Property",
  },
  {
    image: "/assets/images/barr-remirez.jpg",
    name: "Alex Ramirez",
    area: "Employment Law",
  },
  {
    image: "/assets/images/barr-lee.jpg",
    name: "Jasmine Lee",
    area: "Environmental Law",
  },
  {
    image: "/assets/images/barr-cruz.jpg",
    name: "Alyana Cruz",
    area: "Real Estate",
  },
  {
    image: "/assets/images/barr-sharma.jpg",
    name: "Hardik Sharma",
    area: "Bankruptcy Law",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateForm.module.css";
import { useRouter } from "next/router";
function DateForm() {
  const [startDate, setStartDate] = useState(new Date());
 
  const [file, setFile] = useState(null);

  const router = useRouter();

  const fileRef = React.useRef<HTMLInputElement>(null);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0].name);
  };

  const handleConfirm = () => {
    // Here you might want to handle form submission, validate inputs, etc.
    // After handling the necessary data or form submission, navigate to the new route:

    router.push("/organizingMaking");
  };

  return (
    <div>
      
      <br />
      <input type="text" placeholder="Event Name" style={{ width: "245px", height: "28px", marginBottom: "20px" }} />
      <br />
      <input
        type="text"
        placeholder="Event Location"
        style={{ width: "245px", height: "28px", marginBottom: "20px" }}
      />
      <br />
      <DatePicker inline selected={startDate} onChange={(date) => date && setStartDate(date)} />
      <br />
      <input type="time" />
      <br />

      <input type="file" ref={fileRef} className="file-upload" onChange={onFileChange} />
      {file && <p>{file}</p>}
      <div>
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DateForm;

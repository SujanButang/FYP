import { useContext, useState } from "react";
import "./verifyform.scss";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyForm({ userId, setOpenProfileVerify }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let frontUrl;
    let backUrl;
    frontUrl = await upload(front);
    backUrl = await upload(back);
    console.log(frontUrl);
    console.log(backUrl);

    await makeRequest.post("/users/verification?userId=" + currentUser.id, {
      front: frontUrl,
      back: backUrl,
    });
    toast.success("Files upload Successful");
    setOpenProfileVerify(false);
  };
  return (
    <div className="verify">
      <div className="headers">
        <h2>Verify Your Profile</h2>
        <h6>
          To verify your profile, pleaseupload a photo of a legal identify card
          like citizenship and make sure you keep your photo in the profile
          picture.
        </h6>
      </div>
      <form>
        <label htmlFor="document-front">Document Front</label>
        <input
          name="document-front"
          type="file"
          required
          onChange={(e) => setFront(e.target.files[0])}
        />
        <label htmlFor="document-back">Document Front</label>
        <input
          name="document-back"
          type="file"
          required
          onChange={(e) => setBack(e.target.files[0])}
        />
        <div className="buttons">
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
          <button
            className="cancel-button"
            onClick={() => setOpenProfileVerify(false)}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

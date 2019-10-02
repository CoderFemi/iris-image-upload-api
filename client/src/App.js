import axios from 'axios';
import './App.css';
import DefaultImg from './assets/default-img.jpg';

// base api url being used
const API_URL = "http://localhost:9890";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multerImage: DefaultImg,
    }
  }

  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: DefaultImg
      });
    } 
  }

  // function to upload image once it has been captured
  // uses multer method
  uploadImage(e, method) {
    let imageObj = {};

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          this.setDefaultImage("multer");
        });
    } 

  render()
    return (
      <div>
        <h4>Upload your Picture</h4>
        <input type="file" onChange={(e) => this.uploadImage(e, "multer")} />
        <img src={this.state.multerImage} alt="upload-image"/>
      </div>
    );
  }
}

export default App;
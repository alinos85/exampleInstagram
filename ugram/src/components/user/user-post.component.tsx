import React from "react";
import TextField from "@material-ui/core/TextField";
import "./user-post.scss";
import { uploadFile } from "../../services/posts.service";
//import Grid from "@material-ui/core/Grid";
//import ButtonBase from "@material-ui/core/ButtonBase";

class UserPost extends React.Component<
  {},
  {
    file: any;
    mention: string[];
    description: string;
    hashTag: string[];
    url: string;
    errorMessage: string;
    successMessage: string;
  }
> {
  target: any;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      file: null,
      mention: [],
      description: "",
      hashTag: [],
      url: "",
      errorMessage: "",
      successMessage: "",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onMentionChange = this.onMentionChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onHashTagsChange = this.onHashTagsChange.bind(this);
  }

  onFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const fileData = {
      file: this.state.file,
      mention: this.state.mention,
      description: this.state.description,
      hashTag: this.state.hashTag,
    };

    uploadFile(fileData)
      .then((value) => {
        //this.setState({ url: value });
        this.setState({ successMessage: "Post successfuly created" });
      })
      .catch((error) => {
        console.error("Error while creating post: " + error);
        this.setState({ errorMessage: "probleme d'upload de fichier " });
      });
  }
  onFileChange(event: { target: { files: FileList | null } }) {
    if (event.target.files) {
      this.setState({ file: event.target.files[0] });
    }
    /*const file = e.target.files[0];
      const image = {
        file: file,
        mention: this.state.images[0].mention,
        description: this.state.images[0].description,
        hashTag: this.state.images[0].hashTag,
        url: "",
      };

      const images = this.state.images;
      images.unshift(image);
      this.setState({ images: images });*/
  }

  onMentionChange(event: { target: { value: any } }) {
    const mentionInput = event.target.value;
    if (mentionInput.includes(",")) {
      var newMentions: string[] = mentionInput.split(",");
      this.setState({ mention: newMentions });
    } else {
      var newMention: string[] = [];
      newMention.push(event.target.value);
      this.setState({ mention: newMention });
    }
    /*const mention = event.target.value;
    const images = this.state.images;
    const image = images[0];
    images.unshift({ ...image, mention: mention });
    this.setState({ images: images });*/
  }

  onDescriptionChange(event: { target: { value: any } }) {
    this.setState({ description: event.target.value });
    /*const description = event.target.value;
    const images = this.state.images;
    const image = images[0];
    images.unshift({ ...image, description: description });
    this.setState({ images: images });*/
  }

  onHashTagsChange(event: { target: { value: any } }) {
    const tagInput = event.target.value;
    if (tagInput.includes(",")) {
      var newTags: string[] = tagInput.split(",");
      this.setState({ hashTag: newTags });
    } else {
      var newTag: string[] = [];
      newTag.push(event.target.value);
      this.setState({ hashTag: newTag });
    }
    /*const hashTag = event.target.value;
    const images = this.state.images;
    const image = images[0];
    images.unshift({ ...image, hashTag: hashTag });
    this.setState({ images: images });*/
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="inputFile"
            type="file"
            name="myImage"
            onChange={this.onFileChange}
          />
          <button className="uploadButton" type="submit">
            Upload an image
          </button>
          <div className="textFieldGroup">
            <div className="mentionDiv">
              <TextField
                className="mentionField"
                id="standard-helperText"
                label="Mention"
                defaultValue="Entrer une mention"
                onChange={this.onMentionChange}
              />
            </div>

            <div className="descriptionDiv">
              <TextField
                className="descriptionField"
                id="standard-helperText"
                label="Description"
                defaultValue="Entrer la description"
                onChange={this.onDescriptionChange}
              />
            </div>

            <div className="hashtagDiv">
              <TextField
                className="hashtagField"
                label="hashtags"
                defaultValue="vos mots clé"
                onChange={this.onHashTagsChange}
              />
            </div>
          </div>
        </form>

        <div className="imagesList">
          <h2 className="success-message"> {this.state.successMessage} </h2>
          {/*           <Grid container spacing={3}>
            <Grid item key={this.state.url}>
              <ButtonBase>
                <img src={this.state.url} alt={this.state.description} />
              </ButtonBase>
            </Grid>
          </Grid> */}
        </div>
      </div>
    );
  }
}

export default UserPost;

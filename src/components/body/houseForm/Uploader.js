import React, { Component } from 'react';

class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: null,
      file: null
    }
  }

  handleChange = (event) => {
      console.log(event.target.files[0].size)
      let warning = document.getElementById('warning');
      if (event.target.files[0].size > 52428){
        warning.style.display = "block";
        let elm = document.getElementById('reader')
        elm.style.display = "none"
        this.props.onChange(null)
        return
      } else {
        warning.style.display = "none";
      }
    this.setState({
        file: event.target.files[0]
    }, this.readURL)
  }

    readURL() {
        let elm = document.getElementById('reader')
        elm.style.display = "inline-block"
        elm.src = URL.createObjectURL(this.state.file)
        this.props.onChange(this.state.file)
    }

  render() {
    return (
      <div>
        <input
            id="uploader"
            type="file"
            onChange={this.handleChange}
            accept="image/png, image/jpeg, image/gif"
        />
        <p id="warning" style={{display: 'none', color: 'red'}}>Image Exceeding Max Size (5MB)</p>
        <img id="reader" src='#' style={{display: 'none'}}/>
      </div>
    );
  }
}

export default Upload;
import React, { Component } from "react";
import { HomeWrapper, Pictures } from "components/Base/Home";
import * as pixabay from "../lib/api/pixabay";
import { MoreButton } from "../components/Base/Home";

export default class Home extends Component {
  state = {
    loading: false,
    pictures: [],
    pageNum: 12
  };
  getSakura = async per_page => {
    if (this.state.loading) return;
    this.setState({
      loading: true
    });
    try {
      const res = await pixabay.getSakura(per_page);
      const pictureList = res.data.hits;

      for (const key in pictureList) {
        if (pictureList.hasOwnProperty(key)) {
          this.setState({
            pictures: this.state.pictures.concat([
              {
                id: pictureList[key].id,
                url: pictureList[key].webformatURL,
                tags: pictureList[key].tags
              }
            ])
          });
        }
      }
      this.setState({
        loading: false
      });
    } catch (e) {
      console.error(e);
    }
  };
  handleClick = () => {
    const {pageNum} = this.state;
    this.setState({
      pageNum: pageNum + 12
    })
    this.getSakura(this.state.pageNum);
  }
  componentDidMount() {
    this.getSakura();
  }

  render() {
    const { loading, pictures } = this.state;
    const picture = pictures.map(pic => (
      <Pictures
        loading={loading}
        url={pic.url}
        tags={pic.tags}
        id={pic.id}
        key={pic.url}
      />
    ));
    const { handleClick } = this;
    return (
      <HomeWrapper
        picture={picture}
        more={<MoreButton onClick={handleClick} />}
      />
    );
  }
}

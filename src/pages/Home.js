import React, { Component } from "react";
import { HomeWrapper, Pictures } from "components/Base/Home";
import * as pixabay from "../lib/api/pixabay";
import { MoreButton } from "../components/Base/Home";
import Modal from "react-responsive-modal";

export default class Home extends Component {
  state = {
    open: false,
    loading: false,
    pictures: [],
    pageNum: 12,
    modalInfo: {
      src: "",
      tags: ""
    }
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
    const { pageNum } = this.state;
    this.setState({
      pageNum: pageNum + 12
    });
    this.getSakura(this.state.pageNum);
  };
  onOpenModal = e => {
    e.persist();
    const src = e.target.src;
    const alt = e.target.alt;
    this.setState({ open: true, modalInfo: { src: src, tags: alt } });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.getSakura();
  }
  render() {
    const { loading, pictures, open, modalInfo } = this.state;
    const picture = pictures.map(pic => (
      <Pictures
        url={pic.url}
        tags={pic.tags}
        id={pic.id}
        key={pic.url}
        onClick={this.onOpenModal}
      />
    ));
    const modalStyles = {
      modal: {
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0
      },
      closeButton: {
        top: '-2.5rem'
      },
      closeIcon: {
        fill: "#faa2c1",
        cursor: "pointer",
      }
    };
    const modal = (
      <Modal styles={modalStyles} open={open} onClose={this.onCloseModal} closeIconSize={40}>
        <div
          style={{ color: "#faa2c1", fontSize: "1.5rem", paddingTop: "0.5rem" }}
        >
          #{modalInfo.tags}
        </div>
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            paddingTop: "0.5rem",
          }}
          src={modalInfo.src}
          alt={modalInfo.tags}
        />
        <a
          style={{
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            textAlign: 'center',
            textDecoration: "none",
            background: "#faa2c1",
            color: "white",
            fontSize: "1.8rem",
            paddingBottom: "0.5rem",
            width: '100%',
          }}
          href={modalInfo.src}
          download={modalInfo.tags}
        >
          get sakura from pixabay!
        </a>
      </Modal>
    );
    const { handleClick } = this;
    return (
      <HomeWrapper
        modal={modal}
        picture={picture}
        more={<MoreButton onClick={handleClick} loading={loading} />}
      />
    );
  }
}

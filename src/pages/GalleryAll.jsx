import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Pagination from '@material-ui/lab/Pagination';

//variable baru
const defaultBack = [
{cover: "https://images.squarespace-cdn.com/content/v1/5a008604017db2ab70ad1255/1609178397549-AYQW1IRHGH5ADI8J65TU/JPC_Banner_V2.jpg?format=2500w", 
id: "1",
theme: "classic",
id_user: "1",
title: "J & D Wedding",
user: {
  businessName: "J Studio"
}},
{cover: "https://assets.change.org/photos/5/lp/xp/kXlPxPHnjbZRpzK-1600x900-noPad.jpg?1591412761", 
id: "2",
theme: "black",
id_user: "2",
title: "LandScape",
user: {
  businessName: "Diora Photo"
}},
{cover: "https://www.trekthehimalayas.com/assets/images/TTH-Photo-Contest.jpg", 
id: "3",
theme: "black",
id_user: "3",
title: "Potrait",
user: {
  businessName: "D Studio"
}},
{cover: "https://images.squarespace-cdn.com/content/v1/5a008604017db2ab70ad1255/1609178397549-AYQW1IRHGH5ADI8J65TU/JPC_Banner_V2.jpg?format=2500w", 
id: "1",
theme: "black",
id_user: "1",
title: "J & D Wedding",
user: {
  businessName: "J Studio"
}},
{cover: "https://assets.change.org/photos/5/lp/xp/kXlPxPHnjbZRpzK-1600x900-noPad.jpg?1591412761", 
id: "2",
theme: "black",
id_user: "2",
title: "LandScape",
user: {
  businessName: "Diora Photo"
}},
{cover: "https://www.trekthehimalayas.com/assets/images/TTH-Photo-Contest.jpg", 
id: "3",
theme: "black",
id_user: "3",
title: "Potrait",
user: {
  businessName: "D Studio"
}},
{cover: "https://images.squarespace-cdn.com/content/v1/5a008604017db2ab70ad1255/1609178397549-AYQW1IRHGH5ADI8J65TU/JPC_Banner_V2.jpg?format=2500w", 
id: "1",
theme: "black",
id_user: "1",
title: "J & D Wedding",
user: {
  businessName: "J Studio"
}},
{cover: "https://assets.change.org/photos/5/lp/xp/kXlPxPHnjbZRpzK-1600x900-noPad.jpg?1591412761", 
id: "2",
theme: "black",
id_user: "2",
title: "LandScape",
user: {
  businessName: "Diora Photo"
}},
{cover: "https://www.trekthehimalayas.com/assets/images/TTH-Photo-Contest.jpg", 
id: "3",
theme: "black",
id_user: "3",
title: "Potrait",
user: {
  businessName: "D Studio"
}},
{cover: "https://images.squarespace-cdn.com/content/v1/5a008604017db2ab70ad1255/1609178397549-AYQW1IRHGH5ADI8J65TU/JPC_Banner_V2.jpg?format=2500w", 
id: "1",
theme: "black",
id_user: "1",
title: "J & D Wedding",
user: {
  businessName: "J Studio"
}},
{cover: "https://assets.change.org/photos/5/lp/xp/kXlPxPHnjbZRpzK-1600x900-noPad.jpg?1591412761", 
id: "2",
theme: "black",
id_user: "2",
title: "LandScape",
user: {
  businessName: "Diora Photo"
}},
{cover: "https://www.trekthehimalayas.com/assets/images/TTH-Photo-Contest.jpg", 
id: "3",
theme: "black",
id_user: "3",
title: "Potrait",
user: {
  businessName: "D Studio"
}},
{cover: "https://images.squarespace-cdn.com/content/v1/5a008604017db2ab70ad1255/1609178397549-AYQW1IRHGH5ADI8J65TU/JPC_Banner_V2.jpg?format=2500w", 
id: "1",
theme: "black",
id_user: "1",
title: "J & D Wedding",
user: {
  businessName: "J Studio"
}},
{cover: "https://assets.change.org/photos/5/lp/xp/kXlPxPHnjbZRpzK-1600x900-noPad.jpg?1591412761", 
id: "2",
theme: "black",
id_user: "2",
title: "LandScape",
user: {
  businessName: "Diora Photo"
}},
{cover: "https://www.trekthehimalayas.com/assets/images/TTH-Photo-Contest.jpg", 
id: "3",
theme: "black",
id_user: "3",
title: "Potrait",
user: {
  businessName: "D Studio"
}},
];

function GalleryAll() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchDataGalleryAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryAll = async () => {
    // setIsLoading(true);
    // try {
    //   let res = await axios.get(`${URL_API}/collection?limit=15&page=0`);
    //   setCollections(res.data.result);
    //   let page = await fetchDataPage();
    //   setPageNumber(Math.ceil(page / 15));
    //   setIsLoading(false);
    // } catch (error) {
    //   dispatch(toastError(`${error.response.data.message}`));
    //   setIsLoading(false);
    // }
    
    setCollections(defaultBack);
  };

  const fetchDataPage = () => {
    return axios
      .get(`${URL_API}/collection?limit=9999`)
      .then((res) => {
        return res.data.totalData;
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      var res = await axios.get(
        `${URL_API}/collection?limit=15&page=${value - 1}`
      );
      setCollections(res.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  const galleryAllImage = () => {
    return collections.map((val, index) => {
      return (
        <div className="galleryall-cards" key={index}>
          <img
            src={val.cover}
            alt="NoImageFound"
            onClick={() => onImageClick(val.id, val.theme)}
          />
          <div
            className="cards-text"
            onClick={() => onStudioClick(val.id_user)}
          >
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">{val.user.businessName}</div>
          </div>
        </div>
      );
    });
  };

  const onImageClick = (id, theme) => {
    let themeLower = theme.toLowerCase();
    window.location = `/temp/${themeLower}/${id}`;
  };

  const onStudioClick = (idStudio) => {
    history.push(`/gallery/photographer/${idStudio}`);
  };

  if (isLoading) {
    return (
      <>
        <HeaderHome />
        <div className="loader"></div>
      </>
    );
  }

  return (
    
    <div className="background-wrapper">
      <HeaderHome headerHeight={350} />
      <div className="galleryall-wrapper">
        <div className="gallery-title">Explore Photographer Gallery</div>
        <div className="galleryall-cards-container">{galleryAllImage()}</div>
        <div className="galleryall-pagination">
          <Pagination
            count={pageNumber}
            page={page}
            onChange={pageChange}
            shape="rounded"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GalleryAll;

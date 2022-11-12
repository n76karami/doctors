import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.css";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const About = () => {
  const { id , params } = useParams();

  const [clinics, setclinics] = useState(true);
  
  const [thisuser, setThisuser] = useState({});
  const [isloading, setisloading] = useState(false);
  const [modal, setmodal] = useState(false);

  useEffect(() => {
    // fetch https://jsonplaceholder.typicode.com/users
    fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setThisuser(data))
      .finally(() => setisloading(true));
  }, []);

  if (!isloading) return <h1>isloading...</h1>;
  console.log(thisuser);
  

  const modalOn = () => {
    setmodal(true);
    if (thisuser.doctor.clinics.length == 0) {
      setclinics(false)
    }
  };

  const ICON = icon({
    iconUrl: "/mi.png.png", //داخل پوشه public
    iconSize: [42, 52],
  });

  console.log(clinics)
  

  return (
    <>
      <div id="p-profile">
        <div id="profile">
          <img
            src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${thisuser.doctor.url}`}
            
            onError={e => e.target.src = '/insta.png'}
          />

          <h2 id="name">{`دکتر${thisuser.doctor.fname} ${thisuser.doctor.lname}`}</h2>

          <div>
            {thisuser.doctor.spUnis.length > 0 ?
              <>
                {thisuser.doctor.spUnis.map((item, index) => {
                  return (
                    <>
                      <h3 className="h3">{`متخصص ${item.specialty.name} `}</h3>
                    </>
                   );
                })}
              </>
            : <h3 className="error">تخصصی ثبت نشده است</h3>}
          </div>

          <div>
            {thisuser.doctor.clinics.length > 0 ?
              <>
              {thisuser.doctor.clinics.map((item, index) => (
                <h3 className="h3">{` آدرس مطب :${item.address} - ${item.name}`}</h3>
              ))}
              </>
             : <h3 className="error">آدرسی ثبت نشده است</h3>}
          </div>

          <div>
            {thisuser.doctor.clinics.length > 0 && thisuser.doctor.clinics[0].clinicsTimeSheets.length > 0 ?
              <>
                {thisuser.doctor.clinics.map((item, index) =>
                item.clinicsTimeSheets.map((item, index) => {
                  return (
                    <h3 className="h3">
                      {` ${item.label} از ساعت ${item.startTime} تا ساعت ${item.endTime}`}
                   </h3>
                  );
                })
                )}
              </>
              : <h3 className="error">روز و ساعتی ثبت نشده است</h3> }
          </div>

          <div>
            {thisuser.doctor.clinics.length > 0 && thisuser.doctor.clinics[0].telePhones.length > 0 ?
              <>
                {thisuser.doctor.clinics.map((item, index) =>
                 item.telePhones.map((item, index) => {
                  return (
                    <h3 id="phone" className="h3">
                      {`تلفن : ${item.phone}`}
                   </h3>
                  );
                })
                )}
              </>
              : <h3 className="error">تلفنی ثبت نشده است</h3>}
          </div>

          <Link
            id="btn-about"
            style={{ textDecoration: "none", color: "white" }}
            to={`/?page=${params}`}
          >
            بازگشت به صفحه اصلی
          </Link>

          <button id="go-to-modal" onClick={() => modalOn() } >
            مشاهده موقعیت مطب
          </button>
        </div>

        {modal ?

              <>
                <div className="backdrop" onClick={() => setmodal(false)}></div>
                {clinics ?
                  <div className="modal">
                    {/* <h4>{`دکتر${thisuser.doctor.fname} ${thisuser.doctor.lname}`}</h4> */}
                    <MapContainer
                      center={[
                        thisuser.doctor.clinics[0].latitude,
                        thisuser.doctor.clinics[0].longtitude,
                      ]}
                      zoom={15}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[
                          thisuser.doctor.clinics[0].latitude,
                         thisuser.doctor.clinics[0].longtitude
                        ]}
                        icon={ICON}
                      >
                        <Popup>
                          <h3 className="h3" style={{ color: 'red' }}>{`${thisuser.doctor.clinics[0].name}`}</h3>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  : <div className="modal"><h1>موقعیتی ثبت نشده است</h1></div>}
              </> 
          : ""}
        
      </div>
    </>
  );
};
export default About;

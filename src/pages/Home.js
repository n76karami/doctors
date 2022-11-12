import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useSearchParams  } from "react-router-dom";

import "./Home.css";

const Home = () => {

  const [users, setusers] = useState({});
  const [isloading, setisloading] = useState(false);

  const [params, setparams] = useSearchParams();
  
  
 

  const fetchDoctors = (page) => {
    fetch(`https://www.tebinja.com/api/v1/doctors/searchi?page=${page}`)
      .then((res) => res.json())
      .then((data) => setusers(data))
      .finally(() => setisloading(true));
  };

  useEffect(() => {
    
    console.log('*************************')
    console.log(params.get('page'))
    console.log('*************************')

    const x = params.get('page');
    fetchDoctors(x ? x : 0)
    
  }, []);

  if (!isloading) return <h1>isloading...</h1>;
  console.log(users);
  
  
  const userlist = users.doctors.hits.map((item, index) => {
    return (
      <>
        <div key={index} className="doctor-card">
          <img
            src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
            // src='insta.png'
            onError={e => e.target.src = 'insta.png'}
          />

          <h2>{`دکتر${item._source.fname} ${item._source.lname}`}</h2>

          <h3 id="Specialty">
            {item._source.spUnis.length > 0 ?
              <>
                {item._source.spUnis.map((item, index) => {
                  return <span>{`متخصص ${item.specialty.name}`}</span>;
                })}
              </>
              : <span>تخصصی ثبت نشده است </span>}
          </h3>

          <Link
            id="btn"
            style={{ textDecoration: "none", color: "white" }}
            to={`/about/${params.get('page')}/${item._source.id}`}
          >
            اطلاعات بیشتر
          </Link>
        </div>
      </>
    );
  });

  const handlePageClick = (event) => {
    // console.log(
    //   `User requested page number ${event.selected}, which is offset `
    // );
    fetchDoctors(event.selected);
    setparams(`page=${event.selected}`);
    
  };

  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={999}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // initialPage={params.get('page')}
      />
      <div id="p-doctors">
        {userlist}
      </div>
    </>
  );
};
export default Home;

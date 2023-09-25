import { useEffect, useState } from "react";
import Page from "../../components/page";
import Loading from "../../components/loading";
import { getPages } from "../../util/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./index.css";
import { useParams } from "react-router-dom";
import CarouselSelector from "../../components/carousell-selector";
import NavigationButton from "../../components/navigation-button";
import PageTOC from "../../components/page-toc";
import PageTOCBtn from "../../components/page-toc-btn";
import PageTitle from "../../components/page-title";
import Backdrop from "../../components/backdrop";
import NoPage from "../../components/no-page";

function Memory() {
  const { memory } = useParams();
  const [pages, loading] = useCollectionData(getPages(memory));
  const [currPage, setCurrPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    if (pages) setNumberOfPages(pages.length);
  }, [pages]);

  useEffect(() => {
    if (currPage < 0) setCurrPage(numberOfPages - 1);
    if (currPage >= numberOfPages) setCurrPage(0);
  }, [currPage, numberOfPages]);

  const changePage = (index) => {
    setCurrPage(index);
    setShowTOC(false);
  };

  const goNext = (e) => {
    e.preventDefault();
    if (currPage + 1 < numberOfPages) setCurrPage(currPage + 1);
  };

  const goPrev = (e) => {
    e.preventDefault();
    if (currPage - 1 >= 0) setCurrPage(currPage - 1);
  };

  const tocBtnClick = (e) => {
    e.preventDefault();
    setShowTOC(true);
  };

  const exitToc = (e) => {
    e.preventDefault();
    setShowTOC(false);
  };

  while (loading) {
    return <Loading />;
  }

  return (
    <div className="memory-container">
      {pages.length > 0 ? (
        <>
          <section className="header">
            {showTOC && (
              <Backdrop callback={exitToc}>
                <PageTOC memory={memory} pages={pages} goToPage={changePage} />
              </Backdrop>
            )}

            <div className="child1">
              <PageTOCBtn clicked={tocBtnClick} />
            </div>
            <div className="child2">
              <PageTitle title={pages[currPage].name} />
            </div>
          </section>
          <Page memory={memory} page={pages[currPage].name} />
          <section className="carousel">
            <NavigationButton orientation={0} handleClick={goPrev} />
            <CarouselSelector
              numberOfPages={numberOfPages}
              pageNumber={currPage}
            />
            <NavigationButton orientation={1} handleClick={goNext} />
          </section>
        </>
      ) : (
        <NoPage memory={memory} />
      )}
    </div>
  );
}

export default Memory;

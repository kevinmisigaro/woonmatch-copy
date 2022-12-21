import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  width: string;
};

const NewsItem = ({ title, date, category, thumbnail, parentRef }: any) => {
  const [isOver, setIsOver] = useState(false);
  const [width, setWidth] = useState(400);
  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };

  const doOnWindowResize = () => {
    if (parentRef?.current) {
      setWidth(parentRef.current.offsetWidth / 2 - 30);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, []);

  return (
    <Link href={`/news/`}>
      <a>
        <div style={{ width: width }} className=" mr-[30px]">
          <div
            onMouseOver={() => handleOnMouseOver(true)}
            onMouseOut={() => handleOnMouseOver(false)}
            className={`w-full aspect-[2/1] grid place-content-center rounded-md overflow-hidden`}>
            <img
              style={{
                transform: isOver ? "scale(1.3)" : "scale(1.2)",
                transition: "transform .3s ease-out",
              }}
              src={`/images/${thumbnail}`}
            />
          </div>

          <div className="mt-[20px] lg:mt-[40px] 3xl:mt-[65px]">
            <div className="card-tag drop-shadow-none py-1">{category}</div>
            <div className="mt-[5px] lg:mt-[15px] 3xl:mt-[30px]">
              <h4 className="text-title">{title}</h4>
            </div>
            <p className="text-light text-additional-2 mt:[22px] 3xl:mt-[20px]">
              {date}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NewsItem;

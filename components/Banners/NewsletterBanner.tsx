import Link from "next/link";
import FooterBanner from "./FooterBanner";

const NewsLetterBanner: React.FC<any> = () => {
  //   return (
  //     <div className="relative -bottom-44 flex items-center bg-gradient-to-r from-limeade to-apple px-8 py-10 rounded-md">
  //       <div className="hidden lg:flex justify-center lg:w-1/4 2xl:w-1/3 h-">
  //         <img src="/images/newsletter.svg" className="h-40 w-auto" />
  //       </div>

  //       <div className="w-full lg:w-3/4 2xl:w-2/3 space-y-8 text-white">
  //         <p className="font-light text-base lg:text-lg 2xl:text-xl">
  //           NEWSLETTER
  //         </p>

  //         <h2 className="font-bold text-xl md:text-3xl 2xl:text-5xl">
  //           Blijf op de hoogte van het laatste woningnieuws.
  //         </h2>

  //         <form className="flex" onSubmit={() => console.log("form")}>
  //           <input
  //             type="email"
  //             placeholder="Vul je e-mailadres in"
  //             className="border border-white rounded-l bg-transparent placeholder-white focus:outline-none w-3/4 md:w-3/4 px-2 md:px-4 py-3"
  //           />
  //           <button type="submit" className="bg-white text-apple rounded-r px-4">
  //             Abonneren
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );

  return (
    <FooterBanner
      image="/images/newsletter.svg"
      title="NEWSLETTER"
      subtitle={` Blijf op de hoogte van het laatste woningnieuws.`}
      buttons={[
        {
          text: "Abonneren",
          type: "link",
          link: "/",
        },
      ]}
    />
  );
};

export default NewsLetterBanner;

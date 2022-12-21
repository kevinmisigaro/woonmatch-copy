import { useState, useEffect } from "react";
import MyDetailsCard from "../../components/Profile/MyDetailsCard";
import MyPartnerCard from "../../components/Profile/MyPartnerCard";
import MyDocumentCard from "../../components/Profile/MyDocumentCard";
import MyWellWishesCard from "../../components/Profile/MyWellWishesCard";
import SituationCard from "../../components/Profile/SituationCard";
import LivingPitsCard from "../../components/Profile/LivingPitsCard";
import Layout from "../../components/Layouts/SiteLayout";
import MyReactionsCard from "../../components/Profile/MyReactionsCard";
import HouseHoldCard from "../../components/Profile/HouseHoldCard";
import WoningnetBanner from "../../components/Profile/WoningnetBanner";

const ProfileSummaryPage: React.FC<any> = () => {
  const [details, setDetails] = useState({
    email: "",
    street: "",
    city: "",
    housenumber: "",
    mobile: 0,
    landline: 0,
    income: 0,
    dob: "",
    lastname: "",
    initials: "",
    zipcode: "",
    cc_email: "",
    ownedSince: "",
    letterhead: "",
    wnConnector: null,
    allowMRAConnect: false
  });

  const [partnerDetails, setParterDetails] = useState({
    email: "",
    street: "",
    city: "",
    housenumber: "",
    mobile: 0,
    landline: 0,
    income: 0,
    dob: "",
    lastname: "",
    initials: "",
    zipcode: "",
    cc_email: "",
    letterhead: "",
  });

  const [userPoints, setUserPoints] = useState({
    total: 0,
    start: 0,
    situation: 0,
    search: 0,
    wait: 0,
  });

  const [partnerPoints, setPartnerPoints] = useState({
    total: 0,
    start: 0,
    situation: 0,
    search: 0,
    wait: 0,
  });

  const fetchDetails = async () => {
    const response = await fetch("/api/auth/user");
    const data = await response.json();

    const partnerRespose = await fetch("/api/profile/partner");
    const partnerData = await partnerRespose.json();

    const summaryResponse = await fetch("/api/auth/registersteps/summary");
    const summary = await summaryResponse.json();
    console.log(summary);

    setUserPoints({
      ...userPoints,
      situation: summary.data.person.pointspec?.points.situation | 0 || 0,
      start: summary.data.person.pointspec?.points.start | 0 || 0,
      total: summary.data.person.pointspec?.points.total | 0 || 0,
      search: summary.data.person.pointspec?.points.search | 0 || 0,
      wait: summary.data.person.pointspec?.points.wait | 0 || 0,
    });

    setPartnerPoints({
      ...partnerPoints,
      situation: summary.data.partner.pointspec?.points.situation | 0 || 0,
      start: summary.data.partner.pointspec?.points.start | 0 || 0,
      total: summary.data.partner.pointspec?.points.total | 0 || 0,
      search: summary.data.partner.pointspec?.points.search | 0 || 0,
      wait: summary.data.partner.pointspec?.points.wait | 0 || 0,
    });

    setParterDetails({
      ...partnerDetails,
      cc_email: partnerData.data.cc_email,
      initials: partnerData.data.initials,
      email: partnerData.data.email,
      street: partnerData.data.street,
      dob: partnerData.data.dob,
      lastname: partnerData.data.lastname,
      housenumber: partnerData.data.housenumber,
      mobile: partnerData.data.phone.mobile,
      landline: partnerData.data.phone.landline,
      income: partnerData.data.income,
      city: partnerData.data.city,
      zipcode: partnerData.data.zipcode,
      letterhead: partnerData.data.letterhead,
    });

    setDetails({
      ...details,
      cc_email: data.data.cc_email,
      initials: data.data.initials,
      email: data.data.email,
      street: data.data.street,
      dob: data.data.dob,
      lastname: data.data.lastname,
      housenumber: data.data.housenumber,
      mobile: data.data.phone.mobile,
      landline: data.data.phone.landline,
      income: data.data.income,
      city: data.data.city,
      zipcode: data.data.zipcode,
      ownedSince: summary.data.person.pointspec.updated, //This is not the right field for this
      letterhead: data.data.letterhead,
      wnConnector: summary.data.mraConnection,
      allowMRAConnect: summary.data.person.allowMRAConnect
    });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Layout title="Profile">
    <div style={{
        backgroundImage: "url('/bg-images/blurredbackground.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
    <div className="container h-full pb-20">
        <div className="py-14">
          <h5 className="font-medium text-2xl">Mijn profiel</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-5">
          <MyDetailsCard />
          <MyPartnerCard />
          <HouseHoldCard
            myPoints={userPoints}
            partnerPoints={partnerPoints}
            details={details}
            partnerDetails={partnerDetails}
          />
        </div>

        <div className="h-0.5 bg-primary w-full mb-7"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-5">
          <MyDocumentCard />
          <SituationCard />
          <LivingPitsCard myPoints={userPoints} />
        </div>

        {/* <div className="h-0.5 bg-primary w-full mb-7"></div> */}

        {/*<div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-5">
          <ArrangementsCard />
          <CurrentLivingSituationCard details={details} />
          <MyFinances />
        </div>*/}

        <div className="h-0.5 bg-primary w-full mb-7"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-5">
          <MyReactionsCard details={details} />
          <MyWellWishesCard />
          {/* <PreservedHomesCard /> */}
        </div>
      </div>

      {details.wnConnector !== null && (
        <WoningnetBanner wnConnector={details.wnConnector} allowMRAConnect={details.allowMRAConnect}/>
      )}
    </div>
    </Layout>
  );
};

export default ProfileSummaryPage;

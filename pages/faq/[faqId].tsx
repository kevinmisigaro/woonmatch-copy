import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import NewsLetterBanner from "../../components/Banners/NewsletterBanner";
import Layout from "../../components/Layouts/SiteLayout";


const FAQDetailPage: React.FC<any> = () => {
    const router = useRouter();
    const { faqId } = router.query;

    return (
        <Layout title="Privacy en disclaimer">
            <div>
            <section className="bg-faq-home text-white">
                    <div className="container mx-auto px-4 md:px-16 py-10 lg:py-20 space-y-10 text-center">
                        <h2 className="text-xl md:text-3xl lg:text-5xl font-medium">
                            What is Woonmatch?
                        </h2>
                        <p className="text-base lg:text-lg">
                            Je kan ook de topics hieronder bekijken om antwoord op je vraag krijgen
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 md:px-16 py-10 lg:py-20 space-y-10">

                    <div className="flex items-center space-x-4 py-4 border-b text-base md:text-xl">
                        <span className="text-fuscous-gray-400">About Woonmatch</span>
                        <FontAwesomeIcon className="text-fuscous-gray-400" icon={faCaretRight} size="lg" />
                        <span className="text-apple">What is Woonmatch?</span>
                    </div>

                    <div className="flex justify-end">
                        <div className="text-base md:text-lg xl:text-xl text-fuscous-gray-400 space-y-4 w-full lg:w-10/12">
                            <p>
                                Vul hier uw totale persoonlijke inkomen in. Dat staat vermeld als ‘Verzamelinkomen’ op 
                                uw persoonlijke inkomensverklaring die u gratis kunt opvragen bij de Belastingdienst. 
                                U kunt uw inkomen ook eenvoudig uitrekenen met de rekenhulp.  
                            </p>
                            <p>
                                Het betreft huurwoningen in de gemeenten Drechterland, Enkhuizen, Hoorn, Koggenland, 
                                Medemblik, Opmeer en Stede Broec.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end w-full mt-10">
                        <Link href="/faq">
                            <button className="text-apple bg-white border border-apple py-3 px-6 w-full md:w-auto rounded-md">
                                Go back to help centre
                            </button>
                        </Link>
                    </div>
                </section>

                <div className="relative container mx-auto px-4 md:px-16 py-10">
                    <NewsLetterBanner />
                </div>
            </div>
        </Layout>
    )
}

export default FAQDetailPage
import { useState, useEffect } from "react";
import { xhrRequest } from "../../network/network";
import { Documenten } from "../../interfaces/index";
import ProfileLayout from "../../components/Layouts/ProfileLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faCheck } from "@fortawesome/pro-regular-svg-icons";

const DocumentPage: React.FC<any> = () => {
  const [documents, setDocuments] = useState<Documenten | null>(null);
  const [editHoverButton, setEditHoverButton] = useState<boolean>(false);

  const fetchDocuments = async () => {
    const response = await xhrRequest<Documenten>("GET", {
      endPoint: "/document",
    });
    if (response) {
      setDocuments(response.data);
    }
  };

  useEffect(() => {
    if (documents === null) {
      fetchDocuments();
    }
  }, [documents]);

  return (
    <ProfileLayout title="Uw Documenten">
      {documents && (
        <section className="space-y-8 text-gray-500">
          <div>
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade mb-8">
              Documenten
            </h2>
            <p className="text-gray-500 text-justify mb-4">
              Als u in aanmerking komt voor een woning, dan vraagt de corporatie
              u om documenten aan te leveren. Deze documenten hebben o.a.
              betrekking op uw inkomen en woonsituatie.
            </p>
            <p className="text-gray-500 text-justify">
              Als u een voorlopige aanbieding voor een woning krijgt, dan heeft
              u slechts korte tijd om deze documenten aan te leveren. Als u hoog
              op de lijst komt en dus een kansrijke kandidaat bent, is het
              verstandig om de documenten alvast te verzamelen en hier te
              uploaden. U bent dit niet verplicht. Maar als u te laat bent met
              het aanleveren en uploaden van de documenten, dan wordt de
              volgende kandidaat benaderd.
            </p>
          </div>

          {documents.groups.map((item) => (
            <div
              className="border rounded-md py-4 px-4 lg:px-8 shadow-sm"
              key={item.id}>
              <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                {item.name}
              </h2>

              <ul className="space-y-8">
                {item.types.map((typeItem) => (
                  <li
                    className="grid grid-cols-1 md:grid-cols-2 pag-4 md:gap-8 overflow-hidden"
                    key={typeItem.id}>
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faFilePdf}
                      />
                      <span>{typeItem.name}</span>
                      <div className="flex justify-center items-center text-white bg-fuscous-gray-400 font-medium h-5 w-5 rounded-full">
                        <span>?</span>
                      </div>
                    </p>

                    {/* loop all current documents */}
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-3">
                        <span className="flex items-center justify-center bg-gradient-to-r from-limeade to-apple rounded-full h-6 w-6">
                          <FontAwesomeIcon
                            className="text-white"
                            icon={faCheck}
                          />
                        </span>
                        <span>M. Cooper</span>
                      </div>
                      <p>uploadedfile.pdf</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              className={`border ${
                editHoverButton
                  ? "bg-limeade text-white"
                  : "border-limeade text-limeade"
              } py-2 px-4 w-full md:w-1/3 xl:w-1/4 rounded-md`}
              onMouseOver={() => setEditHoverButton(true)}
              onMouseLeave={() => setEditHoverButton(false)}>
              {editHoverButton ? "Opslaan" : "Bewerk"}
            </button>
          </div>
        </section>
      )}
    </ProfileLayout>
  );
};

export default DocumentPage;

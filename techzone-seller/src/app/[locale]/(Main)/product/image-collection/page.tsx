"use client";

import GenAiFormModal from "@/component/Product/GenAiFormModal";
import GenAiProgressModal from "@/component/Product/GenAiProgressModel";
import GenAiResultModal from "@/component/Product/GenAiResultModal";
import { Breadcrumb, Button, Divider, Modal } from "antd";
import { useRef, useState } from "react";
import { FaMagic } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import "./local.css";

type Status = "FORM" | "IN_PROGRESS" | "COMPLETED";

const imgList = [
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716348420/virtual_try_on_welcome_img_jppgbr.png",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/dressing_room_c9bl2n.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/master_room_torso8.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/living_room_k9tpqt.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/master_living_room_fjwzlm.png",
];

const mockResponse = {
  prompt:
    "hyperdetailed photography, soft light, head portrait, (white background:13, skin details, sharp and in focus,",
  context: "men is wearing shirt and standing in coffee shop",
  genaiProductImage: [
    "https://replicate.delivery/pbxt/6i9Pee4fj2fKfiUOJK5NVRC7BRdpOhhWkBSUCrJETV2X4hNYC/ComfyUI_00001_.webp",
  ],
};

// interface ImageGridProps {
//   imgList: string[];
// }

const ImageCollection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [genaiModalOpen, setGenAiModalOpen] = useState<boolean>(false);
  const previewModalRef = useRef<HTMLDivElement>(null);

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [genAiStatus, setGenAiStatus] = useState<string>("FORM");

  const handleFormSubmit = async (values: any) => {
    setGenAiStatus("IN_PROGRESS");
    console.log("Value: ", values);
    const promptTemplate = `hyperdetailed photography, soft light, head portrait, (white background:13, skin details, sharp and in focus,\n${values.gender} ${values.nationality} student,\n${values.bodyShape} body shape,\n${values.skinColor} skin,\n${values.hairColor} ${values.hairStyle},\nbig ${values.eyesColor} eyes,\nhigh nose,\nslim,\ncute,\nbeautiful`;
    const contextTemplate = `${values.gender} is wearing ${values.clothType} and ${values.posture} in ${values.background}`;
    const postBody = {
      prompt: promptTemplate,
      context: contextTemplate,
      garmentImgUrl: values.imageLink,
    };

    // try {
    //   console.log("Post body:  ", postBody);
    //   const response = await axios.post(
    //     "http://localhost:8000/genai/generate-product-image",
    //     postBody,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     },
    //   );

    //   if (response.status == 200) {
    //     console.log("Response: ", response);
    //     const imageUrl = response.data.data.genaiProductImage[0];
    //     setGeneratedImageUrl(imageUrl);
    //     setGenAiStatus("COMPLETED");
    //   }
    // } catch (error) {
    //   console.error("Error fetching generate product image:", error);
    // }

    setTimeout(() => {
      setGeneratedImageUrl(
        "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg"
      );
      setGenAiStatus("COMPLETED");
    }, 3000);
  };

  const openPreview = (image: string) => {
    setPreviewImage(image);
  };

  const renderModal = () => {
    switch (genAiStatus) {
      case "FORM":
        return (
          <GenAiFormModal
            onClose={() => setIsFormVisible(false)}
            onSubmit={handleFormSubmit}
          />
        );
      case "IN_PROGRESS":
        return <GenAiProgressModal />;
      case "COMPLETED":
        return (
          <GenAiResultModal
            tryAgainFnc={() => setGenAiStatus("FORM")}
            imageUrl={generatedImageUrl}
            isCreatingProductMode={false}
            addImage={function (image_link: string): void {
              // throw new Error("Function not implemented.");
            }}
            closeModal={setGenAiModalOpen}
          />
        );
    }
  };

  return (
    <div className="pt-4 pr-4 flex flex-col">
      <Breadcrumb
        className="text-xs"
        items={[
          {
            href: "/",
            title: (
              <div className="flex items-center">
                <HiOutlineHome size={15} />
              </div>
            ),
          },
          {
            href: "/product/image-collection",
            title: "Sản phẩm",
          },
          {
            title: "Bộ sưu tập hình ảnh",
          },
        ]}
      />
      <div className="w-full flex flex-row justify-between items-center">
        <p className="uppercase text-xl font-semibold ">Bộ sưu tập hình ảnh</p>
        <Button
          onClick={() => {
            setGenAiModalOpen(true);
          }}
          type="primary"
          className="py-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium flex flex-row gap-2 items-center hover:from-cyan-700 hover:to-blue-700 "
        >
          <FaMagic />
          Tạo hình ảnh bằng AI
        </Button>
      </div>
      <Divider className="my-4" />

      <div className="grid-wrapper">
        {imgList.map((image, index) => (
          <div key={index} onClick={() => openPreview(image)}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>

      {previewImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={previewModalRef}
            className="max-w-full h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className=" max-w-full max-h-full"
            />
          </div>
        </div>
      )}

      {genaiModalOpen && (
        <Modal
          centered
          open={genaiModalOpen}
          width={900}
          onCancel={() => {
            setGenAiModalOpen(false);
            // setIsFormVisible(true);
          }}
          footer={null}
        >
          {/* {isFormVisible ? (
            <GenAiFormModal
              onClose={() => setIsFormVisible(false)}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <GenAiResultModal
              onClose={() => setIsFormVisible(true)}
              imageUrl={generatedImageUrl}
            />
          )} */}
          {renderModal()}
        </Modal>
      )}
    </div>
  );
};

export default ImageCollection;

"use client";
import axios from "axios";
import { fabric } from "fabric";
import { useEffect, useState } from "react";

const TattooUI = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  const [tattooImage, setTattooImage] = useState();
  const [bodyImage, setBodyImage] = useState();

  const [bodyImageUrl, setBodyImageUrl] = useState(
    "https://i.ibb.co/Dfy9gYX/1700430122835.jpg"
  );
  const [tattooImageUrl, setTattooImageUrl] = useState(
    "https://i.ibb.co/0DknqBL/pngwing-com-1.png"
  );

  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: 500,
      width: 500,
      backgroundColor: "black",
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 10;

    setCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  const addBodyImage = (canvas?: fabric.Canvas, imageUrl: string) => {
    if (canvas) {
      const imageObjects = canvas.getObjects("image");
      let img1: any = [];

      //   Body Image
      const bodyImage = imageObjects.length > 0 ? imageObjects[0] : null;

      if (bodyImage?._element.currentSrc !== imageUrl) {
        console.log("Image doens't already exists baby.");

        fabric.Image.fromURL(imageUrl, function (myImg) {
          // set the image's position to the center of the canvas
          img1 = myImg.set({
            left: canvas?.getWidth() / 2,
            top: canvas?.getHeight() / 2,
            // disable controls
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            // make the image non-interactive and non-selectable
            selectable: false,
            evented: false,

            // set the maximum width to 400px and maintain aspect ratio
            scaleX: myImg.width ? 400 / myImg.width : 1,
            scaleY: myImg.width ? 400 / myImg.width : 1,
          });
          // Always keep this image at the back
          img1.moveTo(0);

          // set the image's origin to the center of the image
          img1.set({ originX: "center", originY: "center" });

          // add the image to the canvas
          canvas?.add(myImg);
        });

        console.log("Set the Body Image");

        const bodyImage = imageObjects.find(
          (obj) => obj._element && obj._element.currentSrc === imageUrl
        );

        setBodyImage(bodyImage as any);
      } else {
        console.log("Image already exists baby.");
        setBodyImage(bodyImage as any);
      }
    }
  };

  const addTattooImage = (canvas?: fabric.Canvas, imageUrl: string) => {
    if (canvas) {
      const imageObjects = canvas.getObjects("image");
      let img1: any = [];

      const tattooImage = imageObjects.find(
        (obj) => obj._element && obj._element.currentSrc === imageUrl
      );

      if (!tattooImage) {
        console.log("Image doesn't already exist.");

        const img = fabric.Image.fromURL(imageUrl, function (myImg) {
          // set the image's position to the center of the canvas
          let img1 = myImg.set({
            left: canvas?.getWidth() / 2,
            top: canvas?.getHeight() / 2,

            // set the maximum width to 400px and maintain aspect ratio
            scaleX: myImg.width ? 400 / myImg.width : 1,
            scaleY: myImg.width ? 400 / myImg.width : 1,
          });

          // set the image's origin to the center of the image
          img1.set({ originX: "center", originY: "center" });

          // add the image to the canvas
          canvas?.add(myImg);
          // move the image to the top
          img1.moveTo(canvas.getObjects().length - 1);
        });

        const tattooImage = imageObjects.find(
          (obj) => obj._element && obj._element.currentSrc === imageUrl
        );

        console.log("Setting the Tattoo Image");
        setTattooImage(tattooImage as any);
      } else {
        console.log("Image already exists.");
        // move the existing image to the top
        tattooImage.bringToFront();

        setTattooImage(tattooImage as any);
      }
    }
  };

  const addImages = (canvas?: fabric.Canvas) => {
    // The Tattoo Image
    addTattooImage(canvas, tattooImageUrl);

    //   The Body Image
    addBodyImage(canvas, bodyImageUrl);
  };

  const processImages = async () => {
    // TODO: Add axios logic here
    console.log("TattooImage: ", tattooImage);
    console.log("BodyImage: ", bodyImage);

    const tattooImageProps = {
      url: tattooImageUrl,
      left: tattooImage?.left,
      top: tattooImage?.top,
      angle: tattooImage?.angle,
      scale: tattooImage?.scaleX,
    };

    const bodyImageProps = {
      url: bodyImageUrl as string,
      left: bodyImage?.left,
      top: bodyImage?.top,
      angle: bodyImage?.angle,
      scale: bodyImage?.scaleX,
    };

    await axios
      .post("http://127.0.0.1:8000/process_images", {
        tattoo: tattooImageProps,
        body: bodyImageProps,
      })
      .then((res: any) => {
        console.log("Response: ", res);
      });

    console.log("TattooImage: ", tattooImageProps);
    console.log("BodyImage: ", bodyImageProps);
  };

  return (
    <>
      <div className="w-full  flex items-center justify-between">
        <button
          className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addImages(canvas)}
        >
          Add Images
        </button>
        <button
          className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={processImages}
        >
          Run
        </button>
      </div>
      <div className="w-full py-2"></div>
      <canvas id="canvas" />
    </>
  );
};

export default TattooUI;

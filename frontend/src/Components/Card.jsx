import TiltedCard from "./TiltedCard";
import {motion} from "framer-motion"

const Card = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }} 
    className="flex justify-center">
      <TiltedCard
        imageSrc="https://i.pinimg.com/736x/24/4b/f4/244bf45ef57ee15d1f914894423eca7a.jpg"
        altText=""
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="tilted-card-demo-text">
            Auraverse Make it happen....
          </p>
        }
      />
    </motion.div>
  );
};

export default Card;

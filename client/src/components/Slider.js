import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import React, {useState} from "react";
import ReactSlider from "react-slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Slider = ({ onChange, currentIndex, numCards, cards }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHover = i => {
    setHoveredCard(i);
  }

  const handleBeforeChange = () => {
    return false;
  }

  const handleLeave = (value) => {
    setHoveredCard(null);
  }
  return (
    <div>
      <ReactSlider
      className="vertical-slider"
      markClassName="example-mark"
      onChange={onChange}
      trackClassName="example-track"
      onBeforeChange={handleBeforeChange}
      defaultValue={0}
      value={currentIndex}
      min={0}
      max={numCards}
      marks
      renderMark={(props) => {
        const index = props.key;
        const isHovered = hoveredCard === index;
        const card = cards[index];
        if (props.key < currentIndex) {
          props.className = "example-mark example-mark-completed";
        } else if (props.key === currentIndex) {
          props.className = isHovered ? "hovered example-mark example-mark-active" : "example-mark example-mark-active animate-pulse";
        }
        return (
        <span 
        key={index} 
        className={`${isHovered ? 'hovered' : ''} relative`}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={handleLeave}
        {...props}>
        {isHovered && card && (
          <div className="absolute top-0 left-full ml-4 w-60 bg-white rounded-lg shadow-lg p-4">
            <Card className="border-none">
              <CardHeader>
                <CardTitle>{card.phase}</CardTitle>
              </CardHeader>
              <CardContent>
                {card.phase}
              </CardContent>
            </Card>
          </div>
        )}
        </span>
        )
      }}
      orientation="vertical"
    />
    </div>
  );
    
    
};

export default Slider;

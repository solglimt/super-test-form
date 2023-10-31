import "./index.css";

type StepperProps = {
  screenIndex: number;
};

const screenNames = ["Initial info", "Password screen", "Review"];

const COMPLETE = "complete";
const CURRENT = "current";
const INCOMPLETE = "incomplete";

const stagesMatrix = [
  [CURRENT, INCOMPLETE, INCOMPLETE],
  [COMPLETE, CURRENT, INCOMPLETE],
  [COMPLETE, COMPLETE, CURRENT],
];

function Stepper({ screenIndex }: StepperProps) {
  return (
    <div className="stepper">
      {screenNames.map((name, screenStageIndex) => (
        <div
          key={screenStageIndex}
          className="stepper-screen"
          data-testid={`stepper-screen-${screenStageIndex}`}
        >
          <div
            className={`stepper-screen-stage \
stepper-screen-stage--${stagesMatrix[screenIndex][screenStageIndex]}`}
          />
          <div className="stepper-screen-name">{name}</div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;

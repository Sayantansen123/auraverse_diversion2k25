import Button from "./Button";
import customSection from "./customSection";

const brainwaveSymbol =
  "path_to_brainwave_symbol"; // Replace with actual path or use a require statement
const check = "path_to_check_icon"; // Replace with actual path or use a require statement

const collabContent = [
  { id: 1, title: "Seamless Integration", text: "Works with all platforms." },
  { id: 2, title: "Real-time Collaboration", text: "Instant updates and sync." },
  { id: 3, title: "AI-Powered Features", text: "Smart automation included." },
];

const collabText = "Experience next-level collaboration with AI-powered chat.";

const collabApps = [
  { id: 1, title: "Slack", icon: "path_to_slack_icon", width: 32, height: 32 },
  { id: 2, title: "Zoom", icon: "path_to_zoom_icon", width: 32, height: 32 },
  { id: 3, title: "Teams", icon: "path_to_teams_icon", width: 32, height: 32 },
];

const LeftCurve = () => (
  <svg className="absolute left-0 top-0 w-10 h-10" viewBox="0 0 100 100">
    <path d="M0,100 Q50,0 100,100" stroke="black" fill="transparent" />
  </svg>
);

const RightCurve = () => (
  <svg className="absolute right-0 top-0 w-10 h-10" viewBox="0 0 100 100">
    <path d="M0,0 Q50,100 100,0" stroke="black" fill="transparent" />
  </svg>
);

const Collaboration = () => {
  return (
    <customSection crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            AI Chat App for seamless collaboration
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button>Try it now</Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </customSection>
  );
};

export default Collaboration;

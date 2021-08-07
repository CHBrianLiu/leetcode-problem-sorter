import ProblemList from "./components/ProblemList";
import IntroSection from "./components/Intro";
import { Separator } from '@fluentui/react/lib/Separator';
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Stack, IStackStyles, IStackTokens } from "@fluentui/react/lib/Stack";

const stactStyle: IStackStyles = {
  root: {
    padding: 10,
  },
};

const stackComponentsTokenStyle: IStackTokens = {
  childrenGap: 10,
};

function App() {
  initializeIcons();

  return (
    <div className="App">
      <Stack styles={stactStyle} tokens={stackComponentsTokenStyle}>
        <IntroSection />
        <Separator />
        <ProblemList />
      </Stack>
    </div>
  );
}

export default App;

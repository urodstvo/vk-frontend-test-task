import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
} from "@vkontakte/vkui";
import { Filter } from "./components/filter";
import { FilterProvider } from "./components/filter/context";

import "@vkontakte/vkui/dist/vkui.css";
// import "./index.css";

const App = () => {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <FilterProvider>
                <Filter />
              </FilterProvider>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </StrictMode>
);

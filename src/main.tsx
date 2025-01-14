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
import { FilterProvider, Filter } from "@/components/filter";
import { ResultList } from "@/components/result";

import "@vkontakte/vkui/dist/vkui.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <FilterProvider>
                <Filter />
                <ResultList />
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
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
